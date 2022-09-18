import { probabilityMassFunction } from "../poisson/probability-mass-function";

export function generateRandomDir(){
    const mean = 15;
    const randomPoissonNum = probabilityMassFunction(mean, getRandom(25))
    let poissonNumToDec = Math.floor(randomPoissonNum*100)
    if(poissonNumToDec > 7) poissonNumToDec = 7
    return poissonNumToDec.toString(2).padStart(3, '0')
}

function getRandom(max: number) {
    const rand = Math.floor(Math.random() * max);
    return rand
}