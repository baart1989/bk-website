import React from 'react';

const projectListItems = [
  'Projekty przetargowe',
  'Projekty koncepcyjne',
  'Projekty budowlane',
  'Projekty wykonawcze',
  'Projekty rozbiórki',
  'Projekty autorskie',
];

export const Projects = () => {
  const projectList = projectListItems.map((text, index) => (
    <div
      key={index}
      className="flex flex-col w-1/2 md:w-1/3 items-center justify-center h-48 md:h-64 border-medium border-b"
    >
      <div className="w-12 h-12 rounded-full bg-secondary"></div>
      <div className="text-lg md:text-xl py-2">{text}</div>
    </div>
  ));

  return <div className="flex flex-wrap py-3 px-3 md:px-0">{projectList}</div>;
};
