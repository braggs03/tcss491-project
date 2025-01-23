class MechaGolem {
	constructor(gameEngine, x, y) {
        this.gameEngine = gameEngine;
        this.animator = this.idleRight();
        this.x = x;
        this.y = y;
        this.speed = 5; 
		this.facing = RIGHT;
	}

    update() {
        if (this.gameEngine.keys["ArrowLeft"]) {
            this.x -= this.speed;
			if (this.facing != LEFT) {
				this.animator = this.idleLeft();
				this.facing = LEFT;
			}
        } else if (this.gameEngine.keys["ArrowRight"]) {
            this.x += this.speed;
			if (this.facing != RIGHT) {
				this.animator = this.idleRight();
			}
			this.facing = RIGHT;
        } else if (this.gameEngine.keys["e"]) {
			this.animator = this.facing == RIGHT ? this.rangeAttackRight() : this.rangeAttackLeft();
		}
    }

	draw(ctx) {
		this.animator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 4);
	}

	idleRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 0, 100, 100, 4, 0.1, false, true);
	}

	glowingRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 100, 100, 100, 8, 0.1, false, true);
	}

	rangeAttackRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 200, 100, 100, 9, 0.1, false, false);
	}

	blockRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 300, 100, 100, 8, 0.1, false, false);
	}

	meleeRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 400, 100, 100, 7, 0.1, false, false);
	}

	laserRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 500, 100, 100, 7, 0.1, false, false);
	}

	deathRight() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 700, 100, 100, 14, 0.1, false, false);
	}
	
	idleLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2400, 0, 100, 100, 4, 0.1, true, true);
	}

	glowingLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2000, 100, 100, 100, 8, 0.1, true, true);
	}

	rangeAttackLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 1900, 200, 100, 100, 9, 0.1, true, false);
	}

	blockLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2000, 300, 100, 100, 8, 0.1, true, false);
	}

	meleeLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 400, 100, 100, 7, 0.1, true, false);
	}

	laserLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 500, 100, 100, 7, 0.1, true, false);
	}

	deathLeft() {
		return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 1400, 700, 100, 100, 14, 0.1, true, false);
	}
}