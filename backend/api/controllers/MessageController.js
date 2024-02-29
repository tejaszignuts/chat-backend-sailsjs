/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //create a new message
  createMessage: async (req, res) => {
    try {
      const { chatId, text, senderId } = req.body;
      const chat = await Message.create({ chatId, text, senderId }).fetch();
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getAllMessage: async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId });
      if (messages.length === 0) {
        return res.status(400).json("No messages found");
      }

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
