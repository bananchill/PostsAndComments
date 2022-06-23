import PostsApiModule from '~/apis/helpersApiModules/posts/postsApiModule';
import CommentsApiModule from '@/apis/helpersApiModules/comments/commentsApiModule'
import GroupsApiModule from '@/apis/helpersApiModules/groups/groupsApiModule'

export default class ApiPack {
  name = 'api-pack';

  install(_app) {
    _app
      .use(new PostsApiModule())
      .use(new CommentsApiModule())
      .use(new GroupsApiModule())
  }
}
