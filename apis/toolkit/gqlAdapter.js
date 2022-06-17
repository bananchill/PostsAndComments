/* eslint max-classes-per-file: ["error", 3] */

import Stopwatch from '~/infrastructure/toolkit/stopwatch';

class FetchApiError extends Error {
  constructor(_message) {
    super(_message);
    this.name = 'FetchApiError';
  }
}

const defaultAdditionalInfo = {
  successMsg: null,
  errorMsg: null,
  authPopUpMsg: null,
};

const defaultQueryFetchPolicy = 'no-cache';
const defaultMutationFetchPolicy = 'no-cache';

export default class GqlAdapter {
  #pLog = null;

  #pApollo = null;

  constructor({
    log, apolloProvider
  }) {
    this.#pLog = log;
    this.#pApollo = apolloProvider;
  }

  async requestAsync(_data) {
    const {
      req, payload, operationDescription
    } = _data;

    const stopwatch = Stopwatch.start();
    const log = this.#pLog;

    try {
      const res = await req(payload);
      const { data } = res;

      const msg = `${operationDescription} ${stopwatch.getDiff()} ms`;

      if (data.is_ok) {

        log.i(`Success: ${msg}`);

        return data.payload;
      }
      throw new FetchApiError(`Error: ${msg}`);
    } catch (_e) {
      const msg = `Fail: ${operationDescription} ${stopwatch.getDiff()} ms: ${_e}`;
      throw new FetchApiError(msg);
    }
  }

  async getQueryAsync(_data) {
    const { variables, query, operationDescription } = _data;
    let { additionalInfo = defaultAdditionalInfo } = _data;

    const clientApollo = this.#pApollo.defaultClient;

    additionalInfo = Object.assign(defaultAdditionalInfo, additionalInfo);

    const req = clientApollo.query;

    const payload = {
      query,
      variables,
      fetchPolicy: additionalInfo.fetchPolicy ?? defaultQueryFetchPolicy,
    };

    return this.requestAsync({
      req,
      payload,
      operationDescription,
      additionalInfo,
    });
  }

  async mutateAsync(_data) {
    const { variables, mutation, operationDescription } = _data;
    let { additionalInfo = defaultAdditionalInfo } = _data;

    additionalInfo = Object.assign(defaultAdditionalInfo, additionalInfo);

    const clientApollo = this.#pApollo.defaultClient;

    const req = clientApollo.mutate;

    const payload = {
      mutation,
      variables,
      fetchPolicy: additionalInfo.fetchPolicy ?? defaultMutationFetchPolicy,
    };

    return this.requestAsync({
      req,
      payload,
      operationDescription,
      additionalInfo,
    });
  }
}
