// function responseHandler(databaseCallPromise, res) {
//     databaseCallPromise
//     .then((results) => {
//       if (results != null) {
//         res.status(200).send(results);
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch((err) => {
//       console.log(`Request error: ${err.stack}`);
//       res.sendStatus(500);
//     });
//   }
  
//   // handler per request, only needs to create db call with the desired params
//   // and pass it to the generic handler, which will take care of sending the response
// function(req, res, next) {
//     responseHandler(databaseCall(param1, param2), res)
//   }