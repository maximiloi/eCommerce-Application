import fetch from 'node-fetch';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'monster-shop',
  credentials: {
    clientId: 'U3r-kTd1NEne2aM80jVfjo-A',
    clientSecret: 'H2Te7OZIuweQGswC612kuzWJVWvEuwsP',
  },
  scopes: [
    'manage_my_shopping_lists:monster-shop view_categories:monster-shop manage_my_quote_requests:monster-shop view_published_products:monster-shop manage_my_business_units:monster-shop manage_my_payments:monster-shop create_anonymous_token:monster-shop manage_my_profile:monster-shop manage_my_orders:monster-shop manage_my_quotes:monster-shop',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const authClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export default authClient;
