const User = require("../Model/userGraphQL");

const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

const addUser = async (name, email) => {
  try {
    const newUser = new User({ name, email });
    return await newUser.save();
  } catch (error) {
    throw new Error("Error adding user");
  }
};

const updateUser = async (id, name, email) => {
  try {
    return await User.findByIdAndUpdate(id, { name, email }, { new: true });
  } catch (error) {
    throw new Error("Error updating user");
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };