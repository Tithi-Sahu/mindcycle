import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// Generate random username
const generateUsername = () => {
  const adjectives = ['Calm', 'Mindful', 'Peaceful', 'Serene', 'Tranquil', 'Balanced', 'Harmonious', 'Zen'];
  const nouns = ['Warrior', 'Seeker', 'Journey', 'Path', 'Soul', 'Spirit', 'Mind', 'Heart'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${num}`;
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData.displayName || generateUsername(),
        photoURL: user.photoURL,
        ...userData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate username if not provided
      const username = displayName || generateUsername();

      // Update Firebase Auth profile
      await updateProfile(user, { displayName: username });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        createdAt: new Date().toISOString(),
        habits: [],
        journalEntries: [],
        achievements: [],
        settings: {
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: username,
        photoURL: user.photoURL,
        habits: [],
        journalEntries: [],
        achievements: [],
        settings: {
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      // Clear guest user data from localStorage
      localStorage.removeItem('guestUser');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsGuest = createAsyncThunk(
  'auth/loginAsGuest',
  async (_, { rejectWithValue }) => {
    try {
      // Create a guest user object with localStorage persistence
      const guestUser = {
        uid: 'guest-' + Date.now(),
        email: null,
        displayName: 'Guest User',
        photoURL: null,
        isGuest: true,
        habits: [],
        journalEntries: [],
        achievements: [],
        settings: {
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };

      // Store guest user data in localStorage for persistence
      localStorage.setItem('guestUser', JSON.stringify(guestUser));

      return guestUser;
    } catch (error) {
      return rejectWithValue('Failed to login as guest');
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};

          dispatch(authSlice.actions.setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userData.displayName || generateUsername(),
            photoURL: user.photoURL,
            ...userData,
          }));
        } else {
          // Check for guest user in localStorage
          const guestUser = localStorage.getItem('guestUser');
          if (guestUser) {
            dispatch(authSlice.actions.setUser(JSON.parse(guestUser)));
          } else {
            dispatch(authSlice.actions.setUser(null));
          }
        }
        resolve();
      });
      // Store unsubscribe function for cleanup if needed
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAsGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsGuest.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginAsGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;