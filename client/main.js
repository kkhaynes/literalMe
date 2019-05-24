import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.mainBody.helpers({
	mainBodySort(){		
		return userDB.find({}, {sort:{upvote: -1}});		
	},
});

Template.mainBody.events({
	'click .js-upvote'(event, instance){
		var mainBodyID = this._id;
		var upvotes = userDB.findOne({_id: mainBodyID}).upvote;

		console.log(mainBodyID);                 

		if (!upvotes){
			upvotes = 0;
		}    

		upvotes++;

		userDB.update({_id: mainBodyID}, {$set:{'upvote':upvotes}});
	},

	'click .js-downvote'(event, instance){
		var mainBodyID = this._id;
		var downvotes = userDB.findOne({_id: mainBodyID}).downvote;  

		console.log(mainBodyID);                

		if (!downvotes){
			downvotes = 0;
		}    

		downvotes++;

		userDB.update({_id: mainBodyID}, {$set:{'downvote':downvotes}});
	},

	'click .js-view'(event, instance){	
		var modalname = "#BookProfile" + this._id;

		$(modalname).modal('show');
	},

	'click .js-eSave'(event, instance){
		var modalname = "#editBook" + this._id;

		var eBookID = this._id;
		var eTitle = $(modalname + ' input[name="eTitle"]').val();
		var eAuthor = $(modalname + ' input[name="eAuthor"]').val();
		var eDescription = $(modalname + ' textarea[name="eDescription"]').val();
		var eCoverImage = $(modalname + ' input[name="eCoverImage"]').val();

		$(modalname + ' input[name="eTitle"]').val('');
		$(modalname + ' input[name="eAuthor"]').val('');
		$(modalname + ' textarea[name="eDescription"]').val('');
		$(modalname + ' input[name="eCoverImage"]').val('');						

		$(modalname).modal('hide');
		 userDB.update({_id: eBookID}, {$set:{'title':eTitle, 'author':eAuthor, 'desc':eDescription, 'img':eCoverImage}});	
	},

	'click .js-edit'(event, instance){
		var editId = this._id;
		var modalname = "#editBook" + this._id;
		$(modalname + ' input[name="eTitle"]').val(userDB.findOne({_id:editId}).title);
		$(modalname + ' input[name="eAuthor"]').val(userDB.findOne({_id:editId}).author);
		$(modalname + ' textarea[name="eDescription"]').val(userDB.findOne({_id:editId}).desc);
		$(modalname + ' input[name="eCoverImage"]').val(userDB.findOne({_id:editId}).img);
		$(modalname).modal('show');
	},

	'click .js-delete'(event, instance){
		var deleteID = this._id;

		userDB.remove({_id:deleteID});
	},
});

Template.addBook.events({
	'click .js-save'(event, instance){
		var title = $('#addBook input[name="Title"]').val();
		var author = $('#addBook input[name="Author"]').val();
		var description = $('#addBook textarea[name="Description"]').val();
		var coverImage = $('#addBook input[name="CoverImage"]').val();

		if (coverImage == ""){
			coverImage = "noImage.png";
		}

		if (description == ""){
			description = "...";
		}

		$('#addBook input[name="Title"]').val('');
		$('#addBook input[name="Author"]').val('');
		$('#addBook textarea[name="Description"]').val('');
		$('#addBook input[name="CoverImage"]').val('');

		$('#addBook').modal('hide');		

		userDB.insert({'title':title, 'author':author, 'desc':description, 'img':coverImage});
	},
});
