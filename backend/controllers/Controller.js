const { User } = require("../model/userSchema");
const { WasteInfo } = require("../model/WasteInfoSchema");
const { emi_fac } = require("../utilities/emi_factor");
const {UserExits} = require('../utilities/checkuser')
// getting all users
const GET_ALL_USER = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ msg: "success", status: 200, users });
  } catch (error) {
    return res.send({ msg: "internal server error", status: 500 });
  }
};
// getting all waste data
const GET_WASTE_INFO = async (req, res) => {
  try {
    const data = await WasteInfo.find();
    res.send({ msg: "success", status: 200, data });
  } catch (error) {
    res.send({ msg: "internal server error", status: 500 });
  }
};
// getting particular user contribution
const GET_USER_WASTE = async (req,res)=> {
  try {
    const {userId} = req.params;
    const user = UserExits(userId);
    if(!user){return res.send(user)}
    const {contribution} = await User.findById(userId).populate('contribution')
    res.send({msg:"success",status:200,data:contribution});
  } catch (error) {
    res.send({msg:"internal server error",status:500});
  }
}
// posting waste info by user
const POST_WASTE_INFO = async (req, res) => {
  try {
    const { weight, nature, duration, location, image, description, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {res.send({ msg: "user dosen't exits", status: 400 })}
    const ef = emi_fac[nature];
    const emif_val = Math.floor(ef * weight);
    
    const recycle = ["metal", "stationery", "E_waste", "Plastics", "glass"];

    const non_recycle = [
      "Organic",
      "sewage",
      "domestic_waste",
      "chemical_waste",
      "construction_waste",
    ];
    const biodegradable = [
      "Organic",
      "metal",
      "stationery",
      "sewage",
      "domestic_waste",
    ];
    const non_biodegradable = [
      "glass",
      "Plastics",
      "E_waste",
      "chemical_waste",
      "construction_waste",
    ];

    // checking for recyclable and biodegradable
    const bio = biodegradable.filter((item) => item == nature);
    const non_bio = non_biodegradable.filter((item) => item == nature);

    const re = recycle.filter((item) => item == nature);
    const non_re = non_recycle.filter((item) => item == nature);

    const newData = {
      nature,
      weight,
      duration,
      location,
      image,
      description,
      EmissionFactor: emif_val,
      biodegradable: bio.length ? true : false,
      non_biodegradable: non_bio.length ? true : false,
      recyclable: re.length ? true : false,
      non_recyclable: non_re.length ? true : false,
    };

    // creating a new waste object 
    const newWaste = await WasteInfo.create(newData);
    // updating the user contribution array;
    const wasteId = newWaste._id;
    user.contribution.push(wasteId);
    await user.save();

    res.send({ msg: "success", status: 200 , newWaste});
  } catch (error) {
    return res.send({ msg: "internal server error", status: 500 });
  }
};

const DELETE_WASTE_INFO = async (req, res) => {};

module.exports = {
  GET_ALL_USER,
  GET_WASTE_INFO,
  GET_USER_WASTE,
  POST_WASTE_INFO,
  DELETE_WASTE_INFO
};
