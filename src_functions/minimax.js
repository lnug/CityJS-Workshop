const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const huPlayer = 1;

const aiPlayer = -1;

let moves = []



function checkWin(board, player) {
	const winCheck = player === huPlayer ? 1 : -1
	const plays = board.map((space, index) => {
    return space === winCheck ? index :null
  }).filter(space => {
    return space !== null
  })

  
  const win = winConditions.map((winCon) => {

    const things = winCon.map(space => {
      return plays.indexOf(space) > -1
    }).filter(bool => bool === true)

    return things.length === 3
  })

  const response = win.indexOf(true) > -1 ? { index: win.indexOf(true), winner: player } : null

	return response
}


const availableSpaces = (board) => {
  return board.map((space, index) => {
    return space === 0 ? index : null
  }).filter(space => {
    return space !== null
  })
}

function miniMax(newBoard, player) {


  console.log(newBoard, player)

  let emptySpaces = availableSpaces(newBoard)
  
  if (checkWin(newBoard, huPlayer))
	{
		return {score: -10};
	} 
	else if (checkWin(newBoard, aiPlayer))
	{
		return {score: 10};
	} 
	else if (emptySpaces.length === 0)
	{
		return {score: 0};
	}

  for(let x = 0; x < emptySpaces.length; x++) {

    let move = {
      index: emptySpaces[x]
    }
    newBoard[emptySpaces[x]] = player

    if (player == aiPlayer) {
      var result = miniMax(newBoard, huPlayer)
      move.score = result.score
    } else {
      var result = miniMax(newBoard, huPlayer)
      move.score = result.score
    }

    newBoard[emptySpaces[x]] = 0
    moves.push(move)
  }

  let bestMove;
	if(player === aiPlayer) 
	{
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].score > bestScore) 
			{
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} 
	else 
	{
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].score < bestScore)
			{
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
  }
  return moves[bestMove];
}



exports.handler = function(event, context, callback) {

  const board = JSON.parse(event.body)

  callback(null, {
      statusCode: 200,
      body: JSON.stringify(miniMax(board, -1))
  })
}