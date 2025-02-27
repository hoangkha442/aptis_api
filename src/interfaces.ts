import { users_role } from "@prisma/client";
import { Request } from "express";

export interface UserPayload {
    data: {
      user_id: number;
    };
}
  
export interface RequestWithUser extends Request {
    user: UserPayload;
}

export interface UpdateUserRole {
  password?: string;
  role: users_role;
}