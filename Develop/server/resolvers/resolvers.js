const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, { id, username }, context) => {
      const query = {
        $or: [{ _id: id }, { username }],
      };

      const foundUser = await User.findOne(query);

      if (!foundUser) {
        throw new Error("Cannot find a user with this id or username!");
      }

      return foundUser;
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }, context) => {
      try {
        const user = await User.create({ username, email, password });

        if (!user) {
          throw new Error("Something went wrong while creating the user!");
        }

        const token = signToken(user);
        console.log(token);
        console.log(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw new Error("Error creating user.");
      }
    },
    login: async (parent, { username, password }, context) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookData }, { user }) => {
      console.log(user);
        try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error saving book.");
      }
    },

    deleteBook: async (parent, { bookId }, { user }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;