
export function probabilityMassFunction(lambda: number, kTimes: number): number {
    // Formula: (e^(-lambda)*lambda^kTimes)/kTimes!
    const denFact = factorial(kTimes);
    const eulerPow = Math.pow(Math.E,-lambda);
    const nomResult = eulerPow*Math.pow(lambda, kTimes)
    const k = Math.round(((nomResult/denFact) + Number.EPSILON) * 100) / 100
    //console.log(k*100)
    //console.log((k*100+'%').padEnd(2))

    return +(nomResult/denFact).toFixed(5)
  }

function factorial(n: number): number{
    if(n <= 1) return 1
    return n*factorial(n-1)
}

