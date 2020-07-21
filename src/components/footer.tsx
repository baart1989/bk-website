import {
  FooterLinksQuery,
  FooterLinksQuery_site_siteMetadata_footerLinks,
} from './__generated__/FooterLinksQuery';
import { Link, graphql, useStaticQuery } from 'gatsby';

import { Logo } from './utils';
import React from 'react';

export default function footer() {
  const query = useStaticQuery<FooterLinksQuery>(graphql`
    query FooterLinksQuery {
      site {
        siteMetadata {
          title
          footerLinks {
            name
            url
          }
          navLinks {
            name
            url
          }
        }
      }
    }
  `);

  const allLinks = [...query.site.siteMetadata.navLinks, ...query.site.siteMetadata.footerLinks];

  const footerLinks = allLinks.map((item, index) => (
    <ListItem data={item} key={`footer-n-l-${index}`} />
  ));

  return (
    <div className="bg-bgalt">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">{footerLinks}</nav>
        <div className="mt-8 flex justify-center">
          <Link to="/" title={query.site.siteMetadata.title}>
            <Logo className="w-12" />
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-center text-base leading-6">
            &copy; {new Date().getFullYear()} {query.site.siteMetadata.title}, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

const ListItem: React.FC<{ data: FooterLinksQuery_site_siteMetadata_footerLinks }> = ({ data }) => {
  return (
    <>
      <div className="px-5 py-2 animated-link-parent">
        <Link to={data.url} className="text-base leading-6">
          {data.name}
        </Link>
      </div>
    </>
  );
};
