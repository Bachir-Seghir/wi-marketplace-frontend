import React, { useContext } from 'react';
import { LocalStateContext } from '../contexts/sidebarState';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function List({ item, sectionId }) {
  const { setTogglList } = useContext(LocalStateContext);
  const { name, id } = item;
  const handleClick = () => {
    setTogglList((state) => ({
      ...state,
      active: true,
      sectionId,
      itemId: id,
    }));
  };

  return (
    <div className='list'>
      <ul className='list__tree'>
        <li
          className='list__branche'
          key={id} // Computers ID : data1-a
          onClick={handleClick}>
          <p>{name}</p>
          <ArrowForwardIosIcon />
        </li>
      </ul>
    </div>
  );
}

export default List;
