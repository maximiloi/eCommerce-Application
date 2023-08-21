import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import authClient from './auth';
import User from '../user';

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
      User.newUser(response.body.customer);
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
    .then((response) => {
      User.newUser(response.body.customer);
      login({
        email: myCustomerDraft.email,
        password: myCustomerDraft.password,
      });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
}
