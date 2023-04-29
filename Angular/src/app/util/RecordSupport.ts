export async function set_record(data: any) {
  console.log(data);

  (document.getElementById('identifier-value') as HTMLInputElement).value = data.identifier[0].value;

  (document.getElementById('name-family') as HTMLInputElement).value = data.name[0].family;

  (document.getElementById('name-given') as HTMLInputElement).value = data.name[0].given;

  if (data.gender == "male") {
    (document.getElementById('gender-male') as HTMLInputElement).checked = true;
  }
  else {
    (document.getElementById('gender-female') as HTMLInputElement).checked = true;
  }

  (document.getElementById('telecom-value') as HTMLInputElement).value = data.telecom[0].value

    (document.getElementById('address-city') as HTMLInputElement).value = data.address[0].text;

  (document.getElementById('birthDate') as HTMLInputElement).value = data.birthDate;
}