import { Client, Account, Databases, Locale, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://appwrite.plussoluciones.com/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const locale = new Locale(client);

export { account, databases, locale, client, ID };
