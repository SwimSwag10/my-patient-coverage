// what will go inside of here eventually is the fetchs to the backend for the delta data.
// for now we can build this fetch request using the paymentObjectTest

import { paymentObjectTest } from '$lib/utils/paymentObjectTest.json';
import { deltaClaimDetails } from '$lib/utils/deltaClaimDetails.json';
import { deltaPaymentDetails } from '$lib/utils/deltaPaymentDetails.json';
import { deltaPaymentSearch } from '$lib/utils/deltaPaymentSearch.json';
import usefulRequestHeaders from 'something.okaygebusiness';

async function getDeltaPaymentData() {
  // const requestHeaders = {}

  // const response = await fetch("paymentObjectTest.json", {
  //     method: 'POST',
  //     headers: requestHeaders,
  //     body: "testing",
  // })

  // if (response.ok) {
  //     console.log(await response.json())
  // }
  return paymentObjectTest
}

async function getDeltaClaimData() {
  return ClaimObjectTest
}

// This endpoint contains this EFTID - NjYyN0Y0ODI5RTRERjAxOTk4QkY4NjkyMkIyNjY0MDM2MzQxOUJGOTZENDBGNkNFQjA1RTBFMEFBRQ==
// TEMPORARY - I realize all of the payload data will not be required, but I passed them as params for the function call anyway
async function getDeltaPayments(startDate, endDate, carrierAcronyms, beginIndex, isSearch, order, orderByFields, paymentType, paymentPayeeType) {
  const response = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claimpayment/search", {
    method: 'POST',
    headers: usefulRequestHeaders,
    body: JSON.stringify({"start_date":"2023-02-12T05:47:48.522Z","end_date":"2023-05-13T05:47:48.522Z","carrier_acronyms":["DDPA"],"begin_index":0,"is_search":false,"order":"desc","order_by_fields":["issue_date"],"payment_type":"EFT","payment_payee_type":"Provider"}),
  });

  return response;
}

// This endpoint contains this ClaimId - NjAyREUxRUJFMTVERjMxQjlFQjA4NTlCMkRGQzFEQzA3NkNGMjZFOTUxQTYyOUVGM0Q2MzE4NTc0RTM5OUY=
async function getDeltaEftDetails(EftId) {
  const response = await fetch(`https://www.dentalofficetoolkit.com/api/dot-gateway/v1/EFTPaymentDetails?eftId=${EftId}`, {
    method: 'POST',
    headers: usefulRequestHeaders,
    body: `${EftId}`,
  });

  return response;
}

// inside of this endpoint we can get the paymentId (that has the claim inside), as well as the memberId (the id of the patient who has insurance)
async function getDeltaClaimDetails(claimId) {
  const response = await fetch(`https://www.dentalofficetoolkit.com/api/dot-gateway/v1/EFTPaymentDetails?eftId=${claimId}`, {
    method: 'POST',
    headers: usefulRequestHeaders,
    body: `${claimId}`,
  });

  return response;
}