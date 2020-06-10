import * as Yup from 'yup';

import { ActionButton, SectionHeading } from './components/shop-ui';
import { Heading, SpinIcon } from '../components/ui';

import { CartForm } from '../shop/components/cart-form';
import { CartItems } from '../shop/components/cart-items';
import { Formik } from 'formik';
import Helmet from 'react-helmet';
import React from 'react';
import { useSiteContext } from './provider';

const mandatoryText = 'Pole jest obowiązkowe';

export const Checkout = () => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { total } = useSiteContext();

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 3000);
  };

  const submitButton = (
    <ActionButton
      type="button"
      iconRight={<SpinIcon spin={isSubmitting} />}
      onClick={onSubmit}
      title="Kupuję i płacę"
    />
  );

  const form = (
    <Formik
      initialValues={{}}
      validationSchema={Yup.object({
        forename: Yup.string().required(mandatoryText),
        surname: Yup.string().required(mandatoryText),
        country: Yup.string().required(mandatoryText),
        address1: Yup.string().required(mandatoryText),
        address2: Yup.string(),
        postcode: Yup.number().required(mandatoryText),
        city: Yup.string().required(mandatoryText),
        phone: Yup.number().required(mandatoryText),
        email: Yup.string()
          .required(mandatoryText)
          .email('Wprowadź prawidłowy adres email'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log({ values });
      }}
    >
      <CartForm />
    </Formik>
  );

  return (
    <>
      <Helmet title="Potwierdź zamówienie" />
      <div className="container mx-auto py-12">
        <Heading title="Twoje zamówienie" />
        <SectionHeading
          title="Podsumowanie zamówienia"
          button={<ActionButton to="/cart/" title="Edytuj koszyk" />}
        />
        <CartItems readonly={true} />
        {form}
        <SectionHeading title={`Do zapłaty: ${total} pln`} button={submitButton} />
      </div>
    </>
  );
};

export default Checkout;
