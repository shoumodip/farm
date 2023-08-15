window.onload = () => {
  const app = document.getElementById("app")
  const ctx = app.getContext("2d")
  const fps = 0.016

  window.onresize = () => {
    app.width = window.innerWidth
    app.height = window.innerHeight
  }

  let clock = 0
  let cotton = 0
  let picking = false

  window.onclick = () => {
    if (!picking) {
      clock = 0.1
      cotton += 1
      picking = true
    }
  }

  function drawMan(x, y, s) {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.moveTo(x + s * 0.13, y)
    ctx.lineTo(x + s * 0.28, y)
    ctx.lineTo(x + s * 0.28, y - s * 0.5)
    ctx.lineTo(x + s * 0.33, y - s * 0.67)
    ctx.lineTo(x - s * 0.07, y - s * 0.8)
    ctx.lineTo(x - s * 0.08, y - s * 0.78)
    ctx.lineTo(x - s * 0.24, y - s * 0.78)
    ctx.lineTo(x - s * 0.24, y - s * 0.62)
    ctx.lineTo(x - s * 0.12, y - s * 0.62)

    if (picking) {
      ctx.lineTo(x - s * 0.1, y - s * 0.25)
      ctx.lineTo(x - s * 0.0, y - s * 0.26)
    } else {
      ctx.lineTo(x - s * 0.18, y - s * 0.27)
      ctx.lineTo(x - s * 0.08, y - s * 0.25)
    }

    ctx.lineTo(x - s * 0.02, y - s * 0.58)
    ctx.lineTo(x + s * 0.13, y - s * 0.53)
    ctx.closePath()

    ctx.fillStyle = "#483728"
    ctx.fill()
  }

  function loop() {
    if (clock > 0) {
      clock -= fps
      if (clock <= 0) {
        clock = 0
        picking = false
      }
    }

    const size = Math.min(app.width, app.height) * 0.5

    // Sky
    ctx.fillStyle = "#87CEEB"
    ctx.fillRect(0, 0, app.width, app.height)

    // Grass
    ctx.fillStyle = "#388004"
    ctx.fillRect(0, app.height * 0.8, app.width, app.height * 0.2)

    // Counter
    ctx.font = size * 0.12 + "px Serif"
    ctx.fillStyle = "#000000"
    ctx.fillText(cotton, size * 0.2, size * 0.15)

    // Cotton
    ctx.beginPath()
    if (picking) {
      ctx.arc(size * 0.11, size * 0.11, size * 0.06, 0, 2 * Math.PI)
    } else {
      ctx.arc(size * 0.11, size * 0.11, size * 0.05, 0, 2 * Math.PI)
    }
    ctx.closePath()

    ctx.fillStyle = "#FDF3EA"
    ctx.fill()

    ctx.lineWidth = size * 0.01
    ctx.strokeStyle = "black"
    ctx.stroke()

    // Man
    drawMan(app.width * 0.5, app.height * 0.8, size)

    window.requestAnimationFrame(loop)
  }

  window.onresize()
  loop()
}
