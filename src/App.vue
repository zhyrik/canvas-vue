<template>
  <div id="app" @mousemove="padleMuve">
    <v-stage :config="configKonva" ref="stage" >
      <v-layer ref="layer">
        <v-rect :config="configRect"></v-rect>
        <v-circle :config="configCircle" ref="boll"></v-circle>
        <v-rect :config="padle" ref="padle"></v-rect>
        <v-rect 
          v-for="item in items"
          :key="item"
          :config="item"
        ></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getPadleX: null,
      rects: [
        {id: 1}
      ],
      configKonva: {
        width: 800,
        height: 600
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 5,
        fill: 'white',
      },
      configRect: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        fill: 'black',
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
  computed: {
    items (i = 20) {
      let y = 50
      let x = 0
      let height = 20
      let items = []
      if (i % 7 === 0) y += height + 10
      for(let j = 0; j < 20; j++) {
        x += j * 110 - 100
        if (j % 6 === 0) {
          y += height + 10
          x = 0
        }
        items.push({
          x,
          y,
          width: 100,
          height,
          fill: 'blue'
        })
      }
      console.log(items)
      return items
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
