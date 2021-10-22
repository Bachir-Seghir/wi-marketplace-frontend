import React, { useContext } from 'react';
import classNames from 'classnames';
import Link from 'next/link'
import {useRouter} from 'next/router'

import { LocalStateContext } from '../contexts/sidebarState';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const SubList = () => {
  const router = useRouter();


  const { setSideBarActive, setTogglList, togglList, selectedDpt } =
    useContext(LocalStateContext);
  return (
    <div
      className={classNames('subList', {
        'is-active': togglList.active,
      })}>
      <div
        className='subList__return'
        onClick={() => {
          setTogglList((state) => ({
            ...state,
            active: false,
            sectionId: undefined,
            itemId: undefined,
          }));
        }}>
        <ArrowBackRoundedIcon color='action' />
        <span>Main Menu</span>
      </div>
      <ul className='subList__menu'>
        <h3 className='sidebar__section-header'>{selectedDpt.name}</h3>
        {selectedDpt?.categories?.map((category) => (
          <li className='list__branche' key={category.id}>
            <Link href={`/products/${selectedDpt.name}/${category.name}`
              }>
              <p onClick={() => setSideBarActive(false)}>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubList;
