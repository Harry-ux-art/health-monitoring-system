const div = document.getElementById('show');

const db = firebase.database();
db.ref().on('value', function (snapshot) {
	div.innerHTML = '';
	snapshot.forEach(function (childSnapshot) {
		var roomNumber = parseInt(childSnapshot.key.slice(12), 10);
		console.log(roomNumber);
		childSnapshot.forEach(function (child2Snapshot) {
			var bedNumber = parseInt(child2Snapshot.key.slice(11), 10);
			console.log(bedNumber);

			var divPat = document.createElement('div');
			divPat.classList.add('patBox');
			let patient = {
				'PATIENT ID': child2Snapshot.child('patientId').val(),
				NAME: child2Snapshot.child('patientName').val().toUpperCase(),
				'BED NUMBER': bedNumber,
				'ROOM NUMBER': roomNumber,
				DISEASE: child2Snapshot.child('patientSymptoms').val().toUpperCase(),
				'IV FLUID': child2Snapshot.child('patientIVFluid').val().toUpperCase(),
				'DRIP STATUS': child2Snapshot.child('dripStatus').val(),
			};

			let divDetail;
			for (detail in patient) {
				if (!(detail === 'DRIP STATUS')) {
					divDetail = document.createElement('div');
					divDetail.classList.add('patItem');
					divDetail.innerHTML = `<b>${detail}:</b> ${patient[detail]}`;
					divPat.appendChild(divDetail);
				}
			}

			divPat.style.borderRadius = '17px';

			if (patient['DRIP STATUS']) {
				divPat.style.boxShadow = '0 0 20px 2px #00E676';
			} else {
				divPat.style.boxShadow = '0 0 20px 2px #FF1744';
			}

			div.appendChild(divPat);
		});
	});
});
