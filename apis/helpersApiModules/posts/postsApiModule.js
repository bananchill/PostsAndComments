/* eslint max-classes-per-file: ["error", 2] */

import SHOW_POST_QUERY from './queries/post/showPost.graphql'
import SHOW_POSTS_QUERY from './queries/post/showPosts.graphql'

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
    return await this.#pGqlAdapter.getQueryAsync({
      variables: { postId },
      query: SHOW_POST_QUERY,
      operationDescription: `get ${_postId} post`,
    });
  }

  async getListAsync(_variables) {
    const defaultParams = {
      limit: 20,
      tags: [],
      page: 1,
      sortType: 'NEW',
    };
    const variables = Object.assign(defaultParams, _variables);
    return await this.#pGqlAdapter.getQueryAsync({
      variables,
      query: SHOW_POSTS_QUERY,
      operationDescription: 'get post list',
    });
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
      return new PostsApiImpl(this.#pLog, _app.gqlAdapter);
    });

  }
}
