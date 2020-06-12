import { BodyClass, RootClass } from 'react-frontend-common';
import { Moon, Sun } from 'react-feather';
import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Footer from './footer';
import Helmet from 'react-helmet';
import Navbar from './navigation';
import SEO from './seo';
import { ThemeQuery } from './__generated__/ThemeQuery';
import { ToastContainer } from 'react-toastify';

export type Theme = { name: ThemeType; label: string; icon: JSX.Element };
export type ThemeType = 'theme-light' | 'theme-dark';
type LayoutProps = {
  children: any;
};
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<ThemeQuery>(graphql`
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

  const themes: { [id: string]: Theme } = {
    'theme-light': {
      name: 'theme-light',
      label: 'Light Theme',
      icon: <Sun />,
    },
    'theme-dark': {
      name: 'theme-dark',
      label: 'Dark Theme',
      icon: <Moon />,
    },
  };

  const [currentTheme, changeTheme] = useState<ThemeType>(
    siteMetadata.darkmode ? 'theme-dark' : 'theme-light',
  );

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const t = localStorage.getItem('theme') as ThemeType;
      changeTheme(t);
    }
  }, []);

  const switchTheme = () => {
    const next = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
    changeTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <>
      <RootClass add="antialiased" />
      <BodyClass add="bg-bgalt text-color-default" />
      {currentTheme === 'theme-dark' && <RootClass add="theme-dark" remove="theme-light" />}
      {currentTheme !== 'theme-dark' && <RootClass remove="theme-dark" add="theme-light" />}
      <Head siteIcon={siteMetadata.icon} />
      <SEO />
      <ToastContainer
        className="max-w-md w-full"
        bodyClassName="flex"
        toastClassName="bg-bg"
        closeButton={null}
      />
      <Navbar
        currentTheme={currentTheme}
        switchTheme={switchTheme}
        themes={themes}
        allowThemeSwitch={siteMetadata.switchTheme}
      />
      <div className="bg-bg">{children}</div>
      <Footer />
    </>
  );
};

const Head = ({ siteIcon }) => {
  return (
    <Helmet>
      <link rel="icon" href={siteIcon} type="image/png" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:500,800&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default Layout;
