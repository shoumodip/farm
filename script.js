const game = {}

function drawMan(x, y, s) {
  game.ctx.beginPath()
  game.ctx.moveTo(x + s * 0.13, y)
  game.ctx.lineTo(x + s * 0.28, y)
  game.ctx.lineTo(x + s * 0.28, y - s * 0.5)
  game.ctx.lineTo(x + s * 0.33, y - s * 0.67)
  game.ctx.lineTo(x - s * 0.07, y - s * 0.8)
  game.ctx.lineTo(x - s * 0.08, y - s * 0.78)
  game.ctx.lineTo(x - s * 0.24, y - s * 0.78)
  game.ctx.lineTo(x - s * 0.24, y - s * 0.62)
  game.ctx.lineTo(x - s * 0.12, y - s * 0.62)

  if (game.picking) {
    game.ctx.lineTo(x - s * 0.1, y - s * 0.25)
    game.ctx.lineTo(x - s * 0.0, y - s * 0.26)
  } else {
    game.ctx.lineTo(x - s * 0.18, y - s * 0.27)
    game.ctx.lineTo(x - s * 0.08, y - s * 0.25)
  }

  game.ctx.lineTo(x - s * 0.02, y - s * 0.58)
  game.ctx.lineTo(x + s * 0.13, y - s * 0.53)
  game.ctx.closePath()

  game.ctx.fillStyle = "#483728"
  game.ctx.fill()
}

function drawGame() {
  const size = Math.min(game.app.width, game.app.height) * 0.5

  game.ctx.fillStyle = "#87CEEB"
  game.ctx.fillRect(0, 0, game.app.width, game.app.height)

  game.ctx.fillStyle = "#388004"
  game.ctx.fillRect(0, game.app.height * 0.8, game.app.width, game.app.height * 0.2)

  game.ctx.font = size * 0.12 + "px Serif"
  game.ctx.fillStyle = "#000000"
  game.ctx.fillText(game.cotton, size * 0.2, size * 0.15)

  game.ctx.beginPath()
  if (game.picking) {
    game.ctx.arc(size * 0.11, size * 0.11, size * 0.06, 0, 2 * Math.PI)
  } else {
    game.ctx.arc(size * 0.11, size * 0.11, size * 0.05, 0, 2 * Math.PI)
  }
  game.ctx.closePath()

  game.ctx.fillStyle = "#FDF3EA"
  game.ctx.fill()

  game.ctx.lineWidth = size * 0.01
  game.ctx.strokeStyle = "#000000"
  game.ctx.stroke()

  drawMan(game.app.width * 0.5, game.app.height * 0.8, size)
}

window.onload = () => {
  game.app = document.getElementById("app")
  game.ctx = game.app.getContext("2d")

  game.cotton = 0
  game.picking = false

  window.onclick = () => {
    if (!game.picking) {
      game.cotton += 1
      game.picking = true

      drawGame()
      setTimeout(() => {
        game.picking = false
        drawGame()
      }, 50)
    }
  }

  window.onresize = () => {
    game.app.width = window.innerWidth
    game.app.height = window.innerHeight
    drawGame()
  }

  window.onresize()
}
