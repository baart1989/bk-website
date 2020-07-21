import { getRandomValueFromArray, useHover } from 'react-frontend-common';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundImage from 'gatsby-background-image';
import { EmployeeQuery } from './__generated__/EmployeeQuery';
import React from 'react';

const EmployeeImage = ({ image, title, name }) => {
  const backgroundPositionY = ['-400px', '-800px'];
  const [hoverRef, isHovered] = useHover();
  return (
    <div className="mt-4 lg:mt-8">
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
  return (
    <section>
      <div className="flex justify-center md:justify-around flex-wrap">
        {data.items.edges.map(({ node }) => (
          <EmployeeImage
            key={node.id}
            title={node.title}
            name={node.name}
            image={node.localFile.childImageSharp.fixed}
          />
        ))}
      </div>
    </section>
  );
};
