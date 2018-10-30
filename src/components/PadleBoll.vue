<template>
  <div @mousemove="padleMuve">
    <pre class="text">level {{level}}       Point {{point}}      <span @click="newGame" >start</span></pre>
    <v-stage :config="{width: canvas.width, height: canvas.height}" ref="stage" class="center">
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
            x: 250,
            y: 250,
            radius: 5,
            fill: 'white'
          }"
          ref="boll"
        ></v-circle>

        <v-rect
          :config="{
            x: 200,
            y: 550,
            width: 100,
            height: 10,
            fill: 'white'
          }"
          ref="padle"
        ></v-rect>

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
      clientX: null,
      gameOver: false,
      start: null,
      level: 1,
      point: 0,
      canvas: {
        width: 1022,
        height: 600
      },
      brick: {
        width: 100,
        height: 20,
        gap: 2,
        fill: 'blue',
        number: 20
      },
      bricks: []
    }
  },
  methods: {
    padleMuve (event) {
      this.clientX = event.clientX
    },
    newGame () {
      this.start()
    }
  },
  mounted () {
    // https://github.com/konvajs/vue-konva/blob/master/docs/events.md

    const boll = this.$refs.boll.getStage()
    let bollX = 250
    let bollY = 250
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
      let padlePosition = this.clientX - this.$refs.stage._stage.content.offsetLeft

      // game over
      if (bollGetY > padleGetY + 20) {
        this.gameOver = true
        return
      }

      // new level
      if (this.bricks.length <= 0) {
        this.level++
        this.start(this.level)
      }

      // padle logic
      if (padlePosition > this.canvas.width) padlePosition = this.canvas.width
      padle.setX(padlePosition - padleWidth / 2)
      if (bollGetX >= padlePosition - padleWidth / 2 && bollGetX <= padlePosition + padleWidth / 2) {
        if (bollGetY + bollRadius >= padleGetY && bollGetY + bollRadius <= padleGetY + bollSpeadY + 1) {
          bollSpeadX = (padleGetX + padleWidth / 2 - bollGetX) * 0.1 * this.level + 0.1
          if (bollSpeadX < 0) bollSpeadX *= -1
          vertical = -1
        }
      }

      // boll logic
      if (bollGetX + bollRadius >= this.canvas.width || bollGetX - bollRadius <= 0) horizontal *= -1
      if (bollGetY + bollRadius >= this.canvas.height || bollGetY - bollRadius <= 0) vertical *= -1
      bollX = bollX + horizontal * bollSpeadX
      bollY = bollY + vertical * bollSpeadY
      boll.setX(bollX)
      boll.setY(bollY)

      // brick logic
      if (this.$refs.bricks) {
        for (let i = 0; i <= this.$refs.bricks.length; i++) {
          let brick = null
          if (this.$refs.bricks[i]) {
            brick = this.$refs.bricks[i].getStage()
            const brickGetX = brick.getX()
            const brickGetY = brick.getY()
            const brickGetWidth = brick.getWidth()
            const brickGetHeight = brick.getHeight()
            if (brickGetX <= bollGetX && brickGetX + brickGetWidth > bollGetX) {
              if (bollGetY >= brickGetY && bollGetY <= brickGetY + brickGetHeight) {
                this.bricks.splice(i, 1)
                this.point += 1
                if (bollSaveX < brickGetX || bollSaveX > brickGetX + brickGetWidth) horizontal *= -1
                if (bollSaveY < brickGetY || bollSaveY > brickGetY + brickGetHeight) vertical *= -1
              }
            }
          }
        }
      }

      // save cordinate boll
      bollSaveX = bollGetX
      bollSaveY = bollGetY
    },
    this.$refs.layer.getStage())

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

    this.start = (i=1) => {
      this.level === 1 ? this.point = 0: null
      bollY = 250
      bollSpeadX = 1
      this.level = i
      this.brick.number = this.level * 20
      this.bricks = []
      drawBrick()
      anim.start()
    }
  }
}
</script>

<style scoped>
.text{
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  font-family: 'arial', sans-serif;
}
span{
  border: 2px solid black;
  padding:  5px 30px;
  cursor: pointer;
}
span:hover{
  background: #000;
  color: #fff;
}
</style>
