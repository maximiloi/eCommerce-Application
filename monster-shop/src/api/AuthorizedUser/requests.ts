import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import authClient from './auth';
import User from '../user';
import toastify from '../../helper/toastify';

const apiRoot = createApiBuilderFromCtpClient(authClient).withProjectKey({
  projectKey: 'monster-shop',
});

export async function login(customerSignin: CustomerSignin) {
  apiRoot
    .me()
    .login()
    .post({
      body: customerSignin,
    })
    .execute()
    .then((response) => {
      User.newUser(response.body.customer);
      console.log('User logined successfully:', User.data);
      const message: string | undefined =
        User.data?.firstName === undefined
          ? User.data?.firstName
          : User.data?.email;
      if (!message) return;
      toastify(`Hello, ${message}`, 'success');
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      toastify(error.message, 'error');
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
      console.log('User registered successfully:', User.data);
    })
    .catch((error) => {
      console.error('Error registering user:', error);
    });
}
