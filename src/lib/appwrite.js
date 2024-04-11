import { Client, Account, Databases, Locale } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://appwrite.plussoluciones.com/v1")
  .setProject("660ec4540039f665327a"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const locale = new Locale(client);
export { ID } from "appwrite";
