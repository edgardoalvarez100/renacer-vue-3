import { account } from "@/lib/appwrite";
import { router } from "@/router";
import { defineStore } from "pinia";

const useUserStore = defineStore("users", {
  state: () => {
    return {
      user: null,
      loadingSession: false,
      errorUser: null,
    };
  },
  actions: {
    async logout() {
      this.loadingSession = true;
      try {
        await account.deleteSession("current");
        this.user = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingSession = false;
      }
    },
    async currentUser() {
      this.loadingSession = true;
      try {
        const res = await account.get();

        this.user = { id: res.$id, email: res.email, name: res.name };
      } catch (error) {
        this.user = null;
        this.errorUser = error.code;
      } finally {
        this.loadingSession = false;
      }
    },
  },
});

export { useUserStore };
