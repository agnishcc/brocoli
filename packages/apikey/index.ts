/**
 * @description Generates a random API key
 * 
 * @returns a apiKey string
 * @example
 * const apiKey = generateApiKey();
 * console.log(apiKey);
 * // Output: 3d4f5g6h7j8k9l0
 * 
 */

export const generateApiKey = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


/**
 * @description Obfuscates an API key
 * 
 * @param {string} apiKey - The API key to obfuscate
 * 
 * @param {Object} visibility - The visibility of the API key
 * @param {number} visibility.start - The number of visible characters at the start of the API key. Default is 3
 * @param {number} visibility.end - The number of visible characters at the end of the API key. Default is 4
 * 
 * @returns a obfuscated API key string
 * @example
 * const apiKey = '3d4f5g6h7j8k9l0';
 * const obfuscatedApiKey = obfuscateApiKey(apiKey);
 * console.log(obfuscatedApiKey);
 * // Output: 3d4***************k9l0
* @example
* const apiKey = 3d4f5g6h7j8k9l0';
* const obfuscatedApiKey = obfuscateApiKey(apiKey, { start: 2, end: 2 });
* console.log(obfuscatedApiKey);
* // Output: 3d**********l0
* 
*/
export const obfuscateApiKey = (apiKey: string, visibility?: {
    start: number,
    end: number
}): string => {
    const visibleStart = visibility?.start || 3;
    const visibleEnd = visibility?.end || 4;
    return apiKey.substring(0, visibleStart) + '*'.repeat(apiKey.length - (visibleStart - visibleEnd)) + apiKey.substring(apiKey.length - visibleEnd);
}