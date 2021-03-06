$ = jQuery

main = do ($) ->

  system = tictactoe.ai
  draw = tictactoe.draw
  canvas = document.getElementById("the_board")
  context = canvas.getContext("2d")
  gameOver = false

  $(document).ready ->
    $('#the_board').center()
    draw.setContext(context)
    draw.board()
    draw.newGameButton()

  $.fn.center = ->
    win = $(window)
    vertMidPt = ((win.height() - @outerHeight()) / 2) + win.scrollTop()
    horizMidPt = ((win.width() - @outerWidth()) / 2) + win.scrollLeft()
    @css("position", "absolute")
    @css("top", vertMidPt + "px")
    @css("left", horizMidPt + "px")
    return this

  $(window).bind 'resize', ->
    $('#the_board').center()

  $('#the_board').bind 'click', (e) ->

    offsetX = if e.offsetX then e.offsetX else (e.pageX - @offsetLeft)
    offsetY = if e.offsetY then e.offsetY else (e.pageY - @offsetTop)

    location = (Math.floor(offsetY / 100) * 3 + Math.floor(offsetX / 100))

    if (offsetY > 300)
      system.clear()
      draw.clear()
      gameOver = false

    else if (offsetY <= 300 and offsetX <= 300)
      whoseTurn = system.toMove()
      occupy = system.occupy(location)
      if (occupy and not gameOver)
        draw.nought(location)
        if (system.winner(1))
          draw.connectLine(system.winnerWhere(1),"#00ff00")
          draw.stamp("YOU WIN","#00ff00")
          gameOver = true
        else if (system.getFreePositions().length is 0)
          draw.stamp("TIE","#00ffff")
          gameOver = true

        if (whoseTurn is 1 and not system.winner(1) and not system.winner(-1))
          res = system.alphaBetaSearch(system.board(), -whoseTurn)

          # to test win scenario, create ai that randomly chooses a valid turn.
          # var res = system.chooseRandom(system.board(),-whoseTurn )

          system.occupy(res[2])
          draw.cross(res[2])

          if (system.winner(-1))
            draw.connectLine(system.winnerWhere(-1),"#ff0000")
            draw.stamp("YOU LOSE","#ff0000")
            gameOver = true