import GqlAdapter from '~/apis/toolkit/gqlAdapter';
import Log from '~/infrastructure/log/log';

export default ({ app, store }, inject) => {
  const log = Log.New();
  const { apolloProvider } = app;
  const gqlAdapter = new GqlAdapter({
    log,
    apolloProvider,
  });

  inject('gqlAdapter', gqlAdapter);
};
