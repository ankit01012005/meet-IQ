import db_connect from "./db.js";
import User from "../models/User.js";
import {Inngest} from "inngest"

export const inngest = new Inngest({id:"meet-IQ"})

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

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
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const {id} = event.data;

    await User.deleteOne({clerkId:id});

    //todo soemthing else
  }
);

export const functions = [syncUser,deleteUser];


