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
import { useMemo } from "react";
import AnimatedSpinner from "../AnimatedSpinner";
import datasetsData from "./datasetsData";

type Props = {
  months: number;
};

const AnnualUpdateRequestsPassedMonthsBar = ({ months }: Props) => {
  const updateRequests = useUpdateRequestsPassedMonths({ months });
  const monthRange = getMonthRange(
    subMonths(new Date(), months - 1),
    new Date()
  );

  const updateRequestsData = useMemo(
    () => updateRequests.data?.data || [],
    [updateRequests.data]
  );

  const datasets = useMemo(
    () => datasetsData(updateRequestsData, monthRange),
    [updateRequestsData, monthRange]
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
          <BarChart
            data={data}
            className="h-full"
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AnnualUpdateRequestsPassedMonthsBar;
