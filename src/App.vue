<template>
  <div id="app" @mousemove="padleMuve">
    <v-stage :config="configKonva" ref="stage" >
      <v-layer ref="layer">
        <v-rect :config="configRect"></v-rect>
        <v-circle :config="configCircle" ref="boll"></v-circle>
        <v-rect :config="padle" ref="padle"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getPadleX: null,
      getPadleXY: null,
      configKonva: {
        width: 800,
        height: 600
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 5,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      },
      configRect: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        fill: 'pink',
        stroke: 'black',
        strokeWidth: 1
      },
      padle: {
        x: 200,
        y: 550,
        width: 100,
        height: 10,
        fill: 'white'
      }
    }
  },
  methods: {
    padleMuve (event) {
      this.getPadleX = event.clientX
    }
  },
  name: 'App',
  mounted () {
    // https://github.com/konvajs/vue-konva/blob/master/docs/events.md
    const vm = this

    const boll = this.$refs.boll.getStage()
    let bollX = 150
    let bollY = 150
    let bollSpeadX = 3
    let bollSpeadY = 4
    const bollRadius = boll.getWidth() / 2
    let horizontal = 1
    let vertical = 1

    const padle = this.$refs.padle.getStage()
    const padleWidth = padle.getWidth()
    // in ms
    // const centerX = this.$refs.stage.getStage().getWidth() / 2

    const anim = new Konva.Animation(function (frame) {

      if (vm.getPadleX > 800) vm.getPadleX = 800
      if (vm.getPadleX < 0) vm.getPadleX = 0
      padle.setX(vm.getPadleX - padleWidth / 2)
      if ( boll.getX() >= vm.getPadleX - padleWidth / 2 && boll.getX() <= vm.getPadleX + padleWidth / 2) {
        if (boll.getY() + bollRadius >= padle.getY() && boll.getY() + bollRadius <= padle.getY() + bollSpeadY + 1 ) {
          bollSpeadX = (padle.getX() + padleWidth / 2 - boll.getX()) * .2
          if (bollSpeadX < 0) bollSpeadX *= -1
          vertical = -1
        }
      }

      if ( boll.getX() + bollRadius > 800 || boll.getX() - bollRadius < 0) horizontal *= -1
      if ( boll.getY() + bollRadius > 600 || boll.getY() - bollRadius < 0) vertical *= -1
      bollX = bollX + horizontal * bollSpeadX
      bollY = bollY + vertical * bollSpeadY
      boll.setX(bollX)
      boll.setY(bollY)

    }, vm.$refs.layer.getStage())

    anim.start()
  }
}
</script>

<style>

</style>
