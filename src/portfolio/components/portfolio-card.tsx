import { ArrowRight } from 'react-feather';
import { Button } from '../../components/ui';
import Img from 'gatsby-image';
import { PortfolioListQuery_allMdx_edges_node } from '../__generated__/PortfolioListQuery';
import React from 'react';
import cns from 'classnames';

type ItemPortfolioProps = { data: PortfolioListQuery_allMdx_edges_node; even: boolean };
export const PortfolioCard: React.FC<ItemPortfolioProps> = ({ data, even }) => {
  return (
    <div className="large-container mx-auto">
      <div
        className={cns('my-4 py-8 lg:py-24 portfolio-item md:flex', {
          'even flex-row-reverse': even,
        })}
      >
        <div className="relative flex-1">
          <div className="image relative z-10">
            <Img
              fluid={data.frontmatter.image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </div>
        </div>
        <div className="flex-1 flex md:px-4 lg:px-6 items-center">
          <div className={`flex flex-1 flex-wrap  ${even ? 'md:justify-end md:text-right' : ''}`}>
            <h3 className="text-color-1 text-4xl lg:text-5xl font-bold to-up">
              {data.frontmatter.title}
            </h3>
            <p className="lg:mt-4 to-up">{data.frontmatter.description}</p>
            <Button to={data.fields.slug} title="Zobacz więcej" iconRight={<ArrowRight />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
