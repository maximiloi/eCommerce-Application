import {
  CustomerSignin,
  MyCustomerDraft,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import toastify from '../helper/toastify';
import User from './user';

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
        resolve(response);
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
        resolve(response);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        toastify(error.message, 'error');
      });
  });
}

export function getProducts() {
  return new Promise((resolve) => {
    User.getApi()
      .productProjections()
      .get()
      .execute()
      .then((response) => {
        resolve(response.body.results);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}

export function getProductsFilter(filter: string, text: string, sort: string) {
  return new Promise((resolve) => {
    User.getApi()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          fuzzy: true,
          filter,
          'text.en': text,
          sort,
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}

export function getProductId(ID: string) {
  return new Promise((resolve) => {
    User.getApi()
      .productProjections()
      .withId({ ID })
      .get()
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}

export function getCategoryId(ID: string) {
  return new Promise((resolve) => {
    User.getApi()
      .categories()
      .withId({ ID })
      .get()
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}

export function getCategory() {
  return new Promise((resolve) => {
    User.getApi()
      .categories()
      .get()
      .execute()
      .then((response) => {
        resolve(response.body.results);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}
export function getCustomer() {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .get()
      .execute()
      .then((response) => {
        User.data = response.body;
        resolve(response.body);
      })
      .catch((error) => {
        toastify(error.message, 'error');
      });
  });
}

export function updateUserData(data: MyCustomerUpdate) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .post({
        body: data /* можно несколько действий пихать массивом https://docs.commercetools.com/api/projects/me-profile#update-actions */,
      })
      .execute()
      .then((response) => {
        // нужно сетать нового клиента, если меняется пароль User.setClient(email, password);
        // этот запрос перезаписывает данные пользователя (и возвращяет их же если что) getCustomer();
        toastify(`Hello, ${User.data?.firstName}`, 'success');
        resolve(response);
      })
      .catch((error) => {
        console.error('Error update user:', error);
        toastify(error.message, 'error');
      });
  });
}
