"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "tiptap-editor",
    plugin: "tiptap-editor",
    type: "richtext",
  });
};
