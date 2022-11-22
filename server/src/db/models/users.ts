import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;

//   return userObject;
// };

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.Auth_Token_SECRET as string, { expiresIn: "1d" });
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { user: null, error: "User not found." };
    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return { user: null, error: "Failed to login." };
    }
    return { user, error: null };
  } catch (error) {
    console.log(error);
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password as string, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
