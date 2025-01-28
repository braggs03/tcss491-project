class Knight {
	constructor(game, x, y) {
		this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 4; 
		this.removeFromWorld = false;
        this.facing = RIGHT;

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Attack2.png"), 0, 0, 125.5, 80, 6, 0.05, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "AttackCombo.png"), 0, 0, 95, 100, 10, 0.05, false, false),
            RightCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Crouch.png"), 0, 0, 48, 100, 2, 0.1, false, false),
            RightCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "CrouchWalk.png"), 0, 0, 64, 100, 8, 0.1, false, false),
            RightDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Death.png"), 0, 0, 120, 100, 10, 0.1, false, false),
            RightFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Fall.png"), 0, 0, 112, 100, 3, 0.1, false, true),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Idle.png"), 0, 0, 120, 100, 10, 0.1, false, true),
            RightJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Jump.png"), 0, 0, 120, 100, 3, 0.1, false, true),
            RightRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Roll.png"), 0, 0, 120, 100, 12, 0.05, false, false),
            RightRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Run.png"), 20, 0, 120, 100, 10, 0.05, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Attack2.png"), 720, 0, 125.5, 80, 6, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "AttackCombo.png"), 944, 0, 95, 100, 10, 0.1, true, false),
            LeftCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Crouch.png"), 96, 0, 48, 100, 2, 0.1, true, false),
            LeftCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "CrouchWalk.png"), 504, 0, 64, 100, 8, 0.1, true, false),
            LeftDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Death.png"), 1176, 0, 120, 100, 10, 0.1, true, false),
            LeftFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Fall.png"), 296, 0, 112, 100, 3, 0.1, true, true),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Idle.png"), 1176, 0, 120, 100, 10, 0.1, true, true),
            LeftJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Jump.png"), 336, 0, 120, 100, 3, 0.1, true, true),
            LeftRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Roll.png"), 1440, 0, 120, 100, 12, 0.05, true, false),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Run.png"), 1200, 0, 120, 100, 10, 0.1, true, true)

        }

        this.currentState = 'RightIdle';
        this.animationLocked = false;

       

	};

    setState(state) {
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error("State '${state}' not found.");
        }
    }

	update() {
        if (this.game.keys["ArrowLeft"]) {
            this.x -= this.speed;
			if (this.facing == RIGHT) {
				this.currentState = 'LeftRun';
			} else if (this.facing == LEFT) {
                this.currentState = 'LeftRun';
            }
            this.facing = LEFT;
        } else if (this.game.keys["ArrowRight"]) {
            this.x += this.speed;
			if (this.facing == RIGHT) {
				this.currentState = 'RightRun';
			}
			this.facing = RIGHT;
        } else if (this.game.keys["e"]) {
			this.currentState = this.facing == RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';   
		} else {
            if(this.facing == LEFT) {
                this.currentState = 'LeftIdle';
            } else if (this.facing == RIGHT) {
                this.currentState = 'RightIdle';
            }
        }

	};

	draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
	};
};