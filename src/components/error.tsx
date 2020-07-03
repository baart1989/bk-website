import { Heading } from './ui';
import React from 'react';

export const ErrorPanel = ({ text, retryCallback }) => {
  return (
    <div className="container mx-auto py-12">
      <Heading title={text} />
      <div className="pb-20 text-center">
        <p>
          Oops! Coś poszło nie tak.{' '}
          <span role="img" aria-label="Sad face">
            😞
          </span>
        </p>
        <p>
          <button
            onClick={() => (retryCallback ? retryCallback() : undefined)}
            className="text-link"
          >
            Spróbuj ponownie?
          </button>
        </p>
      </div>
    </div>
  );
};
