'user strict';
var connection = require('./../mysqlConnection.js');
var varConst = require('./../constants/constants')


// Task object constructor
var Task = function(task){
    console.log("task123********************************************="+task.status);
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.createTask = function createUser(newTask, result) {    
    console.log(JSON.stringify(newTask))
        connection.query("INSERT INTO tasks set ?", newTask, function (err,response){
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(response.insertId);
                    result(null, response.insertId);
                }
            });           
};
Task.getTaskById = function createUser(input, result) {
    var taskId = input.taskId;
        connection.query("Select task from tasks where id = ? ", taskId, function (err,response){             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Task.getAllTask = function getAllTask(result) {
        connection.query("Select * from tasks", function (err,response){

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};
Task.updateById = function(id, task, result){
  connection.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err,response){
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Task.remove = function(id, result){
     connection.query("DELETE FROM tasks WHERE id = ?", [id], function (err,response){

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Task;