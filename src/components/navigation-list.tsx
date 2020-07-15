import { MoreVertical, ShoppingCart } from 'react-feather';
import {
  NavigationListQuery,
  NavigationListQuery_site_siteMetadata_navLinks,
} from './__generated__/NavigationListQuery';
import React, { useState } from 'react';
import { Theme, ThemeType } from './layout';
import { WatchClickOutside, slugify } from 'react-frontend-common';
import { getCurrentUser, isLoggedIn, logout } from '../utils/auth';
import { graphql, navigate, useStaticQuery } from 'gatsby';

import Auth from '@aws-amplify/auth';
import { Link } from './utils';
import { ThemeIcons } from './ui';
import { Transition } from 'react-tailwind-component';
import cns from 'classnames';

type NavigationListProps = {
  displayType: 'top' | 'bottom' | 'sidebar';
  className?: string;
  current?: string;
  liClassName?: string;
  switchTheme?: () => void;
  currentTheme?: ThemeType;
  themes?: { [id: string]: Theme };
};

const List: React.FC<NavigationListProps> = ({
  displayType,
  className = '',
  liClassName = '',
  current,
  currentTheme,
  switchTheme,
  themes = {},
}) => {
  const data = useStaticQuery<NavigationListQuery>(graphql`
    query NavigationListQuery {
      site {
        siteMetadata {
          navLinks {
            name
            url
            isDropdown
            requireAuth
            callbackFnc
            adminAccessOnly
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
  const loggedIn = isLoggedIn();
  const currentUser = getCurrentUser();
  const isAdmin = !!currentUser.isAdmin;

  const items = data.site.siteMetadata.navLinks;
  const callbacks = {
    ['logoutUser']: async () => {
      navigate('/');
      await Auth.signOut();
      logout();
    },
    ['switchTheme']: switchTheme,
  };

  const navigationLinks = items.reduce((acc, link) => {
    if (link.requireAuth && !loggedIn) {
      return acc;
    }

    if (link.requireAuth === false && loggedIn) {
      return acc;
    }

    if (link.adminAccessOnly && !isAdmin) {
      return acc;
    }

    if (link.callbackFnc) {
      link = { ...link, callbackFnc: callbacks[link.callbackFnc] };
    }

    acc.push(link);
    return acc;
  }, [] as NavigationListQuery_site_siteMetadata_navLinks[]);

  const list: JSX.Element[] = [];
  const dropdownLinks: NavigationListQuery_site_siteMetadata_navLinks[] = [];

  navigationLinks.forEach(link => {
    if (link.isDropdown) {
      dropdownLinks.push(link);
    }
    if (link.isDropdown && displayType === 'top') {
      return;
    }
    list.push(
      <ListItem
        key={`navigation-${displayType}-${slugify(link.name)}`}
        data={link}
        active={`/${current}` === link.url}
        liClassName={liClassName}
      />,
    );
  });

  if (displayType === 'top') {
    list.push(
      <li className="theme-switcher" key="cart">
        <Link className="cursor-pointer text-color-2 focus:text-primary" to="/cart/">
          <ShoppingCart />
        </Link>
      </li>,
    );

    list.push(
      <li className="theme-switcher" key="switch-t">
        <ThemeIcons
          className="text-color-2"
          themes={themes}
          currentTheme={currentTheme}
          switchTheme={switchTheme}
        />
      </li>,
    );

    list.push(
      <li className="theme-switcher" key="dropdown">
        <MoreDropdown navLinks={dropdownLinks} themes={themes} currentTheme={currentTheme} />
      </li>,
    );
  }

  return <ul className={className}>{list}</ul>;
};

const ListItem = ({ data, active, liClassName }) => {
  return (
    <li className={cns(liClassName, { active: active })}>
      <Link
        to={data.url}
        title={data.name}
        onClick={data.callbackFnc}
        className="link text-color-2 focus:text-primary"
      >
        <span>{data.name}</span>
      </Link>
    </li>
  );
};

type MoreDropdownProps = {
  navLinks: NavigationListQuery_site_siteMetadata_navLinks[];
  currentTheme?: ThemeType;
  themes?: { [id: string]: Theme };
};
const MoreDropdown: React.FC<MoreDropdownProps> = ({ navLinks }) => {
  const [isVisible, setVisible] = useState(false);
  const list: JSX.Element[] = [];
  const liClassName =
    'block px-4 py-2 text-sm leading-5 hover:bg-medium focus:outline-none focus:bg-medium transition duration-150 ease-in-out';

  const handleDropdownClick = (callback?: any) => {
    setVisible(false);
    callback && callback();
  };

  navLinks.forEach(link => {
    list.push(
      <Link
        onClick={() => handleDropdownClick(link.callbackFnc)}
        key={slugify(link.name)}
        to={link.url}
        title={link.name}
        className={liClassName}
      >
        {link.name}
      </Link>,
    );
  });

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
