import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from './Navbar';
import DeliveryLocation from './DeliveryLocation';
import logo from '../public/amazon_logo.svg';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useUser } from './User'; 
import DefaultBtn from './styled/DefaultBtn'
import SignOut from './SignOut';

function Header() {
  const me = useUser()
  const router = useRouter()
  const [openPopover, setOpenPopover] = useState(false);
  useEffect(() => {
    openPopover &&
      router.events.on('routeChangeStart', () => setOpenPopover(false));
  }, [openPopover, router.events]);
  
  return (
    <>
      <div className='header'>
        <div className='header__belt'>
          <div className='header__left'>
            <Link href='/'>
              <a className='header__logo'>
                <img src={logo} alt='logo' />
              </a>
            </Link>

            <div className='header__location'>{me && <DeliveryLocation />}</div>
          </div>
          <div className='header__fill'>
            <form className='header__search'>
              <select
                name='search-category'
                id='search-category'
                className='header__search-select'>
                <option>All Departements</option>
                <option>Books</option>
                <option>Cars</option>
                <option>Carsssssssssssssssssssssss</option>
              </select>
              <input
                id='header__search-input'
                type='text'
                className='header__search-input'
              />
              <button type='submit' className='header__search-btn'>
                <SearchIcon style={{ fontSize: 30 }} />
              </button>
            </form>
          </div>
          <div className='header__nav'>
            <div className='header__option header__lang'>
              <LanguageIcon fontSize='small' />
            </div>
            <div
              className='header__option header__account'
              onMouseEnter={() => setOpenPopover(true)}>
              <Link passHref href={me ? '/account' : '/signin'}>
                <a>
                  <p>Hello {me ? me.name : 'Sign in'}</p>
                  <h4>
                    Account & Lists
                    <ArrowDropDownIcon fontSize='small' />
                  </h4>
                </a>
              </Link>
              <div
                className={classNames('header__popover', {
                  active: openPopover,
                })}>
                <div
                  className={classNames('pop__wrap', {
                    active: openPopover,
                  })}
                  onMouseEnter={() => setOpenPopover(false)}></div>

                <div className='pop__content'>
                  <div className='pop__section'>
                    <h2>Your Lists</h2>
                    <ul>
                      <Link href='/acount'>
                        <li>
                          <h4>Create a List</h4>
                        </li>
                      </Link>
                      <Link href='/orders'>
                        <li>
                          <h4>Find a List or Registery</h4>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div className='pop__section'>
                    <h2>Your Account</h2>
                    <ul>
                      <Link href='/acount'>
                        <li>
                          <h4>Account</h4>
                        </li>
                      </Link>
                      <Link href='/orders'>
                        <li>
                          <h4>Orders</h4>
                        </li>
                      </Link>

                      <li>
                        {me ? (
                          <SignOut />
                        ) : (
                          <DefaultBtn
                            onClick={() =>
                              router.push({ pathname: '/signin' })
                            }>
                            Sign In
                          </DefaultBtn>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='header__option'>
              <p>Returns</p>
              <h4>& Orders</h4>
            </div>

            <div className='header__option'>
              <Link href={me ? `/cart/${me.id}` : '/cart'}>
                <div className='cartBadge'>
                  <ShoppingCartOutlinedIcon fontSize='large' />
                  <span className='cartBadge__count'>
                    {me?.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  </span>
                  <h3>Cart</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default Header;
