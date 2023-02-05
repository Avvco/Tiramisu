#!/bin/bash

npx hardhat node

cp ./address/medical-address.ts ../Angular/src/app/user/util/contract/address/medical-address.ts
cp ./address/patient-address.ts ../Angular/src/app/user/util/contract/address/patient-address.ts
cp ./address/verifier-address.ts ../Angular/src/app/user/util/contract/address/verifier-address.ts
