<template>
  <div class="toast" v-show="showToast">{{ message }}</div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      showToast: false,
    };
  },
  methods: {
    show(msg, delay = 1500) {
      this.message = msg;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.message = "";
      }, delay);
    },
  },
};
</script>
<style lang='scss' scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(90, 90, 90, 0.9);
  padding: 10px;
  color: #fff;
  z-index: 9;
}
</style>