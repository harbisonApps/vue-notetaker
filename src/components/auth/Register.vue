<template>
  <div>
        <form
          style="margin-top:30px;height:auto; !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="name"
            placeholder="Name"
            v-model="register.name"
            required
          />
          <br><br>
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="register.email"
            required
          />
          <br><br>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="register.password"
          />
          <p> Already have an account??
              <router-link to="/">click here</router-link>
              <br><br>
              <button type="submit">
                Sign in
              </button>
  
          </p>
        </form>
      </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "Error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
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