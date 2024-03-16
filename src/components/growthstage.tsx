import React, { useEffect, useState } from "react";
import { DataGraph } from "../services/api";
import { Chart } from "react-google-charts";
import "./styles.css";

interface DataItem {
  degree_days: number;
  ndvi: number;
  time: number;
  precipitation: number;
}

const GrowthStage: React.FC = () => {
  const [data, setData] = useState<DataItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DataGraph();
        setData(result);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatDataForChart = () => {
    if (!data) return [];

    const chartData: (string | number | null)[][] = [
      ["Time", "Degree Days", "NDVI", "Precipitation"],
    ];
    const months: { [key: number]: boolean } = {};

    data.forEach((item) => {
      const date = new Date(item.time * 1000);
      const month = date.getMonth() + 1;

      if (!months[month] || chartData.length >= 10) {
        chartData.push([
          date.toLocaleDateString(),
          item.degree_days,
          item.ndvi,
          item.precipitation,
        ]);
        months[month] = true;
      }
    });

    return chartData;
  };

  const chartData = formatDataForChart();

  return (
    <div className="growth-stage-chart-container">
      {chartData.length > 1 ? (
        <Chart
          width={"90%"}
          height={"700px"}
          style={{ margin: "auto" }}
          chartType="LineChart"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            hAxis: {
              title: "Time",
              format: "dd/MM/yyyy",
              gridlines: { color: "transparent" },
            },
            vAxes: {
              0: { title: "Degree Days" },
              1: { title: "NDVI" },
              2: { title: "Precipitation" },
            },
            series: {
              0: { targetAxisIndex: 0, type: "line" },
              1: { targetAxisIndex: 1, type: "area" },
              2: { targetAxisIndex: 0, type: "bars" },
            },
            bars: "vertical",
            colors: ["#ef5350", "#81c784", "#b2eaf2"],
            legend: {
              position: "top",
            },
            chartArea: {
              width: "80%",
              height: "70%",
            },
            title: "Growth Stage Chart",
            titleTextStyle: {
              color: "black",
              fontSize: 20,
            },
            animation: {
              duration: 1000,
              easing: "ease-in-out",
            },
            lineWidth: 2,
            pointSize: 2,
            backgroundColor: "white",
            focusTarget: "category",
          }}
        />
      ) : null}
    </div>
  );
};

export default GrowthStage;
