export class HealthRecord {
	firstDate: string;
	recordId: string;

	patientName: string;
	birthDate: string;
	gender: string;

	personId: string;
	contactPhone: string;
	actionPhone: string;

	profession: string;
	marriage: string;

	blood: string;
	drugAllergy: string;

	contactAddress: string;
	freePaper: string;

	newsletter: string;
	emailAddress: string;

	emergencyContact: string;
	relationship: string;
	emergencyContactPhone: string;

	height: string;
	weight: string;
	BMI: string;

	waistline: string;
	pressure: string;
	pulse: string;

	weightchange: string;
	cigarette: string;

	betel: string;
	alcohol: string;
	sport: string;

	constructor(
		firstDate: string, recordId: string,
		patientName: string, birthDate: string, gender: string,
		personId: string, contactPhone: string, actionPhone: string,
		profession: string, marriage: string,
		blood: string, drugAllergy: string,
		contactAddress: string, freePaper: string,
		newsletter: string, emailAddress: string,
		emergencyContact: string, relationship: string,
		emergencyContactPhone: string, 
		height: string, weight: string, BMI: string,
		waistline: string, pressure: string, pulse: string,
		weightchange: string, cigarette:string, 
		betel: string, alcohol: string, sport: string) {

		this.firstDate = firstDate;
		this.recordId = recordId;

		this.patientName = patientName;
		this.birthDate = birthDate;
		this.gender = gender;

		this.personId = personId;
		this.contactPhone = contactPhone;
		this.actionPhone = actionPhone;

		this.profession = profession;
		this.marriage = marriage;

		this.blood = blood;
		this.drugAllergy = drugAllergy;

		this.contactAddress = contactAddress;
		this.freePaper = freePaper;

		this.newsletter = newsletter;
		this.emailAddress = emailAddress;

		this.emergencyContact = emergencyContact;
		this.relationship = relationship;
		this.emergencyContactPhone = emergencyContactPhone;

		this.height = height;
		this.weight = weight;
		this.BMI = BMI;

		this.waistline = waistline;
		this.pressure = pressure;
		this.pulse = pulse;

		this.weightchange = weightchange;
		this.cigarette = cigarette;

		this.betel = betel;
		this.alcohol = alcohol;
		this.sport = sport;
	}
}
