TICTACTOE.COFFEE
===============

Plays a game of tic-tac-toe using Canvas and Javascript. AI being used is a negamax variant of minimax with alpha-beta pruning.

This is the same version that is in tictactoe.js except that the code has been written in CoffeeScript and then compiled over into javascript.

AI Algorithm
------------
At worst the AI will draw a tie against any opponent. However you can replace the version of the AI using negamax alpha-beta pruning with an AI that just randomly picks an open space.

To change this change the call in tictactoe.js from:

system.alphaBetaSearch(system.board(),-whoseTurn ) 

To this method.

system.chooseRandom(system.board(),-whoseTurn ) 

TODO
------------
This is pretty much complete although some cleanup in tictactoe.js would be nice. Maybe add an option in the interface to allow the user to choose between the negamax/alpha-beta pruning and the random AI.

License
------------
Copyright (c) 2012, Shuan Wang.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the organization nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
