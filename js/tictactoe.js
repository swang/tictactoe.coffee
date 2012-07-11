(function() {
  var $, main;
  $ = jQuery;
  main = (function($) {
    var canvas, context, draw, gameOver, system;
    system = tictactoe.ai;
    draw = tictactoe.draw;
    canvas = document.getElementById("the_board");
    context = canvas.getContext("2d");
    gameOver = false;
    $(document).ready(function() {
      $('#the_board').center();
      draw.setContext(context);
      draw.board();
      return draw.newGameButton();
    });
    $.fn.center = function() {
      this.css("position", "absolute");
      this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
      this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
      return this;
    };
    $(window).bind('resize', function() {
      return $('#the_board').center();
    });
    return $('#the_board').bind('click', function(e) {
      var location, occupy, offsetX, offsetY, res, whoseTurn;
      offsetX = e.offsetX ? e.offsetX : e.pageX - this.offsetLeft;
      offsetY = e.offsetY ? e.offsetY : e.pageY - this.offsetTop;
      location = Math.floor(offsetY / 100) * 3 + Math.floor(offsetX / 100);
      if (offsetY > 300) {
        system.clear();
        draw.clear();
        return gameOver = false;
      } else if (offsetY <= 300 && offsetX <= 300) {
        whoseTurn = system.toMove();
        occupy = system.occupy(location);
        if (occupy && !gameOver) {
          draw.nought(location);
          if (system.winner(1)) {
            draw.connectLine(system.winnerWhere(1), "#00ff00");
            draw.stamp("YOU WIN", "#00ff00");
            gameOver = true;
          } else if (system.getFreePositions().length === 0) {
            draw.stamp("TIE", "#00ffff");
            gameOver = true;
          }
          if (whoseTurn === 1 && !system.winner(1) && !system.winner(-1)) {
            res = system.alphaBetaSearch(system.board(), -whoseTurn);
            system.occupy(res[2]);
            draw.cross(res[2]);
            if (system.winner(-1)) {
              draw.connectLine(system.winnerWhere(-1), "#ff0000");
              draw.stamp("YOU LOSE", "#ff0000");
              return gameOver = true;
            }
          }
        }
      }
    });
  })($);
}).call(this);
