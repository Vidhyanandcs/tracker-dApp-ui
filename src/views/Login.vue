<template>
  <div class="login-container">
    <div class="login__tab">
      <div class="dropdown_container">
        <h2 class="login__welcome">Facility Tracker</h2>
        <input type="email" placeholder="Email" v-model="email" />
        <select class="my_dropdown" v-model="loginPerson">
          <option v-for="person in persons" :key="person">{{ person }}</option>
        </select>
        <input type="password" placeholder="Password" v-model="password" />
        <button class="login__button" @click.prevent="login">Login</button>
      </div>
    </div>
    <Popup :alert="alert" v-if="alert.length != 0" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";
export default {
  data() {
    return {
      email: "",
      loginPerson: "Campus Admin",
      persons: ["Campus Admin", "Admin", "Facility Manager"],
      role: "",
      password: ""
    };
  },
  components: {
    Popup
  },

  computed: {
    ...mapGetters(["alert"])
  },

  methods: {
    login() {
      // Updating the role
      if (this.loginPerson == "Admin") {
        this.role = "admin";
      } else if (this.loginPerson == "Facility Manager") {
        this.role = "facilityManager";
      } else if (this.loginPerson == "Campus Admin") {
        this.role = "campusAdmin";
      }

      //Executing login action
      this.$store.dispatch("login", {
        email: this.email,
        role: this.role,
        password: this.password
      });
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style scoped>
input {
  border: 0;
  box-shadow: none;
  font-family: "Noto Sans JP", sans-serif;
  width: 25rem;
  background-color: #f2f2f2;
  border-color: #f2f2f2;
  margin-bottom: 1rem;
  padding: 0.4rem 0 0.4rem 0.2rem;
}

/* Remove the default properties of input and select */
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
</style>
