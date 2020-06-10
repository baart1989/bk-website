import { ActionButton, SectionHeading } from './components/shop-ui';

import { CartItems } from '../shop/components/cart-items';
import { Heading } from '../components/ui';
import Layout from '../components/layout';
import { PageProps } from 'gatsby';
import React from 'react';
import { useSiteContext } from '../shop/provider';

const Cart: React.FC<PageProps<{}, {}>> = ({ location }) => {
  const { cart } = useSiteContext();
  const cartEmpty = cart.length === 0;

  let content: JSX.Element;

  if (cartEmpty) {
    content = (
      <SectionHeading
        title="Twój koszyk jest pusty."
        button={<ActionButton to="/shop/" title="Wróć do sklepu" />}
      />
    );
  } else {
    content = (
      <>
        <SectionHeading
          title="Wybrane produkty"
          button={<ActionButton to="/checkout/" title="Przejdź do kasy" />}
        />
        <CartItems />
      </>
    );
  }

  return (
    <Layout
      seo={{
        title: 'Contact',
      }}
      location={location}
    >
      <div className="container mx-auto py-12">
        <Heading title="Koszyk" />
        {content}
      </div>
    </Layout>
  );
};

export default Cart;
