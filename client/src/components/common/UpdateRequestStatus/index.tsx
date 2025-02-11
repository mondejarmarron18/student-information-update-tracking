import { updateRequestStatusString } from "@/constants/updateRequest";
import { IUpdateRequest } from "@/types/updateRequest.type";

type Props = {
  status: IUpdateRequest["reviewStatus"];
};

const UpdateRequestStatus = (props: Props) => {
  switch (props.status) {
    case 1:
      return (
        <span className="text-yellow-500">{updateRequestStatusString[1]}</span>
      );
    case 2:
      return (
        <span className="text-green-500">{updateRequestStatusString[2]}</span>
      );
    case 3:
      return (
        <span className="text-red-500">{updateRequestStatusString[3]}</span>
      );
    default:
      return (
        <span className="text-gray-500">{updateRequestStatusString[1]}</span>
      );
  }
};

export default UpdateRequestStatus;
