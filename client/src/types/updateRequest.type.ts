import { IUserProfile } from "@/hooks/useUserProfile";
import { IAcademicProfile } from "./academicProfile.type";
import { updateRequestStatus } from "@/constants/updateRequest";

export type IUpdateRequest = {
  _id: string;
  requesterId: string;
  reviewerId: string;
  reviewStatus: 1 | 2 | 3;
  reviewComment: string;
  requestedAt: Date;
  reviewedAt: Date;
  requesterProfile?: IUserProfile;
  reviewerProfile?: IUserProfile;
} & (
  | {
      contentType: "userProfileContent";
      content: {
        previous: IUserProfile;
        current: IUserProfile;
      };
    }
  | {
      contentType: "acadProfileContent";
      content: {
        previous: IAcademicProfile;
        current: IAcademicProfile;
      };
    }
);

export type UpdateRequestsPassedDays = {
  totalReviews: number;
  reviews: {
    status: (typeof updateRequestStatus)[keyof typeof updateRequestStatus];
    count: number;
  }[];
};

export type UpdateRequestsPassedMonths = {
  _id: string;
  totalReviews: number;
  month: number;
  year: number;
  reviews: {
    status: (typeof updateRequestStatus)[keyof typeof updateRequestStatus];
    count: number;
  }[];
}[];
