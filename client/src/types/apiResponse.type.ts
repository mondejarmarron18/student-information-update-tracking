export type ApiResponseSuccess = {
  accessToken?: string;
  status: number;
  message: string;
  data: unknown;
};

export type ApiResponseError = {
  status: number;
  message: string;
  description: string;
  details?: unknown;
};
