import PropTypes from 'prop-types';
import React from 'react';

export default function HTML(props) {
  return (
    <html className="antialiased" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          key="at-webiste-theme"
          dangerouslySetInnerHTML={{
            __html: `(function() {
                try {
                  const mode = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!mode && supportDarkMode)
                  document.documentElement.classList.add('theme-dark');
                  if (!mode) return;
                  document.documentElement.classList.add(mode);
                } catch (e) {}
              })();`,
          }}
        />
        {props.preBodyComponents}
        <div
          className="bg-bgalt text-color-default"
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
