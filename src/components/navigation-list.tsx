import { Link, graphql, navigate, useStaticQuery } from 'gatsby';
import { Theme, ThemeType } from './layout';
import { isLoggedIn, logout } from '../utils/auth';

import Auth from '@aws-amplify/auth';
import { NavigationListQuery } from './__generated__/NavigationListQuery';
import React from 'react';
import { ShoppingCart } from 'react-feather';
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
  withThemeSwitch = true,
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
  if (isLoggedIn()) {
    list.push(
      <li key="log-out" className={liClassName}>
        <a
          title="WYLOGUJ"
          className="link cursor-pointer text-color-2 focus:text-primary"
          onClick={async () => {
            navigate('/');
            await Auth.signOut();
            logout();
          }}
        >
          <span>WYLOGUJ</span>
        </a>
      </li>,
    );
  } else {
    list.push(
      <li className={liClassName} key="log-in">
        <Link
          to="/app/login/"
          title="ZALOGUJ"
          className="link cursor-pointer text-color-2 focus:text-primary"
        >
          <span>ZALOGUJ</span>
        </Link>
      </li>,
    );
  }
  const shopLinks = [...data.site.siteMetadata.sourcePages.shop, 'shop'];
  const displayCartIcon = shopLinks.indexOf(current) !== -1;
  if (displayCartIcon) {
    list.push(
      <li className="theme-switcher" key="cart">
        <Link className="cursor-pointer text-color-2 focus:text-primary" to="/cart/">
          <ShoppingCart />
        </Link>
      </li>,
    );
  }

  if (withThemeSwitch && !displayCartIcon) {
    const themeButtons = Object.keys(themes).map(key => {
      const theme = themes[key];
      return (
        <button
          className={cns(
            'text-color-2 transition-transform duration-200 transform top-0 left-0',
            {
              'scale-100': key === currentTheme,
            },
            {
              'scale-0 absolute': key !== currentTheme,
            },
          )}
          key={theme.name}
          onClick={switchTheme}
        >
          {theme.icon}
        </button>
      );
    });

    list.push(
      <li className="theme-switcher" key={name}>
        {themeButtons}
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

export default List;
