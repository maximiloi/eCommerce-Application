import {
  CustomerSignin,
  MyCustomerDraft,
  MyCustomerUpdateAction,
  BaseAddress,
  Customer,
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
        resolve(response.body.results);
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

export function updateUserData(
  version: number,
  actions: MyCustomerUpdateAction[]
) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .post({
        body: { version, actions },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error update user:', error);
        toastify(error.message, 'error');
      });
  });
}

export function updateUserAdress(version: number, addresses: BaseAddress[]) {
  const actions = [] as MyCustomerUpdateAction[];
  addresses.forEach((address) => {
    actions.push({ action: 'changeAddress', address, addressId: address.id });
  });
  return updateUserData(version, actions);
}

export function removeUserAdress(version: number, addressId: string) {
  return updateUserData(version, [{ action: 'removeAddress', addressId }]);
}

export async function addUserAdressType(
  version: number,
  address: BaseAddress,
  type: 'Billing' | 'Shipping'
) {
  const user = (await updateUserData(version, [
    { action: `addAddress`, address },
  ])) as Customer;
  const addressId = user.addresses[user.addresses.length - 1].id;
  return updateUserData(user.version, [
    { action: `add${type}AddressId`, addressId },
  ]);
}

export function removeUserAdressType(
  version: number,
  addressId: string,
  type: 'Billing' | 'Shipping'
) {
  return updateUserData(version, [
    { action: `remove${type}AddressId`, addressId },
  ]);
}

export function updateUserMail(version: number, email: string) {
  return updateUserData(version, [{ action: 'changeEmail', email }]);
}
