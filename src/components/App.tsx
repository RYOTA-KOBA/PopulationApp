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
    series: series,
  };

  useEffect(() => {
    getPrefectures();
  }, []);

  return (
    <div className="App">
      <h1>api sample</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div>
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
      ))}
    </div>
  );
};

export default App;
