import db_connect from "./db.js";
import User from "../models/User.js";
import {Inngest} from "inngest"
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({id:"meet-IQ"})

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    
    try{
      await db_connect();
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url
      } = event.data;

      const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      };

      await User.create(newUser);
      //todo soemthing else
      await upsertStreamUser({
        id:newUser.clerkId.toString(),
        name:newUser.name,
        image:newUser.profileImage
      })

    }catch(e){
      console.log("error in sync user at inngest",error)

    }
    
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try{
      await db_connect();

      const {id} = event.data;

      await User.deleteOne({clerkId:id});
    
      //todo soemthing else
      await deleteStreamUser(id.toString())

    }catch(e){
      console.log("error in delete User at inngest",error)

    }

    
  }
);

export const functions = [syncUser,deleteUser];


