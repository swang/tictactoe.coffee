(function() {
  var $, root;
  Array.prototype.count = function(item) {
    var c, count, _i, _len;
    count = 0;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      c = this[_i];
      if (c === item) {
        count++;
      }
    }
    return count;
  };
  root = this;
  if (!root.tictactoe) {
    root.tictactoe = {};
  }
  $ = jQuery;
  root.tictactoe.ai = (function($) {
    var alphaBetaSearch, board, chooseRandom, clear, config, getFreePositions, isBoard, loser, maxValue, minValue, negaMax, occupy, players, terminalTest, toMove, utility, winner, winnerWhere;
    config = {
      rows: 3,
      cols: 3,
      numToWin: 3,
      ply: 4
    };
    players = {
      cross: -1,
      naughts: 1
    };
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    toMove = function(boardState) {
      var player, state, _i, _len;
      if (boardState == null) {
        boardState = board;
      }
      player = [0, 0];
      for (_i = 0, _len = boardState.length; _i < _len; _i++) {
        state = boardState[_i];
        if (state === 1) {
          player[0]++;
        } else if (state === -1) {
          player[1]++;
        }
      }
      if (player[0] <= player[1]) {
        return 1;
      } else {
        return -1;
      }
    };
    occupy = function(location) {
      if (getFreePositions().indexOf(location) !== -1) {
        board[location] = toMove();
        return true;
      } else {
        return false;
      }
    };
    clear = function() {
      return board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
    isBoard = function(board) {
      return board.length === 9 && board !== undefined;
    };
    getFreePositions = function(boardState) {
      var idx, move, moves;
      if (boardState == null) {
        boardState = board;
      }
      return moves = (function() {
        var _len, _results;
        _results = [];
        for (idx = 0, _len = boardState.length; idx < _len; idx++) {
          move = boardState[idx];
          if (move === 0) {
            _results.push(idx);
          }
        }
        return _results;
      })();
    };
    terminalTest = function(boardState) {
      if (boardState == null) {
        boardState = board;
      }
      return getFreePositions(boardState).length === 0;
    };
    winner = function(boardState, player) {
      var result;
      if (player === void 0) {
        player = boardState;
        boardState = board;
      }
      result = winnerWhere(boardState, player);
      return result[0] !== -1 && result[1] !== -1;
    };
    loser = function(boardState, player) {
      if (boardState == null) {
        boardState = board;
      }
      return winner(boardState, -player);
    };
    winnerWhere = function(boardState, player) {
      var c, col, csub, dc1, diag1, diag2, dr1, dsub, iters, r, _ref, _ref2, _ref3;
      if (boardState == null) {
        boardState = board;
      }
      if (player === void 0) {
        player = boardState;
        boardState = board;
      }
      r = 0;
      while (r < config.rows) {
        if (boardState.slice(r * config.rows, (r * config.rows) + config.rows).count(player) === config.numToWin) {
          return [r * config.rows, (r * config.rows) + config.rows - 1];
        }
        r++;
      }
      c = 0;
      while (c < config.cols) {
        iters = 0;
        csub = c;
        col = [];
        while (csub < boardState.length && iters < config.numToWin) {
          col.push(boardState[csub]);
          iters++;
          csub += config.cols;
        }
        if (col.count(player) === config.numToWin) {
          return [c, c + (config.cols * (config.numToWin - 1))];
        }
        c++;
      }
      for (dc1 = 0, _ref = config.rows - config.numToWin + 1 - 1; 0 <= _ref ? dc1 <= _ref : dc1 >= _ref; 0 <= _ref ? dc1++ : dc1--) {
        for (dr1 = 0, _ref2 = config.cols - config.numToWin + 1 - 1; 0 <= _ref2 ? dr1 <= _ref2 : dr1 >= _ref2; 0 <= _ref2 ? dr1++ : dr1--) {
          diag1 = [];
          diag2 = [];
          for (dsub = 0, _ref3 = config.numToWin - 1; 0 <= _ref3 ? dsub <= _ref3 : dsub >= _ref3; 0 <= _ref3 ? dsub++ : dsub--) {
            diag1.push(boardState[(dr1 * config.cols) + (dsub * (config.rows + 1))]);
            diag2.push(boardState[(dr1 * config.cols) + 2 + (dsub * (config.cols - 1))]);
          }
          if (diag1.count(player) === config.numToWin) {
            return [(dr1 * config.cols) + (0 * (config.rows + 1)), (dr1 * config.cols) + ((config.numToWin - 1) * (config.rows + 1))];
          }
          if (diag2.count(player) === config.numToWin) {
            return [(dr1 * config.cols) + 2 + (0 * (config.cols - 1)), (dr1 * config.cols) + 2 + ((config.numToWin - 1) * (config.cols - 1))];
          }
        }
      }
      return [-1, -1];
    };
    utility = function(boardState, player) {
      var col, diag1, diag2, markScore, r, row, score;
      if (player === void 0) {
        player = boardState;
        boardState = board;
      }
      score = 0;
      markScore = [0, 1, 10, 1000];
      diag1 = [boardState[0], boardState[4], boardState[8]];
      diag2 = [boardState[2], boardState[4], boardState[6]];
      r = 0;
      while (r < config.rows) {
        row = boardState.slice(r * 3, (r * 3) + 3);
        if (row.count(player) > 0 && row.count(-player) === 0) {
          score += markScore[row.count(player)];
        } else if (row.count(-player) > 0 && row.count(player) === 0) {
          score -= markScore[row.count(-player)];
        }
        col = [boardState[r], boardState[r + 3], boardState[r + 6]];
        if (col.count(player) > 0 && col.count(-player) === 0) {
          score += markScore[col.count(player)];
        } else if (col.count(-player) > 0 && col.count(player) === 0) {
          score -= markScore[col.count(-player)];
        }
        if (diag1.count(player) > 0 && diag1.count(-player) === 0) {
          score += markScore[diag1.count(player)];
        } else if (diag1.count(-player) > 0 && diag1.count(player) === 0) {
          score -= markScore[diag1.count(-player)];
        }
        if (diag2.count(player) > 0 && diag2.count(-player) === 0) {
          score += markScore[diag2.count(player)];
        } else if (diag2.count(-player) > 0 && diag2.count(player) === 0) {
          score -= markScore[diag2.count(-player)];
        }
        r++;
      }
      return score;
    };
    chooseRandom = function(state, player) {
      var possMoves, result;
      possMoves = getFreePositions(state);
      result = possMoves[Math.floor(possMoves.length * Math.random())];
      return [player, 1, result];
    };
    alphaBetaSearch = function(state, player) {
      var abs, biggestValue, newBoard, possMoves, result, tryMove, _i, _len;
      biggestValue = -Infinity;
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        if (winner(newBoard, player)) {
          return [player, 1000, tryMove];
        }
        if (loser(newBoard, player)) {
          return [player, -1000, tryMove];
        }
        abs = -negaMax(newBoard, config.ply, -Infinity, Infinity, -player);
        if (abs > biggestValue) {
          biggestValue = abs;
          result = tryMove;
        }
        newBoard[tryMove] = 0;
      }
      return [player, biggestValue, result];
    };
    negaMax = function(state, depth, alpha, beta, player) {
      var newBoard, possMoves, tryMove, val, _i, _len;
      if (terminalTest(state) || depth === 0 || winner(state, player) || loser(state, player)) {
        return utility(state, player);
      }
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        val = -negaMax(newBoard, depth - 1, -beta, -alpha, -player);
        if (val >= beta) {
          return val;
        }
        alpha = Math.max(val, alpha);
        newBoard[tryMove] = 0;
      }
      return alpha;
    };
    maxValue = function(state, depth, alpha, beta, player, firstPlayer) {
      var minVal, newBoard, possMoves, tryMove, v, _i, _len;
      if (terminalTest(state) || depth === 0 || winner(state, firstPlayer) || loser(state, firstPlayer)) {
        utility(state, firstPlayer);
      }
      v = -Infinity;
      possMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        minVal = minValue(newBoard, depth - 1, alpha, beta, -player, firstPlayer);
        v = Math.min(v, minVal);
        if (v >= beta) {
          return v;
        }
        alpha = Math.max(v, alpha);
      }
      return v;
    };
    minValue = function(state, depth, alpha, beta, player, firstPlayer) {
      var maxVal, newBoard, passMoves, tryMove, v, _i, _len;
      if (terminalTest(state) || depth === 0 || winner(state, firstPlayer) || loser(state, firstPlayer)) {
        utility(state, firstPlayer);
      }
      v = Infinity;
      passMoves = getFreePositions(state);
      newBoard = state.slice(0);
      for (_i = 0, _len = possMoves.length; _i < _len; _i++) {
        tryMove = possMoves[_i];
        newBoard[tryMove] = player;
        maxVal = maxValue(newBoard, depth - 1, alpha, beta, -player, firstPlayer);
        v = Math.min(v, maxVal);
        if (v <= alpha) {
          return v;
        }
        beta = Math.min(beta, v);
      }
      return v;
    };
    return {
      board: function() {
        return board;
      },
      config: function() {
        return config;
      },
      toMove: toMove,
      occupy: occupy,
      clear: clear,
      isBoard: isBoard,
      getFreePositions: getFreePositions,
      terminalTest: terminalTest,
      winner: winner,
      loser: loser,
      winnerWhere: winnerWhere,
      utility: utility,
      chooseRandom: chooseRandom,
      alphaBetaSearch: alphaBetaSearch,
      maxValue: maxValue,
      minValue: minValue
    };
  })($);
}).call(this);
