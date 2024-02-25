import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

//Object structure that returend from API
interface Configuration {
  id: number;
  key: string;
  value: number;
  type: string;
}

interface ConfigurationsState {
  items: Configuration[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ConfigurationsState = {
  items: [],
  status: "idle",
  error: null,
};

const configurationsSlice = createSlice({
  name: "configurations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigurations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConfigurations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchConfigurations.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch configurations";
      });
  },
});

//Fetching configurations from DB
export const fetchConfigurations = createAsyncThunk(
  "configurations/fetchConfigurations",
  async () => {
    const response = await axios.get("/config/Configurations");
    console.log(response.data);
    return response.data;
  }
);

//Searching "show_component" configuration
export const selectShowComponentConfig = (state: RootState) =>
  state.configurations.items.find((config) => config.key === "show_component")
    ?.value == 1;

export default configurationsSlice.reducer;
