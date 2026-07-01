import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

/**
 * AuthService
 * Wraps Appwrite Account API for auth operations.
 *
 * FIX: `createEmailSession()` was deprecated in Appwrite v1.5 and removed
 * in v1.6+. Updated to `createEmailPasswordSession()` which is the current
 * correct method. All other logic (createAccount auto-login, getCurrentUser
 * null-return, deleteSessions on logout) is unchanged.
 */
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
      // ✅ Fixed: was createEmailSession() — deprecated/removed in Appwrite v1.5+
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // Expected to throw when no session exists — not a real error
      console.log("AuthService :: getCurrentUser ::", error.message);
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
