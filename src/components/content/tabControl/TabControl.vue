<template>
  <div class="tab-control">
    <div
      v-for="(item, index) of titles"
      :key="index"
      class="tab-control-item"
      @click="tabControlClick(index)"
    >
      <span :class="{ acitve: currentIndex === index }">{{ item }}</span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabControlClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    },
  },
};
</script>
<style lang='scss' scoped>
.tab-control {
  display: flex;
  font-size: 14px;
  height: 40px;
  background: #fff;
  .tab-control-item {
    flex: 1;
    text-align: center;
    position: relative;

    > span {
      padding: 5px;
    }
    > span.acitve {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>