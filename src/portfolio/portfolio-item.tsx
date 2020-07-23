import { Col, Row } from '../components/shortcodes';
import { PageProps, graphql, navigate } from 'gatsby';

import Img from 'gatsby-image';
import { ItemPageContext } from '../../gatsby-node';
import { Link } from '../components/utils';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';
import { PortfolioQuery } from './__generated__/PortfolioQuery';
import React from 'react';
import { Redirect } from '@reach/router';
import { X } from 'react-feather';
import { useKeyPress } from 'react-frontend-common';

export default function PortfolioItem({
  data,
  pageContext,
}: PageProps<PortfolioQuery, ItemPageContext>) {
  // seo={{
  //   title: data.mdx.frontmatter.title,
  //   description: data.mdx.frontmatter.description,
  //   image: data.mdx.frontmatter.banner.publicURL,
  // }}

  const { totalPagesCount, currentCount, previousPath, nextPath } = pageContext;

  const leftArrow = useKeyPress('ArrowLeft');
  const rightArrow = useKeyPress('ArrowRight');

  if (leftArrow && previousPath) {
    navigate(previousPath, { state: { modal: true } });
    return null;
  }
  if (rightArrow && nextPath) {
    navigate(nextPath, { state: { modal: true } });
    return null;
  }

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <div className="p-6">
            <div className="flex justify-between items-center pb-6">
              <Link
                className="flex items-center py-2 px-4 mr-4 bg-medium-light hover:text-color-secondary rounded-md text-sm"
                state={{
                  noScroll: true,
                }}
                to={modal ? closeTo : '/'}
              >
                <X className="mr-1" size={16} />
                Zamknij
              </Link>
              <div>
                {currentCount}/{totalPagesCount}
              </div>
              <div>
                <Link
                  className="hover:text-color-secondary"
                  state={{ modal: true }}
                  to={previousPath}
                >
                  Poprzedni
                </Link>
                <Link
                  className="ml-2 hover:text-color-secondary"
                  state={{ modal: true }}
                  to={nextPath}
                >
                  Następny
                </Link>
              </div>
            </div>
            <div className="mx-auto relative z-50">
              <Img fluid={data.mdx.frontmatter.banner.childImageSharp.fluid} />
              <div className="flex items-center justify-center relative lg:absolute w-full h-full top-0 left-0">
                <div className="hidden lg:block absolute w-full h-full bg-black opacity-50"></div>
                <div className="px-4 py-8 lg:p-0 relative z-10 text-center lg:text-white bg-bgalt lg:bg-transparent">
                  <h2 className="font-bold text-color-1 lg:text-white">
                    {data.mdx.frontmatter.title}
                  </h2>
                  <p className="mt-1 flex items-center justify-center">
                    {data.mdx.frontmatter.address}
                  </p>
                  <h3 className="text-color-1 lg:text-white">
                    Inwestor: {data.mdx.frontmatter.investor}
                  </h3>
                  <p className="mt-1 flex items-center justify-center">
                    Data realizacji: {data.mdx.frontmatter.date}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mt-4 md:mt-6 mx-auto lg:mt-12">
              <div className="boxed">
                <div className="px-4 pb-20 text-center lg:py-40 lg:px-0">
                  <p className="mt-5 text-lg">{data.mdx.frontmatter.description}</p>
                </div>
              </div>
              <MDXProvider components={{ Row, Col }}>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
              </MDXProvider>
            </div>
          </div>
        ) : (
          <Redirect to="/" noThrow={true} />
        )
      }
    </ModalRoutingContext.Consumer>
  );
}

export const query = graphql`
  query PortfolioQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        address
        investor
        date(formatString: "YYYY")
        description
        banner {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
            id
          }
        }
      }
    }
  }
`;
