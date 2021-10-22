import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
function SocialMedia() {
  return (
    <div className='socialMedia'>
      <p>Share</p>
      <a href=''>
        <MailOutlineIcon />
      </a>
      <a href=''>
        <FacebookIcon color='primary' />
      </a>
      <a href=''>
        <TwitterIcon id='twitter' />
      </a>
    </div>
  );
}

export default SocialMedia;
