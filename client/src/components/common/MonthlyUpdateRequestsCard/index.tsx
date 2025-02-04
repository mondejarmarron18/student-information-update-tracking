import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PieChart, { PieChartData } from "../PieChart";
import { getMonthString } from "@/utils/fomatter";
import { getYear } from "date-fns";

const MonthlyUpdateRequestsCard = () => {
  const data: PieChartData = {
    labels: ["Pending", "Approved", "Rejected"], // Categories
    datasets: [
      {
        label: "Status Distribution", // Optional dataset label
        data: [10, 20, 5], // Values for each category
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)", // Color for "Pending"
          "rgba(34, 197, 94, 0.6)", // Color for "Approved"
          "rgba(239, 68, 68, 0.6)", // Color for "Rejected"
        ],
        borderColor: [
          "rgb(59, 130, 246)",
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
        <CardTitle>Monthly Update Requests</CardTitle>
        <CardDescription>
          As of {getMonthString(new Date())}, {getYear(new Date())}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart data={data} className="h-[250px]" />
      </CardContent>
    </Card>
  );
};

export default MonthlyUpdateRequestsCard;
