import trainedNet from './neuralNet/trained-net';



exports.handler = function(event, context, callback) {
    let result = []
    let board = JSON.parse(event.body)
    const boardSum = board.reduce((a,b) => a + b, 0)

    if(boardSum === -1) {
        console.log('flipBoard')
        board = board.map(position => {
            if(position === 0) {
                return 0
            }
            return position === 1 ? 1 : -1
        })
    }

    result = trainedNet(board)

    const emptySpaces = board.map((space, index) => {
        return space === 0 ? result[index] : null
    }).filter(space => {
        return space !== null
    })

    const position = thing.indexOf(emptySpaces.sort(function(a, b){return b - a})[0])
  
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(position)
    })
  }