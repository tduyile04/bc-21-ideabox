$(document).ready(function() {

	//Generates the list data for the table rows
	const rootRef = firebase.database().ref();
	const ideaRef = rootRef.child('ideas');

	var title = $('#view-title').text();
	var comment;
	var key2;

	var commentRef = ideaRef.orderByChild('Title')
								.equalTo(title)
								.limitToFirst(1)
								.once('value', (snap) => {
									var data = snap.val();

									var keys = Object.keys(data);
									var key = keys[0];

									var upvoteRef = rootRef.child('ideas')
									.child(key).child('Comments')
									.on('value', (snap) => {

										comment = snap.val();
										//console.log('hey can you see me !');
										//console.log(comment);

										key2 = Object.keys(comment);

										console.log(key2);

										for (var i = key2.length - 1; i >=0; i--) {
											var k = key2[i];

										    var $entry = $('<li class="collection-item" id = "comment-field">' + comment[k].User_id + 
										    				':' + comment[k].Comment + '</li>');
											
											$('#comment-field').append($entry);
										}
									});							
								});

});