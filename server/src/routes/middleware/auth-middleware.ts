import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../db/models/users";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded: any = jwt.verify(token as string, process.env.Auth_Token_SECRET as string);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) console.log("cant find user");

    //   @ts-ignore
    req.token = token;
    //   @ts-ignore
    req.user = user;
    console.log("auth ok");
    next();
  } catch (error) {
    res.status(401).send("Error: Please autenticate");
  }
};
