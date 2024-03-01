/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import all packages
const { constants } = require("../../config/constants");

let validator = constants.validator;
let bcrypt = constants.bcrypt;
let jwt = constants.jwt;

const jwtAuth = (id) => {
  let key = "Secret";
  return jwt.sign({ id }, key, { expiresIn: "1d" });
};

module.exports = {
  //user registaration controller

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json("Please fill all fields");
      }

      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json("Given email User already registered please try another email");
      }

      //validate email

      const validEmail = validator.isEmail(email);

      if (!validEmail) {
        return res.status(400).json("Please enter valid email");
      }

      //validate password
      const validPassword = validator.isStrongPassword(password);
      if (!validPassword) {
        return res.status(400).json("Please enter strong password");
      }

      //encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
      }).fetch();

      if (!newUser) {
        return res.status(400).json("Something wrong please try again");
      }

      const token = jwtAuth(newUser.id);

      res.status(200).json({
        newUser,
        token,
        message: "Registration successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //user login controller
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json("Please fill all fields");
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json("sorry no user found please register first");
      }

      //valid password check
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json("sorry wrong password please try again");
      }

      res.status(200).json({
        user,
        message: "Login successful",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //getUserById
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json("please enter user id");
      }

      const user = await User.findOne({ id });
      if (!user) {
        return res.status(400).json("No user found");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //getAllUserList
  getAllUser: async (req, res) => {
    try {
      const userList = await User.find();
      if (userList.length === 0) {
        return res.status(400).json("No users found");
      }

      res.status(200).json(userList);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
