import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { TAppHeaderUIProps } from './type';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import clsx from 'clsx';
import styles from './app-header.module.css';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={clsx(styles.menu, 'p-4')}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' className={styles.link}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={clsx(
                  'text',
                  'text_type_main-default',
                  'ml-2',
                  'mr-10',
                  { text_color_inactive: !isActive }
                )}
              >
                Конструктор
              </p>
            </>
          )}
        </NavLink>

        <NavLink to='/feed' className={styles.link}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={clsx('text', 'text_type_main-default', 'ml-2', {
                  text_color_inactive: !isActive
                })}
              >
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </div>

      <NavLink to='/' className={styles.logo}>
        <Logo className='' />
      </NavLink>

      <NavLink
        to='/profile'
        className={clsx(styles.link, styles.link_position_last)}
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p
              className={clsx('text', 'text_type_main-default', 'ml-2', {
                text_color_inactive: !isActive
              })}
            >
              {userName || 'Личный кабинет'}
            </p>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
