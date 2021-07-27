import { useHover } from '../../hooks';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundImage from 'gatsby-background-image';
import { EmployeeQuery } from './__generated__/EmployeeQuery';
import React from 'react';

const EmployeeImage = ({ image, title, name, email }) => {
  const backgroundPositionY = ['-400px', '-800px'];
  const [hoverRef, isHovered] = useHover();
  return (
    <div className="m-4">
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
      <div className="text-center">
        <p>{title}</p>
        <h6>{name}</h6>
        <a className="text-sm" href={`mailto:${email}`}>
          {email}
        </a>
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
            email
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
            email={node.email}
            image={node.localFile ? node.localFile.childImageSharp.fixed : null}
          />
        ))}
      </div>
    </section>
  );
};

function getRandomValueFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
