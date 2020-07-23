import { Link } from 'gatsby';
import React from 'react';

interface Props {
  onChange: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  text: string;
}

const CookieBox: React.FC<Props> = ({ text, onChange }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-bgalt border-t border-white p-4 flex flex-wrap items-center justify-between z-50">
      <div className="flex">
        <p className="text-color-default mr-2 text-sm">{text}</p>
        {/* <Link to="/privacy-policy" className="text-color-2">
          Privacy policy
        </Link> */}
        <button
          className="px-3 py-1 rounded bg-bgalt border-2 border-secondary text-color-default hover:border-primary duration-200 transition-all"
          onClick={onChange}
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
};

export default CookieBox;
