const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: true,
    },
    admin_email: {
      type: String,
      required: true,
      unique: true,
    },
    admin_password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admins", Admin);
