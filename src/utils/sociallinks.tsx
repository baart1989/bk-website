import { graphql, useStaticQuery } from 'gatsby';

import React from 'react';

const ListItem = ({ data }) => {
  return (
    <li className="inline-block social-link mx-2">
      <a
        href={data.url}
        title={data.name}
        className="rounded-full inline-block transition-shadow duration-300 hover:shadow-2xl"
      >
        <img src={data.icon} alt={data.name} className="block w-20" />
      </a>
    </li>
  );
};

export default function socialLinks() {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            name
            url
            icon
          }
        }
      }
    }
  `);

  const items = data.site.siteMetadata.social;
  const list = items.map((e, i) => <ListItem key={e.url + '-' + e.icon + '-' + i} data={e} />);
  return <ul className="mt-4">{list}</ul>;
}
