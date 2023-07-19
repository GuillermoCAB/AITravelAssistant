import React from 'react';
import { Helmet } from 'react-helmet';
import { SEOProps } from './type';

const SEO: React.FC<SEOProps> = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Helmet>
      {children}
    </>
  );
};

export default SEO;
