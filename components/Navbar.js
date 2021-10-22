import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalStateContext } from '../contexts/sidebarState';

function Navbar() {
  const { setSideBarActive } = useContext(LocalStateContext);
  return (
    <div className='navigbar'>
      <div className='nav-left' onClick={() =>  setSideBarActive(true)}>
        <MenuIcon className='navigbar__menu-icon' />
        <span>All</span>
      </div>
      <ul className='navigbar__menu'>
        <li>Today's Deals</li>
        <li>Sell</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Buy Again</li>
      </ul>
      <div className='nav-right'>
        <a href='/'>Amazon's response to COVID-19</a>
      </div>
    </div>
  );
}

export default Navbar;
