import toastify from '../../helper/toastify';
import User from '../user';

export function getCart() {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .get()
      .execute()
      .then((response) => {
        console.log(response.body);
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error login user:', error);
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
        resolve(response);
      })
      .catch((error) => {
        console.error('Error login user:', error);
        toastify(error.message, 'error');
      });
  });
}
