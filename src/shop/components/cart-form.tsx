import Input from '../../components/input';
import React from 'react';
import { useFormikContext } from 'formik';

export const CartForm = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6">Dane odbiorcy</h3>
          <p className="mt-1 text-sm leading-5 text-color-secondary">
            Potrzbujemy Twoich danych żeby móc potwierdzić zamówienie.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            onSubmit={event => {
              event.preventDefault();
              handleSubmit(event as any);
            }}
          >
            <Input
              aria-label="Imię"
              label="Imię"
              name="forename"
              placeholder="Imię"
              applyBorder={false}
            />
            <Input aria-label="Nazwisko" label="Nazwisko" name="surname" placeholder="Nazwisko" />
            <Input
              aria-label="Kraj"
              label="Kraj"
              name="country"
              placeholder="Kraj"
              disabled={true}
              value="Polska"
            />
            <Input
              aria-label="Adres"
              label="Adres"
              name="address1"
              placeholder="Nazwa ulicy i numer budynku"
            />
            <Input
              aria-label="Adres"
              label="(Opcjonalnie)"
              name="address2"
              required={false}
              placeholder="Nr mieszkania, budynek, piętro, itp."
            />
            <Input
              aria-label="Kod Pocztowy"
              label="Kod pocztowy"
              name="postcode"
              placeholder="12-123"
            />
            <Input aria-label="Miasto" label="Miasto" name="city" placeholder="Miasto" />
            <Input
              aria-label="Telefon"
              label="Telefon"
              name="phone"
              type="tel"
              placeholder="123-123-123"
              required={false}
            />
            <Input
              aria-label="Email"
              label="Email"
              name="email"
              type="email"
              placeholder="abc@xxx.com"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
