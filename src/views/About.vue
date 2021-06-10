<template>
  <div class="about">
    <button @click="deleteToken">удалить</button>
  </div>
</template>
<script>
import { deleteFirebaseToken } from "@/push";
export default {
  name: "About",
  methods: {
    async deleteToken() {
      await deleteFirebaseToken();
    },
  },
};
</script>
