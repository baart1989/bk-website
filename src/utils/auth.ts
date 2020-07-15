import * as ApiModel from '../API';

import Auth, { CognitoUser } from '@aws-amplify/auth';

const isBrowser = typeof window !== `undefined`;

export const setUser = user => {
  if (!user) {
    window.localStorage.gatsbyUser = JSON.stringify({});
    return;
  }
  const cognitoGroups: string[] = user.signInUserSession?.idToken?.payload['cognito:groups'] || [];

  const isAdmin = cognitoGroups.includes('Admins');
  const userInfo = {
    ...user.attributes,
    username: user.username,
  };
  if (isAdmin) {
    userInfo.isAdmin = isAdmin;
  }
  window.localStorage.gatsbyUser = JSON.stringify(userInfo);
};

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
  setUser(null);
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
    setUser(user);
    return true;
  } catch (err) {
    console.error('Apparently the user did not enter the right code: ', err);
    return false;
  }
}

export async function singInOrSignUp({ email, forename, surname }): Promise<CognitoUser> {
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
    if (error.code !== 'UsernameExistsException') {
      console.error({ error });
      throw new Error(error);
    }
  }
  return Auth.signIn(email);
}

const getRandomString = (bytes: number) => {
  const intToHex = (nr: number) => nr.toString(16).padStart(2, '0');
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(intToHex)
    .join('');
};
