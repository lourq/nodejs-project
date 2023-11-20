import Players from "../models/Players";

export const addData = async (data) => {
  try {
    return await Players.build({
      Username: data.userName,
      Password: data.password,
    }).save();
  } catch (err) {
    throw err;
  }
};

export const checkCredentials = async (username, password) => {
  try {
    const user = await Players.findOne({
      where: {
        Username: username,
      },
    });
    if (user) return password === user.Password;
    return false;
  } catch (err) {
    throw err;
  }
};
