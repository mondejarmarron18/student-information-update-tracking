import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PieChart, { PieChartData } from "../PieChart";
import useUpdateRequestsPassedDays from "@/hooks/useUpdateRequestsPassedDays";
import AnimatedSpinner from "../AnimatedSpinner";

type Props = {
  days: number;
};

const UpdateRequestsPassedDaysPie = ({ days }: Props) => {
  const updateRequestsPassedDays = useUpdateRequestsPassedDays({
    days,
  });
  const updateRequestsPassedDaysData = updateRequestsPassedDays.data?.data;
  const updateRequestsCount =
    updateRequestsPassedDaysData?.reviews.map(({ count }) => count) || [];

  const isUpdateRequestsCountEmpty = updateRequestsCount.every(
    (count) => count === 0
  );

  const data: PieChartData = {
    labels: ["Pending", "Approved", "Rejected"], // Categories
    datasets: [
      {
        label: "Count", // Optional dataset label
        data: updateRequestsCount, // Values for each category
        backgroundColor: [
          "rgba(234, 179, 8, 0.6)", // Color for "Pending"
          "rgba(34, 197, 94, 0.6)", // Color for "Approved"
          "rgba(239, 68, 68, 0.6)", // Color for "Rejected"
        ],
        borderColor: [
          "rgb(234, 179, 8)",
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Update Requests</CardTitle>
        <CardDescription>
          From the last {days} days
          {/* In the last {days} days: {updateRequestsPassedDaysData?.totalReviews} */}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {updateRequestsPassedDays.isLoading ? (
          <div className="flex justify-center items-center h-full">
            <AnimatedSpinner />
          </div>
        ) : isUpdateRequestsCountEmpty ? (
          <div className="text-center flex justify-center items-center h-full text-sm text-gray-500">
            No update requests found
          </div>
        ) : (
          <PieChart data={data} className="h-full" />
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateRequestsPassedDaysPie;
