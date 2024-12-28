import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  email: string;
}

interface IState {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IUser;
  error: string | null;
}

const initialState: IState = {
  status: "idle",
  data: {
    id: "",
    email: "",
  },
  error: null,
};

const addUser = createAsyncThunk(
  "user/add",
  async (user: IUser, { rejectWithValue }) => {
    if (!user) {
      return rejectWithValue("User not found");
    }

    return user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: IUser }) => {
      state.data.id = payload.id;
      state.data.email = payload.email;
    },
    reset: (state) => {
      const { status, data, error } = initialState;

      state.status = status;
      state.data.id = data.id;
      state.data.email = data.email;
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      addUser.fulfilled,
      (state, { payload }: { payload: IUser }) => {
        state.status = "succeeded";
        state.data.id = payload.id;
        state.data.email = payload.email;
      }
    );
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = (payload as string) || "Something went wrong";
    });
  },
});

export const { setUser, reset } = userSlice.actions;
