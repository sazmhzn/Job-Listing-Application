import axios from "axios";

// API base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PostJobData {
  title: string;
  description: string;
  company: string;
  location: string;
  jobType?: string;
  salaryRange?: string;
  logo?: string;
}

export interface JobApplication {
  fullName: string;
  email: string;
  coverLetter?: string;
  resume: Object | File;
  jobId: string;
  jobTitle: string;
  createdAt?: Date; // Add this line to include 'createdAt'
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// POST request to submit job data
export const createJob = async (jobData: PostJobData) => {
  try {
    const response = await axios.post(`${BASE_URL}jobs`, jobData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`${BASE_URL}jobs`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting job data:", error);
    throw error; // Re-throw for error handling in components
  }
};

export const applyJob = async (applicationData: JobApplication) => {
  try {
    console.log(applicationData);
    const response = await api.post<JobApplication>(`${BASE_URL}application`, {
      ...applicationData,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting job application:", error);
    throw error;
  }
};
// Function to fetch jobs
export const fetchJobs = async () => {
  try {
    const response = await api.get("jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

/**
 * Fetch job details by ID
 * @param jobId - The ID of the job to fetch
 * @returns The job details
 */
export const fetchJobById = async (jobId: string) => {
  try {
    const response = await api.get(`jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    throw error;
  }
};

export const fetchAppliedJobs = async () => {
  try {
    const response = await api.get("application");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
