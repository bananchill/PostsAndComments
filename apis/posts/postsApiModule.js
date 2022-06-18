/* eslint max-classes-per-file: ["error", 2] */

import SHOW_POST_QUERY from './queries/post/showPost.graphql';
import SHOW_POSTS_QUERY from './queries/post/showPosts.graphql';
import SHOW_COMMENTS_QUERY from './queries/comment/showComments.graphql';

class PostsApiImpl {
  name = 'posts';

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
    const res = await this.#pGqlAdapter.getQueryAsync({
      variables: { postId },
      query: SHOW_POST_QUERY,
      operationDescription: `get ${_postId} post`,
    });
    return res;
  }

  async getListAsync(_variables) {
    const defaultParams = {
      limit: 20,
      tags: [],
      page: 1,
      sortType: 'NEW',
    };
    const variables = Object.assign(defaultParams, _variables);
    const res = await this.#pGqlAdapter.getQueryAsync({
      variables,
      query: SHOW_POSTS_QUERY,
      operationDescription: 'get post list',
    });
    return res;
  }

}
export default class PostsApiModule {
  name = 'post-api';

  #pLog = null;

  set log(_log) {
    this.#pLog = _log;
  }

  install(_app) {
    _app.interfaces.register('postsApi', () => {
      const api = new PostsApiImpl(this.#pLog, _app.gqlAdapter);
      return api;
    });

  }
}
