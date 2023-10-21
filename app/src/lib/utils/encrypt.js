import { get } from 'svelte/store';
import { publicKey } from './stores.js'

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export async function encryptData(plainText) {

    // Convert the plaintext to an ArrayBuffer
    const plainTextEncoder = new TextEncoder();
    const plainTextBuffer = plainTextEncoder.encode(plainText);

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
        {
        name: 'RSA-OAEP'
        },
        get(publicKey),
        plainTextBuffer
    );

    // Convert the encrypted data to Base64 for easy transport
    const encryptedDataBase64 = arrayBufferToBase64(encryptedData);

    return encryptedDataBase64;
}