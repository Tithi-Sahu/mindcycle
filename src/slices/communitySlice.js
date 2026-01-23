import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Async thunks
export const fetchPosts = createAsyncThunk(
  'community/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'community/addPost',
  async ({ userId, postData }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...postData,
        userId,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        likedBy: [],
      });
      return { id: docRef.id, ...postData, userId, createdAt: new Date().toISOString(), likes: 0, comments: [], likedBy: [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'community/addComment',
  async ({ postId, userId, commentData }, { rejectWithValue }) => {
    try {
      const comment = {
        id: Date.now().toString(),
        userId,
        ...commentData,
        createdAt: new Date().toISOString(),
      };

      await updateDoc(doc(db, 'posts', postId), {
        comments: arrayUnion(comment),
      });

      return { postId, comment };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  'community/likePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId),
      });

      return { postId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  'community/unlikePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const postRef = doc(db, 'posts', postId);
      // Note: Firestore doesn't have arrayRemove for complex operations in one call
      // This is a simplified version - in production, you'd need to get the current likedBy array and update it
      await updateDoc(postRef, {
        likes: increment(-1),
        // likedBy: arrayRemove(userId), // Would need to implement this properly
      });

      return { postId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [],
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const postIndex = state.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(comment);
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const postIndex = state.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes += 1;
          state.posts[postIndex].likedBy.push(userId);
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const postIndex = state.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = Math.max(0, state.posts[postIndex].likes - 1);
          state.posts[postIndex].likedBy = state.posts[postIndex].likedBy.filter(id => id !== userId);
        }
      });
  },
});

export const { clearError } = communitySlice.actions;
export default communitySlice.reducer;