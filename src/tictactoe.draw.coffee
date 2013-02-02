root = this
root.tictactoe = {} unless root.tictactoe
$ = jQuery

root.tictactoe.draw = do($) ->

  # context = `undefined`
  # canvas = `undefined`
  # centerX = `undefined`
  # centerY = `undefined`

  setCanvas = (cnvs) ->
    canvas = cnvs
    centerX = canvas.width / 2
    centerY = canvas.height / 2

  setContext = (ctxt) ->
    context = ctxt

  board = () ->

    context.beginPath()

    context.lineWidth = 5
    context.strokeStyle = "black"

    context.moveTo(100, 0)
    context.lineTo(100, 300)
    context.moveTo(200, 0)
    context.lineTo(200, 300)

    context.moveTo 0, 100
    context.lineTo 300, 100

    context.moveTo 0, 200
    context.lineTo 300, 200

    context.stroke()

    context.closePath()

  newGameButton = () ->

    context.beginPath()
    context.rect(5, 310, 290 , 80)
    context.fillStyle = "#39e42d"
    context.fill()
    context.lineWidth = 5
    context.strokeStyle = "black"
    context.stroke()

    context.closePath()

    context.textAlign = "center"
    context.textBaseline = "top"

    context.fillStyle = "#ffffff"
    context.strokeStyle = "#000000"
    context.font = "36pt Helvetica"
    context.strokeText("NEW GAME", 150, 320)
    context.fillText("NEW GAME", 150, 320)

  cross = (location) ->
    col = location % 3
    row = Math.floor(location / 3)
    topLeftX = (col*100)
    topLeftY = (row*100)

    context.beginPath()

    context.moveTo( topLeftX + 20, topLeftY + 20)
    context.lineTo( topLeftX + 80, topLeftY + 80)

    context.moveTo( topLeftX + 80, topLeftY + 20)
    context.lineTo( topLeftX + 20, topLeftY + 80)

    context.closePath()

    context.lineWidth = 5
    context.strokeStyle = "black"
    context.stroke();        

  nought = (location) ->

    col = location % 3
    row = Math.floor(location / 3)
    centerX = (col*100) + 50
    centerY = (row*100) + 50
    radius  = 40
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.closePath()

    context.lineWidth = 5
    context.strokeStyle = "black"
    context.stroke()

  stamp = (text, color) ->

    context.save()

    context.rotate(-Math.PI*2 / 12)
    context.translate(57,190)
    context.beginPath()
    context.rect(-150, -20, 290 , 80 )
    context.fillStyle = "rgba(255,255,255,0.75)"
    context.fill()
    context.lineWidth = 5
    context.strokeStyle = color
    context.stroke()
    context.closePath()

    context.textAlign = "center"
    context.textBaseline = "top"

    context.fillStyle = "#ffffff"
    context.strokeStyle = color
    context.font = "36pt Helvetica"
    context.strokeText(text, 0, -10)
    context.fillText(text, 0, -10)

    context.restore()

  connectLine = (where, color) ->
    context.beginPath()

    fromCol = where[0] % 3
    fromRow = Math.floor(where[0] / 3)
    toCol = where[1] % 3
    toRow = Math.floor(where[1] / 3)
    modX1 = 0
    modY1 = 0
    modX2 = 0
    modY2 = 0
    if (fromCol is toCol)
      modX1 = 50
      modX2 = 50
      modY1 = 20
      modY2 = 100 - modY1

    if (fromRow is toRow)
      modX1 = 20
      modX2 = 100 - modX1
      modY1 = 50
      modY2 = 50

    if ((fromRow isnt toRow) && (fromCol isnt toCol))
      modX1 = if (fromRow is fromCol && toRow is toCol) then 20 else 80
      modX2 = if (fromRow is fromCol && toRow is toCol) then 80 else 20

      modY1 = 20
      modY2 = 80

    context.moveTo( fromCol*100 + modX1, fromRow*100 + modY1)
    context.lineTo( toCol*100 + modX2  , toRow*100  + modY2 )
    context.lineCap = "round"
    context.closePath()

    context.lineWidth = 15
    context.strokeStyle = color

    context.stroke()

  clear = () ->
    context.clearRect( 0 , 0 , 300, 400 )
    board()
    newGameButton()
    true

  {
    setCanvas: setCanvas
    setContext: setContext

    board: board
    newGameButton: newGameButton

    cross: cross
    nought: nought

    stamp: stamp
    connectLine: connectLine

    clear: clear

  }
