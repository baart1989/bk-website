import * as ApiModel from '../API';

import Auth, { CognitoUser } from '@aws-amplify/auth';

const isBrowser = typeof window !== `undefined`;

export const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user));

const getUser = () => {
  if (window.localStorage.gatsbyUser) {
    const user = JSON.parse(window.localStorage.gatsbyUser);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();
  if (user) return !!user.username;
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = (callback?: Function) => {
  if (!isBrowser) return;
  setUser({});
  callback ? callback() : undefined;
};

export async function answerCustomChallenge(
  answer: string,
  cognitoUser: CognitoUser,
  eventData?: ApiModel.EventInput,
) {
  try {
    // Send the answer to the User Pool
    // This will throw an error if it’s the 3rd wrong answer
    await Auth.sendCustomChallengeAnswer(cognitoUser, answer, eventData);
    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    // This will throw an error if the user is not yet authenticated:
    const user = await Auth.currentAuthenticatedUser();
    const userInfo = {
      ...user.attributes,
      username: user.username,
    };
    setUser(userInfo);
    return true;
  } catch (err) {
    console.error('Apparently the user did not enter the right code: ', err);
    return false;
  }
}

export async function singInOrSignUp({ email, forename, surname }): Promise<CognitoUser> {
  return new Promise(async (resolve, reject) => {
    try {
      await Auth.signUp({
        username: email,
        password: getRandomString(30),
        attributes: {
          name: `${forename} ${surname}`,
          email: email,
        },
      });
    } catch (error) {
      console.log({ error });
      if (error.code !== 'UsernameExistsException') {
        reject(error);
      }
    }
    const cognitoUser = await Auth.signIn(email);
    return resolve(cognitoUser);
  });
}

const getRandomString = (bytes: number) => {
  const intToHex = (nr: number) => nr.toString(16).padStart(2, '0');
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(intToHex)
    .join('');
};
