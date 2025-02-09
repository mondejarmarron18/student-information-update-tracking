import BarChart, { BarChartData } from "../BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdateRequestsPassedMonths from "@/hooks/useUpdateRequestsPassedMonths";
import { getMonthRange, getMonthString } from "@/utils/fomatter";
import { subMonths, getYear } from "date-fns";
import { useEffect, useState } from "react";
import AnimatedSpinner from "../AnimatedSpinner";
import { enUS } from "date-fns/locale";

type Props = {
  months: number;
};

const statusLabels = {
  1: "Pending",
  2: "Approved",
  3: "Rejected",
};

const initialDatesets = [
  {
    label: statusLabels[1],
    data: [],
    borderColor: "rgb(59, 130, 246)",
    backgroundColor: "rgba(59, 130, 246, 0.6)",
  },
  {
    label: statusLabels[2],
    data: [],
    borderColor: "rgb(34, 197, 94)",
    backgroundColor: "rgba(34, 197, 94, 0.6)",
  },
  {
    label: statusLabels[3],
    data: [],
    borderColor: "rgb(239, 68, 68)",
    backgroundColor: "rgba(239, 68, 68, 0.6)",
  },
];

const AnnualUpdateRequestsPassedMonthsBar = ({ months }: Props) => {
  const updateRequests = useUpdateRequestsPassedMonths({ months });
  const updateRequestsData = updateRequests.data?.data || [];
  const [datasets, setDatasets] = useState(initialDatesets);
  const monthRange = getMonthRange(
    subMonths(new Date(), months - 1),
    new Date()
  );

  const data: BarChartData = {
    labels: monthRange.map((month) =>
      getMonthString(new Date(month), "abbreviated")
    ),
    datasets,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Update Requests</CardTitle>
        <CardDescription>
          From {getMonthString(new Date(monthRange[0]))},{" "}
          {getYear(new Date(monthRange[0]))}
          {" to "} {getMonthString(new Date(monthRange[monthRange.length - 1]))}
          , {getYear(new Date(monthRange[monthRange.length - 1]))}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {updateRequests.isLoading ? (
          <div className="flex justify-center items-center h-full">
            <AnimatedSpinner />
          </div>
        ) : updateRequestsData?.length === 0 ? (
          <div className="text-center flex justify-center items-center h-full text-gray-500">
            No update requests found
          </div>
        ) : (
          <BarChart data={data} className="h-full" />
        )}
      </CardContent>
    </Card>
  );
};

export default AnnualUpdateRequestsPassedMonthsBar;
