import BarChart, { BarChartData } from "../BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMonthString } from "@/utils/fomatter";
import { subMonths, getYear, subYears } from "date-fns";

const AnnualUpdateRequestsCard = () => {
  const data: BarChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Pending",
        data: [7, 7, 7, 2, 5, 6, 7],
        borderColor: "rgb(59, 130, 246)", // Blue for border
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Semi-transparent blue for background
      },
      {
        label: "Approved",
        data: [0, 2, 8, 2, 5, 6, 10],
        borderColor: "rgb(34, 197, 94)", // Green for border
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Semi-transparent green for background
      },
      {
        label: "Rejected",
        data: [1, 2, 3, 2, 10, 6, 2],
        borderColor: "rgb(239, 68, 68)", // Red for border
        backgroundColor: "rgba(239, 68, 68, 0.6)", // Semi-transparent red for background
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Update Requests</CardTitle>
        <CardDescription>
          From {getMonthString(subMonths(new Date(), 12))},{" "}
          {getYear(subYears(new Date(), 1))}
          {" to "} {getMonthString(new Date())}, {getYear(new Date())}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart data={data} className="h-[300px]" />
      </CardContent>
    </Card>
  );
};

export default AnnualUpdateRequestsCard;
