/* eslint max-classes-per-file: ["error", 2] */
/* eslint "import/no-extraneous-dependencies": 0, */
import Log from '~/infrastructure/log/log';

class InterfacesImpl {
  register(_property, _factory) {
    let val;
    Object.defineProperty(this, _property, {
      enumerable: false,
      configurable: false,
      get: () => {
        if (!val) val = _factory();
        return val;
      },
    });
  }
}

export default class Application {
  #pModules = [];

  #pLog = Log.New('app');

  #pStore = null;

  #pUnnamedModuleIndex = 1;

  #pGqlAdapter = null;

  interfaces = new InterfacesImpl();

  constructor(context) {
    this.#pGqlAdapter = context.$gqlAdapter;
  }

  get store() {
    return this.#pStore;
  }

  set store(_store) {
    this.#pStore = _store;
  }

  get gqlAdapter() {
    return this.#pGqlAdapter;
  }

  get modules() {
    return this.#pModules;
  }

  get log() {
    return this.#pLog;
  }

  use(_appModule) {
    /*
     Сначала добавляем все модули в массив, чтобы потом их все зарегестрировать в $sApp
     */

    const appModule = _appModule;
    const log = this.#pLog;

    if (appModule.name === null) {
      appModule.name = `unnamed-${this.#pUnnamedModuleIndex}`;
      this.#pUnnamedModuleIndex += 1;
    }

    log.i(`use **${appModule.name}**`);

    /*
      Локализация, откуда лог
    */

    let logSetter = Object.getOwnPropertyDescriptor(appModule, 'log')?.set;

    if (logSetter == null && Object.getPrototypeOf(appModule) != null) {
      logSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(appModule), 'log')?.set;
    }

    if (logSetter && typeof appModule.name === 'string' && appModule.name.length > 0) {
      const moduleLog = this.#pLog[appModule.name];
      logSetter.call(appModule, moduleLog);
    }

    this.#pModules.push(appModule);

    return this;
  }

  run() {
    const self = this;
    const log = this.#pLog;
    const modules = this.#pModules;

    /*
     регистрируем модули, чтобы к ним был доступ через $sApp.interfaces
     */
    const logUngroup = log.groupCollapsed('run');
    const installUngroup = log.groupCollapsed('install');

    let moduleIndex = 0;
    while (moduleIndex < modules.length) {
      for (; moduleIndex < modules.length; moduleIndex += 1) {
        const module = modules[moduleIndex];
        if (module.install !== null) {
          log.i(`installing **${module.name}** module`);
          try {
            module.install(self);
            log.i(`**${module.name}** !!installed!!`);
          } catch (e) {
            log.e(`**${module.name}** installation failed, ${e}`);
          }
        }
      }
    }

    installUngroup();

    // **************************
    // wire
    // **************************
    const wireUngroup = log.groupCollapsed('wire');
    this.#pModules.forEach((_m) => {
      if (_m.wire == null) return;
      log.i(`wiring **${_m.name}** ...`);
      try {
        _m.wire();
        log.i(`**${_m.name}** !!wired!!`);
      } catch (e) {
        log.e(`**${_m.name}** wiring failed, ${e}`);
      }
    });
    wireUngroup();

    // **************************
    // post wire
    // **************************
    const postWireUngroup = log.groupCollapsed('postWire');
    this.#pModules.forEach((_m) => {
      if (_m.postWire == null) return;
      log.i(`post wiring **${_m.name}**...`);
      try {
        _m.postWire();
        log.i(`**${_m.name}** post !!wired!!`);
      } catch (e) {
        log.e(`**${_m.name}** post wiring failed, ${e}`);
      }
    });
    postWireUngroup();

    const vueStoreUngroup = log.groupCollapsed('vue store');
    const store = this.#pStore;

    this.#pModules.forEach((_m) => {
      if (_m.store == null) return;
      log.i(`**${_m.name}** configure vue store...`);
      try {
        _m.store(store);
        log.i(`**${_m.name}** vue store !!configured!!`);
      } catch (e) {
        log.e(`**${_m.name}** configuring vue store failed, ${e}`);
      }
    });
    this.interfaces.store = store;
    vueStoreUngroup();

    logUngroup();
  }
}
