import { Link, graphql, navigate, useStaticQuery } from 'gatsby';
import { MoreVertical, ShoppingCart } from 'react-feather';
import React, { useRef, useState } from 'react';
import { Theme, ThemeType } from './layout';
import { isLoggedIn, logout } from '../utils/auth';

import Auth from '@aws-amplify/auth';
import { NavigationListQuery } from './__generated__/NavigationListQuery';
import { Transition } from 'react-tailwind-component';
import { WatchClickOutside } from 'react-frontend-common';
import cns from 'classnames';

type NavigationListProps = {
  name?: string;
  className?: string;
  liClassName?: string;
  current?: string;
  withThemeSwitch?: boolean;
  switchTheme?: () => void;
  currentTheme?: ThemeType;
  themes?: { [id: string]: Theme };
};
const List: React.FC<NavigationListProps> = ({
  name,
  className = '',
  liClassName = '',
  current,
  withThemeSwitch: isTopNavigation = true,
  currentTheme,
  switchTheme,
  themes,
}) => {
  const data = useStaticQuery<NavigationListQuery>(graphql`
    query NavigationListQuery {
      site {
        siteMetadata {
          navLinks {
            name
            url
          }
          sourcePages {
            shop
          }
          darkmode
          switchTheme
        }
      }
    }
  `);
  const items = data.site.siteMetadata.navLinks;
  const list = items.map((e, i) => (
    <ListItem
      key={`navigation-${name}-${i}`}
      data={e}
      active={`/${current}` === e.url}
      liClassName={liClassName}
    />
  ));

  if (isTopNavigation) {
    list.push(
      <li className="theme-switcher" key="cart">
        <Link className="cursor-pointer text-color-2 focus:text-primary" to="/cart/">
          <ShoppingCart />
        </Link>
      </li>,
    );

    list.push(
      <li className="theme-switcher" key="dropdown">
        <MoreDropdown themes={themes} switchTheme={switchTheme} currentTheme={currentTheme} />
      </li>,
    );
  }

  return <ul className={className}>{list}</ul>;
};

const ListItem = ({ data, active, liClassName }) => {
  return (
    <li className={cns(liClassName, { active: active })}>
      <Link to={data.url} title={data.name} className="link text-color-2 focus:text-primary">
        <span>{data.name}</span>
      </Link>
    </li>
  );
};

const MoreDropdown = ({ themes, switchTheme, currentTheme }) => {
  const [isVisible, setVisible] = useState(false);
  const loggedIn = isLoggedIn();
  const liClassName =
    'block px-4 py-2 text-sm leading-5 hover:bg-medium focus:outline-none focus:bg-medium transition duration-150 ease-in-out';

  const list: JSX.Element[] = [];

  if (loggedIn) {
    list.push(
      <Link
        onClick={() => setVisible(false)}
        key="home"
        to="/app/home/"
        title="PANEL UZYTKOWNIKA"
        className={liClassName}
      >
        PANEL UZYTKOWNIKA
      </Link>,
    );
  }

  const handleDropdownClick = callback => {
    setVisible(false);
    callback();
  };

  const themeButtons = Object.keys(themes).map(key => {
    if (currentTheme === key) {
      return;
    }
    const theme = themes[key];
    return (
      <a className={liClassName} key={theme.name} onClick={() => handleDropdownClick(switchTheme)}>
        ZMIEŃ NA {theme.label}
      </a>
    );
  });

  list.push(...themeButtons);

  if (loggedIn) {
    list.push(
      <a
        key="log-out"
        title="WYLOGUJ"
        className={liClassName}
        onClick={() => {
          const callback = async () => {
            navigate('/');
            await Auth.signOut();
            logout();
          };
          handleDropdownClick(callback);
        }}
      >
        WYLOGUJ
      </a>,
    );
  } else {
    list.push(
      <Link
        key="log-in"
        onClick={() => setVisible(false)}
        to="/app/login/"
        title="ZALOGUJ"
        className={liClassName}
      >
        ZALOGUJ
      </Link>,
    );
  }

  return (
    <>
      <button
        className="cursor-pointer text-color-2 focus:text-primary focus:outline-none"
        type="button"
        onClick={() => setVisible(!isVisible)}
      >
        <MoreVertical />
      </button>
      <WatchClickOutside onClickOutside={() => setVisible(false)}>
        <Transition
          show={isVisible}
          appear={isVisible}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg z-40">
            <div className="py-1 rounded-md bg-medium-light shadow-xs">{list}</div>
          </div>
        </Transition>
      </WatchClickOutside>
    </>
  );
};

export default List;
