import { ActionButton } from './components/shop-ui';
import { CartItems } from '../shop/components/cart-items';
import { Heading } from '../components/ui';
import Helmet from 'react-helmet';
import React from 'react';
import { SectionHeading } from '../components/ui';
import { useSiteContext } from '../shop/provider';

const Cart: React.FC<{}> = () => {
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
    <>
      <Helmet title="Koszyk" />
      <div className="container mx-auto py-12">
        <Heading title="Koszyk" />
        {content}
      </div>
    </>
  );
};

export default Cart;
