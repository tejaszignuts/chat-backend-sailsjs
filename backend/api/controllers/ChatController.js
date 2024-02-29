/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //create a new chat beetween sender and receiver
  createChat: async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;

      // Check if the chat already exists
      let chat = await Chat.findOne({
        members: { contains: senderId, contains: receiverId },
      });

      if (chat) {
        return res.status(200).json(chat);
      }

      // If the chat doesn't exist, create a new one
      const newChat = await Chat.create({
        members: [senderId, receiverId],
      }).fetch();

      res.status(200).json(newChat);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //find User all chat with other

  findChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.find({
        members: { in: [id] },
      });

      if (chat.length === 0) {
        return res.status(500).json("Chat not found");
      }

      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
