<template>
  <div class="container">
    <Light  :noDisable = 'currentMask[0]'
            :time="currentTime"
            color="red"/>
    <Light  :noDisable = 'currentMask[1]'
            :time="currentTime"
            color="yellow"/>
    <Light  :noDisable = 'currentMask[2]'
            :time="currentTime"
            color="green"/>
    <div>{{ validateTime(currentTime)}}</div>
  </div>
</template>

<script>
import Light from "./Light";

export default {
  props: {
    mask: String,
    delay: Number,
    next: Array,
  },
  data: function (){
    return {
      prevRoute: null,
      timer: null,
      time: this.delay,
    }
  },
  name: "TrafficLights",
  methods: {
    startTimer(){
      this.timer = setInterval(() => {
        this.currentTime = this.currentTime - 1;
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    validateTime(time) {
      return time > 9 ? '00:' + time : '00:0' + time;
    }
  },
  computed: {
    currentMask: function() {
      return this.mask.split('').map( item => parseInt(item));
    },
    nextRoute: function(){
      if(this.next.length > 1){
        return this.next[0] === this.prevRoute.fullPath ? this.next[1] : this.next[0];
      }
      return this.next[0];
    },
    currentTime: {
      get() {
        return this.time;
      },
      set(newValue) {
        if(this.time === 0) {
          this.clearTimer();
        } else {
          this.time =  newValue;
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {

    next( vm => {
      vm.time = vm.delay;
      vm.prevRoute = from;
      vm.startTimer();
      setTimeout(function (){
        this.$router.push(this.nextRoute);
        this.clearTimer();
      }.bind(vm), vm.delay * 1000);
    })
  },
  components: {
    Light
  }
}
</script>

<style scoped>
  .container {
    width: 100px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-content: center;
    background: silver;
  }
</style>