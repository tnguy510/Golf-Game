// Exercise 02: RNGolf
// Name: Trish Nguyen
// Date: 10/27/2023

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