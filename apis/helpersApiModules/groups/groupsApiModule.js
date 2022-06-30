/* eslint max-classes-per-file: ["error", 2] */

import SHOW_GROUPS_QUERY from './queries/showGroups.graphql'
import SHOW_GROUP_QUERY from './queries/showGroup.graphql'

class GroupsApiImpl {
  name = 'group'

  #pGqlAdapter = null

  #pLog = null

  constructor (_log, _gqlAdapter) {
    this.#pLog = _log
    this.#pGqlAdapter = _gqlAdapter
  }

  set log (_log) {
    this.#pLog = _log
  }

  async getListAsync (_variables) {
    const defaultParams = {
      limit: 20,
      tags: [],
      page: 1,
      sortType: 'NEW',
    }
    const variables = Object.assign(defaultParams, _variables)
    return await this.#pGqlAdapter.getQueryAsync({
      variables,
      query: SHOW_GROUPS_QUERY,
      operationDescription: 'get groups list',
    })
  }

  async getInfoAsync (_groupId) {
    const groupId = parseInt(_groupId, 10)
    console.info(groupId)
    return await this.#pGqlAdapter.getQueryAsync({
      variables: {groupId},
      query: SHOW_GROUP_QUERY,
      operationDescription: `get ${_groupId} group`,
    })
  }

}

export default class GroupsApiModule {
  name = 'groups-api'

  #pLog = null

  set log (_log) {
    this.#pLog = _log
  }

  install (_app) {
    _app.interfaces.register('groupsApi', () => {
      return new GroupsApiImpl(this.#pLog, _app.gqlAdapter)
    })

  }
}
