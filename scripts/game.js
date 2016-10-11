"use strict";

function game() {
    initCanvas();
    renderBoard();
}

function update(x, y) {  // Invoked from click listener.
    if (selectedPiece) {
        selectedPiece = dropPeace();
        if (spentMoves === availableMoves) endTurn();
    } else {
        selectedPiece = selectingPiece(x, y);
        if (selectedPiece) {
            console.log('on select ' + selectedPiece);
            calculatePossibleMoves(selectedPiece);
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
    if (selectedPiece) renderSelectedPiece();
    // renderDice();
}

$(function() {game();});
