import React from 'react';
import Pricing from './Pricing';
import RatingFback from './RatingFback';
import Link from 'next/link';
import { useRouter } from 'next/router'
import AddToCart from './AddToCart';
import imgsrc from '../public/AC_SX466_.jpg'

function Productcard({ product }) {
  return (
    <div className='productCard'>
      <div className='productCard__wrap'>
        <Link href={`/product/${product.id}`}>
          <a className='productCard__image'>
            <img src={imgsrc} alt="" />
          </a>
        </Link>
        <div className='productCard__details'>
          <p className='productCard__title'>{product.title}</p>
          <Link href='/'>
            <p className='productCard__owner'>by {product.seller.name}</p>
          </Link>

          <RatingFback rates={4.5} status={'readOnly'} />

          <Pricing
            fullMode={false}
            stock={product.stock}
            pricing={{ price: product.price, discount: product.discount }}
          />
          <AddToCart small productID={product.id} />
        </div>
      </div>
    </div>
  );
}

export default Productcard;
