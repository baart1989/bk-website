import { graphql, useStaticQuery } from 'gatsby';

import { CommentsQuery } from './__generated__/CommentsQuery';
import { Disqus } from 'gatsby-plugin-disqus';
import React from 'react';
import { useLocation } from '@reach/router';

type CommentsProps = { title: string };
const Comments: React.FC<CommentsProps> = ({ title }) => {
  const data = useStaticQuery<CommentsQuery>(graphql`
    query CommentsQuery {
      site {
        siteMetadata {
          siteUrl
          disqus
        }
      }
    }
  `);

  const location = useLocation();
  const url = data.site.siteMetadata.siteUrl + location;
  const noDisqusShortName = data.site.siteMetadata.disqus === null;

  if (noDisqusShortName) return null;

  return <Disqus url={url} title={title} identifier={title} />;
};

export default Comments;
