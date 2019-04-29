import net from './brain/model';
import next from './brain/next';


exports.handler = function(event, context, callback) {
    const board = JSON.parse(event.body)
   
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify(next(board, net))
    })
}