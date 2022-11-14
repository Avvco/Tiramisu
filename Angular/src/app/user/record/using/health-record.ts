export class HealthRecord{
	identifier: string;

	nameFamily: string;
	nameGiven: string;

	gender: string;

	telecom: string;

	addressCity: string;

	birthDate: string;

	constructor(data: any){
		this.identifier = data.entry[0].resource.identifier[0].value;

		this.nameFamily = data.entry[0].resource.name[0].family;
		this.nameGiven = data.entry[0].resource.name[0].given;

		this.gender = data.entry[0].resource.gender;

		this.telecom = data.entry[0].resource.telecom[0].value;

		this.addressCity = data.entry[0].resource.address[0].city;

		this.birthDate = data.entry[0].resource.birthDate;
	}
}
