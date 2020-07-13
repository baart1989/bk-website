import React from 'react';

export const Row = ({ children }) => {
  return <div className="row block lg:flex items-center justify-content my-3">{children}</div>;
};

export const Col = ({ children }) => {
  return <div className="flex-1 p-2">{children}</div>;
};
