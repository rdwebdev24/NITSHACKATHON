const mongoose =  require('mongoose');

const Schema = mongoose.Schema; 

const WasteInfoSchema = new Schema(
{
    nature:{type:String,require:true},
    weight:{type:Number,require:true},
    duration:{type:String,require:true},
    location:{type:String,require:true},
    image:{type:String,require:true},
    description:{type:String,require:true},
    EmissionFactor:{type:Number,require:true},
    biodegradable:{type:Boolean,require:true},
    non_biodegradable:{type:Boolean,require:true},
    recyclable:{type:Boolean,require:true},
},
{ timestamps: true }
)

const WasteInfo = mongoose.model("WasteInfo",WasteInfoSchema)

module.exports = {WasteInfo}