import {Lb4GettingStartedApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Lb4GettingStartedApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new Lb4GettingStartedApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
