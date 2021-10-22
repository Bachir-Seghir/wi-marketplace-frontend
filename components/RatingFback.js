import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material';

function RatingFback({ rates, status }) {
  useEffect(() => {
    setValue(rates);
  }, [rates]);

  const [value, setValue] = useState(rates);
  if (status === 'readOnly')
    return (
      <div className='rating'>
        <Rating name='read-only' value={value} precision={0.5} readOnly />
      </div>
    );

  return (
    <div className='rating'>
      <Rating
        name='simple-controlled'
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default RatingFback;
