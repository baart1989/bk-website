import { Button } from '../../components/ui';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import React from 'react';
import { ShopListQuery_shop_edges_node } from '../__generated__/ShopListQuery';
import { useSiteContext } from '../provider';

export const ItemShop: React.FC<{ data: ShopListQuery_shop_edges_node }> = ({
  data: {
    id,
    frontmatter,
    excerpt: description,
    fields: { slug },
  },
}) => {
  const { addToCart } = useSiteContext();

  const footer = (
    <React.Fragment>
      <div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="px-3 flex items-start leading-none tracking-tight sm:text-2xl">
              <span className="font-extrabold">{frontmatter.price}</span>
            </span>
            <span className="text-2xl leading-8 font-medium">{frontmatter.currency}</span>
          </div>
          <Button
            onClick={() => addToCart({ ...frontmatter, id, description, path: slug })}
            type="button"
            title="Dodaj do koszyka"
          />
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-4 justify-between">
      <Img
        className="h-64 w-full object-cover"
        fluid={frontmatter.image.childImageSharp.fluid}
        alt=""
      />
      <div className="p-4 py-3">
        <h4 className="text-color-2 font-black text-3xl pt-1">{frontmatter.title}</h4>
        <p className="text-sm leading-5 font-medium">
          <Link to={slug} className="hover:underline text-secondary">
            Dowiedz się więcej
          </Link>
        </p>
        <p className="p-3 text-color-default">{description}</p>
        {footer}
      </div>
    </div>
  );
};

export default ItemShop;
