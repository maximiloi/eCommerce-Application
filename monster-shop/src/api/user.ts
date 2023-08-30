import {
  Customer,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import getAnonId from '../helper/anonId';

const anonMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'monster-shop',
  credentials: {
    clientId: 'U3r-kTd1NEne2aM80jVfjo-A',
    clientSecret: 'H2Te7OZIuweQGswC612kuzWJVWvEuwsP',
    anonymousId: getAnonId(),
  },
  scopes: [
    'manage_my_shopping_lists:monster-shop view_categories:monster-shop manage_my_quote_requests:monster-shop view_published_products:monster-shop manage_my_business_units:monster-shop manage_my_payments:monster-shop create_anonymous_token:monster-shop manage_my_profile:monster-shop manage_my_orders:monster-shop manage_my_quotes:monster-shop',
  ],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export default class User {
  private static instance: User;

  static created: boolean = false;

  static data: Customer | undefined = undefined;

  private static authClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  private constructor() {
    if (!User.instance) {
      User.instance = User;
    }
  }

  public static getApi() {
    return createApiBuilderFromCtpClient(User.authClient).withProjectKey({
      projectKey: 'monster-shop',
    });
  }

  public static signin(data: Customer) {
    User.created = true;
    User.data = data;
    User.authClient = new ClientBuilder()
      .withPasswordFlow({
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: 'monster-shop',
        credentials: {
          clientId: 'U3r-kTd1NEne2aM80jVfjo-A',
          clientSecret: 'H2Te7OZIuweQGswC612kuzWJVWvEuwsP',
          user: {
            username: User.data.email as string,
            password: User.data.password as string,
          },
        },
        scopes: [
          'manage_my_shopping_lists:monster-shop view_categories:monster-shop manage_my_quote_requests:monster-shop view_published_products:monster-shop manage_my_business_units:monster-shop manage_my_payments:monster-shop create_anonymous_token:monster-shop manage_my_profile:monster-shop manage_my_orders:monster-shop manage_my_quotes:monster-shop',
        ],
        fetch,
      })
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }

  public static logout() {
    User.created = false;
    User.authClient = new ClientBuilder()
      .withAnonymousSessionFlow(anonMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }
}
