import { Description, Form } from '../components/contact';
import { PageProps, graphql } from 'gatsby';

import { ContactQuery } from './__generated__/ContactQuery';
import Layout from '../components/layout';
import React from 'react';

export default function contact({ data }: PageProps<ContactQuery>) {
  const { api_url } = data.site.siteMetadata.contact;
  const hasContactForm = api_url;
  return (
    <Layout
      seo={{
        title: 'Contact',
      }}
    >
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Contact</h2>
        </div>
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
    </Layout>
  );
}

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
        }
      }
    }
  }
`;