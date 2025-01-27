import { IUpdateRequest } from "@/types/updateRequest.type";
import _ from "lodash";

type Props = {
  contentType: IUpdateRequest["contentType"];
};

const UpdateRequestType = ({ contentType }: Props) => {
  switch (contentType) {
    case "userProfileContent":
      return "User Profile";
    case "acadProfileContent":
      return "Academic Profile";
    default:
      return _.startCase(_.toLower(contentType));
  }
};

export default UpdateRequestType;
