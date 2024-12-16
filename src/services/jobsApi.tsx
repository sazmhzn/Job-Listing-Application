import axios from "axios";

// API base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interface for the job data (optional but recommended for TypeScript)
interface JobData {
  title: string;
  description: string;
  company: string;
  location: string;
}

// POST request to submit job data
export const createJob = async (jobData: JobData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, jobData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting job data:", error);
    throw error; // Re-throw for error handling in components
  }
};

// Function to fetch jobs
export const fetchJobs = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  };
