import { updateRequestStatusString } from "@/constants/updateRequest";

const datasets = [
  {
    label: updateRequestStatusString[4],
    data: [0],
    borderColor: "rgb(100, 149, 237)",
    backgroundColor: "rgba(100, 149, 237, 0.6)",
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
