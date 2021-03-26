import React from 'react';
import '../styles/PrefCheckbox.css';

type PF = {
  prefCode: number;
  prefName: string;
};
type Props = {
  prefectures: PF[];
  handlecheck: (value: number) => void;
  isSelected: boolean[];
};

const PrefCheckboxList: React.FC<Props> = (props) => {
  return (
    <div className="pref-checkbox-wrraper">
      {props.prefectures.map((prefecture: PF, index: number) => (
        <div key={index} className="pref-checkbox">
          <input
            type="checkbox"
            onChange={() => props.handlecheck(prefecture.prefCode)}
            checked={props.isSelected[prefecture.prefCode - 1]}
            id={`checkbox_${index}`}
          />
          <label htmlFor={`checkbox_${index}`}>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  );
};

export default PrefCheckboxList;
