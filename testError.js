
'use strict';

const fs = require('fs');

// fs.unlink('./article_list/movie00.txt', function(err){

	// if (err) console.log(err.message);
	// console.log('successfully deleted /article_list/movie0.txt');

// });


ttt2(function(err,result){
	
	console.log(err);
	console.log(result);
	
	// if (err) throw (err);
 	
});

function ttt2 (callback){
	
	console.log(ttt2);
	
	var err2 = new Error('hi iam error');
	
	callback(null,'eee');
	
}

// try{
	
	// var error ;
	
	// fs.unlinkSync('./article_list/movie22222.txt');
	// console.log('successfully deleted /article_list/movie0.txt');
	
// }catch(e){
	
	// error = e;
	// throw (e);
	// console.error(e);
	// console.log( e.code );
	// console.log(e.errnos);
	
// }finally{
	
	// console.log('HIHI iam final');
	
// }
// console.log('HIHI iam outside');
// if (error) console.log (error);

// function init() {
  // var name = "Mozilla";
  // function displayName() {
    // console.log(name);
  // }
  // displayName();
// }

// init();

// function print() {
  // for (var i in arguments) {
    // console.log(i, ":", arguments[i]);
  // }
  // console.dir(arguments);
// }
 
// print(3, 2.71828, "hello");

// var animals = [
  // {species: 'Lion', name: 'King'},
  // {species: 'Whale', name: 'Fail'}
// ];

// for (var i = 0; i < animals.length; i++) {
  // (function (i) { 
    // console.log(i);
  // }).call(i);
// }

// var EventEmitter = require('events').EventEmitter;
// var util = require('util');

// function MyClass() {
  // if (!(this instanceof MyClass)) return new MyClass();

  // EventEmitter.call(this);

  // var self = this;
  // setTimeout(function timeoutCb() {
    // self.emit('myEvent', 'hello world', 42);
  // }, 1000);
// }
// util.inherits(MyClass, EventEmitter);

// var myObj = new MyClass();
// var start = Date.now();
// myObj.on('myEvent', function myEventCb(str, num) {
  // console.log('myEvent triggered', str, num, Date.now() - start);
// });
// myObj.on('myEvent', function myEventCb(str, num) {
  // console.log('myEvent triggered', str, num, Date.now() - start);
// });
// myObj.on('myEvent', function myEventCb(str, num) {
  // console.log('myEvent triggered', str, num, Date.now() - start);
// });