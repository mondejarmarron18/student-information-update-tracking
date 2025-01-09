import { ApiResponseError } from "@/types/apiResponse.type";
import { AxiosError } from "axios";

export const reactQueryError = (error: Error): ApiResponseError => {
  if (error instanceof AxiosError) {
    const apiError: ApiResponseError = error.response?.data;

    return apiError;
  }

  return {
    status: 500,
    message: error.name,
    description: error.message,
    details: error.stack,
  };
};
