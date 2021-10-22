import React from 'react'
import CartItem from './CartItem'
import { gql , useQuery } from '@apollo/client'
import DefaultBtn from './styled/DefaultBtn';
import Link from 'next/link';

const CART_ITEMS_QUERY = gql`
  query CART_ITEMS_QUERY($id: ID!) {
    allCartItems(where: { user: { id: $id } }) {
      id
      user {
        id
        name
      }
      quantity
      product {
        id
        title
        stock
        price
        discount
      }
    }
    
  }
`;

function Cart({query}) {
const { data, error, loading } = useQuery(CART_ITEMS_QUERY, {
  variables: {
    id: query.id
  }, 
  pollInterval: 500,
  
});

    return (
      <div className='cart'>
        <div className='cart__layout'>
          <div className='cart__shopping'>
            <header>
              <h2>Shopping Cart </h2>
            </header>
            <ul className='cart__items'>
              {data?.allCartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </ul>
            <div className="cart__subtotal">
              <h2>Subtotal ({} items)</h2>
            </div>

            {!query.id && (
              <div className='cart__redirect'>
                <div className='cart__redirect-left'>
                  <img
                    src='https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg'
                    alt='redirect'
                  />
                </div>
                <div className='cart__redirect-right'>
                  <h1>Your Cart is empty</h1>
                  <div>
                    <DefaultBtn small mr_1>
                      <Link href='/signin'>Sign in to your Account</Link>
                    </DefaultBtn>
                    <DefaultBtn transparent small>
                      <Link href='/signup'>Sign up Now</Link>
                    </DefaultBtn>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Cart
