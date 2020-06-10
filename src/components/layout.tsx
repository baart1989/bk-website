import { Moon, Sun } from 'react-feather';
import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Footer from './footer';
import Helmet from 'react-helmet';
import Navbar from './navigation';
import SEO from './seo';
import { ThemeQuery } from './__generated__/ThemeQuery';

export type Theme = { name: string; label: string; icon: JSX.Element };
type LayoutProps = {
  children: any;
};
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const query = useStaticQuery<ThemeQuery>(graphql`
    query ThemeQuery {
      site {
        siteMetadata {
          icon
          switchTheme
          darkmode
        }
      }
    }
  `);

  const themes: Theme[] = [
    {
      name: 'theme-light',
      label: 'Light Theme',
      icon: <Sun />,
    },
    {
      name: 'theme-dark',
      label: 'Dark Theme',
      icon: <Moon />,
    },
  ];

  const isDarkTheme = query.site.siteMetadata.darkmode;

  const [theme, changeTheme] = useState(isDarkTheme ? 1 : 0);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const t = Number(localStorage.getItem('theme'));
      changeTheme(t);
    }
  }, []);

  const switchTheme = () => {
    const next = theme !== themes.length - 1 ? theme + 1 : 0;
    changeTheme(next);
    localStorage.setItem('theme', `${next}`);
  };

  return (
    <React.Fragment>
      <Head data={query} />
      <SEO />
      <div className={`wrapper ${themes[theme].name}`}>
        <div className="text-color-default bg-bg">
          <Navbar
            currentTheme={theme}
            switchTheme={switchTheme}
            themes={themes}
            allowThemeSwitch={query.site.siteMetadata.switchTheme}
          />
          {children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

const Head = ({ data }) => {
  return (
    <Helmet>
      <link rel="icon" href={data.site.siteMetadata.icon} type="image/png" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:500,800&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default Layout;
