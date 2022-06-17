import PostsApiModule from '~/apis/posts/postsApiModule';

export default class ApiPack {
  name = 'api-pack';

  install(_app) {
    _app
      .use(new PostsApiModule())
  }
}
