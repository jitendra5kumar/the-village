import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks for community actions

export const add_community = createAsyncThunk(
  "community/add_community",
  async (community, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/community-add", community, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_communities = createAsyncThunk(
  "community/get_communities",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/communities", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_community = createAsyncThunk(
  "community/get_community",
  async (communityId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/community/${communityId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_community = createAsyncThunk(
  "community/delete_community",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log("id", id);
    try {
      const { data } = await api.delete(`/community/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const communityReducer = createSlice({
  name: "community",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    communities: [],
    community: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    // Add community
    [add_community.pending]: (state) => {
      state.loader = true;
    },
    [add_community.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [add_community.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.communities.push(payload.community); // Add the new community to the list
    },

    // Get all communities
    [get_communities.pending]: (state) => {
      state.loader = true;
    },
    [get_communities.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [get_communities.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.communities = payload.communities;
    },

    // Get a single community
    [get_community.pending]: (state) => {
      state.loader = true;
    },
    [get_community.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [get_community.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.community = payload.community;
    },

    // Delete community
    [delete_community.pending]: (state) => {
      state.loader = true;
    },
    [delete_community.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [delete_community.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.communities = state.communities.filter(
        (community) => community._id !== payload.communityId
      );
    },
  },
});

export const { messageClear } = communityReducer.actions;
export default communityReducer.reducer;
