<template>
  <div class="tab-bar-item" @click="handleClick">
    <template v-if="!isActive">
      <slot name="item-img"></slot>
    </template>
    <template v-else>
      <slot name="item-active-mg"></slot>
    </template>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      
    };
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) > -1
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },

  methods:{
    handleClick(){
      this.$router.push({
        path:this.path
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.item-text {
  font-size: 14px;
}
.activeStyl {
  color: red;
}
</style>