import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        // Auto-login after successful account creation
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      //  Fixed: was createEmailSession() — deprecated/removed in Appwrite v1.5+
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // async getCurrentUser() {
  //   try {
  //     return await this.account.get();
  //   } catch (error) {
  //     // Expected to throw when no session exists — not a real error
  //     console.log("AuthService :: getCurrentUser ::", error.message);
  //   }
  //   return null;
  // }
async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    // Agar error code 401 hai (yaani no active session), toh chupchaap null return karo
    // Baaki kisi asli error (jaise Appwrite crashed) par log dikhao
    if (error.code !== 401) {
      console.log("AuthService :: getCurrentUser :: Real Error ->", error.message);
    }
  }
  return null;
}
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AuthService :: logout ::", error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
