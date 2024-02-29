/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    chatId: {
      type: "string",
      required: true,
    },
    senderId: {
      type: "string",
      required: true,
    },
    text: {
      type: "string",
      required: true,
    },
  },
};
