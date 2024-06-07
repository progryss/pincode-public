import { User, Pincode } from "../models/auth-models.js";

const pincode = async (_req, res) => {
    let record = await Pincode.find({});
    res.status(200).json(record)
}

const user = async (_req, res) => {
    let record = await User.find({});
    res.status(200).json(record)
}

// export all controllers
export { pincode, user }