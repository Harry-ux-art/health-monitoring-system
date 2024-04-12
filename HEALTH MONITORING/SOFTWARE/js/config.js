 var firebaseConfig = {
    apiKey: "AIzaSyAaWLnAWCO6wnPiVGWICltopV-Gi49AjyE",
    authDomain: "health-band-c7724.firebaseapp.com",
    projectId: "health-band-c7724",
    storageBucket: "health-band-c7724.appspot.com",
    messagingSenderId: "726529542100",
    appId: "1:726529542100:web:16b60b376ac05eb8e27841",
    measurementId: "G-X92W52DK6T"
  };
 
 firebase.initializeApp(firebaseConfig);
  firebase.analytics();
firebase.auth.Auth.Persistence.LOCAL;
$("#loginBt").click(function(){
                    var email= $('#emailID').val();
			var password = $('#pass').val();
    if(email!="" && password!=""){
        var result=firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error)
                    {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("message : "+ errorMessage);
        });
    }else{
        window.alert("Please fill out all fields");
    }
                    });

$("#logout").click(function(){
   firebase.auth().signOut(); 
    	window.location.href = '../index.html';
});

        var ref= database.ref('patientName');
            ref.on('value', gotData, errData);
            
            function gotData(data){
               var patientName = data.val();
                var keys = Object.keys(patientName);
                console.log(keys);
                for(var i=0; i<keys.length; i++){
                    var k = keys[i];
                    var bedNumber = patientName[k].bedNumber;
                    var patientName = patientName[k].patientName;
                    //console.log(bedNumber, patientName);
                    var li = createElement('li', bedNumber + ':' + patientName);
                    li.parent('lulu');
                }
            }
            function errData(){
                console.log('Error!');
                console.log(err);
            }