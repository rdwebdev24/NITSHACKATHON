const mongoose =  require('mongoose');

const Schema = mongoose.Schema; 

const UserSchema = new Schema(
{
    first_name:{ type: String, require:true , trim:true },
    last_name:{ type: String, require:true,  trim:true},
    email:{ type: String, unique: true , sparse:true},
    password:{ type: String ,require:true},
    contact:{ type: Number ,require:true},
    token:{ type: String,require:true },
    contribution:[{type:mongoose.Schema.Types.ObjectId, ref: "WasteInfo" }]
},
{ timestamps: true }
)

const User = mongoose.model("User",UserSchema)

module.exports = {User}