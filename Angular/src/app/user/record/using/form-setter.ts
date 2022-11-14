import { HealthRecord } from './health-record';

export class FormSetter {
	record: any;

	constructor(data: any) {
		this.record = new HealthRecord(data);
	}

	public setForm() {
		console.log(this.record);

		console.log(this.record.identifier);
		(document.getElementById('identifier-value') as HTMLInputElement).value = this.record.identifier;

		console.log(this.record.nameFamily);
		(document.getElementById('name-family') as HTMLInputElement).value = this.record.nameFamily;

		console.log(this.record.nameGiven);
		(document.getElementById('name-given') as HTMLInputElement).value = this.record.nameGiven;

		console.log(this.record.gender);
		if (this.record.gender == "male") {
			(document.getElementById('gender-male') as HTMLInputElement).checked = true;
		}
		else {
			(document.getElementById('gender-female') as HTMLInputElement).checked = true;
		}

		console.log(this.record.telecom);
		(document.getElementById('telecom-value') as HTMLInputElement).value = this.record.telecom;

		console.log(this.record.addressCity);
		(document.getElementById('address-city') as HTMLInputElement).value = this.record.addressCity;

		console.log(this.record.birthDate);
		(document.getElementById('birthDate') as HTMLInputElement).value = this.record.birthDate;
	}
}
