import StopWatch from '../toolkit/stopwatch';

const stopwatch = new StopWatch();

const handler = {
  get(target, name) {
    return name in target ? target[name] : target.sub(name);
  },
};

const darkColorizeAccentRegexp = /\*\*(.*?)\*\*/gm;
const darkColorizeAccentTarget = "'\x1b[36m$1\x1b[37m'";
const darkColorizeSucceedRegexp = /!!(.*?)!!/gm;
const darkColorizeSucceedTarget = '\x1b[32m$1\x1b[37m';

const lightColorizeAccentRegexp = /\*\*(.*?)\*\*/gm;
const lightColorizeAccentTarget = "'\x1b[34m$1\x1b[30m'";
const lightColorizeSucceedRegexp = /!!(.*?)!!/gm;
const lightColorizeSucceedTarget = '\x1b[32m$1\x1b[30m';

let userOSUsesDarkScheme = false;

if (process?.browser) {
  userOSUsesDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default class Log {
  #pScope = null;

  constructor(_scope) {
    this.#pScope = _scope ?? null;
  }

  static New(_scope) {
    const root = new Log(_scope);
    return new Proxy(root, handler);
  }

  get isDevMode() {
    return process.env.NODE_ENV === 'development';
  }

  logImpl(_fn) {
    if (this.isDevMode) _fn();
  }

  sub(_scope) {
    const res = this.#pScope === null ? new Log(_scope) : new Log(`${this.#pScope}/${_scope}`);
    return new Proxy(res, handler);
  }

  elapsed() {
    const totalSeconds = stopwatch.getDiff() / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const sec = totalSeconds - minutes * 60;
    if (minutes > 0) return `${minutes}:${sec.toFixed(2)}`;

    return `${sec.toFixed(2)}`;
  }

  colorize(_msg) {
    let msg;
    if (userOSUsesDarkScheme) {
      msg = _msg.replace(darkColorizeAccentRegexp, darkColorizeAccentTarget);
      msg = msg.replace(darkColorizeSucceedRegexp, darkColorizeSucceedTarget);
    } else {
      msg = _msg.replace(lightColorizeAccentRegexp, lightColorizeAccentTarget);
      msg = msg.replace(lightColorizeSucceedRegexp, lightColorizeSucceedTarget);
    }
    return msg;
  }

  groupCollapsed(_desc) {
    this.logImpl(() => console.groupCollapsed(`${this.elapsed()} | ${this.#pScope} | ${this.colorize(_desc)}`));
    return () => console.groupEnd();
  }

  group(_desc) {
    this.logImpl(() => console.group(`${this.elapsed()} | ${this.#pScope} | ${this.colorize(_desc)}`));
    return () => console.groupEnd();
  }

  i(_desc) {
    this.logImpl(() => console.info(`${this.elapsed()} | ${this.#pScope} | ${this.colorize(_desc)}`));
  }

  e(_desc) {
    this.logImpl(() => console.error(`${this.elapsed()} | ${this.#pScope} | ${this.colorize(_desc)}`));
  }

  w(_desc) {
    this.logImpl(() => console.warn(`${this.elapsed()} | \x1b[33m${this.#pScope}\x1b[37m | ${this.colorize(_desc)}`));
  }
}
