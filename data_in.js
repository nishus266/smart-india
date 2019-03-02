module.exports= (request , response) => {
  response.send(request.query);
};
