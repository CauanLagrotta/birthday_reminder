import { JwtPayload } from "jsonwebtoken"

export interface User {
    id: string,
    email: string,
    name: string,
    password: string
}

export interface CustomRequest extends Request {
    user: User
}

export interface DecodedToken extends JwtPayload {
    id: string
}