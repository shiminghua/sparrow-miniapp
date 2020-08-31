let Router = {
  routers: [],
  hashStrip: /^#*/,
  location: window.location,

  getFragment: function () {
    return this.location.hash;
  },

  add: function (regex, handler) {
    if (typeof regex === 'function') {
      handler = regex;
      regex = '';
    }
    this.routers.push({ regex: regex, handler: handler });
    return this;
  },

  check: function (self) {
    let fragment = this.getFragment();
    for (let i = 0; i < self.routers.length; i++) {
      let router = self.routers[i];
      let match = fragment.match(router.regex);
      if (match) {
        router.handler.apply({});
      }
    }
  },

  load: function () {
    let self, checkUrl;
    self = this;

    checkUrl = function () {
      self.check(self);
    }

    function addEventListener() {
      if (window.addEventListener) {
        window.addEventListener('hashchange', checkUrl, false);
      } else if (window.attachEvent) {
        window.attachEvent('onhashchange', checkUrl);
      }
    }

    addEventListener();
    return this;
  },

  navigate: function (path) {
    path = path ? path : '';
    this.location.href.match(/#(.*)$/);
    this.location.href = this.location.href.replace(/#(.*)$/, '') + '#' + path;
    return this;
  },
};