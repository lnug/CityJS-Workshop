import { post } from 'axios'

export async function addMove({
  game,
  board,
  move
}) {
  return post('/.netlify/functions/move', { game, board, move });
}

export async function getAIMove(board) {
  return post('/.netlify/functions/neuralNet', board);
}

export default { 
  addMove,
  getAIMove,
}