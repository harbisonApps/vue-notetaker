<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/notes">Notes</router-link> |
      <router-link to="/facts">Facts</router-link> |
      <router-link to="/dashboard">Admin</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <button @click="logOut" type="submit">Log Out</button>
    </div>
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
import swal from "sweetalert";
export default {
  name: "App",
  data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    async logOut() {
      try {
          //await this.$http.get('/user/logout')
        
          //let token = response.data.token;
         
        localStorage.removeItem("jwt")
         //if (!token) {
          swal("Success", "You are Logged Out", "success");
        this.$router.push("/login");
       //}
      } catch (err) {
        swal("Error", "Something went wrong, please try again", "error");
        console.log(err.response);
      }
    },

    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
