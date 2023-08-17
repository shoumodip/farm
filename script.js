const game = {}

function drawPicker(x, y, s) {
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

function drawMaster(x, y, s) {
  game.ctx.beginPath()
  game.ctx.moveTo(x + s * 0.13, y)
  game.ctx.lineTo(x + s * 0.28, y)
  game.ctx.lineTo(x + s * 0.28, y - s * 0.5)
  game.ctx.lineTo(x + s * 0.30, y - s * 0.5)
  game.ctx.lineTo(x + s * 0.30, y - s * 0.9)

  game.ctx.lineTo(x + s * 0.28, y - s * 0.9)
  game.ctx.lineTo(x + s * 0.28, y - s * 1.05)
  game.ctx.lineTo(x + s * 0.13, y - s * 1.05)
  game.ctx.lineTo(x + s * 0.13, y - s * 0.9)
  game.ctx.lineTo(x + s * 0.12, y - s * 0.9)
  game.ctx.lineTo(x + s * 0.12, y - s * 0.5)
  game.ctx.lineTo(x + s * 0.12, y - s * 0.5)
  game.ctx.lineTo(x + s * 0.13, y - s * 0.5)
  game.ctx.closePath()

  game.ctx.fillStyle = "#FFD6A4"
  game.ctx.fill()

  game.ctx.beginPath()
  game.ctx.moveTo(x + s * 0.12, y - s * 0.7)
  if (game.beating) {
    game.ctx.lineTo(x - s * 0.42, y - s * 0.65)
  } else {
    game.ctx.lineTo(x - s * 0.42, y - s * 0.8)
  }

  game.ctx.closePath()
  game.ctx.strokeStyle = "#000000"
  game.ctx.stroke()
}

function drawGame() {
  game.size = Math.min(game.app.width, game.app.height) * 0.5

  game.ctx.fillStyle = "#87CEEB"
  game.ctx.fillRect(0, 0, game.app.width, game.app.height)

  game.ctx.fillStyle = "#388004"
  game.ctx.fillRect(0, game.app.height * 0.8, game.app.width, game.app.height * 0.2)

  if (game.notify) {
    game.ctx.font = game.size * 0.08 + "px Serif"

    const width = game.ctx.measureText(game.notify).width

    game.ctx.fillStyle = "#282828"
    game.ctx.fillRect(game.app.width - width * 1.08, game.size * 0.02, width * 1.06, game.size * 0.2)

    game.ctx.fillStyle = "#FFFFFF"
    game.ctx.fillText(game.notify, game.app.width - width * 1.055, game.size * 0.15)
  }

  game.ctx.font = game.size * 0.12 + "px Serif"
  game.ctx.fillStyle = "#000000"
  game.ctx.fillText(game.cotton, game.size * 0.2, game.size * 0.15)

  game.ctx.beginPath()
  if (game.picking) {
    game.ctx.arc(game.size * 0.11, game.size * 0.11, game.size * 0.06, 0, 2 * Math.PI)
  } else {
    game.ctx.arc(game.size * 0.11, game.size * 0.11, game.size * 0.05, 0, 2 * Math.PI)
  }
  game.ctx.closePath()

  game.ctx.fillStyle = "#FDF3EA"
  game.ctx.fill()

  game.ctx.lineWidth = game.size * 0.01
  game.ctx.strokeStyle = "#000000"
  game.ctx.stroke()

  drawPicker(game.app.width * 0.5, game.app.height * 0.8, game.size)

  if (game.master) {
    drawMaster((game.app.width + game.size) * 0.5, game.app.height * 0.8, game.size * 1.2)
  }
}

function pickCotton() {
  if (!game.picking) {
    game.cotton += 1
    game.picking = true

    drawGame()
    setTimeout(() => {
      game.picking = false
      drawGame()
    }, 50)

    if (game.cotton == 50) {
      game.master = true
      pushNotify("Master aquired!")

      setInterval(() => {
        game.beating = true
        pickCotton()
        game.beating = false
      }, 1000)
    }
  }
}

function pushNotify(s) {
  game.notify = s
  drawGame()

  setTimeout(() => {
    game.notify = ""
    drawGame()
  }, 4000)
}

window.onload = () => {
  game.app = document.getElementById("app")
  game.ctx = game.app.getContext("2d")

  game.cotton = 0
  game.master = false
  game.beating = false
  game.picking = false

  window.onclick = (e) => {
    const x = e.offsetX - game.app.width * 0.5 + game.size * 0.5
    const y = e.offsetY - game.app.height * 0.8 + game.size

    if (x > 0 && x < game.size && y > 0 && y < game.size) {
      pickCotton()
    }
  }

  window.onresize = () => {
    game.app.width = window.innerWidth
    game.app.height = window.innerHeight
    drawGame()
  }

  window.onresize()
  setTimeout(() => pushNotify("Click on the man to pick cotton"), 500)
}
