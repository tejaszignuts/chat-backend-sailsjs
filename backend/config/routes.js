/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //userRoutes
  "POST /user/register": "userController.register",
  "POST /user/login": "userController.login",
  "GET /user/user/:id": "userController.getUser",
  "GET /user/users": "userController.getAllUser",

  //chatRoutes
  "POST /user/chat": "chatController.createChat",
  "GET /user/chat/:id": "chatController.findChat",

  //messageRoutes
  "POST /user/chat/msg": "MessageController.createMessage",
  "GET /user/chat/msg/:chatId": "MessageController.getAllMessage",
};
