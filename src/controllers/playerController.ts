import Players from "../models/Players";

export const addData = async (data, ip) => {
  try {
    return await Players.build({
      Username: data.userName,
      Password: data.password,
      IP: ip,
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
    if (user) return password === user!.Password;
    return false;
  } catch (err) {
    throw err;
  }
};

export const getUserNameByIp = async(ip) => {
  try{
    const user = await Players.findOne({
      where : {
        IP : ip
      }
    })
    if (!user) throw new Error('User not found');
    return user.Username;
  }catch(err){
    throw err;
  }
}

export const getUsersSizeNames = async() => {
  try {
    const players = await Players.findAll({
      attributes: ['Username']
    });
    const usernames = players.map(player => player.Username);
    return {
      size: players.length,
      usernames
    };
  }catch(err){
    throw err;
  }
}