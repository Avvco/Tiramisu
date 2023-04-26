import { POST_OBSERVATION_API, GET_OBSERVATION_API } from './APIHandler';
import { POST_MEDICATION_API, GET_MEDICATION_API } from './APIHandler';

export async function add_observation(obs: any) {
  console.log("add observation");
  obs.identifier = (document.getElementById('search-value') as HTMLInputElement).value;
  console.log(obs);

  try {
    let status = await POST_OBSERVATION_API(obs)
      .then(async (res) => {
        return res.status;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    console.log("status:", status);
    if (status != 200) {
      alert("error");
    }
  }
  catch (err) {
    console.log("observation error");
  }
}

export async function add_medication(med: any) {
  console.log("add medication");
  let totalMed = 5;
  let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
  let visitDate = (document.getElementById('visit-date') as HTMLInputElement).value;
  med.identifier = pateintID + visitDate;

  for (let idx = 0; idx < totalMed; idx++) {
    med.code = (document.getElementById('med-name' + idx) as HTMLInputElement).value;
    med.totalVolume = (document.getElementById('med-volume' + idx) as HTMLInputElement).value;
    med.definition = (document.getElementById('med-useway' + idx) as HTMLInputElement).value;
    console.log(med);

    try {
      let status = await POST_MEDICATION_API(med)
        .then(async (res) => {
          return res.status;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      console.log("status:", status);
      if (status != 200) {
        alert("error");
      }
    }
    catch (err) {
      console.log("observation error");
    }
  }
}