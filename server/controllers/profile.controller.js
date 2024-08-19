import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    // const { id } = req.params;
    const { id } = req.query;

    //Checking ID Format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error("Error In Get Profile Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, username, email, phone, dateOfBirth, gender } = req.body;
    const { id } = req.params;

    //Checking ID Format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (e) {
    console.error("Error In Update Profile Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error In Get All Doctors Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
