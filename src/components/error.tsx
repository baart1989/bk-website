import React from 'react';

export const ErrorPanel = ({ text, retryCallback }) => {
  return (
    <div className="container mx-auto py-12">
      <div className="title py-12 text-center">
        <h2 className="font-black text-5xl text-color-1">{text}</h2>
      </div>
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
