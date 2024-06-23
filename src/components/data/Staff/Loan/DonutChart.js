import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    chart: {
      type: "donut",
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    colors: ["#075666", "#83B1BA"],
    legend: {
      show: true,
      position: "bottom",
    },
    labels: ["Paid", "Unpaid"],
  };

  const pending = data?.repaymentPlans
    ?.filter((item) => item?.status === "PENDING")
    ?.reduce((acc, item) => acc + item?.amount, 0);
  const paid = data?.repaymentPlans
    ?.filter((item) => item.status === "PAID")
    ?.reduce((acc, item) => acc + item?.amount, 0);

  const series = [paid, pending];

  return (
    <ReactApexChart
      height="293px"
      options={options}
      series={series}
      type="donut"
    />
  );
};

export default DonutChart;
