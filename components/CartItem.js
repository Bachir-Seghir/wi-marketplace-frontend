import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import QuantitySelector from './QuantitySelector';
import {gql, useMutation } from '@apollo/client'
import RemoveFromCart from './RemoveFromCart';
import formatMoney from '../lib/formatMoney'

const UPDATE_CARTE_ITEM = gql`
  mutation UPDATE_CARTE_ITEM($id: ID!, $quantity: Int!) {
    updateCartItem(id: $id, data: { quantity: $quantity }) {
      id
      quantity
    }
  }
`;

function CartItem({cartItem}) {
  const { product, quantity, user} = cartItem
  const [cartItemQuantity, setCartItemQuantity ] = useState(quantity) 
  const [updateCartItem, { data, loading, error }] = useMutation(
    UPDATE_CARTE_ITEM,
    {
      variables: {
        id: cartItem.id,
        quantity: cartItemQuantity,
      },
    }
  );
useEffect(() => {
  updateCartItem();
}, [cartItemQuantity]);

    return (
      <div className='cartItem' aria-disabled={loading} disabled={loading}>
        <div className='cartItem__left'>
          <span className='cartItem__check'>
            <input type='checkbox' />
          </span>
          <Link href='/'>
            <img className='cartItem__img' src='' alt='' />
          </Link>
        </div>
        <div className='cartItem__right'>
          <Link href='/'>
            <p className='cartItem__title'>{product.title}</p>
          </Link>
          <span className='cartItem__price'>{formatMoney(product.price)}</span>
          <div className='cartItem__actions'>
            <QuantitySelector
              stock={product.stock}
              cartItemQuantity={cartItemQuantity}
              setCartItemQuantity={setCartItemQuantity}
            />
            <RemoveFromCart id={cartItem.id} />
          </div>
        </div>
      </div>
    );
}

export default CartItem
