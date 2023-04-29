import { POST_OBSERVATION_API, GET_OBSERVATION_API } from './APIHandler';
import { POST_MEDICATION_API, GET_MEDICATION_API } from './APIHandler';

const MAX_HISTORY = 10;
const MAX_MEDICATION = 5;

/**
 * Different add data way
 **/

export async function add_observation(obs: any) {
  console.log("add observation");
  obs.identifier.value = (document.getElementById('search-value') as HTMLInputElement).value;
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
  med.identifier.value = (document.getElementById('search-value') as HTMLInputElement).value;

  for (let idx = 0; idx < totalMed; idx++) {
    med.code.coding.display = (document.getElementById('med-useway' + idx) as HTMLInputElement).value + '/..//../' + (document.getElementById('med-volume' + idx) as HTMLInputElement).value;
    med.code.text = (document.getElementById('med-name' + idx) as HTMLInputElement).value;

    console.log("idx:", idx, med);
    try {
      let status = await POST_MEDICATION_API(med)
        .then(async (res) => {
          return res.status;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      // console.log("status:", status);
      // if (status != 200) {
      //   alert("error");
      // }
    }
    catch (err) {
      console.log("observation error");
    }
  }
}

/**
 * Different get data way
 **/
export async function get_hitory_list(pateintID: any, caller: any) {
  let histories = await GET_OBSERVATION_API(pateintID)
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  let cur = histories.total - 1;
  if (cur == -1)
    cur = 0;
  for (let idx = 0; idx < MAX_HISTORY; idx++) {
    console.log(cur);
    let history = histories.entry[cur].resource;
    (document.getElementById('h' + idx) as HTMLInputElement).innerHTML = history.effectiveDateTime;
    cur--;
    if (cur < 0)
      break;
  }
}

export async function get_history(pateintID: any, idx: any, caller: any) {
  await get_observation(pateintID, idx, caller);
  await get_medication(pateintID, idx, caller);
}

async function get_observation(pateintID: any, idx: any, caller: any) {
  console.log(idx);
  console.log(pateintID);

  let res = await GET_OBSERVATION_API(pateintID)
    .then(async (res) => {
      let histories = res.data.entry;
      console.log(histories);

      let curHistoryIdx = parseInt(histories.length) - parseInt(idx) - 1;
      let curHistory = histories[curHistoryIdx];

      set_observation(curHistory.resource);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function get_medication(pateintID: any, idx: any, caller: any) {
  let res = await GET_MEDICATION_API(pateintID)
    .then(async (res) => {
      let histories = res.data.entry;
      let len = histories.length;
      console.log(histories);

      let first = len - MAX_MEDICATION * (idx + 1);
      let last = first + 4;
      for (let cur = first; cur <= last; cur++) {
        let history = histories[cur].resource;
        let srcStr = history.code.coding[0].display;
        let dataPair = medication_volume_parse(srcStr, "/..//../") ?? ["", ""];
        set_medication(cur - first, history, dataPair);
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

/**
 * This part is for set html by each data
 **/
function set_observation(observation: any) {
  console.log(observation);

  (document.getElementById('effectiveDateTime') as HTMLInputElement).value = observation.effectiveDateTime;
  (document.getElementById('performer') as HTMLInputElement).value = observation.performer[0].display;
  (document.getElementById('code-text') as HTMLInputElement).value = observation.code.text;
  (document.getElementById('method-text') as HTMLInputElement).value = observation.method.text;

}

function set_medication(idx: any, medication: any, dataPair: any) {
  if (medication.code.text != null)
    (document.getElementById('med-name' + idx) as HTMLInputElement).value = medication.code.text;
  (document.getElementById('med-useway' + idx) as HTMLInputElement).value = dataPair[0];
  (document.getElementById('med-volume' + idx) as HTMLInputElement).value = dataPair[1];
}

/**
 * This part is some utility
 **/
function medication_volume_parse(str: string, delimiter: string): [string, string] | null {
  const parts = str.split(delimiter);
  if (parts.length < 2) {
    return null;
  }
  return [parts[0], parts[parts.length - 1]];
}

async function get_cur_index(pateintID: any) {
  try {
    let index = await GET_OBSERVATION_API(pateintID)
      .then(async (res) => {
        return res.data.lengeh;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    return index;
  }
  catch (err) {

  }
}