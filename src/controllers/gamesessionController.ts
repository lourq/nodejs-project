import GameSessions from "../models/GameSessions";

export const addSession = async(userName) => {
  try {
    return await GameSessions.build({
      SessionID : 1,
      User: userName,
    }).save();
  } catch (err) {
    throw err;
  }
};

export const getSessionByUserName = async(username) => {
  try{
     const user = await GameSessions.findOne({
      where : {
        User : username
      }
    })
    if(user) return user.SessionID
  } catch(err){
    throw err
  }
};

export const removeSessionByUserName = async(username) => {
  try{
    await GameSessions.destroy({
      where: { ImpostorID: username }
    });
  } catch(err){
    throw err
  }
};