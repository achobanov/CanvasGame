"use strict";

let fadeCounter = 0;
let animCOunter = 0;

function game() {
    initCanvas();
    renderBoard();
    // setupGame();
}

function update(x, y) {  // Invoked from click listener.
    if (selectedPiece) {
        let moves;
        if (selectedPiece.inPlay){
            moves = dropPiece(x, y);
        }
        else{
            moves = dropPieceBackToGame(x, y);
        }        
        
        selectedPiece = false; // cleanup by moving in dropPiece and renaming,
        availableMovesAmount -= moves;
        winner = countScore();
        if (availableMovesAmount <= 0 || winner) endTurn();
        render();
    } else {
        if (out.get(activePlayer).piecesOn.length > 0){
            selectedPiece = selectingOutPiece(x, y);
        }
        else {
            selectedPiece = selectingPiece(x, y);
        }
        //selectedPiece = selectingPiece(x, y);
        if (selectedPiece) {
            console.log('on select ' + selectedPiece);
            console.log(selectedPiece);
            
            if (selectedPiece.inPlay){
                calculatePossibleMoves(selectedPiece);
            }
            else {
                CalculatePossibleMovesForPieceOut(selectedPiece);
                if (availableMoves.length === 0){
                    endTurn();
                    render();
                }
            }
            
            requestAnimationFrame(animationLoop);
        }
    }
}

function animationLoop() {
    if (selectedPiece) {
        requestAnimationFrame(animationLoop);
        updateSelectedPiece();
    }
    render();
}

function updateSelectedPiece() {
    selectedPiece.x.start = cursorX;
    selectedPiece.y.start = cursorY;
}

function render() {
    renderBoard();
    renderStaticPieces();
    renderOutPieces();
// <<<<<<< HEAD
//     drawDice(dieImage1, dieImage2, DIE_COORDINATES_1, DIE_COORDINATES_2);
    if (selectedPiece && availableMoves != 0) renderSelectedPiece();
// =======
    drawDice();
    //if (selectedPiece) renderSelectedPiece();
    if (winner) drawEndGame();
// >>>>>>> origin/alex
}

$(function() {game();});
