import { createAsyncThunk } from "@reduxjs/toolkit";

export const added = createAsyncThunk("posts/Added", async (post, thunkAPI) => {
  try {
    return post;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const snepshitComment = createAsyncThunk(
  "posts/SnepshitComment",
  async (comment, thunkAPI) => {
    try {
      return comment;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
