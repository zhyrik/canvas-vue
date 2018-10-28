<template>
  <div id="app" @mousemove="padleMuve" @click.once="items">
    <v-stage :config="{width: canvas.width, height: canvas.height}" ref="stage" >
      <v-layer ref="layer">

        <v-rect
          :config="{
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            fill: 'black'
          }"
        ></v-rect>

        <v-circle
          :config="{
            x: 100,
            y: 100,
            radius: 5,
            fill: 'white'
          }"
          ref="boll"
        ></v-circle>

        <v-rect :config="congigPadle" ref="padle"></v-rect>

        <v-rect
          v-for="(item, index) in bricks"
          :key="index"
          :config="item"
          ref="bricks"
          @mouseover="deletes(index)"
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
      canvas: {
        width: 1000,
        height: 600
      },
      brick: {
        width: 100,
        height: 20,
        gap: 5,
        fill: 'blue',
        number: 35
      },
      bricks: [],
      configCircle: {
        x: 100,
        y: 100,
        radius: 5,
        fill: 'white'
      },
      congigPadle: {
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
    },
    deletes (index) {
      this.bricks.splice(index, 1)
    },
    items () {
      let posX = this.brick.gap
      let posY = this.brick.gap
      const cols = Math.floor(this.canvas.width / (this.brick.width + this.brick.gap))
      const rows = Math.ceil(this.brick.number / cols)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          this.bricks.push({
            x: posX + (this.brick.width + this.brick.gap) * i,
            y: posY + (this.brick.height + this.brick.gap) * j,
            width: this.brick.width,
            height: this.brick.height,
            fill: this.brick.fill
          })
        }
      }
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

    const anim = new Konva.Animation((frame) => {

      // padle logic
      if (this.getPadleX > this.canvas.width) this.getPadleX = this.canvas.width
      padle.setX(this.getPadleX - padleWidth / 2)
      if (boll.getX() >= this.getPadleX - padleWidth / 2 && boll.getX() <= this.getPadleX + padleWidth / 2) {
        if (boll.getY() + bollRadius >= padle.getY() && boll.getY() + bollRadius <= padle.getY() + bollSpeadY + 1) {
          bollSpeadX = (padle.getX() + padleWidth / 2 - boll.getX()) * 0.2
          if (bollSpeadX < 0) bollSpeadX *= -1
          vertical = -1
        }
      }

      // boll logic
      if (boll.getX() + bollRadius > this.canvas.width || boll.getX() - bollRadius < 0) horizontal *= -1
      if (boll.getY() + bollRadius > this.canvas.height || boll.getY() - bollRadius < 0) vertical *= -1
      bollX = bollX + horizontal * bollSpeadX
      bollY = bollY + vertical * bollSpeadY
      boll.setX(bollX)
      boll.setY(bollY)

      //brick
      if (this.$refs.bricks) {
        for (let i = 0; i <= this.$refs.bricks.length; i++) {
          let brick = null
          if (this.$refs.bricks[i]) {
            brick = this.$refs.bricks[i].getStage()
            if (brick.getX() >= boll.getX() && brick.getX() + brick.getWidth() < boll.getX()) {
              if (brick.getY() >= boll.getY()) {
                this.bricks.splice(i, 1)
                console.log(i)
              }
            }
          }
        }
      }
    }, this.$refs.layer.getStage())

    anim.start()
  }
}
</script>

<style>

</style>
