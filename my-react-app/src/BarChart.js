import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Chart from "react-google-charts";
import "./BarChart.css";
import LiveCurrency from "./LiveCurrency";
const BarChart = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const params = useParams();
  let symbol = params.symbol;
  symbol = symbol.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [oneDayChartData, setOneDayChartData] = useState(null);
  const [oneWeekChartData, setOneWeekChartData] = useState(null);
  const [oneMonthChartData, setOneMonthChartData] = useState(null);
  const [sixMonthChartData, setSixMonthChartData] = useState(null);
  const [oneYearChartData, setOneYearChartData] = useState(null);
  const [allChartData, setAllChartData] = useState(null);
  const [ratio, setRatio] = useState(0);
  const [ratioClass, setRatioClass] = useState("defaultColor");
  useEffect(() => {
    // fetch data for one day
    //tokenvDb4I53QBWVWCwm5eQ0ZFCfDPoLVI7jH
    fetch(
      `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=15`,
      requestOptions
    )
      .then((response) => {
        const result = response.text();
        return result;
      })
      .then((result) => {
        //change result from str to array of arrays
        let resultInArr = JSON.parse(result);

        //getting last 96 closest to current time data
        let oneDData = resultInArr.slice(
          resultInArr.length - 96,
          resultInArr.length
        );
        let finalData = [];
        oneDData.map((data) => {
          //change Epoch time to date
          let time = new Date(data[0] * 1000);

          //Get average by divide (high + low) by 2
          let avg = (data[2] + data[3]) / 2;
          finalData.push([time, avg]);
        });

        // add correct data[0]
        finalData.unshift(["x", `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`]);
        setLoading(false);
        setOneDayChartData(finalData);
        console.log("finish fetching 1D data");
        setChartData(finalData);
        return;
      })
      .then(() => {
        // fetch data for all time
        fetch(
          `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=1M`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            //change result from str to array of arrays
            let resultInArr = JSON.parse(result);
            //getting last 96 closest to current time data
            let oneDData = resultInArr.slice(
              resultInArr.length - 200,
              resultInArr.length
            );
            let finalData = [];
            oneDData.map((data) => {
              //change Epoch time to date
              let time = new Date(data[0] * 1000);
              //Get average by divide (high + low) by 2
              let avg = (data[2] + data[3]) / 2;
              finalData.push([time, avg]);
            });
            // add correct data[0]
            finalData.unshift([
              "x",
              `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`,
            ]);
            setAllChartData(finalData);
            console.log("finish fetching all data");
            return;
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));

    // fetch data for seven day
    fetch(
      `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=60`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //change result from str to array of arrays
        let resultInArr = JSON.parse(result);

        //getting last 96 closest to current time data
        let oneDData = resultInArr.slice(
          resultInArr.length - 120,
          resultInArr.length
        );
        let finalData = [];
        oneDData.map((data) => {
          //change Epoch time to date
          let time = new Date(data[0] * 1000);

          //Get average by divide (high + low) by 2
          let avg = (data[2] + data[3]) / 2;
          finalData.push([time, avg]);
        });

        // add correct data[0]
        finalData.unshift(["x", `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`]);
        setOneWeekChartData(finalData);
        console.log("finish fetching 1W data");
        return;
      })
      .then(() => {
        // fetch data for one year
        fetch(
          `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=1W`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            //change result from str to array of arrays
            let resultInArr = JSON.parse(result);

            //getting last 96 closest to current time data
            let oneDData = resultInArr.slice(
              resultInArr.length - 55,
              resultInArr.length
            );
            let finalData = [];
            oneDData.map((data) => {
              //change Epoch time to date
              let time = new Date(data[0] * 1000);

              //Get average by divide (high + low) by 2
              let avg = (data[2] + data[3]) / 2;
              finalData.push([time, avg]);
            });

            // add correct data[0]
            finalData.unshift([
              "x",
              `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`,
            ]);

            setOneYearChartData(finalData);
            console.log("finish fetching 1Y data");
            return;
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));

    // fetch data for one month
    fetch(
      `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=1D`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //change result from str to array of arrays
        let resultInArr = JSON.parse(result);

        //getting last 96 closest to current time data

        let oneDData = resultInArr.slice(
          resultInArr.length - 22,
          resultInArr.length
        );
        let finalData = [];
        oneDData.map((data) => {
          //change Epoch time to date
          let time = new Date(data[0] * 1000);

          //Get average by divide (high + low) by 2
          let avg = (data[2] + data[3]) / 2;
          finalData.push([time, avg]);
        });

        // add correct data[0]
        finalData.unshift(["x", `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`]);

        setOneMonthChartData(finalData);
        console.log("finish fetching 1M data");
        return;
      })
      .then(() => {
        // fetch data for six month
        fetch(
          `https://api.currencyapi.io/markets?token=9PjFme7prphhhZ22SfuZ3MKLfT1hSg1i&symbol=${symbol}&historical=true&scale=1W`,
          requestOptions
        )
          .then((response) => {
            const result = response.text();

            return result;
          })
          .then((result) => {
            //change result from str to array of arrays
            let resultInArr = JSON.parse(result);

            //getting last 96 closest to current time data
            let oneDData = resultInArr.slice(
              resultInArr.length - 27,
              resultInArr.length
            );
            let finalData = [];
            oneDData.map((data) => {
              //change Epoch time to date
              let time = new Date(data[0] * 1000);

              //Get average by divide (high + low) by 2
              let avg = (data[2] + data[3]) / 2;
              finalData.push([time, avg]);
            });

            // add correct data[0]
            finalData.unshift([
              "x",
              `${symbol.slice(3, 6)}/${symbol.slice(0, 3)}`,
            ]);

            setSixMonthChartData(finalData);
            console.log("finish fetching 6M data");
            return;
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const oneDayBtn = () => {
    setChartData(oneDayChartData);
  };
  const oneWeekBtn = () => {
    setChartData(oneWeekChartData);
  };
  const oneMonthBtn = () => {
    setChartData(oneMonthChartData);
  };
  const sixMonthBtn = () => {
    setChartData(sixMonthChartData);
  };
  const oneYearBtn = () => {
    setChartData(oneYearChartData);
  };
  const allTimeBtn = () => {
    setChartData(allChartData);
  };
  if (
    loading
    // ||
    // !chartData ||
    // !oneDayChartData ||
    // !oneWeekChartData ||
    // !oneMonthChartData ||
    // !sixMonthChartData ||
    // !oneYearChartData ||
    // !allChartData
  ) {
    return (
      <div className='spinner'>
        {" "}
        <Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
      </div>
    );
  } else
    return (
      <>
        <LiveCurrency />

        <Chart
          width={"100vw"}
          height={"85vh"}
          chartType='AreaChart'
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            series: {
              0: { color: "#3452f8" },
            },
            legendTextStyle: { color: "#FFF" },
            chartArea: { width: "80%", height: "70%" },
            backgroundColor: "#000437",
            areaOpacity: 0.2,
            explorer: {
              axis: "horizontal",
              keepInBounds: true,
              maxZoomIn: 1.0,
              maxZoomOut: 1.0,
            },
            hAxis: {
              title: "Time",
              textStyle: { color: "#FFF" },
              titleTextStyle: {
                color: "#FFF",
              },
              gridlines: {
                color: "transparent",
              },
            },
            vAxis: {
              title: "Currency Ratio",
              titleTextStyle: {
                color: "#FFF",
              },
              textStyle: { color: "#FFF" },
              gridlines: {
                color: "transparent",
              },
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />
        <div className='btns'>
          <button onClick={oneDayBtn} className='time-btn'>
            1D
          </button>

          <button onClick={oneWeekBtn} className='time-btn'>
            7D
          </button>

          <button onClick={oneMonthBtn} className='time-btn'>
            1M
          </button>

          <button onClick={sixMonthBtn} className='time-btn'>
            6M
          </button>

          <button onClick={oneYearBtn} className='time-btn'>
            1Y
          </button>

          <button onClick={allTimeBtn} className='time-btn'>
            ALL
          </button>
        </div>
      </>
    );
};

export default BarChart;
