import React, { useState, useEffect } from 'react';

function QuantitySelector({ stock, cartItemQuantity,
setCartItemQuantity}) {
  const [quantityEntry, setQuantityEntry] = useState(cartItemQuantity);
  const [selectLot, setSelectLot] = useState(false);

  useEffect(() => {
    setCartItemQuantity(quantityEntry);
  }, [quantityEntry]);

  useEffect(() => {
    setQuantityEntry(quantityEntry);
    quantityEntry < 10 && setSelectLot(false);
  }, [quantityEntry]);


  const handleSelect = (e) => {
    if (e.target.value === '10') {
      setSelectLot(true);
      setQuantityEntry(parseInt(e.target.value));
    }
    setQuantityEntry(parseInt(e.target.value));
  };

  


  return (
    <div className='quantitySelector__wrap'>
      <div className='quantitySelector'>
        {quantityEntry < 10 && (
          <select
            disabled={selectLot}
            name='quantity'
            id='quantity'
            value={quantityEntry}
            onChange={handleSelect}>
            {Array.from(
              { length: stock > 10 ? 9 : stock },
              (_, i) => i + 1
            ).map((i) => (
              <option key={i}>{i}</option>
            ))}
            {stock > 10 && <option value={10}>+10</option>}
          </select>
        )}
        {selectLot && quantityEntry >= 10 && (
          <input
            type='number'
            id='largeQuantity'
            defaultValue='10'
            onChange={(e) => setQuantityEntry(parseInt(e.target.value))}
            onClick={handleSelect}
            max={stock}
          />
        )}
        <div className='quantitySelector__quantity'>
          <p>Qt ordered: {cartItemQuantity}</p>
        </div>
      </div>
      <span>
        {quantityEntry < stock ? (
          'In Stock'
        ) : (
          <b>
            Only {stock} left in Stock ! <br />
            (more on the way)
          </b>
        )}
      </span>
    </div>
  );
}

export default QuantitySelector;
