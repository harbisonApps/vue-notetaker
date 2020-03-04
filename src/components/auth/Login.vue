<template>
    <div>
        <form style="margin-top:30px;height:auto; !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            placeholder="Email"
            v-model="login.email"
            required
          />
        <br>
        <br>
        <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>
            <br>
            <br>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
        </form>
      </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "Error");
          this.$router.push("/dashboard");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
};
</script>
<style scoped>
form {
    border: black 1px solid;
    padding: 10px;
    margin: auto;
}
</style>