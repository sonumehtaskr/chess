import { Chess } from 'chess.js'
import { WebSocket, WebSocketEventMap } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from './messages';

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: string[];
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string
    }) {
        // validation here

        //is it this users move
        if (this.moves.length % 2 === 0 && socket !== this.player1) {
            return;
        };
        if (this.moves.length % 2 !== 0 && socket !== this.player2) {
            return;
        };

        //is the move valid
        try {
            this.board.move(move);
        } catch (e) {
            console.log("error while moving ->>", e);
            return;
        }


        //check if the game is over
        if (this.board.isGameOver()) {
            // send the player that game is over
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                winner: this.board.turn() === "w" ? "Black" : "White"
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                winner: this.board.turn() === "w" ? "Black" : "White"
            }));
        }

        //send the update board to both players
        if (this.moves.length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }

        this.moves.push(JSON.stringify(move));
        //update the board
        //push the move
    }
}