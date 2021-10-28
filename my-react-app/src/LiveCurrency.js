import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import "./BarChart.css";
const LiveCurrency = () => {
  const params = useParams();
  const symbol = params.symbol;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [ratio, setRatio] = useState(0);
  const [ratioClass, setRatioClass] = useState("defaultColor");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://api.currencyapi.io/markets?token=vDb4I53QBWVWCwm5eQ0ZFCfDPoLVI7jH&symbol=${symbol}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const data = JSON.parse(result);
          let avg = ((data.a + data.b) / 2).toFixed(5);

        
          if (avg > localStorage.avg) {
        
            setRatioClass("upColor");
          } else if (avg < localStorage.avg) {
       
            setRatioClass("downColor");
          } else {
       
            setRatioClass("defaultColor");
          }
          localStorage.setItem("avg", avg);
          setRatio(avg);
        });

    }, 2000);
  }, []);
  if (ratio === 0) {
    return <div>loading</div>;
  } else
    return (
      <div className='live-currency'>
        <h2>
          Live Currency Ratio: 1{symbol.slice(0, 3)} ={" "}
          <span className={ratioClass}>{ratio}</span>
          {symbol.slice(3, 6)}
        </h2>
      </div>
    );
};

export default LiveCurrency;
