import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ComponentProps } from "react";
import { Pie } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export type PieChartData = ChartData<"pie", unknown[], unknown>;
type Props = ComponentProps<typeof Pie>;

const PieChart = (props: Props) => {
  return (
    <Pie
      {...props}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        ...props.options,
      }}
    />
  );
};

export default PieChart;
