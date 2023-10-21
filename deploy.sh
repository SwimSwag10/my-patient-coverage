cd ./app/
npm ci --prefer-offline
npm run build
cd ../aws-cdk/
npm ci --prefer-offline
cdk deploy MyPatientCoverage --hot-swap
cd ../