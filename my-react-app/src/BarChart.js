import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import "./BarChart.css";
import LiveCurrency from "./LiveCurrency";
const BarChart = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const params = useParams();
  const symbol = params.symbol;

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [ratio, setRatio] = useState(0);
  const [ratioClass, setRatioClass] = useState("defaultColor");
  useEffect(() => {
    fetch(
      `https://api.currencyapi.io/markets?token=vDb4I53QBWVWCwm5eQ0ZFCfDPoLVI7jH&symbol=${symbol}&historical=true&scale=60`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //change result from str to array of arrays
        let resultInArr = JSON.parse(result);

        //getting last 10 closest to current time data
        let data = resultInArr.slice(
          resultInArr.length - 10,
          resultInArr.length
        );
        let finalData = [];
        data.map((data) => {
          //change Epoch time to date, and adjusting it by 3 hrs to EST
          let time = JSON.stringify(new Date(data[0] * 1000 - 14400000))
            .slice(6, 17)
            .replace("T", " ");

          //Get average by divide (high + low) by 2
          let avg = (data[2] + data[3]) / 2;
          finalData.push([time, avg]);
        });

        // add correct data[0]
        finalData.unshift(["x", `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`]);
        setLoading(false);
        setChartData(finalData);
        return;
      })
      .catch((error) => console.log("error", error));
  }, []);

  if (loading || !chartData) {
    return <div>loading</div>;
  } else
    return (
      <>
        <LiveCurrency />
        <Chart
          width={"95vw"}
          height={"85vh"}
          chartType='LineChart'
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            explorer: {
              axis: "horizontal",
              keepInBounds: true,
              maxZoomIn: 4.0,
            },
            hAxis: {
              title: "Time",
            },
            vAxis: {
              title: "Currency Ratio",
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </>
    );
};

export default BarChart;
