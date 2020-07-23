import { EmployeeQuery } from './__generated__/EmployeeQuery';
import { getRandomValueFromArray, useHover } from 'react-frontend-common';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundImage from 'gatsby-background-image';
import React from 'react';

const EmployeeImage = ({ image, title, name }) => {
  const backgroundPositionY = ['-400px', '-800px'];
  const [hoverRef, isHovered] = useHover();
  return (
    <div className="m-2">
      <BackgroundImage
        style={{
          height: 400,
          backgroundPositionY: isHovered ? getRandomValueFromArray(backgroundPositionY) : '0px',
        }}
        Tag="div"
        fixed={image}
      >
        <div ref={hoverRef} className="w-full h-full"></div>
      </BackgroundImage>
      <div>
        <p>{title}</p>
        <h6>{name}</h6>
      </div>
    </div>
  );
};

const EmployeeNoImage = ({ title, name }) => {
  return (
    <div className="w-1/2 lg:w-1/4 py-4 px-4 lg:px-0">
      <div>
        <p>{title}</p>
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export const Team = () => {
  const data: EmployeeQuery = useStaticQuery(graphql`
    query EmployeeQuery {
      items: allEmployeeJson {
        edges {
          node {
            id
            name
            title
            baseImagePath
            localFile {
              childImageSharp {
                fixed(width: 272) {
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);

  const withImages: JSX.Element[] = [];
  const withoutImages: JSX.Element[] = [];

  data.items.edges.forEach(({ node }) => {
    if (node.localFile) {
      withImages.push(
        <EmployeeImage
          key={node.id}
          title={node.title}
          name={node.name}
          image={node.localFile ? node.localFile.childImageSharp.fixed : null}
        />,
      );
      return;
    }
    withoutImages.push(
      <EmployeeNoImage key={node.id} title={node.title} name={node.name}></EmployeeNoImage>,
    );
  });

  return (
    <section>
      <div className="flex justify-center md:justify-around flex-wrap">{withImages}</div>
      <div className="flex justify-center md:justify-around flex-wrap">{withoutImages}</div>
    </section>
  );
};
