const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const User = require("../models/User");
const Form = require("../models/Form");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to generate a unique ID for the form_user_id field

// set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// create an instance of the multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1 MB
});

//checked
router.post("/signup", async (req, res) => {
  try {
    const { user_name, user_email, user_contact, user_password } = req.body;

    // put all info
    if (!user_name || !user_email || !user_contact || !user_password) {
      res.status(400);
      throw new err("Please add all fields");
    }

    // Check if the user already exists
    let userexist = await User.findOne({ user_email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(user_password, salt);

    const user = new User({
      user_name,
      user_email,
      user_contact,
      user_password: hashedpassword,
    });

    // Save the user to the database
    await user.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//checked
router.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    // Check if the client exists
    const user = await User.findOne({ user_email: user_email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Compare the passwords
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user is a client
    if (user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Sign the JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ message: "success", token: token, tag: true });
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
    const userId = decoded.id;

    // Return the protected data
    res.json({ message: `Authenticated user: ${userId}`, tag: true });
  } catch (err) {
    // Return an error if the token is invalid
    res.status(401).json({ error: "You are not authenticated" });
  }
});

//Edit User Details checked
// router.put("/edit_user/:id", async (req, res) => {
//   try {
//     // Find the user by ID and update the details
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     // Save the updated user to the database
//     await user.save();

//     // Return a success message
//     res.send({ message: "User updated successfully" });
//   } catch (error) {
//     // Return an error message
//     res.status(400).send({ error: "Error updating user" });
//   }
// });
const shortid = require("shortid");
function generateFormUserId() {
  return shortid.generate();
}
//Submit Form checked
router.post("/submit_form", upload.array("images", 10), async (req, res) => {
  const token = req.body.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;
  // const formsData = req.body;

  // const files = req.files;
  // const images=files.map((f)=>f.filename);
  // console.log(JSON.stringify(formsData));
  // console.log(JSON.stringify(files))
  // console.log(JSON.stringify(images))

  // console.log(userId);
  const temp_user_name = await User.findOne({_id: userId});
  // console.log(temp_user_name.user_name);


  let { form_title, form_desc, form_budget, form_id, user_id } = req.body;
  form_id = generateFormUserId();

  const retform = new Form({
    form_id,
    form_title,
    form_desc,
    form_budget,
    user_id: userId,
    form_user_name: temp_user_name.user_name,
    form_user_contact: temp_user_name.user_contact
  });

  console.log(retform);

  // // Save the new user forms to the database

  retform.save(function (error, document) {
    if (error) {
      console.error(error);
      return res.json({ message: "try again", tag: false });
    }
    return res.json({ message: "Form submit Success", tag: true });
  });
});

// Edit form dena hki nhi??

// Edit form
// router.route('/forms/edit/:id')
//   // Display the edit form
//   .get(async (req, res) => {
//     try {
//       // Find the form by ID and render the edit form view
//       const form = await Form.findById({form_id:req.params.id});
//       if (!form) {
//         return res.status(404).json({ message: 'Form not found' });
//       }
//       res.render('edit-form', { form });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   })
//   // Update the form data
//   .put(async (req, res) => {
//     try {
//       // Find the form by ID and update the fields
//       const form = await Form.findById(req.params.id);
//       if (!form) {
//         return res.status(404).json({ message: 'Form not found' });
//       }
//       form.form_title = req.body.form_title;
//       form.form_desc = req.body.form_desc;
//       form.form_budget = req.body.form_budget;

//       // Save the updated form data to MongoDB
//       const updatedForm = await form.save();

//       res.redirect('/forms/' + updatedForm.id);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// //Delete form ye bhi dena h ki nhi??
router.delete("/form/delete", async (req, res) => {
  try {
    // Delete the form with the specified form_id
    const { _id } = req.body;
    const deletedForm = await Form.deleteOne({ _id });

    // Check if a form was deleted
    if (!deletedForm.deletedCount) {
      throw new Error(`Form with ID '${_id}' not found`);
    }

    res.status(200).json({ message: `Form with ID '${_id}' will be deleted` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/form/edit", async (req, res) => {

  try {
    let { formid, form_title, form_desc, form_budget } = req.body;

  const form = await Form.findOne({_id: formid});
  console.log(form);

  form.form_title = form_title,
    form.form_desc = form_desc,
    form.form_budget = form_budget;

  form.save(function (error, document) {
    if (error) {
      console.error(error);
      return res.json({ message: "try again", tag: false });
    }
    //console.log(document);
    return res.json({ message: form, tag: true });
  });

  } catch(err) {
    return res.json(err);
  }
  
});

router.post("/userdets", async (req, res) => {
  const id = req.body.id;
  let user = {};
  user = await User.findOne({ _id: id });
  if (user) {
    return res.json({
      message: user,
      tag: true,
    });
  }
  return res.json({
    message: user,
    tag: false,
  });
});
// Get all forms submitted by user with id
router.post("/forms_by_user", async (req, res) => {
  try {
    const id = req.body.id;
    const forms = await Form.find({ user_id: id });
    // console.log(forms)
    if (forms) {
      return res.json({ message: forms, tag: true });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, tag: false });
  }
});

router.post("/forms_by_id", async (req, res) => {
  try {
    const id = req.body.id;
    const forms = await Form.find({ _id: id });
    // console.log(forms)
    if (forms) {
      return res.json({ message: forms, tag: true });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, tag: false });
  }
});

module.exports = router;
