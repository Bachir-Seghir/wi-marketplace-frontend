import React, { useContext } from 'react';
import classNames from 'classnames';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocalStateContext } from '../contexts/sidebarState';



import Accountbadge from './Accountbadge';
import List from './List';
import SubList from './SubList';







const ListSeparator = () => <div className='sidebar__menu-separator'></div>;


function Sidebar() {

const { sections, sideBarActive, setSideBarActive, togglList } =
  useContext(LocalStateContext);

  
  
  
  return (
    <div
      className={classNames('sidebar', {
        'is-active': sideBarActive,
      })}>
      <div
        className={classNames('sidebar__bg', {
          'is-active': sideBarActive,
        })}
        onClick={() => setSideBarActive(false)}></div>

      <span
        className={classNames('sidebar__close', {
          'is-active': sideBarActive,
        })}
        onClick={() => setSideBarActive(false)}>
        <CloseRoundedIcon fontSize='large' />
      </span>
      <div
        className={classNames('sidebar__menu', {
          'is-active': sideBarActive,
        })}>
        <div className='sidebar__menu-header'>
          <Accountbadge />
        </div>
        <div
          className={classNames('sidebar__menu-content', {
            'is-active': togglList.active,
          })}>
          {sections && sections.map((section) => (
            <div key={section.id}>
              <h3 className='sidebar__section-header' key={section.id}>
                {section.name}
              </h3>
              {section.items.map((item) => (
                <List
                  key={item.id}
                  item={item}
                  sectionId={section.id}
                />
              ))} 
              
              <ListSeparator />
            </div>
          ))}
        </div>
        <SubList />
      </div>
    </div>
  );
}

export default Sidebar;
