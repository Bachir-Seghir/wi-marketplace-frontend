import React, { useState } from 'react';
import classNames from 'classnames';

function ProductOptions({ options }) {
  return (
    <div className='options'>
      {options.map((option) => (
        <OptionSelector key={option.id} option={option} />
      ))}
    </div>
  );
}

export const OptionSelector = ({ option }) => {
  const { title, values, type } = option;
  const [selectedItem, setSelectedItem] = useState(option.values[0].name);

  const [hoveredItem, setHoveredItem] = useState('');
  const [hovering, setHovering] = useState(false);

  const handleHoverIn = (item) => {
    setHoveredItem(item);
    setHovering(true);
  };
  const handleHoverOut = () => {
    setHovering(false);
    setHoveredItem('');
  };
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='option'>
      <p className='option__title'>
        {title}:<strong>{hovering ? hoveredItem : selectedItem}</strong>
      </p>
      <ul className='option__items'>
        {values.map((item) => {
          if (type === 'text') {
            return (
              <li
                key={item.value}
                className={classNames('option__item', {
                  'is-active': selectedItem === item.name,
                })}
                onMouseEnter={() => handleHoverIn(item.name)}
                onMouseLeave={handleHoverOut}
                onClick={() => handleSelect(item.name)}>
                <button>{item.name}</button>
              </li>
            );
          } else if (type === 'image') {
            return (
              <li
                key={item.value}
                className={classNames('option__item', {
                  'is-active': selectedItem === item.name,
                })}
                onMouseEnter={() => handleHoverIn(item.name)}
                onMouseLeave={handleHoverOut}
                onClick={() => handleSelect(item.name)}>
                <img src={item.value} alt='' />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ProductOptions;
