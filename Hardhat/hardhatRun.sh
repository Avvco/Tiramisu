#!/bin/bash

npx hardhat node
cp ./scripts/address/medical-address.ts ../Angular/src/app/user/util/contract/address/medical-address.ts
cp ./scripts/address/patient-address.ts ../Angular/src/app/user/util/contract/address/patient-address.ts
cp ./scripts/address/verifier-address.ts ../Angular/src/app/user/util/contract/address/verifier-address.ts
