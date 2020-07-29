import { Button, TextInput } from './ui';
import { Loader, Mail, MapPin, Phone, Send } from 'react-feather';
import React, { useState } from 'react';
import { beforeContactFormSubmit, contactFormSubmit } from '../../config';

import { IndexPageQuery_site_siteMetadata_contact } from '../pages/__generated__/IndexPageQuery';
import { Link } from './utils';
import SocialLinks from './sociallinks';

type FeedbackState = { [id: number]: { message?: string; type?: string } };

const Form: React.FC<{ api: string }> = () => {
  const [data, changeData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [transactionState, setTransactionState] = useState(false);

  const updateData = v => changeData({ ...data, ...v });

  return (
    <form
      onSubmit={async event => {
        event.preventDefault();
        setTransactionState(true);

        const validate = beforeContactFormSubmit(data);

        if (!validate.result) {
          const errs = {};
          validate.errors.forEach(err => {
            errs[err.code] = { message: err.message };
          });
          setFeedback(errs);
          setTransactionState(false);
          return;
        }

        setFeedback({});
        setTransactionState(false);

        const { isSuccess } = await contactFormSubmit(validate.data);
        if (isSuccess) {
          setFeedback({
            4: {
              type: 'success',
              message: 'Twoja wiadomość została wysłana.',
            },
          });
          return;
        }
        setFeedback({
          4: {
            message: 'Ups, wystąpił problem. Spróbuj ponownie później.',
          },
        });
      }}
    >
      <TextInput
        label="Imię i nazwisko"
        name="name"
        onChange={e =>
          updateData({
            name: e.target.value,
          })
        }
        footer={
          <FormMessage
            show={feedback[1] !== undefined}
            type="error"
            message={feedback[1]?.message}
          />
        }
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        onChange={e =>
          updateData({
            email: e.target.value,
          })
        }
        footer={
          <FormMessage
            show={feedback[2] !== undefined}
            type="error"
            message={feedback[2]?.message}
          />
        }
      />
      <TextInput
        label="Wiadomość"
        name="message"
        type="textarea"
        onChange={e =>
          updateData({
            message: e.target.value,
          })
        }
        footer={
          <FormMessage
            show={feedback[3] !== undefined}
            type="error"
            message={feedback[3]?.message}
          />
        }
      />
      <div className="py-3 lg:p-4">
        <FormMessage
          show={feedback[4] !== undefined}
          type={feedback[4]?.type || 'error'}
          message={feedback[4]?.message}
        />

        <Button
          type="button,submit"
          title="Wyślij"
          disabled={transactionState}
          iconRight={<IconRight spin={transactionState} />}
        />
      </div>
    </form>
  );
};

const Description: React.FC<{ data: IndexPageQuery_site_siteMetadata_contact }> = ({ data }) => {
  return (
    <div>
      {data.description && <p>{data.description}</p>}
      <ul className="my-4">
        {data.mail.map((mail, i) => (
          <li key={`email-contact-${i}`} className="flex items-center">
            <span className="icon">
              <Mail />
            </span>
            <a className="ml-4" href={'mailto:' + mail}>
              {mail}
            </a>
          </li>
        ))}
        <div className="mt-4"></div>
        {data.phone.map((phone, i) => (
          <li key={`phone-contact-${i}`} className="flex items-center">
            <span className="icon">
              <Phone />
            </span>
            <Link className="ml-4" href={'tel:' + phone}>
              {phone}
            </Link>
          </li>
        ))}
        {data.address && (
          <li className="flex items-start mt-4">
            <span className="mt-1 icon">
              <MapPin />
            </span>
            <Link href={data.navUrl}>
              <p className="whitespace-pre ml-4">{data.address}</p>
            </Link>
          </li>
        )}
        <li>
          <SocialLinks />
        </li>
      </ul>
    </div>
  );
};

const IconRight = ({ spin = false }) => {
  if (spin) {
    return (
      <span
        className="spin"
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          animationDuration: '5s',
        }}
      >
        <Loader />
      </span>
    );
  }
  return <Send />;
};

type FormMessageProps = { show: boolean; type: string; message: string };
const FormMessage: React.FC<FormMessageProps> = ({ show, type, message }) => {
  if (!show) return null;
  return <p className={`text-${type} my-2`}>{message}</p>;
};

export { Form, Description };
