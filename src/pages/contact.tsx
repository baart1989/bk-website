import { Description, Form } from '../components/contact';
import { PageProps, graphql } from 'gatsby';

import { ContactQuery } from './__generated__/ContactQuery';
import { Heading } from '../components/ui';
import Helmet from 'react-helmet';
import React from 'react';

export const Contact: React.FC<PageProps<ContactQuery>> = ({ data }) => {
  const { api_url } = data.site.siteMetadata.contact;
  const hasContactForm = api_url;
  return (
    <>
      <Helmet title="Kontakt" />
      <div className="container mx-auto py-12">
        <Heading title="Kontakt" />
        <div className="flex flex-wrap pb-40">
          {hasContactForm && (
            <div className="w-full lg:w-1/2 px-6">
              <Form api={api_url} />
            </div>
          )}
          <div className={`w-full ${hasContactForm ? 'lg:w-1/2' : 'lg:w-2/3 mx-auto'} px-6 pt-8`}>
            <Description data={data.site.siteMetadata.contact} />
          </div>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        contact {
          api_url
          description
          mail
          phone
          address
          navUrl
        }
      }
    }
  }
`;

export default Contact;
