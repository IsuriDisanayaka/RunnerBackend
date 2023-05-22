const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,

  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  }
});

AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
})
AdminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("incorrect password");
  }
  throw Error("Incorrect Email");
}
module.exports = mongoose.model('Admin', AdminSchema);
