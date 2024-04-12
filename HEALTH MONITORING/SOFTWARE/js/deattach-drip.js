const checkBtn = document.getElementById('check');
const deattachDripBtn = document.getElementById('discharge');
const message = document.getElementById('message');
const form = document.getElementById('patIdForm');
const patDiv = document.getElementById('pat');
var patientFound;
var dripFound;
document
	.getElementById('inputPatientID')
	.addEventListener('keypress', function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
		}
	});

const patientName = document.getElementById('name');
const patientAge = document.getElementById('age');
const patientBloodGroup = document.getElementById('bloodGroup');
const patientMobile = document.getElementById('mobile');
const patientGender = document.getElementById('gender');
const consultingDoctor = document.getElementById('doctor');
const patientAddress = document.getElementById('address');
const roomNumber = document.getElementById('roomNumber');
const bedNumber = document.getElementById('bedNumber');

const db1 = firebase.database();
const db2 = firebase.database();
const db3 = firebase.database();

class Patient {
	constructor(
		id,
		name,
		age,
		bloodGroup,
		mobile,
		gender,
		doctor,
		address,
		roomNumber,
		bedNumber,
		emergencyNumber,
		healthScheme,
		insurance,
		medHistory,
		symptoms
	) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.bloodGroup = bloodGroup;
		this.mobile = mobile;
		this.gender = gender;
		this.doctor = doctor;
		this.address = address;
		this.roomNumber = roomNumber;
		this.bedNumber = bedNumber;
		this.emergencyNumber = emergencyNumber;
		this.healthScheme = healthScheme;
		this.insurance = insurance;
		this.medHistory = medHistory;
		this.symptoms = symptoms;
	}
}

let patient = new Patient();

checkBtn.addEventListener('click', function () {
	const patientID = document.getElementById('inputPatientID').value;
	if (!patientID) {
		message.innerHTML = 'ERROR : NO PATIENT ID PROVIDED!';
		message.style.visibility = 'visible';
		message.style.color = 'rgb(255,0,0)';
	} else {
		patientFound = 0;
		pat.style.visibility = 'hidden';
		message.style.visibility = 'hidden';
		deattachDripBtn.style.visibility = 'hidden';

		db1
			.ref()
			.once('value')
			.then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					if (childSnapshot.key == patientID) {
						patientFound = 1;
						patient = new Patient(
							patientID,
							childSnapshot.child('patientName').val().toUpperCase(),
							childSnapshot.child('patientAge').val(),
							childSnapshot.child('patientBloodGroup').val().toUpperCase(),
							childSnapshot.child('patientMobile').val(),
							childSnapshot.child('patientGender').val().toUpperCase(),
							childSnapshot.child('consultingDoctor').val().toUpperCase(),
							childSnapshot.child('patientAddress').val().toUpperCase(),
							childSnapshot.child('roomNumber').val(),
							childSnapshot.child('bedNumber').val(),
							childSnapshot.child('patientEmergencyNumber').val(),
							childSnapshot.child('patientHealthScheme').val().toUpperCase(),
							childSnapshot.child('patientInsurance').val().toUpperCase(),
							childSnapshot.child('prevMedicalHistory').val().toUpperCase(),
							childSnapshot.child('patientSymptoms').val().toUpperCase()
						);
					}
				});
				if (patientFound == 0) {
					form.reset();
					message.innerHTML =
						'ERROR : NO PATIENT WITH PATIENT ID - ' + patientID + ' FOUND !';
					message.style.visibility = 'visible';
					message.style.color = 'rgb(255,0,0)';
				} else {
					form.reset();
					patientName.innerHTML = '<b>NAME : </b>' + patient.name;
					patientAge.innerHTML = '<b>AGE : </b>' + patient.age;
					patientBloodGroup.innerHTML =
						'<b>BLOOD GROUP : </b>' + patient.bloodGroup;
					patientMobile.innerHTML = '<b>MOBILE : </b>' + patient.mobile;
					patientGender.innerHTML = '<b>GENDER : </b>' + patient.gender;
					consultingDoctor.innerHTML =
						'<b>CONSULT. DOCTOR : </b>' + patient.doctor;
					roomNumber.innerHTML = '<b>ROOM NUMBER: </b>' + patient.roomNumber;
					bedNumber.innerHTML = '<b>BED NUMBER : </b>' + patient.bedNumber;
					pat.style.visibility = 'visible';
					deattachDripBtn.style.visibility = 'visible';
					// ivForm.style.display = 'block';
				}
			});
	}
});

deattachDripBtn.addEventListener('click', function () {
	dripFound = 0;
	db2
		.ref()
		.once('value')
		.then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				if (patient.roomNumber == parseInt(childSnapshot.key.slice(12), 10)) {
					childSnapshot.forEach(function (child2Snapshot) {
						if (
							patient.bedNumber == parseInt(child2Snapshot.key.slice(11), 10)
						) {
							console.log(
								child2Snapshot.child('patientName').val().toUpperCase()
							);
							dripFound = 1;
						}
					});
				}
			});

			if (dripFound == 0) {
				message.innerHTML = 'NO PATIENT FOUND WITH THIS ID';
				message.style.visibility = 'visible';
				message.style.color = 'rgb(255,0,0)';
			} else {
				removeDrip();
			}
		});
});

function removeDrip() {
	message.innerHTML = 'ATTACHED THE PATIENT DOCUMENTS USING THE LINK https://forms.gle/TKojnbApPXSfLoa26';
	message.style.color = 'rgb(0,115,255)';
	message.style.visibility = 'visible';

	db2
		.ref(`Room Number ${patient.roomNumber}`)
		.child(`Bed Number ${patient.bedNumber}`)
		.remove();

	deattachDripBtn.style.visibility = 'hidden';
}
