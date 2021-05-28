<template>
  <!-- Tracking Section -->
  <div class="tracking">
    <div class="tracking__square1">
      <div class="tracking__item">
        <div class="tracking__icon--detergent" @click="editDetergent"></div>
        <p class="tracking__name">Liquid Detergent</p>
      </div>
      <div>
        <input
          id="detergentAvailable"
          @change="detergentBalanceUpdate"
          v-if="editDetergentAvailable == true"
          v-model.number="detergentAvailable"
        />
        <input
          id="detergentCapacity"
          @change="detergentTotalUpdate"
          v-if="editDetergentCapacity == true"
          v-model.number="detergentCapacity"
        />
        <p v-if="displayDetergentValue == true" class="tracking__quantity">
          {{ detergentBalance }}/{{ detergentTotal }} Liters
        </p>
      </div>

      <div class="tracking__bar">
        <div
          class="tracking__bar--progress1"
          :style="{ width: progressBar1 }"
        ></div>
      </div>
    </div>
    <div class="tracking__square2">
      <div class="tracking__item">
        <div class="tracking__icon--washer" @click="editWasher"></div>
        <p class="tracking__name">Washers</p>
      </div>
      <div>
        <input
          id="washersWorking"
          @change="washerBalanceUpdate"
          v-if="editWashersWorking == true"
          v-model.number="washersWorking"
        />
        <input
          id="washersCapacity"
          @change="washerTotalUpdate"
          v-if="editWashersCapacity == true"
          v-model.number="washersCapacity"
        />
        <p v-if="displayWasherValue == true" class="tracking__quantity">
          {{ washerBalance }}/{{ washerTotal }} Working
        </p>
      </div>
      <div class="tracking__bar">
        <div
          class="tracking__bar--progress2"
          :style="{ width: progressBar2 }"
        ></div>
      </div>
    </div>
    <div class="tracking__square3">
      <div class="tracking__item">
        <div class="tracking__icon--drier" @click="editDrier"></div>
        <p class="tracking__name">Dryers</p>
      </div>
      <div>
        <input
          id="driersWorking"
          @change="dryerBalanceUpdate"
          v-if="editDriersWorking == true"
          v-model.number="driersWorking"
        />
        <input
          id="driersCapacity"
          @change="dryerTotalUpdate"
          v-if="editDriersCapacity == true"
          v-model.number="driersCapacity"
        />
        <p v-if="displayDrierValue == true" class="tracking__quantity">
          {{ dryerBalance }}/{{ dryerTotal }} Working
        </p>
      </div>
      <div class="tracking__bar">
        <div
          class="tracking__bar--progress3"
          :style="{ width: progressBar3 }"
        ></div>
      </div>
    </div>
    <div class="tracking__square4">
      <div class="tracking__item">
        <div class="tracking__icon--spare" @click="editSpare"></div>
        <p class="tracking__name">Spares</p>
      </div>
      <div>
        <input
          id="sparesAvailable"
          @change="spareBalanceUpdate"
          v-if="editSparesWorking == true"
          v-model.number="sparesAvailable"
        />
        <input
          id="sparesCapacity"
          @change="spareTotalUpdate"
          v-if="editSparesCapacity == true"
          v-model.number="sparesCapacity"
        />
        <p v-if="displaySpareValue == true" class="tracking__quantity">
          {{ spareBalance }}/{{ spareTotal }} Available
        </p>
      </div>
      <div class="tracking__bar">
        <div
          class="tracking__bar--progress4"
          :style="{ width: progressBar4 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // Detergent Tracker
      detergentAvailable: 0,
      detergentCapacity: 0,
      editDetergentAvailable: false,
      editDetergentCapacity: false,
      displayDetergentValue: true,

      // Washer Tracker
      washersWorking: 0,
      washersCapacity: 0,
      editWashersWorking: false,
      editWashersCapacity: false,
      displayWasherValue: true,

      // Drier Tracker
      driersWorking: 0,
      driersCapacity: 0,
      editDriersWorking: false,
      editDriersCapacity: false,
      displayDrierValue: true,

      // Spare Tracker
      sparesAvailable: 0,
      sparesCapacity: 0,
      editSparesWorking: false,
      editSparesCapacity: false,
      displaySpareValue: true
    };
  },

  computed: {
    ...mapGetters([
      "role",
      "detergentTotal",
      "detergentBalance",
      "washerTotal",
      "washerBalance",
      "dryerTotal",
      "dryerBalance",
      "spareBalance",
      "spareTotal"
    ]),
    //Progress Bars
    progressBar1() {
      if (this.detergentBalance == 0 || this.detergentTotal == 0) {
        return `${0}%`;
      } else {
        return `${(this.detergentBalance / this.detergentTotal) * 100}%`;
      }
    },
    progressBar2() {
      if (this.washerBalance == 0 || this.washerTotal == 0) {
        return `${0}%`;
      } else {
        return `${(this.washerBalance / this.washerTotal) * 100}%`;
      }
    },
    progressBar3() {
      if (this.dryerBalance == 0 || this.dryerTotal == 0) {
        return `${0}%`;
      } else {
        return `${(this.dryerBalance / this.dryerTotal) * 100}%`;
      }
    },
    progressBar4() {
      if (this.spareBalance == 0 || this.spareTotal == 0) {
        return `${0}%`;
      } else {
        return `${(this.spareBalance / this.spareTotal) * 100}%`;
      }
    }
  },

  methods: {
    editDetergent() {
      if (this.role == "admin") {
        this.editDetergentAvailable = !this.editDetergentAvailable;
        this.editDetergentCapacity = !this.editDetergentCapacity;
        this.displayDetergentValue = !this.displayDetergentValue;
      } else if (this.role == "facilityManager") {
        this.editDetergentAvailable = !this.editDetergentAvailable;
        this.displayDetergentValue = !this.displayDetergentValue;
      } else return;
    },

    editWasher() {
      if (this.role == "admin") {
        this.editWashersWorking = !this.editWashersWorking;
        this.editWashersCapacity = !this.editWashersCapacity;
        this.displayWasherValue = !this.displayWasherValue;
      } else if (this.role == "facilityManager") {
        this.editWashersWorking = !this.editWashersWorking;
        this.displayWasherValue = !this.displayWasherValue;
      } else return;
    },

    editDrier() {
      if (this.role == "admin") {
        this.editDriersWorking = !this.editDriersWorking;
        this.editDriersCapacity = !this.editDriersCapacity;
        this.displayDrierValue = !this.displayDrierValue;
      } else if (this.role == "facilityManager") {
        this.editDriersWorking = !this.editDriersWorking;
        this.displayDrierValue = !this.displayDrierValue;
      } else return;
    },

    editSpare() {
      if (this.role == "admin") {
        this.editSparesWorking = !this.editSparesWorking;
        this.editSparesCapacity = !this.editSparesCapacity;
        this.displaySpareValue = !this.displaySpareValue;
      } else if (this.role == "facilityManager") {
        this.editSparesWorking = !this.editSparesWorking;
        this.displaySpareValue = !this.displaySpareValue;
      } else return;
    },
    //update edited values for tracker (detergent, washer, dryer, spare)
    detergentBalanceUpdate() {
      this.$store.commit("detergentInventoryBalance", {
        detergentBalance: this.detergentAvailable
      });
    },

    detergentTotalUpdate() {
      this.$store.commit("detergentInventoryTotal", {
        detergentTotal: this.detergentCapacity
      });
    },

    washerBalanceUpdate() {
      this.$store.commit("washerInventoryBalance", {
        washerBalance: this.washersWorking
      });
    },

    washerTotalUpdate() {
      this.$store.commit("washerInventoryTotal", {
        washerTotal: this.washersCapacity
      });
    },

    dryerBalanceUpdate() {
      this.$store.commit("dryerInventoryBalance", {
        dryerBalance: this.driersWorking
      });
    },

    dryerTotalUpdate() {
      this.$store.commit("dryerInventoryTotal", {
        dryerTotal: this.driersCapacity
      });
    },

    spareBalanceUpdate() {
      this.$store.commit("spareInventoryBalance", {
        spareBalance: this.sparesAvailable
      });
    },

    spareTotalUpdate() {
      this.$store.commit("spareInventoryTotal", {
        spareTotal: this.sparesCapacity
      });
    }
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
