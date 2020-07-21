import { Theme, ThemeType } from './layout';
import { graphql, useStaticQuery } from 'gatsby';

import { Link } from './utils';
import { NavigationListQuery } from './__generated__/NavigationListQuery';
import React from 'react';
import { ThemeIcons } from './ui';
import cns from 'classnames';
import { slugify } from 'react-frontend-common';

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
          }
          darkmode
          switchTheme
        }
      }
    }
  `);

  const navigationLinks = data.site.siteMetadata.navLinks;
  const list: JSX.Element[] = [];

  navigationLinks.forEach(link => {
    list.push(
      <ListItem
        key={`navigation-${displayType}-${slugify(link.name)}`}
        data={link}
        active={`/${current}` === link.url}
        liClassName={liClassName}
      />,
    );
  });

  if (displayType === 'top' && data.site.siteMetadata.switchTheme) {
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
        className="link text-white"
      >
        <span>{data.name}</span>
      </Link>
    </li>
  );
};

export default List;
