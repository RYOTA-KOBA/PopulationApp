import React, { useEffect } from 'react';
import '../styles/App.css';

const api_key = process.env.REACT_APP_API_KEY;

const App: React.FC = () => {
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
        const result = res.json();
        result.then((data) => {
          console.log(data.result.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>api sample</h1>
    </div>
  );
};

export default App;
