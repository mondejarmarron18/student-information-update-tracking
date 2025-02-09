import { updateRequestStatusString } from "@/constants/updateRequest";

const datasets = [
  {
    label: updateRequestStatusString[1],
    data: [0],
    borderColor: "rgb(234, 179, 8)",
    backgroundColor: "rgba(234, 179, 8, 0.6)",
  },
  {
    label: updateRequestStatusString[2],
    data: [0],
    borderColor: "rgb(34, 197, 94)",
    backgroundColor: "rgba(34, 197, 94, 0.6)",
  },
  {
    label: updateRequestStatusString[3],
    data: [0],
    borderColor: "rgb(239, 68, 68)",
    backgroundColor: "rgba(239, 68, 68, 0.6)",
  },
];

export default datasets;
