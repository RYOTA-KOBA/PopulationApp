import React from 'react';
import { render } from '@testing-library/react';
import PrefCheckboxList from '../components/PrefCheckboxList';

describe('レンダリングテスト', () => {
  it('PrefCheckboxListがレンダリングされる', () => {
    render(
      <PrefCheckboxList
        prefectures={[]}
        handlecheck={jest.fn()}
        isSelected={[false, false]}
      />
    );
  });
  it('prefecturesに渡された都道府県のチェックボックスが表示される', () => {
    const { container } = render(
      <PrefCheckboxList
        prefectures={[
          { prefCode: 12, prefName: '千葉県' },
          { prefCode: 13, prefName: '東京都' },
          { prefCode: 14, prefName: '埼玉県' },
        ]}
        handlecheck={jest.fn()}
        isSelected={[false, false, false]}
      />
    );
    expect(container.getElementsByTagName('input').length).toEqual(3);
    expect(container.innerHTML).toMatch('千葉県');
    expect(container.innerHTML).toMatch('東京都');
    expect(container.innerHTML).toMatch('埼玉県');
  });
});
