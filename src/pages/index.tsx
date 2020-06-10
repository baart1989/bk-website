import { Description as ContactDescription, Form } from '../components/contact';
import { IndexPageQuery, IndexPageQuery_site_siteMetadata } from './__generated__/IndexPageQuery';
import { PageProps, graphql } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';

import BlogCard from '../blog/components/blog-card';
import { Button } from '../components/ui';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import OfferDetails from '../offer/components/offer';
import ScrollIntoView from 'react-scroll-into-view';
import ShopCard from '../shop/components/shop-card';
import cns from 'classnames';

export default function IndexPage({ data }: PageProps<IndexPageQuery>) {
  const siteData = data.site.siteMetadata;
  // const portfolioList = data.portfolio.edges.map(({ node }, index) => (
  //   <PortfolioParallax data={node} key={node.id} even={(index + 1) % 2 === 0} />
  // ));
  // <div className="px-4 lg:px-0" id="portfolio">
  //   {portfolioList}
  // </div>;
  const blogList = data.blog.edges.map(item => <BlogCard data={item.node} key={item.node.id} />);
  const shopList = data.shop.edges.map(item => <ShopCard key={item.node.id} data={item.node} />);
  const offer = <OfferDetails data={data.offer.edges} />;

  return (
    <>
      <Helmet title="Start" />
      <Wall data={siteData} image={data.wallImage.childImageSharp.fluid} />
      <About data={siteData.about} />
      <Offer>{offer}</Offer>
      <Shop>{shopList}</Shop>
      <Blog>{blogList}</Blog>
      <Contact data={siteData.contact} />
    </>
  );
}

const Wall: React.FC<{ data: IndexPageQuery_site_siteMetadata; image: any }> = ({
  data,
  image,
}) => {
  const wall = useRef(null);

  const { twoColumnWall } = data;

  const [state, changeState] = useState({
    loaded: false,
    supportsBlend: false,
  });

  useEffect(() => {
    if (window.CSS && !state.loaded) {
      if (CSS.supports('mix-blend-mode', 'screen')) {
        wall.current.classList.add('supports-blend');
        changeState({
          loaded: true,
          supportsBlend: true,
        });
      }
    }
  }, [state.loaded]);

  const spanAttrs: Partial<{ style: unknown }> = {};

  if (!twoColumnWall && data.titleImage) {
    spanAttrs.style = {
      backgroundImage: `url('${data.titleImage}')`,
    };
  }

  const innerComponents = (
    <React.Fragment>
      <div className="title bg-bg">
        <h1
          className={cns(`text-6xl relative lg:text-7xl`, {
            uppercase: data.capitalizeTitleOnHome,
          })}
        >
          <span {...spanAttrs}></span>
          {data.title}
        </h1>
      </div>
      <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">{data.introTag}</p>
      <p className="text-base lg:text-lg mt-4">{data.description}</p>
      <ScrollIntoView selector="#portfolio">
        <Button to="/offer/" title="ZOBACZ OFERTĘ" />
      </ScrollIntoView>
      <div>
        <Button to="/shop/" title="SKLEP" />
        <Button to="/blog/" title="BLOG" className="ml-2" />
      </div>
      <Button title="ZALOGUJ" type="button" />
    </React.Fragment>
  );

  if (twoColumnWall) {
    return (
      <div
        className="wall h-screen flex relative justify-center items-center overflow-hidden"
        ref={wall}
      >
        <div className="flex-1 lg:block absolute lg:relative w-full h-full top-0 left-0">
          <div
            className="absolute left-0 top-0 w-full h-full lg:hidden"
            style={{
              background: 'rgba(0,0,0,.75)',
            }}
          ></div>
          <Img fluid={image} className="h-full w-auto max-w-none lg:h-auto lg:w-full" />
        </div>
        <div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 text-white lg:text-color-default">
          {innerComponents}
        </div>
      </div>
    );
  }

  return (
    <div className="wall h-screen flex flex-col justify-center items-center text-center" ref={wall}>
      {innerComponents}
    </div>
  );
};

const About: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div className="boxed">
      <div className="px-4 py-20 text-center lg:py-40 lg:px-0">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">O nas</h2>
        <p className="mt-5 text-lg">{data}</p>
      </div>
    </div>
  );
};

const Offer = ({ children }) => {
  return (
    <div className="container mx-auto px-0">
      <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">Współpraca</h2>
      </div>
      {children}
    </div>
  );
};

const Blog = ({ children }) => {
  return (
    <div className="container mx-auto px-0">
      <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">Blog</h2>
      </div>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

const Shop = ({ children }) => {
  return (
    <div className="container mx-auto px-0">
      <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">Sklep</h2>
      </div>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

const Contact = ({ data }) => {
  const hasContactForm = data.api_url;
  return (
    <div className="container mx-auto">
      <div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">Kontakt</h2>
      </div>
      <div className="flex flex-wrap pb-40">
        {hasContactForm && (
          <div className="w-full lg:w-1/2 px-4 lg:pl-2 lg:pr-6">
            <Form api={data.api_url} />
          </div>
        )}
        <div className={`w-full ${hasContactForm ? 'lg:w-1/2' : 'lg:w-2/3 mx-auto'} px-6 pt-8`}>
          <ContactDescription data={data} />
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query IndexPageQuery {
    wallImage: file(base: { eq: "landing.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site: site {
      siteMetadata {
        title
        description
        capitalizeTitleOnHome
        titleImage
        ogImage
        twoColumnWall
        introTag
        description
        about
        contact {
          api_url
          description
          mail
          phone
          address
        }
        social {
          name
          url
          icon
        }
      }
    }
    portfolio: allMdx(filter: { fields: { sourceName: { eq: "portfolio" } } }, limit: 6) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    blog: allMdx(filter: { fields: { sourceName: { eq: "blog" } } }, limit: 6) {
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            description
            author
            date(formatString: "DD MMMM YYYY")
            authorImage {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1920) {
                  srcSet
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    offer: allMdx(
      filter: { fields: { sourceName: { eq: "offer" } } }
      sort: { fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            price
            currency
            details
            description
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 640) {
                  srcSet
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
        }
      }
    }
    shop: allMdx(
      limit: 3
      filter: { fields: { sourceName: { eq: "shop" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            price
            currency
            type
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 640) {
                  srcSet
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
        }
      }
    }
  }
`;
