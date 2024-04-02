import { generateApiKey, obfuscateApiKey } from "@repo/apikey";

const apiKey = generateApiKey();
console.log(apiKey);

const obfuscatedApiKey = obfuscateApiKey(apiKey);
console.log(obfuscatedApiKey);