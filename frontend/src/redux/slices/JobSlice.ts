import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Job {
  _id: string;
  company: string;
  role: string;
  status: string;
  notes?: string;
  appliedDate?: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job._id === action.payload._id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job._id !== action.payload);
    },
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setSelectedJob,
  setLoading,
} = jobSlice.actions;

export default jobSlice.reducer;
