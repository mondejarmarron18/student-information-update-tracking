export type ApiResponseSuccess<Data = unknown> = {
  accessToken?: string;
  status: number;
  message: string;
  data: Data;
};

export type ApiResponseError = {
  status: number;
  message: string;
  description: string;
  details?: unknown;
};
