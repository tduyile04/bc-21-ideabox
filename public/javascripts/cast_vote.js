$(document).ready(function() {

	const rootRef = firebase.database().ref();
	

	$('#upvotes').on('click', () => {

		var title = $('#view-title').text();
		console.log(title);

		var ideaRef = rootRef.child('ideas').orderByChild('Title')
							.equalTo(title)
							.limitToFirst(1)
							.once('value', (snap) => {
								data = snap.val();
								//console.log(data);

								var keys = Object.keys(data);
								var key = keys[0];

								var upvoteRef = rootRef.child('ideas').child(key).update({ Upvotes: data[key]['Upvotes'] + 1 });
							});
	});

	$('#downvotes').on('click', () => {
		var title = $('#view-title').text();

		var title = $('#view-title').text();
		console.log(title);

		var ideaRef = rootRef.child('ideas').orderByChild('Title')
							.equalTo(title)
							.limitToFirst(1)
							.once('value', (snap) => {
								data = snap.val();
								//console.log(data);

								var keys = Object.keys(data);
								var key = keys[0];

								var downvoteRef = rootRef.child('ideas').child(key).update({ Downvotes: data[key]['Downvotes'] + 1 });
							});
	});	
});