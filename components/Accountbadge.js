import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Accountbadge() {
  return (
    <div className='account__badge'>
      <AccountCircleIcon className='account__badge-icon' />
      <span className='account__badge-name'>
        <b>Hello, Bachir</b>
      </span>
    </div>
  );
}

export default Accountbadge;
