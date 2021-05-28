<template>
  <div id="popup1" class="overlay">
    <div class="popup">
      <a class="close" @click="closeAlert" href="#">&times;</a>
      <div class="content">
        {{ alert }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alert"],

  methods: {
    closeAlert() {
      this.$store.commit("clearAlertMessage");
    }
  }
};
</script>

<style scoped>
.overlay {
  grid-column-start: 1;
  grid-column-end: 19;
  grid-row-start: 1;
  grid-row-end: 19;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.popup {
  font-size: 2.5rem;
  font-weight: 500;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  height: 20%;
  transition: all 5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.close {
  align-self: flex-end;
}

.content {
  margin-bottom: 8%;
}

.popup .close {
  transition: all 200ms;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06d85f;
}
.popup .content {
  max-height: 30%;
}

@media screen and (max-width: 700px) {
  .popup {
    width: 70%;
  }
}
</style>
