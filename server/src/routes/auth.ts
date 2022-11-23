import { Router } from "express";
import { check, validationResult } from "express-validator";

import User from "../db/models/users";
import { checkAuth } from "./middleware/auth-middleware";

const router = Router();

interface response {
  error: null | string | string[];
  user: any;
  token: null | string;
}

router.post(
  "/signin",
  check("fullName", "Full Name is required").not().isEmpty(),
  check("email", "Email is not valid").isEmail(),
  check("password", "Password should countain at least 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const { email, password, fullName } = req.body;
    const validtionErrors = validationResult(req);

    if (!validtionErrors.isEmpty()) {
      const errors = validtionErrors.array().map((error) => {
        return { msg: error.msg };
      });
      return res.send(errors);
    }
    try {
      const response: response = {
        error: null,
        user: undefined,
        token: null,
      };
      const user = await User.findOne({ email });

      if (user) {
        response.error = "Email already in use";
        return res.status(400).send(response);
      }

      const newUser = await User.create({ email, password, fullName });
      //@ts-ignore
      response.token = await newUser.generateAuthToken();
      response.user = newUser;
      res.send(response);
      console.log("user sign in ");
    } catch (error: any) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response: response = {
    error: null,
    user: undefined,
    token: null,
  };
  try {
    // @ts-ignore
    const user = await User.findByCredentials(email, password);
    response.token = await user.user?.generateAuthToken();
    response.user = user.user;
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/logout", checkAuth, async (req, res) => {
  try {
    // @ts-ignore
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    // @ts-ignore
    await req.user.save();
    console.log("user loged out ");

    res.send("userExit");
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

export default router;
