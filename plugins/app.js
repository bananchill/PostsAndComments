import Application from '~/infrastructure/application/app';

import ApiPack from '~/apis/apiPack';
import Vue from 'vue'

export default (context, inject) => {
  // ************************
  // Creating application
  // ************************
  const app = new Application(context);
  const appLogUngroup = app.log.groupCollapsed('configure');

  // ************************
  // Installing modules
  // ************************

  // Apis
  app.use(new ApiPack());

  appLogUngroup();


  // ************************
  // Running app
  // ************************
  app.run();
  inject('sApp', app);
  inject('eventBus', new Vue());

}
