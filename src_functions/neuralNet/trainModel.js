const brain = require('brain.js/index')
const someData = require('../trainingData/multiLabel')
const fs = require('fs')

const betterData = someData.map(set => {

    const emptyArray = new Array(9).fill(0)

    emptyArray[set[9]] = 1
    return {
        input: set.slice(0, 9),
        output: set.slice(9)
    }
})

const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
};

const net = new brain.NeuralNetwork(config);

net.train(betterData);


fs.writeFileSync('trained-net.js', `export default ${ net.toFunction().toString() };`);
console.log('youve fucking done it')