function random(max, min = 0) {
    let result;
    result = Math.random() * (max - min);
    result = Math.floor(result + min);
    return result;
}
function randomPop(choices) {
    let rIndex = random(choices.length);
    let result = choices.splice(rIndex, 1)[0];
    return result;
}
export { random, randomPop };
//# sourceMappingURL=Random.js.map