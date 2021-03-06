import { Moon, Sun } from 'react-feather';
import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import CookieBox from './cookie';
import Footer from './footer';
import Helmet from 'react-helmet';
import Navbar from './navigation';
import SEO from './seo';
import { ThemeQuery } from './__generated__/ThemeQuery';

export type Theme = { name: ThemeType; label: string; icon: JSX.Element };
export type ThemeType = 'theme-light' | 'theme-dark';

export const Layout = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<ThemeQuery>(graphql`
    query ThemeQuery {
      site {
        siteMetadata {
          icon
          switchTheme
          darkmode
          cookiePolicy
        }
      }
    }
  `);

  const themes: { [id: string]: Theme } = {
    'theme-light': {
      name: 'theme-light',
      label: 'JASNY MOTYW',
      icon: <Sun />,
    },
    'theme-dark': {
      name: 'theme-dark',
      label: 'CIEMNY MOTYW',
      icon: <Moon />,
    },
  };

  const cookiePolicyEnabled = siteMetadata.cookiePolicy;

  const [cookieShown, setCookieShown] = useState(false);
  const [currentTheme, changeTheme] = useState<ThemeType>(
    siteMetadata.darkmode ? 'theme-dark' : 'theme-light',
  );

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const t = localStorage.getItem('theme') as ThemeType;
      changeTheme(t);
    }
    if (localStorage.getItem('cookie-accept')) {
      setCookieShown(true);
    }
  }, []);

  const switchTheme = () => {
    document.documentElement.classList.remove(...Object.keys(themes));
    const next = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
    document.documentElement.classList.add(next);
    changeTheme(next);
    localStorage.setItem('theme', next);
  };

  const onCookieAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem('cookie-accept', '1');
    setCookieShown(true);
  };

  return (
    <>
      <Head siteIcon={siteMetadata.icon} />
      <SEO />
      <Navbar currentTheme={currentTheme} switchTheme={switchTheme} themes={themes} />
      <div className="bg-bg">{children}</div>
      <Footer />
      {!!siteMetadata.cookiePolicy && !cookieShown && (
        <CookieBox text={siteMetadata.cookiePolicy} onChange={onCookieAccept} />
      )}
    </>
  );
};

const Head = ({ siteIcon }) => {
  return (
    <Helmet>
      <link rel="icon" href={siteIcon} type="image/png" />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:500,800&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default Layout;
