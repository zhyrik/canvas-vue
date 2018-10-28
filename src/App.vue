<template>
  <div id="app" @mousemove="padleMuve">
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
    let bollSaveX = null
    let bollSaveY = null
    const bollRadius = boll.getWidth() / 2
    let horizontal = 1
    let vertical = 1

    const padle = this.$refs.padle.getStage()
    const padleWidth = padle.getWidth()

    // in ms
    // const centerX = this.$refs.stage.getStage().getWidth() / 2
    const anim = new Konva.Animation((frame) => {

      const bollGetX = boll.getX()
      const bollGetY = boll.getY()
      const padleGetX = padle.getX()
      const padleGetY = padle.getY()
      // padle logic
      if (this.getPadleX > this.canvas.width) this.getPadleX = this.canvas.width
      padle.setX(this.getPadleX - padleWidth / 2)
      if (bollGetX >= this.getPadleX - padleWidth / 2 && bollGetX <= this.getPadleX + padleWidth / 2) {
        if (bollGetY + bollRadius >= padleGetY && bollGetY + bollRadius <= padleGetY + bollSpeadY + 1) {
          bollSpeadX = (padleGetX + padleWidth / 2 - bollGetX) * 0.2 + 0.5
          if (bollSpeadX < 0) bollSpeadX *= -1
          vertical = -1
        }
      }

      // boll logic
      if (bollGetX + bollRadius > this.canvas.width || bollGetX - bollRadius < 0) horizontal *= -1
      if (bollGetY + bollRadius > this.canvas.height || bollGetY - bollRadius < 0) vertical *= -1
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
            if (brick.getX() <= bollGetX && brick.getX() + brick.getWidth() > bollGetX) {
              if (bollGetY >= brick.getY() && bollGetY <= brick.getY() + brick.getHeight()) {
                this.bricks.splice(i, 1)
                if (bollSaveX < brick.getX() || bollSaveX > brick.getX() + brick.getWidth()) horizontal *= -1
                if (bollSaveY < brick.getY() || bollSaveY > brick.getY() + brick.getHeight()) vertical *= -1
              }
            }
          }
        }
      }

      bollSaveX = bollGetX
      bollSaveY = bollGetY
    }, this.$refs.layer.getStage())

    const drawBrick = () => {
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

    drawBrick()
    anim.start()
  }
}
</script>

<style>

</style>
