import { probabilityMassFunction } from "../poisson/probability-mass-function";

export function generateRandomOperation(){
    // generate random operation types (READ, WRITE OR CALC)
    const mean = 15;
    const randPoissonNum1 = probabilityMassFunction(mean, getRandom(25))
    const randPoissonNum2= probabilityMassFunction(mean, getRandom(25))
    const randPoissonNum3 = probabilityMassFunction(mean, getRandom(25))

    const operations = ['READ', 'WRITE', 'CALC']
    const randValues = [randPoissonNum1, randPoissonNum2, randPoissonNum3]
    const randomIndex = randValues.indexOf(Math.max(...randValues))
    return operations[randomIndex]
}

function getRandom(max: number) {
    const rand = Math.floor(Math.random() * max);
    return rand
}