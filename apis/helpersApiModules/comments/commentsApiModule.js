/* eslint max-classes-per-file: ["error", 2] */

import SHOW_COMMENTS_QUERY from './queries/comment/showComments.graphql'

class CommentsApiImpl {
  name = 'comments';

  #pGqlAdapter = null;

  #pLog = null;

  constructor(_log, _gqlAdapter) {
    this.#pLog = _log;
    this.#pGqlAdapter = _gqlAdapter;
  }

  set log(_log) {
    this.#pLog = _log;
  }

  async getInfoAsync(_postId) {
    const postId = parseInt(_postId, 10);
    return await this.#pGqlAdapter.getQueryAsync({
      variables: { postId },
      query: SHOW_COMMENTS_QUERY,
      operationDescription: `get ${_postId} comments`,
    });
  }


}
export default class CommentsApiModule {
  name = 'comment-api';

  #pLog = null;

  set log(_log) {
    this.#pLog = _log;
  }

  install(_app) {
    _app.interfaces.register('commentsApi', () => {
      return new CommentsApiImpl(this.#pLog, _app.gqlAdapter);
    });

  }
}
