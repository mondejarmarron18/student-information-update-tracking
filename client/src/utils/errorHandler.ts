import { ApiResponseError } from "@/types/apiResponse.type";
import { AxiosError } from "axios";

export const reactQueryError = (error: Error): ApiResponseError => {
  if (error instanceof AxiosError) {
    const apiError: ApiResponseError = error.response?.data;

    if (apiError.status) return apiError;

    return {
      status: 404,
      message: "Not Found",
      description: "The requested resource was not found.",
      details: error.stack,
    };
  }

  return {
    status: 500,
    message: "Internal Server Error",
    description: "Something went wrong on the server.",
    details: error.stack,
  };
};
