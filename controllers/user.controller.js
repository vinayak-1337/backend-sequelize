import User from "../models/user.model.js";
import Account from "../models/account.model.js";

export const create = async (req, res) => {
  const { name, age, contact, username, password } = req.body;
  try {
    const result = await User.create({
      name,
      age,
      contact,
      username,
      password,
    });
    console.log(result.id);
    const result2 = await Account.create({
      user_id: result.id,
    });
    // res.send(`User created : ${JSON.stringify(result)}`);
    res.send(result);
  } catch (error) {
    console.log("Cannot create user : ", error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.findOne({
      where: {
        username,
        password,
      },
    });
    console.log("Login successfully : ", result);
    res.send(result);
  } catch (error) {
    console.log("Error in login : ", error);
  }
};
