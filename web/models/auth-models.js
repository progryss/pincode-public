import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
})

let PincodeSchema = new mongoose.Schema({
    pincode: {
        type: String
    }
})

let User = mongoose.model("User", UserSchema);
let Pincode = mongoose.model("Generic_Pincode", PincodeSchema);

export {User, Pincode}