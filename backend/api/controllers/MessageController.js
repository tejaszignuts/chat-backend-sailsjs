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
      const { text, senderId } = req.body;

      // Check if senderId and chatId are provided
      if (!senderId) {
        return res.status(400).json({ error: "Sender ID are required" });
      }

      // Check if sender and chat exist

      const user = await User.findOne({ id: senderId });
      if (!user) {
        return res.status(404).json({ error: "Sender not found" });
      }

      // Create the message
      const message = await Message.create({
        text,
        usermessage: senderId,
      }).fetch();

      const userIs = await User.findOne({ id: senderId }).populate("messages");

      res.status(200).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllMessage: async (req, res) => {
    try {
      const { chat } = req.params;
      const messages = await Message.find({ chat });
      if (messages.length === 0) {
        return res.status(400).json("No messages found");
      }

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUserMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ id }).populate("messages");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
