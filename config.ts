import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_APP_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_APP_ID) {
  throw new Error("FALTAN LAS VARIABLES");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_APP_ID,
};
