'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('tiptap-editor')
      .service('myService')
      .getWelcomeMessage();
  },
});
