const KNIGHT_WIDTH = 65;
const KNIGHT_HEIGHT = 110;
const KNIGHT_X_OFFSET = 131;
const KNIGHT_Y_OFFSET = 130;

class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.moveable = true;
        
        this.velocityX = 0;
        this.maxVelocityX = 6;
        this.accelerationX = 0.4; 
        this.decelerationX = 0.2; 

        this.velocityY = 0;
        this.maxVelocityY = 5;
        this.accelerationY = 0.25; 
        this.jumpSpeed = 10;
        
        this.hp = 100;
        this.emberCount = 100;
        this.potionCount = 0;
        this.gKeyPressed = false;
        this.potionCost = 50;
        this.invinsible = false;
        this.attackspeed = 0.1
        this.damage = 100;
        this.removeFromWorld = false;
        this.facing = RIGHT;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.colliding = {
            left: false, // Knight is to the right of the wall.
            right: false, // Knight is to the left of the wall.
            up: false, // Knight is below the floor/cieling.
            down: false, // Knight is above the floor/cieling.
        };
        this.updateBB();      

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 0, 120, 80, 6, this.attackspeed, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 80, 95, 100, 10, 0.1, false, false),
            RightCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 160, 48, 100, 3, 0.1, false, false),
            RightCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 240, 48, 100, 4, 0.1, false, false),
            RightCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 320, 64, 100, 8, 0.1, false, false),
            RightDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 400, 120, 100, 10, 0.1, false, false),
            RightFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 481, 120, 100, 3, 0.1, false, true),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 560, 120, 100, 10, 0.1, false, true),
            RightJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 641, 120, 100, 2, 0.1, false, true),
            RightRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 6, 720, 120, 100, 12, 0.04, false, false),
            RightRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 800, 120, 100, 10, 0.1, false, true),
            RightTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 880, 120, 100, 3, 0.02, false, true),
            RightWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 960, 120, 100, 7, 0.1, false, true),
            RightWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1040, 120, 100, 1, 0.1, false, true),
            RightWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1120, 120, 100, 3, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2171, 0, 120, 80, 6, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 80, 120, 80, 10, 0.1, true, false),
            LeftCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 160, 120, 80, 3, 0.1, true, false),
            LeftCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2400, 240, 120, 80, 4, 0.1, true, false),
            LeftCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1920, 320, 120, 80, 8, 0.1, true, false),
            LeftDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 400, 120, 80, 10, 0.1, true, false),
            LeftFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2531, 481, 120, 100, 3, 0.1, true, true),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1691, 560, 120, 100, 10, 0.1, true, true),
            LeftJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2651, 641, 120, 100, 2, 0.1, true, true),
            LeftRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1440, 720, 120, 100, 12, 0.04, true, false),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1691, 800, 120, 100, 10, 0.1, true, true),
            LeftTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 880, 120, 100, 3, 0.1, false, true),
            LeftWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2040, 960, 120, 100, 7, 0.1, false, true),
            LeftWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2760, 1040, 120, 100, 1, 0.1, false, true),
            LeftWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 1120, 120, 100, 3, 0.1, false, true),

        }

        this.currentState = 'RightIdle';
        this.animationLocked = false;
        
        this.dead = false;
        this.updateBB();


    };

    setState(state) {
        for (let key in this.animations) {
            if (this.currentState === key) {

            } else if (this.animations.hasOwnProperty(key)) {
                // Reset each Animator instance
                this.animations[key].reset();
            }
        }
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error("State '${state}' not found.");
        }
    }

    // setState(state) {
    //     if (this.animations[state]) {
    //         this.currentState = state;
    //     } else {
    //         console.error("State '${state}' not found.");
    //     }
    // }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + KNIGHT_X_OFFSET - this.game.camera.x , this.y + KNIGHT_Y_OFFSET - this.game.camera.y, KNIGHT_WIDTH, KNIGHT_HEIGHT);
    }
    takeDamage(amount) {
         if (!this.invinsible) {
             this.hp -= amount;
             console.log(`knight takes ${amount} damage, remaining health: ${this.hp}`);
             if (this.hp <= 0) {
                 this.die();
             } else {
                 this.flickerDuration = 0.3; // Flicker for 0.5 seconds
             }
         }
    }
    die() {
        if (!this.dead) {
            this.dead = true;
            this.currentState = this.facing === RIGHT ? 'RightDeath' : 'LeftDeath';
            console.log("Knight has died!");

            // Optionally mark for removal after the death animation
            setTimeout(() => {
                this.removeFromWorld = true;
                this.game.camera.respawnKnight(this);
            }, 1000); 
            // Adjust timing to match the death animation duration
        }
    }
    usePotion () {
        if (this.potionCount > 0) {
            this.potionCount -= 1;
            this.hp = Math.min(this.hp + 200, 1000); 
            return true;
        }
        return false;
    }
    buyPotion () {
        if (this.emberCount >= this.potionCost) {
            this.emberCount -= this.potionCost;
            this.potionCount += 1;
            return true;
        }
        return false;
    }

    update() {
        if (this.dead) return;

        if (!this.moveable) {
            this.setState(this.facing == LEFT ? "LeftIdle" : "RightIdle");
            this.velocityX = 0; 
            return;
        }

        if (this.y > 1000) {
            this.die();
        }
    
        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        }
    
        let that = this;
        
        let left = 0;
        let right = 0;
        let up = 0;
        let down = 0;
        this.game.entities.forEach((entity) => {
            if (entity.BB && that.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(that.BB);
                if (entity instanceof DungeonWall) {
                    if (entity.BB.x < that.BB.x) {
                        right++;
                        that.x += overlap.x;
                    } else if (entity.BB.x > that.BB.x) {
                        left++;
                        that.x -= overlap.x;
                    }
                    that.velocityX = 0; 
                } else if (entity instanceof DungeonGround || entity instanceof DungeonGround2) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;
        
                    if (horizontalCollision) {
                        if (entity.BB.x < that.BB.x) {
                            that.x += overlap.x;
                        } else {
                            that.x -= overlap.x;
                        }
                        that.velocityX = 0;
                    } else if (verticalCollision) {
                        if (entity.BB.y < that.BB.y) {
                            down++;
                            that.y += overlap.y;
                        } else {
                            up++;
                            that.y -= overlap.y - 1;
                        }
                        that.velocityY = 0;
                    }
                } else if ( entity instanceof Potion) {
                    if (this.buyPotion()) {
                        entity.removeFromWorld = true;
                    }
                }
            }
        });

        if (left > 0) {
            that.colliding.left = true;
        } else {
            that.colliding.left = false;
        }

        if (right > 0) {
            that.colliding.right = true;
        } else {
            that.colliding.right = false;
        }

        if (down > 0) {
            that.colliding.down = true;
        } else {
            that.colliding.down = false;
        }

        if (up > 0) {
            that.colliding.up = true;
        } else {
            that.colliding.up = false;
        }

        if (this.currentState === 'RightAttack1' || this.currentState === 'LeftAttack1'
            || this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
            if (this.currentState == 'RightRoll') {
                this.x += 5;
            } else if (this.currentState == 'LeftRoll') {
                this.x -= 5;
            }
            this.updateBB();
            if (!this.animations[this.currentState].getDone()) {
                return;
            } else {
                this.invinsible = false;
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
            }
        }

        if (!that.colliding.up) {
            if (this.velocityY > 0) {
                this.facing == LEFT ? this.setState("LeftFall") : this.setState("RightFall");
            } else {
                this.facing == LEFT ? this.setState("LeftJump") : this.setState("RightJump");
            }
            this.velocityY += this.accelerationY;
        } else if (Math.abs(this.velocityX) > this.accelerationX) {
            this.setState(this.facing === RIGHT ? "RightRun" : "LeftRun");
        } else {
            this.setState(this.facing === RIGHT ? "RightIdle" : "LeftIdle");
        }

        if (this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
            if (this.facing === RIGHT) {
                this.velocityX = 5;
            } else {
                this.velocityX = 5;
            }
        } else if (this.game.keys["ArrowUp"] && that.colliding.up) {
            this.colliding.up = false;
            this.velocityY -= this.jumpSpeed;
        } else if (this.game.keys["ArrowLeft"] && !that.colliding.right) {
            this.facing = LEFT;
            this.velocityX -= this.accelerationX;
            this.velocityX = Math.max(this.velocityX, -this.maxVelocityX);
        } else if (this.game.keys["ArrowRight"] && !that.colliding.left) {
            this.facing = RIGHT;
            this.velocityX += this.accelerationX;
            this.velocityX = Math.min(this.velocityX, this.maxVelocityX);
        }

        if (this.currentState !== 'RightFall' && this.currentState !== 'LeftFall'
            && this.currentState !== 'RightJump' && this.currentState !== 'LeftJump') {
            if (this.game.keys["e"]) {
                if (!this.attackAnimationActive) {
                    this.velocityX = 0;
                    this.attackAnimationActive = true;
                    this.chosenState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';
                    this.setState(this.chosenState);
                    // Check for collision with golem
                    const golem = this.game.entities.find(entity => entity instanceof MechaGolem && !entity.dead);
                    if (golem && this.BB.collide(golem.BB)) {
                        golem.takeDamage(100);
                        console.log("Knight attacks the MechaGolem!");
                    }
                    setTimeout(() => {
                        this.attackAnimationActive = false; // Reset flag when animation is complete
                    }, 900); // Match the duration of the attack animation
                }
            } else if (this.game.keys["r"]) {
                this.chosenState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
                this.invinsible = true;
                this.setState(this.chosenState);
            } else if (this.game.keys["g"]) {
                if (!this.gKeyPressed) {  
                    this.usePotion();
                    this.gKeyPressed = true;
                }
            } else {
                this.gKeyPressed = false;  
            }

        }

        if (this.velocityX > 0) {
            this.velocityX = Math.max(0, this.velocityX - this.decelerationX);
        } else if (this.velocityX < 0) {
            this.velocityX = Math.min(0, this.velocityX + this.decelerationX);
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.updateBB();
    }
    

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return; 
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        //this.BB.draw(ctx);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}

