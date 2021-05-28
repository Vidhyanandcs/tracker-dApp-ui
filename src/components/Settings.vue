<template>
  <div class="settings">
    <div v-if="editFacility == true" class="credential">
      <label for="facilityName">Name of the Campus:</label>
      <input v-model="editedFacility" type="text" name="facilityName" />
    </div>
    <p class="credential__display " v-if="editFacility == false">
      Name of Campus:
      <span class="credential__display-text">{{ facility }}</span>
    </p>
    <div v-if="editFacility == true" class="credential">
      <label for="CAEmail">Email Id of Campus Admin:</label>
      <input v-model="campusAdminEmail" type="text" name="CAEmail" />
    </div>
    <p class="credential__display " v-if="editFacility == false">
      Email Id of Campus Admin:
      <span class="credential__display-text">{{ campusAdminId }}</span>
    </p>
    <div v-if="editFacility == true" class="credential">
      <label for="CApassword">Campus Admin Password:</label>
      <input v-model="campusAdminPassword" type="text" name="CApassword" />
    </div>
    <div v-if="editFacility == true" class="credential">
      <label for="FMEmail">Email Id of Facility Manager:</label>
      <input
        v-model="facilityManagerEmail"
        type="text"
        id="FMEmail"
        name="FMEmail"
      />
    </div>
    <p class="credential__display " v-if="editFacility == false">
      Email Id of Facility Manager:
      <span class="credential__display-text">{{ facilityManagerId }}</span>
    </p>
    <div v-if="editFacility == true" class="credential">
      <label for="FMpassword">Facility Manager Password:</label>
      <input v-model="facilityManagerPassword" type="text" name="FMpassword" />
    </div>
    <div v-if="editFacility == true" class="image">
      <label for="logo">Change Logo:</label>
      <input type="file" id="logo" ref="logo" accept="image/*" />
    </div>
    <div style="font-size:1.8rem; padding-left:5%">
      <p>Note:Facility name once created cannot be edited.</p>
    </div>
    <div class="buttonSet1">
      <div class="clear__button">
        <button @click.prevent="facilityStatus">Edit/Create Campus</button>
      </div>
      <div class="save__button">
        <button @click.prevent="saveEditDetails">Save Edited Campus</button>
      </div>
    </div>
    <div class="buttonSet2">
      <div class="create__button">
        <button @click.prevent="createFacility">Save New Campus</button>
      </div>
      <div class="delete__button">
        <button @click.prevent="deleteFacility">Delete Campus</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      editedFacility: "",
      campusAdminEmail: "",
      campusAdminPassword: "",
      facilityManagerEmail: "",
      facilityManagerPassword: "",
      password: "",
      logo: "",
      editFacility: false
    };
  },
  computed: {
    ...mapGetters(["facility", "facilityManagerId", "campusAdminId"])
  },
  methods: {
    clearFields() {
      (this.editedFacility = ""),
        (this.campusAdminEmail = ""),
        (this.campusAdminPassword = ""),
        (this.facilityManagerEmail = ""),
        (this.facilityManagerPassword = "");
    },

    facilityStatus() {
      this.editFacility = !this.editFacility;
    },

    //Create a facility
    createFacility() {
      const token = localStorage.getItem("token");
      const campusAdminName = "Campus Admin";
      const facilityManagerName = "Facility Manager";
      this.logo = this.$refs.logo.files[0];
      let logo = new FormData();
      logo.append("logo", this.logo);
      logo.append("name", this.$refs.logo.files[0].name);
      logo.append("campusAdminEmail", this.campusAdminEmail);
      logo.append("campusAdminName", campusAdminName);
      logo.append("campusAdminPassword", this.campusAdminPassword);
      logo.append("facilityManagerEmail", this.facilityManagerEmail);
      logo.append("facilityManagerName", facilityManagerName);
      logo.append("facilityManagerPassword", this.facilityManagerPassword);

      //post request for creating a facility
      axios
        .post(`/facility/${this.editedFacility}`, logo, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": `multipart/form-data; boundary=${logo._boundary}`
          }
        })
        .then(() => {
          this.$store.dispatch("getFacilityNames");
          this.$store.commit("alertMessage", {
            message: "Facility Created"
          });
        })
        .catch(error => {
          this.$store.commit("alertMessage", {
            message: error.response.data.message
          });
        });
    },
    //check if logo is present and then dispatch to edit details
    saveEditDetails() {
      this.$store.dispatch("saveEditedDetails", {
        campusAdminEmail: this.campusAdminEmail,
        campusAdminPassword: this.campusAdminPassword,
        facilityManagerEmail: this.facilityManagerEmail,
        facilityManagerPassword: this.facilityManagerPassword
      });
      this.editFacility = !this.editFacility;
    },
    deleteFacility() {
      this.$store.dispatch("deleteFacility");
    }
  }
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  background-color: var(--white);
  border-radius: 1.5rem;
  grid-column-start: 7;
  grid-column-end: 18;
  grid-row-start: 2;
  grid-row-end: 18;
}

label {
  font-size: 1.4rem;
  font-weight: 500;
}

button {
  color: #ffffff;
  width: 12rem;
  height: auto;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
}

.credential {
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-left: 5%;
}

.credential__display {
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-left: 5%;
}

.credential__display-text {
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 500;
  color: darkolivegreen;
  margin-left: 2%;
}

.credential input {
  margin-left: 2%;
  height: 2rem;
}

.image {
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-left: 5%;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.image input {
  height: 2rem;
  margin-left: 2%;
}

.buttonSet1 {
  display: flex;
  justify-content: space-evenly;
}

.buttonSet2 {
  display: flex;
  justify-content: space-evenly;
}

.create__button button {
  background-color: green;
}

.delete__button button {
  background-color: rgb(247, 53, 53);
}

.save__button button {
  background-color: blue;
}

.clear__button button {
  background-color: chocolate;
}

@media only screen and (max-width: 1024px) {
  .settings {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-evenly;
    background-color: var(--white);
    border-radius: 1.5rem;
    grid-column-start: 2;
    grid-column-end: 18;
    grid-row-start: 9;
    grid-row-end: 18;
  }
}

@media only screen and (max-width: 420px) {
  .settings {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-evenly;
    background-color: var(--white);
    border-radius: 1.5rem;
    grid-column-start: 2;
    grid-column-end: 18;
    grid-row-start: 6;
    grid-row-end: 18;
    margin-top: 5%;
  }

  .credential {
    font-size: 1.8rem;
    margin-right: 2%;
  }
}
</style>
