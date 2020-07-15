import { Link, graphql, useStaticQuery } from 'gatsby';
import { Menu, PlusCircle, ShoppingCart } from 'react-feather';
import React, { useEffect, useRef, useState } from 'react';
import { Theme, ThemeType } from './layout';

import List from './navigation-list';
import { Logo } from './utils';
import { NavigationQuery } from './__generated__/NavigationQuery';
import { Sidebar } from 'react-tailwind-component';
import { ThemeIcons } from './ui';
import cns from 'classnames';
import { useLocation } from '@reach/router';

type NavbarProps = {
  switchTheme: () => void;
  currentTheme: ThemeType;
  themes: { [id: string]: Theme };
};
const Navbar: React.FC<NavbarProps> = ({ currentTheme, switchTheme, themes }) => {
  const { pathname } = useLocation();
  const [, currentLocation] = pathname.split('/');

  const data = useStaticQuery<NavigationQuery>(graphql`
    query NavigationQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const navbar = useRef(null);
  const [scrolled, changeState] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (document.documentElement.scrollTop > 50 && !scrolled) {
        changeState(true);
      } else if (document.documentElement.scrollTop <= 50 && scrolled) changeState(false);
    };

    window.addEventListener('scroll', onScroll);
    setNavbarHeight(navbar.current.getBoundingClientRect().height);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrolled]);

  return (
    <React.Fragment>
      <div
        className={cns(
          'duration-300 transition-all flex justify-between items-center z-30 fixed w-full nav',
          {
            'scrolled bg-bg p-4': scrolled,
          },
          {
            'p-5': !scrolled,
          },
        )}
        ref={navbar}
      >
        <button
          className="text-primary outline-0 focus:outline-none lg:hidden"
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          <Menu />
        </button>
        <Sidebar open={sidebarOpen} onChange={setSidebarOpen}>
          <div className="bg-bg h-full flex flex-col justify-center relative">
            <div className="absolute top-0 my-4 text-center w-full">
              <Link to="/" title={data.site.siteMetadata.title} className="inline-block">
                <Logo className={`duration-300 transition-all ${scrolled ? 'w-10' : 'w-12'}`} />
              </Link>
            </div>
            <div className="text-center">
              <List
                current={currentLocation}
                displayType="sidebar"
                currentTheme={currentTheme}
                switchTheme={switchTheme}
                themes={themes}
                liClassName="block my-2"
              />
            </div>
          </div>
        </Sidebar>
        <Link to="/" title={data.site.siteMetadata.title}>
          <Logo className={`duration-300 transition-all ${scrolled ? 'w-6' : 'w-8'}`} />
        </Link>
        <div className="flex lg:hidden">
          <Link className="text-primary outline-0 focus:outline-none" to="/cart/">
            <ShoppingCart />
          </Link>
          <ThemeIcons
            className="ml-4"
            themes={themes}
            currentTheme={currentTheme}
            switchTheme={switchTheme}
          />
        </div>
        <div className="hidden lg:block">
          <List
            className="nav-links flex"
            current={currentLocation}
            displayType="top"
            currentTheme={currentTheme}
            switchTheme={switchTheme}
            themes={themes}
          />
        </div>
        <div className="absolute line h-px left-0 bottom-0 bg-gradient-primary"></div>
      </div>
      {/* <div style={{ height: `${navbarHeight}px` }}></div> */}
    </React.Fragment>
  );
};

export default Navbar;
