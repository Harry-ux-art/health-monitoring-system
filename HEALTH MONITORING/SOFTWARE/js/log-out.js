const signOut = document.getElementById('logout');
logout.addEventListener('click', function () {
	firebaseConfig
		.auth()
		.signOut()
		.catch(function (error) {
			// An error happened.
			var errorCode = error.code;
			var errorMessage = error.message;
			window.alert(errorMessage);
		});
});
