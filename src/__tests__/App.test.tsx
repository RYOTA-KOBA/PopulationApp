import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

describe('レンダリングテスト', () => {
  it('Appコンポーネントがレンダリングされる', () => {
    render(<App />);
  });
  it('Titleである「都道府県別人口推移」が表示される', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('都道府県別人口推移');
  });
  it('チェックボックスの案内をする文字、「都道府県を選択」が表示される', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('都道府県を選択');
  });
  it('HighchartsReactコンポーネントがレンダリングされる', () => {
    const options = {};
    render(<HighchartsReact highcharts={Highcharts} options={options} />);
  });
});
