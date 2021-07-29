'use strict';
const Product = require('../models/product.model');

exports.findAll = function(request, response) {
Product.findAll(function(err, product) {
  console.log('controller')
  if (err)
  response.send(err);
  console.log('response', product);
  response.send(product);
});
};

exports.create = function(request, response) {  
const new_employee = new Product(request.body);
//handles null error
if(request.body.constructor === Object && Object.keys(request.body).length === 0){
  response.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Product.create(new_employee, function(err, product) {
  if (err)
  response.send(err);
  response.json({error:false,message:"Product added successfully!",data:product});
});
}
};

exports.findById = function(request, response) {
Product.findById(request.params.id, function(err, product) {
  if (err)
  response.send(err);
  response.json(product);
});
};

exports.update = function(request, response) {
  if(request.body.constructor === Object && Object.keys(request.body).length === 0){
    response.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Product.update(request.params.id, new Product(request.body), function(err, product) {
   if (err)
   response.send(err);
   response.json({ error:false, message: 'Product successfully updated' });
});
}
};

exports.delete = function(request, response) {
Product.delete( request.params.id, function(err, product) {
  if (err)
  response.send(err);
  response.json({ error:false, message: 'Product successfully deleted' });
});
};