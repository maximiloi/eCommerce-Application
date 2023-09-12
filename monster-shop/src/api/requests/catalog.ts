import toastify from '../../helper/toastify';
import User from '../user';

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
