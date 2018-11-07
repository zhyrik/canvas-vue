<template>
  <div @mousemove="padleMuves" @click="attack">
    <pre class="text">level       Point       <span>start</span></pre>
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
          v-for="(shut, index) in shuts"
          :key="index"
          :config="shut"
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

      </v-layer>
    </v-stage>

  </div>
</template>

<script>
export default {
  data () {
    return {
      clientX: null,
      canvas: {
        width: 1022,
        height: 600
      },
      alian: {
        width: 100,
        height: 20,
        gap: 2,
        fill: 'blue',
        number: 20
      },
      alians: [],
      padle: {
        x: null,
        y: null,
        width: null
      },
      attacks: null,
      shuts: []
    }
  },
  methods: {
    padleMuves (event) {
      this.clientX = event.clientX
    },
    attack () {
      this.shuts.push({
        x: this.padle.x + this.padle.width / 2,
        y: this.padle.y,
        radius: 5,
        fill: 'white'
      })
    }
  },
  mounted () {

    const padle = this.$refs.padle.getStage()
    const padleWidth = padle.getWidth()
    let padleGetX = padle.getX()
    let padleGetY = padle.getY()
    this.padle.width = padleWidth
    this.padle.y = padleGetY - 5

    const speadShut = 3
    let shutY = this.padle.y

    const anim = new Konva.Animation((frame) => {
      padleGetX = padle.getX()
      padleGetY = padle.getY()
      shutY += speadShut
      this.padle.x = padleGetX

      // padle logic
      if (this.clientX - this.$refs.stage._stage.content.offsetLeft > this.canvas.width) this.clientX = this.canvas.width + this.$refs.stage._stage.content.offsetLeft
      if (this.clientX - this.$refs.stage._stage.content.offsetLeft < 0) this.clientX = this.$refs.stage._stage.content.offsetLeft -1
      padle.setX(this.clientX - padleWidth / 2 - this.$refs.stage._stage.content.offsetLeft)

      for (let i = 0; i < this.shuts.length; i++) {
        console.log(this.$refs)
        debugger
        const shut = this.$refs.boll
        shut.setY(shutY)
      }

    }, this.$refs.layer.getStage())

    const drawAlian = () => {
      let posX = 150
      let posY = this.alian.gap
      const cols = Math.floor((this.canvas.width - 300) / (this.alian.width + this.alian.gap))
      const rows = Math.ceil(this.alian.number / cols)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          this.alians.push({
            x: posX + (this.alian.width + this.alian.gap) * i,
            y: posY + (this.alian.height + this.alian.gap) * j,
            width: this.alian.width,
            height: this.alian.height,
            fill: this.alian.fill
          })
        }
      }
    }

    drawAlian()
    anim.start()
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
