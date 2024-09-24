// ./config/plugins.js`
'use strict';

module.exports = {
  "react-icons": true,
  'tiptap-editor': {
    enabled: true,
    resolve: './src/plugins/tiptap-editor'
  },
  menus: {
    config: {
      maxDepth: 2,
      layouts: {
        menuItem: {
          link: [
            {
              input: {
                label: 'Hidden',
                name: 'link_hidden',
                type: 'bool',
              },
              grid: {
                col: 6,
              },
            },
            {
              input: {
                label: 'Connected page',
                name: 'page_relation',
                type: 'relation',
              },
            },
          ],
        },
      },
    },
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 10,
    }
  },
};
