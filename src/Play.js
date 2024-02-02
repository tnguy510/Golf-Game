class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', "ball.png")
        this.load.image('wall','wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        this.shots = 0
        
        
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/ 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)

        this.ball = this.physics.add.sprite(width / 3, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.setDamping(0.5).setDrag(0.5)

        //add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2))
        wallA.body.setImmovable(true)

        wallA.body.setCollideWorldBounds(true)
        wallA.body.setBounce(0.5)
        wallA.body.setVelocityX(500)


        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])

        //one way
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        this.score = 0;
        this.shots = 0;
        this.percent = 100;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 1,
                bottom: 1,
            },
            fixedWidth: 100
        }

        let shotConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 1,
                bottom: 1,
            },
            fixedWidth: 250
        }

        let percentageConfig = {
            fontFamily: 'Courier',
            fontSize: '15px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 1,
                bottom: 1,
            },
            fixedWidth: 350
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.score, scoreConfig);
        this.shotRight = this.add.text(borderUISize + borderPadding*130, borderUISize + borderPadding*2,
            "Shots taken: " + this.shots, shotConfig)
        this.percentage = this.add.text(borderUISize + borderPadding*130, borderUISize + borderPadding*15,
            "Shots made into Hole: " + this.percent + "%", percentageConfig)

        // add pointer input
        this.input.on('pointerdown', (pointer) => {
            let shotDirection 
            pointer.y <= this.ball.y ? shotDirection = 1: shotDirection = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
            pointer.x <= this.ball.x ? shotDirection = 1: shotDirection = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
            
        })

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            this.ball.setPosition(width / 3, height - height / 10)
            this.destroy = true
        })
        this.physics.add.collider(this.ball, this.walls)
        this.physics.add.collider(this.ball, this.oneWay)

        game.input.mouse.capture = true
    }

    update() {
        if (this.destroy == true){
            this.score += 1;
            this.scoreLeft.text = this.score;
            this.percent = this.score / this.shots
            this.percentage.text = "Shots made into Hole: " + this.percent + "%"
            this.destroy = false
        }
        this.input.on('pointerdown', () => {

            this.shotTaken = true
        })

        if(this.shotTaken == true) {
            this.shots += 1
            this.shotRight.text = "Shots taken: " + this.shots;
            this.percent = this.score / this.shots
            this.percentage.text = "Shots made into Hole: " + this.percent + "%"
            this.shotTaken = false
        }

    }

    //Add logic so the ball resetss to the bottom on a successful "hole-in" + 
    //Improve shot logics by making the input pointer's relative x position shoot the ball in the correct x direction
    //Make one obstacle move left/righit and bounce against the screen edges
    //Create and display(1) a shot counter (2) score ("hole-in") and (3) succcessful shot percentage + 
}