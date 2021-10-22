import React from 'react';
import classNames from 'classnames';
import formatMoney from '../lib/formatMoney';

function Pricing({ fullMode, pricing, stock }) {
  if (stock > 0)
    return (
      <div
        className={classNames('pricing', {
          full: fullMode,
        })}>
        {pricing.discount > 0 && (
          <h4 className='pricing__oldPrice'>
            {fullMode && <h4>Original Price:</h4>}
            <span>{formatMoney(pricing.price)}</span>
          </h4>
        )}
        <div className='pricing__price'>
          {fullMode && <h4>Price :</h4>}
          <h2>
            {pricing.discount > 0
              ? formatMoney(pricing.price - (pricing.price * pricing.discount) / 100)
              : formatMoney(pricing.price)}
          </h2>
          <div id='shipping' className='pricing__shipping'>
            {fullMode && <span>+</span>}
            <h2>{pricing.shipping}</h2>
            <p>Shipping to Algeria </p>
          </div>
        </div>

        {fullMode && pricing.discount > 0 && (
          <div className='pricing__saves'>
            <h4>You Save : </h4>
            <span>
               {(pricing.price * pricing.discount) / 100} ({pricing.discount}
              %)
            </span>
          </div>
        )}
      </div>
    );
  return <p className='pricing__unavailable'>Currently unavailable</p>;
}

export default Pricing;
