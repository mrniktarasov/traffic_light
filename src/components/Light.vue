<template>
  <div  class="light"
        :class="lightClass"
        :style="lightStyle"></div>
</template>

<script>
export default {
  props: {
    noDisable: Number,
    color: String,
    time: Number
  },
  computed: {
    lightStyle: function() {
      return {backgroundColor: this.color}
    },
    lightClass() {
      let classArray = [];
      if(!this.noDisable){
        classArray.push({unused: 'unused'});
      }
      if(this.noDisable && this.time < 3) {
        classArray.push({blink: 'blink'})
      }
      return classArray;
    }
  },
  name: "Light"
}
</script>

<style scoped>
  .light {
    width: 50px;
    height: 50px;
    margin: 1em auto;
    background: silver;
    border-radius: 50%;
  }
  .unused {
    filter: grayscale(90%);
  }

  .blink {
    -webkit-animation: blink 1s linear infinite;
    animation: blink 1s linear infinite;
    font-weight: bold;
    filter: grayscale(0%);
  }

  @-webkit-keyframes blink {
    0% { filter: grayscale(0%); }
    50% { filter: grayscale(45%); }
    100% { filter: grayscale(90%); }
  }

  @keyframes blink {
    0% { filter: grayscale(0%); }
    50% { filter: grayscale(45%); }
    100% { filter: grayscale(90%); }
  }
</style>