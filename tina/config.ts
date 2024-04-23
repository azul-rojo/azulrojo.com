import { defineConfig } from "tinacms";
import { collections } from "./collections";

const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
const TINA_TOKEN = IS_PRODUCTION
  ? process.env.TINA_TOKEN
  : process.env.TINA_TOKEN_DEV;
const BRANCH_NAME = IS_PRODUCTION ? "main" : "dev";

export default defineConfig({
  token: TINA_TOKEN,
  branch: BRANCH_NAME,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: collections,
  },
});
