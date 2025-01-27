import { IUpdateRequest } from "@/types/updateRequest.type";

type Props = {
  status: IUpdateRequest["reviewStatus"];
};

const UpdateRequestStatus = (props: Props) => {
  switch (props.status) {
    case 1:
      return <span className="text-yellow-500">Pending</span>;
    case 2:
      return <span className="text-green-500">Approved</span>;
    case 3:
      return <span className="text-red-500">Rejected</span>;
    default:
      return <span className="text-gray-500">Pending</span>;
  }
};

export default UpdateRequestStatus;
