import { Client, Account, Databases, Locale, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://appwrite.plussoluciones.com/v1")
  .setProject("660ec4540039f665327a"); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const locale = new Locale(client);

export { account, databases, locale, client, ID };
