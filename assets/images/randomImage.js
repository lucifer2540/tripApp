const images = {
    1: require('./1.png'),
    2: require('./2.png'),
    3: require('./3.png'),
    4: require('./4.png'),
    5: require('./5.png'),
    6: require('./6.png'),
    7: require('./7.png'),
    8: require('./8.png'),
    9: require('./9.png'),
    10: require('./10.png'),
    11: require('./11.png'),
    12: require('./12.png'),
    13: require('./13.png'),
    14: require('./14.png'),
    15: require('./15.png'),
    16: require('./16.png'),
    17: require('./17.png'),
    18: require('./18.png'),
    19: require('./19.png'),
}

export default function randomImage(){
    let min = 1;
    let max = 19;
    let random = Math.floor(Math.random()*(max-min + 1)) + min;
    return images[random];
}
