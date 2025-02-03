import { RequestHandler } from "express";
import { createUserService } from "../../services/user/create_user.service";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await createUserService(email, name, password);

    res.status(201).json(user);
    
  } catch (error) {
    if(error instanceof Error){
        if(error.message === "User already exists"){
          res.status(400).json({message: error.message})

        }else{
          res.status(500).json({message: "Internal server error"})
        }
    }else{
        res.status(500).json({message: "Unknown error"})
    }
  }
};
