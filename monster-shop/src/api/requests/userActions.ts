import { CustomerSignin, MyCustomerDraft } from '@commercetools/platform-sdk';
import User from '../user';
import toastify from '../../helper/toastify';

export function login(customerSignin: CustomerSignin) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .login()
      .post({
        body: customerSignin,
      })
      .execute()
      .then((response) => {
        User.setClient(customerSignin.email, customerSignin.password);
        User.signin(response.body.customer);
        toastify(`Hello, ${User.data?.firstName}`, 'success');
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error login user:', error);
        toastify(error.message, 'error');
      });
  });
}

export function signup(myCustomerDraft: MyCustomerDraft) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .signup()
      .post({
        body: myCustomerDraft,
      })
      .execute()
      .then((response) => {
        User.setClient(myCustomerDraft.email, myCustomerDraft.password);
        User.signin(response.body.customer);
        toastify(`Hello, ${User.data?.firstName}`, 'success');
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        toastify(error.message, 'error');
      });
  });
}
