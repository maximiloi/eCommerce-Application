import {
  BaseAddress,
  Customer,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import toastify from '../../helper/toastify';
import User from '../user';

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

export function updateUserPassword(
  version: number,
  currentPassword: string,
  newPassword: string
) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .password()
      .post({
        body: { currentPassword, newPassword, version },
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

export function updateUserProfile(
  version: number,
  email: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
) {
  return updateUserData(version, [
    { action: 'changeEmail', email },
    { action: 'setFirstName', firstName },
    { action: 'setLastName', lastName },
    { action: 'setDateOfBirth', dateOfBirth },
  ]);
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
