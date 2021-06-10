<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/userInfo">User Info</router-link>
    <button @click.prevent="logout">Logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
};
</script>
