const {User} = require('../model/userSchema')

const UserExits = async (userId) => {
    const user = await  User.findById(userId);
    if(!user){return {msg:"user not found",status:400}};
    return user;
}

module.exports = {UserExits};