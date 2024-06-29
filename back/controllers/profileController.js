import { UserModel } from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId).select('-password'); //Exclude password field

        if (!user) {
            return res.status(404).json({success: false, message:'User not found'});
        }

        res.json({success: true, user});
    } catch(error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Server error'});
    }
};