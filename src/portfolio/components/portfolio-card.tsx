import React, { useEffect, useRef, useState } from 'react';

import { ArrowRight } from 'react-feather';
import { Button } from '../../components/ui';
import Img from 'gatsby-image';
import { Parallax } from 'react-tailwind-component';
import { PortfolioListQuery_allMdx_edges_node } from '../__generated__/PortfolioListQuery';
import cns from 'classnames';

type ItemPortfolioProps = { data: Partial<PortfolioListQuery_allMdx_edges_node>; even: boolean };

const truncateText = (text: string, limit = 120) =>
  text.length > limit ? `${text.substring(0, limit)}...` : text;

export const PortfolioCard: React.FC<ItemPortfolioProps> = ({ data, even }) => {
  const [state, changeState] = useState({
    animated: false,
    percentage: 0,
  });

  const getWindowHeight = () => {
    const w = window;
    const d = document;
    const e = d.documentElement;
    // eslint-disable-next-line prefer-destructuring
    const g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
  };

  const getWindowWidth = () => {
    const w = window;
    const d = document;
    const e = d.documentElement;
    // eslint-disable-next-line prefer-destructuring
    const g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
  };

  const updateState = p => changeState({ ...state, ...p });

  const percentageThreshold = 0.3;

  const transform = useRef(0);

  useEffect(() => {
    transform.current =
      Math.min(getWindowHeight() / 2, 300) * Math.max(0, state.percentage - percentageThreshold);

    if (getWindowWidth() < 1024) {
      updateState({
        animated: true,
      });
    }
  }, [state.percentage]);

  if (state.percentage > percentageThreshold && !state.animated) updateState({ animated: true });

  return (
    <Parallax changePercentage={updateState}>
      <div className="large-container mx-auto">
        <div
          className={cns(
            'my-4 py-8 lg:py-12 portfolio-item md:flex',
            { 'begin-animation': state.animated },
            {
              'even flex-row-reverse': even,
            },
          )}
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
              <p className="lg:mt-4 to-up">{truncateText(data.frontmatter.description)}</p>
              <Button
                to={data.fields.slug}
                state={{ modal: true }}
                title="Zobacz więcej"
                iconRight={<ArrowRight />}
              />
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default PortfolioCard;
