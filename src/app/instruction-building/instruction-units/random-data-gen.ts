export function generateRandomDataToWrite(): string {
    const maxInt = parseInt('FFFF', 16)     //Max dec from possible hex values
    const dataDec = Math.floor(Math.random() * maxInt+1);
    return `0x${dataDec.toString(16)}`
}