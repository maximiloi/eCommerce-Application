import {
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import authClient from './auth';

const apiRoot = createApiBuilderFromCtpClient(authClient).withProjectKey({
  projectKey: 'monster-shop',
});

export function login(customerDraft: CustomerSignin) {
  apiRoot
    .me()
    .login()
    .post({
      body: customerDraft,
    })
    .execute()
    .then((response) => {
      console.log('User registered successfully:', response.body);
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
}

export function signup(customerDraft: CustomerSignin) {
  let result;
  apiRoot
    .me()
    .signup()
    .post({
      body: customerDraft,
    })
    .execute()
    .then((responce) => {
      console.log('User registered successfully:', responce.body);
      result = responce;
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      result = error;
    });
  return result;
}
