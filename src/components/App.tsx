import React, { useEffect, useState } from 'react';
import '../styles/App.css';

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

  useEffect(() => {
    getPopulationData();
    getPrefectures();
  }, []);

  return (
    <div className="App">
      <h1>api sample</h1>
      <div>
        {prefectures.map((prefecture: PF, index: number) => (
          <div key={index}>
            <p>
              {prefecture.prefCode} : {prefecture.prefName}
            </p>
          </div>
        ))}
      </div>
      <div>
        {populations.map((population: P, index: number) => (
          <div key={index}>
            <p>
              {population.year} : {population.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
