import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { fetchData, addData, updateData, deleteData } from '../lib/dataPersistence';

// Async thunks
export const fetchHabits = createAsyncThunk(
  'habits/fetchHabits',
  async ({ userId, isGuest }, { rejectWithValue }) => {
    try {
      return await fetchData('habits', userId, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async ({ userId, habitData, isGuest }, { rejectWithValue }) => {
    try {
      return await addData('habits', userId, { ...habitData, streak: 0, lastCompleted: null, logs: [] }, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHabit = createAsyncThunk(
  'habits/updateHabit',
  async ({ habitId, userId, updates, isGuest }, { rejectWithValue }) => {
    try {
      return await updateData('habits', habitId, userId, updates, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async ({ habitId, userId, isGuest }, { rejectWithValue }) => {
    try {
      return await deleteData('habits', habitId, userId, isGuest);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logHabit = createAsyncThunk(
  'habits/logHabit',
  async ({ habitId, userId, logData, isGuest }, { rejectWithValue }) => {
    try {
      if (isGuest) {
        // For guest users, get current habit data from localStorage
        const key = `guest_habits_${userId}`;
        const habits = JSON.parse(localStorage.getItem(key) || '[]');
        const habitIndex = habits.findIndex(h => h.id === habitId);

        if (habitIndex === -1) {
          throw new Error('Habit not found');
        }

        const habit = habits[habitIndex];
        const newLog = {
          date: new Date().toISOString(),
          type: logData.type,
          notes: logData.notes || '',
        };

        const updatedLogs = [...(habit.logs || []), newLog];

        // Calculate new streak
        let newStreak = habit.streak || 0;
        if (logData.type === 'success') {
          newStreak += 1;
        } else if (logData.type === 'relapse') {
          newStreak = 0;
        }

        const updatedHabit = {
          ...habit,
          logs: updatedLogs,
          streak: newStreak,
          lastCompleted: logData.type === 'success' ? new Date().toISOString() : habit.lastCompleted,
        };

        habits[habitIndex] = updatedHabit;
        localStorage.setItem(key, JSON.stringify(habits));

        return { habitId, log: newLog, streak: newStreak };
      } else {
        // Firebase logic for regular users
        const habitRef = doc(db, 'habits', habitId);
        const habitDoc = await getDoc(habitRef);

        if (!habitDoc.exists()) {
          throw new Error('Habit not found');
        }

        const habit = habitDoc.data();

        const newLog = {
          date: new Date().toISOString(),
          type: logData.type,
          notes: logData.notes || '',
        };

        const updatedLogs = [...(habit.logs || []), newLog];

        // Calculate new streak
        let newStreak = habit.streak || 0;
        if (logData.type === 'success') {
          newStreak += 1;
        } else if (logData.type === 'relapse') {
          newStreak = 0;
        }

        await updateDoc(habitRef, {
          logs: updatedLogs,
          streak: newStreak,
          lastCompleted: logData.type === 'success' ? new Date().toISOString() : habit.lastCompleted,
        });

        return { habitId, log: newLog, streak: newStreak };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [],
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
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.loading = false;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.unshift(action.payload);
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const { habitId, updates } = action.payload;
        const index = state.habits.findIndex(habit => habit.id === habitId);
        if (index !== -1) {
          state.habits[index] = { ...state.habits[index], ...updates };
        }
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(habit => habit.id !== action.payload);
      })
      .addCase(logHabit.fulfilled, (state, action) => {
        const { habitId, log, streak } = action.payload;
        const habitIndex = state.habits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          state.habits[habitIndex].logs.push(log);
          state.habits[habitIndex].streak = streak;
          if (log.type === 'success') {
            state.habits[habitIndex].lastCompleted = log.date;
          }
        }
      });
  },
});

export const { clearError } = habitsSlice.actions;
export default habitsSlice.reducer;