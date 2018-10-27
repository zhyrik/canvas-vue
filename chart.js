const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const X = canvas.width
const Y = canvas.height
const obj = {
	'1': 20,
	'2': 40,
	'3': 50,
	'4': 55,
	'5': 70,
	'6': 90,
}
const keysObj = Object.keys(obj)

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, X, Y)

ctx.strokeStyle = 'blue'
ctx.fillStyle = 'blue'
ctx.beginPath()
ctx.lineWidth = 5
for (let i = 0; i < keysObj.length; i++) {
	let key = keysObj[i]
	let val = obj[key]
	ctx.moveTo(key*100, 500-val*3)
	ctx.lineTo(keysObj[i +]*100, 500-obj[keysObj[i]]*3)
	ctx.arc(key*100, 500-val*3, 10, 0, Math.PI*2)
}
ctx.stroke()
ctx.fill()