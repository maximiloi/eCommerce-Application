import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
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
        resolve(response.body.results);
      })
      .catch((error) => {
        console.error('Error getting carts:', error);
        toastify(error.message, 'error');
      });
  });
}

export function getCartId(ID: string) {
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID })
      .get()
      .execute()
      .then((response) => {
        resolve(response.body);
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
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error creating cart:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function deleteCart(ID: string) {
  const cart = (await getCartId(ID)) as Cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID })
      .delete({ queryArgs: { version: cart.version } })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error deleting cart:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function updateCartId(ID: string, actions: MyCartUpdateAction[]) {
  const cart = (await getCartId(ID)) as Cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: { version: cart.version, actions },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error updating cart:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function combineCart() {
  const carts = (await getCarts()) as Cart[];
  const addList: MyCartUpdateAction[] = [];
  const cartsToRemove: string[] = [];
  carts.forEach((cart, index) => {
    const items = cart.lineItems;
    if (index) {
      cartsToRemove.push(cart.id);
      if (items.length)
        items.forEach((item) => {
          addList.push({
            action: 'addLineItem',
            productId: item.productId,
            quantity: item.quantity,
          });
        });
    }
  });
  updateCartId(carts[0].id, addList).then(() => {
    cartsToRemove.forEach((cartId) => deleteCart(cartId));
  });
}

export async function cartAddItem(productId: string, quantity?: number) {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'addLineItem', productId, quantity }],
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}

// export async function cartAddItem(productId: string) {
//   const carts = (await getCarts()) as Cart[];
//   const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
//   const { version, id } = cart;
//   return new Promise((resolve) => {
//     User.getApi()
//       .me()
//       .carts()
//       .withId({ ID: id })
//       .post({
//         body: {
//           version,
//           actions: [{ action: 'addLineItem', productId }],
//         },
//       })
//       .execute()
//       .then((response) => {
//         resolve(response.body);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         toastify(error.message, 'error');
//       });
//   });
// }

export async function cartChangeItemQuant(
  lineItemId: string,
  quantity: number
) {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }],
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function cartPromoApply(code: string) {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'addDiscountCode', code }],
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function cartPromoRemove(codeId: string) {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: { typeId: 'discount-code', id: codeId },
            },
          ],
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function cartRecalc() {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  return new Promise((resolve) => {
    User.getApi()
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'recalculate',
            },
          ],
        },
      })
      .execute()
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        console.error('Error:', error);
        toastify(error.message, 'error');
      });
  });
}

export async function cartClear() {
  const carts = (await getCarts()) as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const action: MyCartUpdateAction[] = [];
  const items = cart.lineItems;
  items.forEach((item) =>
    action.push({ action: 'removeLineItem', lineItemId: item.id })
  );
  return updateCartId(cart.id, action);
}
