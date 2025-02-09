import { updateRequestStatusString } from "@/constants/updateRequest";
import { UpdateRequestsPassedMonths } from "@/types/updateRequest.type";
import { toDateNumeric } from "@/utils/fomatter";
import datasets from "./datasets";

const datasetsData = (
  updateRequests: UpdateRequestsPassedMonths,
  monthRange: string[]
) => {
  const newDatasets = datasets;

  updateRequests.forEach((updateRequest) => {
    const date = toDateNumeric(
      new Date(`${updateRequest.year}-${updateRequest.month}-01`)
    );
    const monthIndex = monthRange.findIndex((month) => month === date);

    updateRequest.reviews.forEach((review) => {
      const statusIndex = newDatasets.findIndex(
        ({ label }) =>
          label ===
          updateRequestStatusString[
            review.status as keyof typeof updateRequestStatusString
          ]
      );

      newDatasets[statusIndex].data[monthIndex] = review.count;
    });
  });

  return newDatasets;
};

export default datasetsData;
