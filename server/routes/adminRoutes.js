const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const User = require("../models/User");
const Form = require("../models/Form");

router.post("/signup", async (req, res) => {
  try {
    const { admin_name, admin_email, admin_password } = req.body;

    // put all info
    if (!admin_name || !admin_email || !admin_password) {
      res.status(400);
      throw new err("Please add all fields");
    }

    // Check if the user already exists
    let adminexist = await Admin.findOne({ admin_email });
    if (adminexist) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(admin_password, salt);

    const admin = new Admin({
      admin_name,
      admin_email,
      admin_password: hashedpassword,
    });

    // Save the user to the database
    await admin.save();

    res.status(200).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    // Check if the client exists
    const admin = await Admin.findOne({ admin_email: admin_email });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Compare the passwords
    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user is a client
    // if (!admin.isAdmin) {
    //   return res.status(401).json({ msg: "Unauthorized" });
    // }

    // Sign the JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    return res.json({ message: "sucess", token: token, tag: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Authentication route
router.post("/auth", (req, res) => {
  // Get the token from the authorization header
  const token = req.body.token;

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user ID from the decoded token
    const adminId = decoded.id;

    // Return the protected data
    return res.json({ message: `Authenticated user: ${adminId}`, tag: true });
  } catch (err) {
    // Return an error if the token is invalid
    res.status(401).json({ error: "You are not authenticated" });
  }
});

//Edit User Details checked
// router.put("/edit_admin/:id", async (req, res) => {
//   try {
//     // Find the user by ID and update the details
//     const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     // Save the updated user to the database
//     await admin.save();

//     // Return a success message
//     res.send({ message: "Admin updated successfully" });
//   } catch (error) {
//     // Return an error message
//     res.status(400).send({ error: "Error updating admin" });
//   }
// });

//get user dets
// router.get("/user/:id",async(req,res) => {
//   try {
//     const user=await User.find(req.params.)

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// })

//allusers
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    // console.log(forms)
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/admindets", async (req, res) => {
  const id = req.body.id;
  let admin = {};
  admin = await Admin.findOne({ _id: id });
  if (admin) {
    return res.json({
      message: admin,
      tag: true,
    });
  }
  return res.json({
    message: admin,
    tag: false,
  });
});

//get all forms
router.post("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/action_by_admin", async (req, res) => {
  try {
    let {action, id} = req.body;


    const form = await Form.findOne({_id: id});
    form.action = action;
    console.log(action);

    if(action == "accept"){
      form.status = "Accepted";
    }
    else if(action == "deny"){
      form.status = "Rejected";
    }
    else{
      form.status = "Pending"
    }

    form.save(function (error, document) {
      if (error) {
        console.error(error);
        return res.json({ message: "try again", tag: false });
      }
      //console.log(document);
      return res.json({ message: form, tag: true });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
