import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PrefCheckboxList from './PrefCheckboxList';

let api_key = process.env.REACT_APP_API_KEY;
if (process.env.X_API_KEY === 'production') {
  api_key = process.env.X_API_KEY;
}

type PF = {
  prefCode: number;
  prefName: string;
};
type S = {
  name: string;
  data: number[];
};

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<PF[]>([]);
  const [series, setSeries] = useState<S[]>([]);
  // isSelectedは各都道府県がチェックされているかどうかを格納する配列
  const [isSelected, setIsSelected] = useState<boolean[]>(
    Array(47).fill(false)
  );

  // handlecheckはcheckされたらonChangeによって動作する関数。
  const handlecheck = (prefCode: number) => {
    const isSelected_cp = isSelected.slice();
    isSelected_cp[prefCode - 1] = !isSelected_cp[prefCode - 1];
    // 選択された都道府県にチェックがつけられているのかの判定
    if (isSelected[prefCode - 1]) {
      // チェックありの場合はseriesから該当のデータを削除する
      const series_cp = series.slice();
      for (let i = 0; i < series_cp.length; i++) {
        if (series_cp[i].name === prefectures[prefCode - 1].prefName) {
          series_cp.splice(i, 1);
        }
      }
      setIsSelected(isSelected_cp);
      setSeries(series_cp);
    } else {
      // チェックなしの倍はデータを取得し配列seriesにpushする
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
          const populationArray: number[] = [];
          const dataLength: number = data.result.data[0].data.length;
          for (let i = 0; i < dataLength; i++) {
            populationArray.push(data.result.data[0].data[i].value);
          }
          const resOfSeries = {
            name: prefectures[prefCode - 1].prefName,
            data: populationArray,
          };
          setSeries([...series, resOfSeries]);
          setIsSelected(isSelected_cp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        pointStart: 1960,
        pointInterval: 5,
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
      <PrefCheckboxList
        prefectures={prefectures}
        handlecheck={handlecheck}
        isSelected={isSelected}
      />
      <div className="charts-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default App;
