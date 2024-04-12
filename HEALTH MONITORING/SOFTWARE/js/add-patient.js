const db = firebase.database();
const statDiv = document.getElementById('status');
const form = document.getElementById('addPatientForm');

// dbRefObject.on('value', snap => console.log(snap.val()));

const submit = document.getElementById('submit');

submit.addEventListener('click', function () {
	var patID = Date.now() % Math.pow(10, 7);

	const patient = {
		name: document.getElementById('inputName').value,
		age: document.getElementById('inputAge').value,
		bloodGroup: document.getElementById('inputBloodGroup').value,
		gender: document.getElementById('inputGender').value,
		doctor: document.getElementById('inputDoctorName').value,
		mobile: document.getElementById('inputNumber').value,
		room: document.getElementById('inputRoomNumber').value,
		bed: document.getElementById('inputBedNumber').value,
		emergencyNumber: document.getElementById('inputEmergencyNumber').value,
		address: document.getElementById('inputAddress').value,
		medHistory: document.getElementById('inputMedHistory').value,
		symptoms: document.getElementById('inputSymptoms').value,
		insurance: document.getElementById('inputInsurance').value,
		healthScheme: document.getElementById('inputHealthScheme').value,
	};
	let emptyFlag = false;
	for (detail in patient) {
		if (!patient[detail]) emptyFlag = true;
	}

	if (emptyFlag) {
		statDiv.style.color = 'rgb(255,0,0)';
		statDiv.style.visibility = 'visible';
		statDiv.innerText = 'ALL FIELDS ARE REQUIRED';
	} else {
		form.reset();

		db.ref(patID)
			.set({
				patientName: patient.name,
				patientAge: patient.age,
				patientBloodGroup: patient.bloodGroup,
				patientGender: patient.gender,
				consultingDoctor: patient.doctor,
				patientMobile: patient.mobile,
				roomNumber: patient.room,
				bedNumber: patient.bed,
				patientEmergencyNumber: patient.emergencyNumber,
				patientAddress: patient.address,
				prevMedicalHistory: patient.medHistory,
				patientSymptoms: patient.symptoms,
				patientInsurance: patient.insurance,
				patientHealthScheme: patient.healthScheme,
			})
			.then(function () {
				statDiv.style.color = 'rgb(0,115,255)';
				statDiv.style.visibility = 'visible';
				statDiv.innerText = 'SUCCESFULLY ADDED! PATIENT ID : ' + patID;
			})
			.catch(function (error) {
				var errorMessage = error.message;
				statDiv.style.color = 'rgb(255,0,0)';
				statDiv.innerText = 'ERROR: ' + errorMessage.toUpperCase();
			});
	}
});
