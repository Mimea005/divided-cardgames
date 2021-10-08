let random = (max, min = 0) => {
    let diff = max - min;
    let rDiff = Math.random() * diff;
    let rdecimal = rDiff + min;
    let rfloored = Math.floor(rdecimal);

    return rfloored

}

function randomPop(choices) {
    let randomIndex = random(choices.length);
    let item = choices[randomIndex];
    choices.splice(randomIndex, 1);
    return item
}

export { random, randomPop }