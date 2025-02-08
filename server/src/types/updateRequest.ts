import { UpdateRequestStatusValue } from "../constants/updateRequest";

export type UpdateRequestsPassedDays = {
  totalReviews: number;
  reviews: {
    status: UpdateRequestStatusValue;
    count: number;
  }[];
};
