$(document).ready(function() {

	//Generates the list data for the table rows
	const rootRef = firebase.database().ref();
	const ideaRef = rootRef.child('ideas');

	var ideas;

	ideaRef.on('value', (snap) => {
		ideas = snap.val();

		var keys = Object.keys(ideas);

		console.log(keys);

		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];

		    var $row = $('<div class="row">' +
				'<div class="col s1">' +
					'<td><div>' + ideas[k].Upvotes + '</div>' + '<i class="material-icons">thumb_up</i>' + '</td>' +
				'</div>' +
				'<div class="col s1">' +
					'<td><div>' + ideas[k].Downvotes + '</div>' +  '<i class="material-icons">thumb_down</i>' + '</td>' + 
				'</div>' +
				'<div class="col s1">' +
					'<td><div>' + ideas[k].Comments + '</div>' +  '<i class="material-icons">chat_bubble</i>' + '</td>' + 
				'</div>' +

				'<div class="col s6">' +
					'<td><div><a href="/user/question">' + ideas[k].Title + '</a></div>' + ideas[k].Description + '</td>' +
				'</div>' +
				'<div class="col s3">' + 
					'<td><div>' + ideas[k].Time + '</div>' + ideas[k].User_Id + '</td>' +
				'</div>' +
			'</div>');
			
			$('#idea-list > tbody:last').append($row);
		}
	});

});