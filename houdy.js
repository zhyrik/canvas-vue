const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const X = canvas.width
const Y = canvas.height

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, X, Y)

ctx.strokeStyle = 'green'
ctx.lineWidth = 10
ctx.strokeRect(50, 50, 150, 250)

ctx.fillStyle = 'grey'
ctx.arc(300, 200, 100, 0, Math.PI*2, true)
ctx.fill()

ctx.strokeStyle = 'blue'
ctx.beginPath()
ctx.moveTo(100, 400)
ctx.lineTo(200, 500)
ctx.lineTo(400, 500)
ctx.stroke()