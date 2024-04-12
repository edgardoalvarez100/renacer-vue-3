import { defineStore } from "pinia";

const useUserStore = defineStore("users", {
  state: () => {
    return {
      user: null,
    };
  },
  actions: {
    async logout() {
      try {
        await account.deleteSession("current");
        this.user = null;
      } catch (error) {}
    },
  },
});

export { useUserStore };
