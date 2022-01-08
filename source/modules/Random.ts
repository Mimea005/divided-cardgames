function random(max: number, min: number = 0): number {
    let result: number;
    result = Math.random() * (max - min);
    result = Math.floor(result + min);
    return result;
}

function randomPop(choices: Array<any>): any {
    let rIndex = random(choices.length);
    let result = choices.splice(rIndex, 1)[0];
    return result;
}

export { random, randomPop }
