$(document).ready(function() {
	const rootRef = firebase.database().ref();
	var ideaRef = rootRef.child('ideas')

	$('#send_btn').on('click', () => {
		var title = $("#title").val();
		var description = $("#description").val();

		ideaRef.push({
			Title: title,
			Description: description,
			User_Id: "stranger",
			Upvotes: 0,
			Downvotes: 0,
			Comments: 0,
			Time: "12:00"
		})
		.then(() => {
			console.log('second check');
			$("#title").val("");
			$("#description").val("");
		})
		.catch(function(e) {
			console.log('Error is: ' + e.stack);
		});
	});	
});