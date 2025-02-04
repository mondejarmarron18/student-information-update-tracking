import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ComponentProps } from "react";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

export type BarChartData = ChartData<"bar", unknown[], unknown>;
type Props = ComponentProps<typeof Bar>;

const BarChart = (props: Props) => {
  return (
    <Bar
      {...props}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        ...props.options,
      }}
    />
  );
};

export default BarChart;
