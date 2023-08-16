import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import authClient from './auth';

const apiRoot = createApiBuilderFromCtpClient(authClient).withProjectKey({
  projectKey: 'monster-shop',
});

export function login(customerSignin: CustomerSignin) {
  apiRoot
    .me()
    .login()
    .post({
      body: customerSignin,
    })
    .execute()
    .then((response) => {
      console.log('User registered successfully:', response.body);
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
}

export function signup(myCustomerDraft: MyCustomerDraft) {
  apiRoot
    .me()
    .signup()
    .post({
      body: myCustomerDraft,
    })
    .execute()
    .then((responce) => {
      console.log('User registered successfully:', responce.body);
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
}
