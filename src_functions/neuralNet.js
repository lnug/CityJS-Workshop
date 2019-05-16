import trainedNet from './neuralNet/trained-net';

exports.handler = function(event, context, callback) {
    const result = []
    const board = JSON.parse(event.body)
    const result = trainedNet(board)
    
    console.log(result)

    const emptySpaces = board.map((space, index) => {
        return space === 0 ? result[index] : null
    }).filter(space => {
        return space !== null
    })

    const response = {
        index: result.indexOf(emptySpaces.sort(function(a, b){return b - a})[0])
    }
  
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
    })
  }
