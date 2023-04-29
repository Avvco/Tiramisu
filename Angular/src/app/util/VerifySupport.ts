import { verifyAllData, uploadAllDataOnchain, calculateMerkleTree } from 'src/app/util/MerkleSupport';

export async function verify_data() {
    let isValidNow = await verifyAllData();
    if (!isValidNow) {
        alert("Data broken");
        return false;
    }
    return true;
}
