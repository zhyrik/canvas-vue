<template>
  <div id="app">
    <v-stage :config="configKonva" ref="stage">
      <v-layer ref="layer">
        <v-rect :config="configRect"></v-rect>
        <v-circle :config="configCircle" ref="hexagon"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      configKonva: {
        width: 800,
        height: 600
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
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
      }
    }
  },
  name: 'App',
  mounted () {
    const vm = this
    let c = 150
    let i = 1
    // in ms
    const centerX = this.$refs.stage.getStage().getWidth() / 2
    console.log(centerX)
    console.log(this.$refs.hexagon)

    const anim = new Konva.Animation(function (frame) {
      if (c > 400) { i *= -1 }
      c = (c + 3) * i
      vm.$refs.hexagon.getStage().setX(c)
    }, vm.$refs.layer.getStage())

    anim.start()
  }
}
</script>

<style>

</style>
