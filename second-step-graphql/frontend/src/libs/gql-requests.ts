import { initUrqlClient } from 'next-urql';
import { Client, cacheExchange, fetchExchange, ssrExchange } from '@urql/core';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT!;

export function urqlClient(): Promise<Client> {
  return new Promise((resolve, reject) => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(
      {
          url: GRAPHQL_ENDPOINT,
          exchanges: [cacheExchange, ssrCache , fetchExchange]
      },
      false,
    );
    if (!client) {
      reject(Error('Failed to init initUrqlClient.'));
    } else {
      resolve(client);
    }
  });
}