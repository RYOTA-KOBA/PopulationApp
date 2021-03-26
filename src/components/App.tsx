import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const api_key = process.env.REACT_APP_API_KEY;

type P = {
  year: number;
  value: number;
};

type PF = {
  prefCode: number;
  prefName: string;
};
type S = {
  name: string;
  data: number[];
};

const App: React.FC = () => {
  const [populations, setPopulations] = useState<P[]>([]);
  const [prefectures, setPrefectures] = useState<PF[]>([]);
  const [series, setSeries] = useState<S[]>([]);

  const getPopulationData = (prefCode: number) => {
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': `${api_key}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const tmp: number[] = [];
        const dataLength: number = data.result.data[0].data.length;
        for (let i = 0; i < dataLength; i++) {
          tmp.push(data.result.data[0].data[i].value);
        }
        const res_series = {
          name: prefectures[prefCode - 1].prefName,
          data: tmp,
        };
        setSeries([...series, res_series]);
        // setPopulations();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPrefectures = () => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      method: 'GET',
      headers: {
        'X-API-KEY': `${api_key}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPrefectures(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    title: {
      text: '総人口推移',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5,
              },
              title: {
                text: '人口(人)',
              },
            },
            xAxis: {
              title: {
                text: '西暦(年)',
              },
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    getPrefectures();
  }, []);

  return (
    <div className="App">
      <h1 className="title">都道府県別人口推移</h1>
      <p className="pref-select-text">都道府県を選択</p>
      <div className="pref-checkbox-wrraper">
        {prefectures.map((prefecture, index) => (
          <div key={index} className="pref-checkbox">
            <input
              type="checkbox"
              onChange={() => getPopulationData(prefecture.prefCode)}
            />
            {prefecture.prefName}
          </div>
        ))}
      </div>
      <div className="charts-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default App;
