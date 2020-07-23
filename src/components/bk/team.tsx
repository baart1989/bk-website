import { getRandomValueFromArray, useHover } from 'react-frontend-common';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundImage from 'gatsby-background-image';
import { EmployeeQuery } from './__generated__/EmployeeQuery';
import React from 'react';

const EmployeeImage = ({ image, title, name }) => {
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
      <div>
        <p>{title}</p>
        <h6>{name}</h6>
      </div>
    </div>
  );
};

const EmployeeNoImage = ({ title, name }) => {
  return (
    <div className="m-4 flex flex-col justify-center">
      <div
        style={{
          width: 272,
        }}
      >
        <span className="inline-block rounded-sm overflow-hidden bg-gray-100">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </div>
      <div>
        <p>{title}</p>
        <h6>{name}</h6>
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

  const teamMembers: JSX.Element[] = [];

  data.items.edges.map(({ node }) => {
    if (node.localFile) {
      teamMembers.push(
        <EmployeeImage
          key={node.id}
          title={node.title}
          name={node.name}
          image={node.localFile ? node.localFile.childImageSharp.fixed : null}
        />,
      );
      return;
    }
    teamMembers.push(
      <EmployeeNoImage key={node.id} title={node.title} name={node.name}></EmployeeNoImage>,
    );
  });

  return (
    <section>
      <div className="flex justify-center md:justify-around flex-wrap">{teamMembers}</div>
    </section>
  );
};
