import { IUserProfile } from "@/hooks/useUserProfile";
import { IAcademicProfile } from "./academicProfile.type";

export type IUpdateRequest = {
  _id: string;
  requesterId: string;
  reviewerId: string;
  reviewStatus: 1 | 2 | 3;
  reviewComment: string;
  requestedAt: Date;
  reviewedAt: Date;
  requesterProfile: IUserProfile;
  reviewerProfile: IUserProfile;
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
