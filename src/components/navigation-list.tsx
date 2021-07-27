import { Theme, ThemeType } from './layout';
import { graphql, useStaticQuery } from 'gatsby';

import { NavigationListQuery } from './__generated__/NavigationListQuery';
import React from 'react';
import ScrollIntoView from 'react-scroll-into-view';
import { ThemeIcons } from './ui';
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
            id
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
    <ScrollIntoView smooth={true} selector={data.id}>
      <li className={cns(liClassName, { active: active })}>
        <div>
          <span>{data.name}</span>
        </div>
      </li>
    </ScrollIntoView>
  );
};

function slugify(string: string) {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default List;
