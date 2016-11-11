var mongoose = require('mongoose');
var Comment = require('../models/comment');

//save comment
exports.save = function (req, res) {
  var _comment = req.body.comment;
  var movieId = _comment.movie;

  //回复
  if (_comment.cid) {
  	Comment.findById(_comment.cid, function(err, comment) {
  		var reply = {
  			from:_comment.from,
  			to:_comment.tid,
  			content:_comment.content
  		};

  		comment.reply.push(reply);
  		comment.save(function(err, comment){
  			if (err) {
	        console.log(err);
	      }
	      res.redirect('/movie/' + movieId);
  		});
  	});
  } else {  //新评论
  	var comment = new Comment(_comment);
	 	comment.save(function(err, comment) {
	 		if (err) {
	 			console.log(err);
	 		}
	 		res.redirect('/movie/'+movieId);
	 	});
  }	
};