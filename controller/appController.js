'use strict';

var Task = require('../model/appModel.js');


exports.list_all_tasks = function(req,response){
  Task.getAllTask(function(err, task) {

    console.log('controller')
    if (err)
      response.send(err);
      // console.log('res', task);
    response.send(task);
  });
};



exports.create_a_task = function(req,response){
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){

            response.status(400).send({ error:true, message: 'Please provide task/status' });

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      response.send(err);
    response.json(task);
  });
}
};


exports.read_a_task = function(req,response){
  // Task.getTaskById(req.params.taskId, function(err, task) {
    Task.getTaskById(req.params, function(err, task) {
    if (err)
      response.send(err);
    response.json(task);
  });
};


exports.update_a_task = function(req,response){
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      response.send(err);
    response.json(task);
  });
};


exports.delete_a_task = function(req,response){


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      response.send(err);
    response.json({ message: 'Task successfully deleted' });
  });
};