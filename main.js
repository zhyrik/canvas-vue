const button = document.getElementById('button')
const canvas = document.getElementById('gameCanvas')
const canvasContext = canvas.getContext('2d')
const framesPerSecond = 30
const PADLE_WIDTH = 100
const PADLE_THICKNESS = 10
let padleX = 400
let ballSpeadX = 5
let ballSpeadY = 5
let ballY = 75
let ballX = 75

button.addEventListener('click', updateMouthPos)
canvas.addEventListener('mousemove', updateMouthPos)

setInterval(updateAll, 1000 / framesPerSecond)
function updateAll () {
  muveAll ()
  drawAll ()
}

function drawAll () {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  colorCircle (ballX, ballY, 10, 'white')
  colorRect(padleX, canvas.height - PADLE_THICKNESS - 10, PADLE_WIDTH, PADLE_THICKNESS, 'white')
}

function updateMouthPos (e) {
  let rect = canvas.getBoundingClientRect()
  let root1 = document.documentElement
  let mouseX = e.clientX - rect.left - root1.scrollLeft - PADLE_WIDTH / 2
  // let mouseY = e.clientY -rect.top - root1.scrollTop
  padleX = mouseX
}

function ballReset () {
  ballX = canvas.height / 2
  ballY = canvas.width / 3
}

function muveAll () {
  ballX += ballSpeadX
  ballY += ballSpeadY
  if (ballX > canvas.width || ballX < 0) { ballSpeadX *= -1 }
  if (ballY < 0) { ballSpeadY *= -1 }

  if (ballY > canvas.height) { ballReset() }

  let padleTopEdgeY = canvas.height - 10 - PADLE_THICKNESS - 10
  let padleTopEdgeX = padleX
  let padleBottomEdgeX = padleX + PADLE_WIDTH
  if (ballY > padleTopEdgeY && ballX > padleTopEdgeX && ballX < padleBottomEdgeX && ballY < padleTopEdgeY + 2) {
    ballSpeadY *= -1
    let centerPadleX = padleX + PADLE_WIDTH / 2
    let subPadleX = centerPadleX - ballX
    ballSpeadX = subPadleX * 0.3 + 5
  }
}

function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function colorCircle (centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor
  canvasContext.beginPath()
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
  canvasContext.fill()
}