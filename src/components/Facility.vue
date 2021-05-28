<template>
  <!-- Logo and Campus details -->
  <div class="logo">
    <div class="logo__outercircle">
      <div
        :style="{ backgroundImage: `url(${logo})` }"
        class="logo__innercircle"
      ></div>
    </div>
    <select
      class="facility_dropdown"
      v-if="role == 'admin'"
      id="facility_dropdown"
      v-model="facility"
      @change="slectedFacility"
    >
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>

  <!-- Facility details -->
  <div class="facility">
    <div class="facility__appname">
      <h1 class="facility__name">Facility Tracker</h1>
    </div>
    <div class="icon">
      <div class="icon__home" @click="goHome"></div>
      <div
        class="icon__settings"
        v-if="role == 'admin'"
        @click="goSettings"
      ></div>
      <div
        class="icon__save"
        v-if="role != 'campusAdmin'"
        @click="saveInventory"
      ></div>
      <div class="icon__logout" @click="logOut"></div>
    </div>
    <hr class="hr__details" />
    <div class="facility__employees">
      <div class="facility__strength">
        <!-- Edit on click feature -->
        <input
          type="number"
          id="present"
          @change="employeeBalanceUpdate"
          v-if="editPresent == true"
          v-model.number="present"
        />
        <p v-else class="facility__strength--count">{{ employeeBalance }}</p>
        <p class="facility__strength--pointer" @click="presentState">
          Employee <br />Present
        </p>
      </div>
      <div class="facility__strength">
        <!-- Edit on click feature -->
        <input
          type="number"
          id="strength"
          @change="employeeTotalUpdate"
          v-if="editStrength == true"
          v-model.number="strength"
        />
        <p v-else class="facility__strength--count">{{ employeeTotal }}</p>
        <p class="facility__strength--pointer" @click="strengthState">
          Emplolyee <br />Strength
        </p>
      </div>
    </div>
    <hr class="hr__details" />
    <div class="facility__provider">
      <h4 class="facility__provider--name">Laundrette Solutions</h4>
    </div>
    <div class="facility__provider--date">
      <input type="date" id="selectDate" name="date" v-model="date" />
      <button id="search" @click.prevent="dateSpecific">Search</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      logo: "",
      facility: "Select",
      present: 0,
      strength: 0,
      editPresent: false,
      editStrength: false,
      date: "",
      dateFormatted: ""
    };
  },

  emits: ["go-home", "go-settings"],

  computed: {
    ...mapGetters(["role", "employeeTotal", "employeeBalance", "options"])
  },

  methods: {
    //To allow editing employees present
    presentState() {
      if (this.role == "admin" || this.role == "facilityManager") {
        this.editPresent = !this.editPresent;
      } else return;
    },
    //To allow editiing employee strength
    strengthState() {
      if (this.role == "admin") {
        this.editStrength = !this.editStrength;
      } else return;
    },
    //To render tracking component
    goHome() {
      this.$emit("go-home");
    },
    //To render settings component
    goSettings() {
      this.$emit("go-settings");
    },
    //Method to call an action to retrive inventory details
    slectedFacility() {
      this.$store.commit("selectedFacility", {
        facility: this.facility
      });

      this.$store.dispatch("getInventory", {
        facility: this.facility
      });

      this.$store.dispatch("retriveFacilityDetails");

      // Invoking API for reteiving logo
      let token = localStorage.getItem("token");
      if (this.facility == "Select") {
        return;
      } else {
        axios
          .get(`/logo/${this.facility}`, {
            headers: {
              Authorization: `${token}`,
              "content-type": "image/png",
              accept: "image/png"
            },
            responseType: "blob"
          })
          .then(res => {
            this.logo = URL.createObjectURL(res.data);
          })
          .catch(error => {
            this.$store.commit("alertMessage", {
              message: error.response.data.message
            });
          });
      }
    },
    //update Employee balance on change
    employeeBalanceUpdate() {
      this.$store.commit("employeeInventoryBalance", {
        employeeBalance: this.present
      });
    },
    //update employee total on change
    employeeTotalUpdate() {
      this.$store.commit("employeeInventoryTotal", {
        employeeTotal: this.strength
      });
    },
    //Saving Inventory to Blockchain
    saveInventory() {
      this.$store.dispatch("saveInventory");
    },
    //Update current date
    todaysDate() {
      let date = new Date();
      let currentDay = date.getDate();
      let currentMonth = date.getMonth() + 1;
      if (currentMonth < 10) {
        currentMonth = `0${currentMonth}`;
      }
      let currentYear = date.getFullYear();
      this.date = `${currentYear}-${currentMonth}-${currentDay}`;
      this.dateFormatted = `${currentDay}-${currentMonth}-${currentYear}`;
    },
    //Invoke API to get inventory details for a specific date
    dateSpecific() {
      this.$store.dispatch("dateSpecificInventory", {
        date: this.dateFormatted
      });
    },
    //Invoke Logout API
    logOut() {
      this.$store.dispatch("logout");
    }
  },

  created() {
    this.$store.dispatch("getFacilityNames");
    this.todaysDate();
  },

  beforeUnmount() {
    this.$store.commit("clearFacilityDetails");
  }
};
</script>

<style scoped>
.facility_dropdown {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  border: none;
  background: #f0ecec;
  margin-top: 1%;
  width: fit-content;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}
.facility__provider input {
  font-size: 1.5rem;
  font-weight: 500;
}

#selectDate {
  font-family: "Noto Sans JP", sans-serif;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

select {
  width: fit-content;
  text-align-last: center;
}
</style>
