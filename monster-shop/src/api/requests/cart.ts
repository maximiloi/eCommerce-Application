import { Cart } from '@commercetools/platform-sdk';
import toastify from '../../helper/toastify';
import User from '../user';

export function getCarts() {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .get()
      .execute()
      .then((response) => {
        console.log(response.body.results);
        resolve(response.body.results);
      })
      .catch((error) => {
        console.error('Error getting carts:', error);
        toastify(error.message, 'error');
      });
  });
}

export function createCart() {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute()
      .then((response) => {
        console.log(response.body);
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error creating cart:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function cartAddItem(productId: string) {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  console.log(cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'addLineItem', productId }],
        },
      })
      .execute()
      .then((response) => {
        console.log(response.body);
        resolve(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}
