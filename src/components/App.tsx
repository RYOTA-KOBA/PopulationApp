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

const App: React.FC = () => {
  const [populations, setPopulations] = useState<P[]>([]);
  const [prefectures, setPrefectures] = useState<PF[]>([]);

  const getPopulationData = () => {
    fetch(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=12',
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
        setPopulations(data.result.data[0].data);
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
  };

  useEffect(() => {
    getPopulationData();
    getPrefectures();
  }, []);

  return (
    <div className="App">
      <h1>api sample</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default App;
