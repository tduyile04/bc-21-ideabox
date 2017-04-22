$(document).ready(function() {	

	$('#upvotes').on('click', () => {

		var rootRef = firebase.database().ref();

		if($('#upvotes').prop['disabled'] == true) {

			return false;

		} else {

			$('#upvotes').prop('disabled', true);

			var title = $('#view-title').text();

			var ideaRef = rootRef.child('ideas').orderByChild('Title')
							.equalTo(title)
							.limitToFirst(1)
							.once('value', (snap) => {
								data = snap.val();

								var keys = Object.keys(data);
								var key = keys[0];

								var upvoteRef = rootRef.child('ideas').child(key).update({ Upvotes: data[key]['Upvotes'] + 1 });
							});
		}
		
	});

	$('#downvotes').on('click', () => {

		var ref = firebase.database().ref();

		if ($('#downvotes').prop['disabled'] == true) {
			return false;
		} 
		else {
			$('#downvotes').prop('disabled', true);

			var title = $('#view-title').text();

			var ideaRef = ref.child('ideas').orderByChild('Title')
							.equalTo(title)
							.limitToFirst(1)
							.once('value', (snap) => {
								data = snap.val();

								var keys = Object.keys(data);
								var key = keys[0];

								var downvoteRef = ref.child('ideas').child(key).update({ Downvotes: data[key]['Downvotes'] + 1 });
							});
		}
	});
		
		
});