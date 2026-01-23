import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fetchData, addData } from '../lib/dataPersistence';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Async thunks
export const fetchJournalEntries = createAsyncThunk(
  'journal/fetchJournalEntries',
  async ({ userId, isGuest }, { rejectWithValue }) => {
    try {
      return await fetchData('journalEntries', userId, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addJournalEntry = createAsyncThunk(
  'journal/addJournalEntry',
  async ({ userId, entryData, isGuest }, { rejectWithValue }) => {
    try {
      let insights = {};

      // Only analyze with Gemini for non-guest users
      if (!isGuest && import.meta.env.VITE_GEMINI_API_KEY) {
        try {
          // Analyze sentiment and extract insights using Gemini
          const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
          const prompt = `Analyze this journal entry for mental health insights. Extract:
1. Overall sentiment (positive, negative, neutral)
2. Key emotions mentioned
3. Potential triggers or stressors
4. Positive aspects or coping mechanisms
5. Suggestions for improvement or reflection

Journal entry: "${entryData.content}"

Return the analysis in JSON format with keys: sentiment, emotions, triggers, positives, suggestions`;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          const analysisText = response.text();

          // Parse the JSON response
          try {
            // Extract JSON from the response
            const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              insights = JSON.parse(jsonMatch[0]);
            }
          } catch (e) {
            console.error('Failed to parse Gemini response:', e);
            insights = {
              sentiment: 'neutral',
              emotions: [],
              triggers: [],
              positives: [],
              suggestions: ['Consider reflecting on your feelings more deeply.']
            };
          }
        } catch (geminiError) {
          console.error('Gemini analysis failed:', geminiError);
          insights = {
            sentiment: 'neutral',
            emotions: ['reflection'],
            triggers: [],
            positives: ['self-awareness'],
            suggestions: ['Keep journaling to track your mental health journey.']
          };
        }
      } else {
        // Mock insights for guest users or when Gemini is not available
        insights = {
          sentiment: 'neutral',
          emotions: ['reflection'],
          triggers: [],
          positives: ['self-awareness'],
          suggestions: ['Keep journaling to track your mental health journey.']
        };
      }

      const entry = {
        ...entryData,
        userId,
        createdAt: new Date().toISOString(),
        insights,
      };

      return await addData('journalEntries', userId, entry, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateJournalEntry = createAsyncThunk(
  'journal/updateJournalEntry',
  async ({ entryId, updates }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, 'journalEntries', entryId), updates);
      return { entryId, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    entries: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournalEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournalEntries.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchJournalEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addJournalEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJournalEntry.fulfilled, (state, action) => {
        state.entries.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addJournalEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateJournalEntry.fulfilled, (state, action) => {
        const { entryId, updates } = action.payload;
        const index = state.entries.findIndex(entry => entry.id === entryId);
        if (index !== -1) {
          state.entries[index] = { ...state.entries[index], ...updates };
        }
      });
  },
});

export const { clearError } = journalSlice.actions;
export default journalSlice.reducer;