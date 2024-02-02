// Exercise 02: RNGolf
// Name: Trish Nguyen
// Date: 2/2/2024

'use strict'

let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        },
    },
    width: 640,
    height: 960,
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
//set UI sizes
let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 15;