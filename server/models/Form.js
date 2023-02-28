const mongoose = require("mongoose");

const Form = new mongoose.Schema({
  form_id: {
    type: String,
    
  },
  form_title:{
    type:String,
    required:true,
  },
  form_desc: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      // required: true
    }
  ],
  form_budget: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  form_user_name: {
    type: String,
  },
  form_user_contact: {
    type: String,
  },
  status:{
    type:String,
    default: "Pending"
  },
  action: {
    type: String,
  }
});

module.exports = mongoose.model("Form", Form);
