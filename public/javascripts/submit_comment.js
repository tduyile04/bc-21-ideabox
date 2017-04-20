$(document).ready(function() {

	const rootRef = firebase.database().ref();
	var ideaRef = rootRef.child('ideas');

	$('#make-comment').on('click', () => {
		
		var comment = $("#comment").val();
		var title = $('#view-title').text();

		var commentRef = ideaRef.orderByChild('Title')
								.equalTo(title)
								.limitToFirst(1)
								.once('value', (snap) => {
									var data = snap.val();

									var keys = Object.keys(data);
									var key = keys[0];

									var upvoteRef = rootRef.child('ideas')
									.child(key).child('Comments')
									.push({
											Comment: comment,
											User_id: 'stranger',			
											Time: "12:00"
										})
										.then(() => {
											$("#comment").val("");
										})
										.catch(function(e) {
											console.log('Error is: ' + e.stack);
										});									
								});
	});	
});