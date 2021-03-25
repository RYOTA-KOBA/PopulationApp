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
        data.result.data[0].data.forEach((i: number) => {
          tmp.push(data.result.data[0].data[i].value);
        });
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

  const handleClickPref = (prefCode: number) => {
    getPopulationData(prefCode);
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
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
      },
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
      },
    ],
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

  // useEffect(() => {
  //   getPrefectures();
  // }, []);

  return (
    <div className="App">
      <h1 className="title">都道府県別人口推移</h1>
      <p className="pref-select-text">都道府県を選択</p>
      <div className="pref-checkbox-wrraper">
        <div className="pref-checkbox">
          <input type="checkbox" />
          千葉県
        </div>
        <div className="pref-checkbox">
          <input type="checkbox" />
          東京都
        </div>
        <div className="pref-checkbox">
          <input type="checkbox" />
          埼玉県
        </div>
        <div className="pref-checkbox">
          <input type="checkbox" />
          神奈川県
        </div>
        <div className="pref-checkbox">
          <input type="checkbox" />
          茨城県
        </div>
      </div>
      <div className="charts-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      {/* <div>
        {populations.map((population: P, index: number) => (
          <div key={index}>
            <p>
              {population.year} : {population.value}
            </p>
          </div>
        ))}
      </div>
      {console.log(prefectures)}
      {prefectures.map((prefecture, index) => (
        <div key={index}>
          <input
            type="checkbox"
            onChange={() => handleClickPref(prefecture.prefCode)}
          />
          {prefecture.prefName}
        </div>
      ))} */}
    </div>
  );
};

export default App;
