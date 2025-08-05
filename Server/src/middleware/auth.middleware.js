import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(404).json({ message: "UnAuthrized User" });

    const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeUser)
      return res.status(404).json({ message: "UnAuthrized User" });

    const orgUser = await User.findById(decodeUser.userId).select("-password");
    if (!orgUser) return res.status(404).json({ message: "Invalid User" });

    req.user = orgUser;

    next();
  } catch (error) {
    console.log('Error in middleware File',error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
};

/*
step-1 : get the 'token' from that we have stored in our browser by write the code 'req.cookies.jwt'.
step-2 :and decode it  
step-3 : fetch OrginalUser from decoded value  (through ID, or any Other filed as you can)
step-4 : store the decoded 'User' value in server like (req.user = decodedUser)
step-5 : call the 'next()' to keep the route to forward

*/
