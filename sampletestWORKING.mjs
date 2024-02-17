  // Package import
  import { ReclaimClient } from '@reclaimprotocol/js-sdk';

  // Initialize Reclaim Client
  const reclaimClient = new ReclaimClient("0xE08c4154c9C74F6bA315F5Fb173222f340cCCc6C" );

  // Constants
  const APP_SECRET ="0x142150d6be53ea803e12983ba8f772c244baac7378867f4d23da11311292cb60"
  const providers = [
    'f9cd906d-9729-45ee-9799-88bbae3e07c9', // Insta Follower Count
    ];

  // Function to initiate verification request  
  const initiateVerification = async () => {
    // Build provider
    const providerV2 = await reclaimClient.buildHttpProviderV2ByID(providers);

    // Build requested proofs
    const requestProofs = reclaimClient.buildRequestedProofs(providerV2, reclaimClient.getAppCallbackUrl());

    // Set signature
    reclaimClient.setSignature(await reclaimClient.getSignature(requestProofs, APP_SECRET));

    // Create verification request
    const reclaimReq = await reclaimClient.createVerificationRequest(providers);

    // Start verification
    const url = await reclaimReq.start();

    return url;
  };

  // Example usage
  initiateVerification().then(url => {
    console.log('Verification URL:', url);
  }).catch(error => {
    console.error('Error:', error);
  });
