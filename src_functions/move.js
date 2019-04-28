// require('dotenv').config();
// import connectToDatabase from './db/connect';
// import Move from './models/move';

// exports.handler = async function(event, context) {

//   // The internet said I should set this to false. I don't really understand why.
//   // It might be something to do with keeping db connections alive between requests.
//   context.callbackWaitsForEmptyEventLoop = false;

//   try {
//     await connectToDatabase();
//     // eslint-disable-next-line
//     const body = JSON.parse(event.body)
//     const move = new Move(body);
//     const response = await move.save()
//     return {body: JSON.stringify(response), statusCode: 200};
//   } catch (e) {
//     return {body: e.message, statusCode: 500};
//   }
// }
