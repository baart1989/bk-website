import { BlogListQuery_allMdx_edges_node } from '../__generated__/BlogListQuery';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import React from 'react';
import cns from 'classnames';

const standOutClassNames = ['transition', 'duration-150', 'transform', 'hover:-translate-y-1'];

export const BlogCard: React.FC<{ data: BlogListQuery_allMdx_edges_node }> = ({
  data: {
    timeToRead,
    excerpt,
    frontmatter: { title, image, date, description, author, authorImage },
    fields: { slug },
  },
}) => {
  const footer = (
    <React.Fragment>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <Img
            className="h-10 w-10 rounded-full"
            fluid={authorImage.childImageSharp.fluid}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-sm leading-5 font-medium">
            <span>{author}</span>
          </p>
          <div className="flex text-sm leading-5">
            <time dateTime="2020-03-16">{date}</time>
            <span className="mx-1">&middot;</span>
            <span>{timeToRead} min czytania</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <Link
      to={slug}
      className={cns(
        standOutClassNames,
        'flex flex-col justify-betweenw-full md:w-1/2 lg:w-1/3 p-4 overflow-hidden',
      )}
    >
      <div className="flex-shrink-0">
        <Img className="h-64 w-full object-cover" fluid={image.childImageSharp.fluid} alt="" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-medium">
            <span className="hover:underline text-secondary">Czytaj dalej</span>
          </p>
          <span className="block">
            <h3 className="mt-2 text-xl leading-7 font-semibold text-primary">{title}</h3>
            <p className="mt-3 text-base leading-6">{description || excerpt}</p>
          </span>
        </div>
        {footer}
      </div>
    </Link>
  );
};

export default BlogCard;
