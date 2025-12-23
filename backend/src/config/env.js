//this is to make the env components globally available 
// such that to use env in different module we dot need to parse it again and again

import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL
}