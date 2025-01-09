const reduxStatus = {
  idle: "idle",
  loading: "loading",
  error: "error",
  success: "success",
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
  cancelled: "cancelled",
} as const;

export type ReduxStatus = (typeof reduxStatus)[keyof typeof reduxStatus];

export default reduxStatus;
