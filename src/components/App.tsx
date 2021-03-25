import React, { useEffect, useState } from 'react';
import '../styles/App.css';

const api_key = process.env.REACT_APP_API_KEY;

type P = {
  year: number;
  value: number;
};

const App: React.FC = () => {
  const [populations, setPopulations] = useState<P[]>([]);

  useEffect(() => {
    fetch(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11',
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
        // console.log(data.result.data[0].data);
        setPopulations(data.result.data[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>api sample</h1>
      <div>
        {populations.map((population: P, index: number) => (
          <div key={index}>
            {console.log(population)}
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
