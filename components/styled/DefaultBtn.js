import React from 'react';
import classNames from 'classnames';
function DefaultBtn({ children, transparent,blue, small, mr_1, type , onClick, disabled}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={classNames('defaultBtn', {
        transparent: transparent,
        small: small,
        mr_1: mr_1,
        blue: blue,
      })}>
      {children}
    </button>
  );
}

export default DefaultBtn;
