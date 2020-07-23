import { Button, Heading } from '../components/ui';
import { Description as ContactDescription, Form } from '../components/contact';
import { IndexPageQuery, IndexPageQuery_site_siteMetadata } from './__generated__/IndexPageQuery';
import { PageProps, graphql } from 'gatsby';
import { Projects, Team } from '../components/bk';
import React, { useEffect, useRef, useState } from 'react';

import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import ItemPortfolio from '../portfolio/components/portfolio-card';
import { Logo } from '../components/utils';
import ScrollIntoView from 'react-scroll-into-view';

export default function IndexPage({ data }: PageProps<IndexPageQuery>) {
  const siteData = data.site.siteMetadata;
  const portfolioList = data.portfolio.edges.map((item, index) => (
    <ItemPortfolio data={item.node} key={item.node.id} even={(index + 1) % 2 === 0} />
  ));
  return (
    <>
      <Helmet title="Start" />
      <Wall data={siteData} image={data.wallImage.childImageSharp.fluid} />

      <About title="O nas" text={siteData.aboutText} />

      <Section title="Nasz zespół" id="team">
        <Team></Team>
      </Section>

      <Offer title="Oferta" text={siteData.offerText} id="offer">
        <div className="container mx-auto">
          <Projects />
        </div>
      </Offer>

      <Section title="Realizacje" id="portfolio">
        {portfolioList}
      </Section>

      <Section title="Kontakt" id="contact">
        <Contact data={siteData.contact} />
      </Section>
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
      <div className="flex justify-center lg:justify-start pb-4">
        <Logo />
        {/* <h1
          className={cns(`text-6xl relative lg:text-7xl`, {
            uppercase: data.capitalizeTitleOnHome,
          })}
        >
          <span {...spanAttrs}></span>
          {data.title}
        </h1> */}
      </div>
      <p className="text-lg lg:text-xl text-color-secondary font-bold pt-4 lg:pt-0">
        {data.introTag}
      </p>
      <p className="text-base mt-4 lg:text-lg text-white lg:text-color-default">
        {data.description}
      </p>
      <div className="flex justify-center lg:justify-start">
        <ScrollIntoView selector="#contact">
          <Button title="Kontakt" />
        </ScrollIntoView>
        <ScrollIntoView selector="#offer">
          <Button title="Oferta" className="ml-2" />
        </ScrollIntoView>
        <ScrollIntoView className="lg:hidden" selector="#team">
          <Button title="Zespół" className="ml-2" />
        </ScrollIntoView>
      </div>
      <div className="flex justify-center lg:justify-start lg:hidden">
        <ScrollIntoView selector="#portfolio">
          <Button title="Realizacje" />
        </ScrollIntoView>
      </div>
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
        <div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 mt-48 lg:mt-0">
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

const About = ({ title, text, id = undefined, children = null }) => {
  return (
    <>
      <div className="boxed">
        <div id={id} className="px-4 py-12 text-center lg:py-20 lg:px-0">
          <Heading title={title} />
          <p className="mt-5 text-lg">{text}</p>
        </div>
      </div>
      {children}
    </>
  );
};

const Offer = ({ title, text, id = undefined, children = null }) => {
  return (
    <>
      <div className="boxed">
        <div id={id} className="px-4 pt-20 pb-10 text-center lg:px-0">
          <Heading title={title} />
          <p className="mt-5 text-lg">{text}</p>
        </div>
      </div>
      {children}
    </>
  );
};

const Section = ({ id = undefined, title, children = null }) => {
  return (
    <div className="container mx-auto">
      <div id={id} className="pt-20 pb-10 lg:pt-30 lg:pb-20 text-center">
        <Heading title={title} />
      </div>
      {children}
    </div>
  );
};

const Contact = ({ data }) => {
  const hasContactForm = data.api_url;
  return (
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
        aboutText
        offerText
        contact {
          api_url
          description
          mail
          phone
          address
          navUrl
        }
        social {
          name
          url
          icon
        }
      }
    }
    portfolio: allMdx(
      filter: { fields: { sourceName: { eq: "portfolio" } } }
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            image: banner {
              id
              publicURL
              childImageSharp {
                id
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
