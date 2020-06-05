import { Box } from 'react-tailwind-component';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import React from 'react';
import cns from 'classnames';

const standOutClassNames = ['transition', 'duration-150', 'transform', 'hover:-translate-y-1'];

export const ItemBlogCard: React.FC<any> = ({
  excerpt: description,
  frontmatter: { title, date, path, author, featuredImage, authorImage },
  timeToRead,
}) => {
  return (
    <Box
      as={Link}
      to={path}
      className={cns(standOutClassNames, 'flex flex-col rounded-lg shadow-lg overflow-hidden')}
    >
      <div className="flex-shrink-0">
        <Img
          className="h-48 w-full object-cover"
          fluid={featuredImage.childImageSharp.fluid}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-medium text-indigo-600">
            <span className="hover:underline">Czytaj więcej</span>
          </p>
          <span className="block">
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">{title}</h3>
            <p className="mt-3 text-base leading-6 text-gray-500">{description}</p>
          </span>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Img
              className="h-10 w-10 rounded-full"
              fluid={authorImage.childImageSharp.fluid}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              <span>{author}</span>
            </p>
            <div className="flex text-sm leading-5 text-gray-500">
              <time dateTime="2020-03-16">{date}</time>
              <span className="mx-1">&middot;</span>
              <span>{timeToRead} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ItemBlogCard;
