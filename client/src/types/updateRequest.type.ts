import { IUserProfile } from "@/hooks/useUserProfile";

export interface IUpdateRequest {
  _id: string;
  requesterId: string;
  reviewerId: string;
  reviewStatus: 1 | 2 | 3;
  contentType: "userProfileContent";
  content: {
    previous: IUserProfile;
    current: IUserProfile;
  };
  reviewComment: string;
  requestedAt: Date;
  reviewedAt: Date;
  requesterProfile: IUserProfile;
  reviewerProfile: IUserProfile;
}
