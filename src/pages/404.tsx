import Helmet from 'react-helmet';
import React from 'react';

export const ErrorPage = () => {
  return (
    <>
      <Helmet title="404" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-7xl text-color-1">
            4<span className="text-primary">0</span>4
          </h2>
        </div>
        <div className="pb-20 text-center">
          <p>
            Oops! Ta strona nie istnieje.{' '}
            <span role="img" aria-label="Sad face">
              😞
            </span>
          </p>
          <p>
            <button
              onClick={() => {
                if (window.history) window.history.back();
              }}
              className="text-link"
            >
              Wróć do strony głównej?
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
