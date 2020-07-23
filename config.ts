import API, { graphqlOperation } from '@aws-amplify/api';

export const sendEmail = /* GraphQL */ `
  mutation sendEmail($from: String!, $content: String!, $name: String) {
    sendEmail(from: $from, content: $content, name: $name) {
      id
      result
    }
  }
`;

const siteMetadata = {
  title: `be37`,
  siteName: 'Be37 Pracownia Projektowa',
  siteUrl: 'https://www.be37.pl',
  capitalizeTitleOnHome: false,
  logo: `/images/logo.png`,
  icon: `/images/icon.png`,
  titleImage: `/images/wall.jpg`,
  ogImage: `/images/wall.jpg`,
  twoColumnWall: true,
  introTag: `BIURO KONSTRUKCYJNE`,
  description: `Be37 to pracownia projektowa specjalizująca się w projektowaniu konstrukcji budowlanych i inżynierskich`,
  aboutText: `Be37 to pracownia projektowa oferująca swoje usługi Architektom i Inwestorom w zakresie projektowania
  konstrukcji budowlanych i inżynierskich.
  Pracujący tu inżynierowie zapewniają profesjonalną współpracę przy realizacji procesu budowlanego we
  wszystkich jego fazach, od koncepcji poprzez projekt, do realizacji włącznie.
  Posiadamy wieloletnie doświadczenie w projektowaniu konstrukcji budowlanych różnego typu: konstrukcje
  żelbetowe, stalowe, drewniane, murowane.`,
  offerText: `Zapewniamy profesjonalną współpracę przy realizacji procesu budowlanego we wszystkich jego fazach, od koncepcji poprzez projekt, do realizacji włącznie.`,
  author: `BIT Bartosz Szpinda`,
  portfolioItemsPerPage: 20,
  darkmode: true,
  switchTheme: false,
  // cookiePolicy: 'Serwis wykorzystuje pliki Cookies do celów statystycznych. Jeśli nie blokujesz tych plików, to zgadzasz się na ich użycie oraz zapisanie w pamięci urządzenia. Pamiętaj, że możesz samodzielnie zarządzać cookies, zmieniając ustawienia przeglądarki.',
  cookiePolicy: '',
  sourcePages: {},
  navLinks: [
    {
      name: 'Kontakt',
      url: '/contact',
      id: '#contact',
    },
    {
      name: 'Oferta',
      url: '/offer',
      id: '#offer',
    },
    {
      name: 'Zespół',
      url: '/team',
      id: '#team',
    },
    {
      name: 'Realizacje',
      url: '/portfolio',
      id: '#portfolio',
    },
  ],
  footerLinks: [],
  social: [
    {
      name: 'Facebook',
      icon: '/images/Facebook.svg',
      url: 'https://www.facebook.com/be37konstrukcja',
    },
    {
      name: 'Google Maps',
      icon: '/images/GoogleMaps.svg',
      url:
        'https://www.google.com/maps/search/?api=1&query=50.0270367,19.9017593&query_place_id=ChIJH3v1f6NcFkcRII9B8MORPfE',
    },
  ],
  contact: {
    api_url: 'https://dihi737yujcapgxqltt3feavhu.appsync-api.eu-central-1.amazonaws.com/graphql',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
    mail: 'dorota.szpinda@be37.pl',
    phone: '608-691-246',
    navUrl:
      'https://www.google.com/maps/search/?api=1&query=50.0270367,19.9017593&query_place_id=ChIJH3v1f6NcFkcRII9B8MORPfE',
    address: 'ul. Na Grządkach 5/7 \n30-421 Kraków',
  },
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

const beforeContactFormSubmit = (data: FormData) => {
  // Code 0 - success
  // Code 1 - Name
  // Code 2 - Email
  // Code 3 - Message
  // Code 4 - Other
  const errors = [];

  if (data.name.trim().length < 2) {
    errors.push({
      code: 1,
      message: 'Wprowadź imię i nazwisko',
    });
  }

  if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    errors.push({
      code: 2,
      message: 'Wprowadź poprawny adres email',
    });
  }

  if (data.message.trim().length < 15) {
    errors.push({
      code: 3,
      message: 'Wiadomość powinna zawierać minimum 15 znaków',
    });
  }

  if (errors.length > 0)
    return {
      result: false,
      errors: errors,
    };

  return {
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
    result: true,
  };
};

const contactFormSubmit = async (data: FormData) => {
  try {
    await API.graphql(
      graphqlOperation(sendEmail, {
        from: data.email,
        content: data.message,
        name: data.name,
      }),
    );
    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
    };
  }
};

const defaults = {
  disqus: null,
  twoColumnWall: true,
  darkmode: false,
  switchTheme: true,
  capitalizeTitleOnHome: true,
};

Object.keys(defaults).forEach(item => {
  if (siteMetadata[item] === undefined) {
    siteMetadata[item] = defaults[item];
  }
});

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit };
