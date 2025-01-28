class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.embers = 0;

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        this.loadLevel(shopkeeper, 1515, 440, false, true);
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {

        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;

        this.knight = new Knight(this.game, x, y);
        this.game.addEntity(this.knight);

        if (level.tent) {
            for (let i = 0; i < level.tent.length; i++) {
                let tent = level.tent[i];
                this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
            }
        }

        if (level.reinaIdle) {
            for (let i = 0; i < level.reinaIdle.length; i++) {
                let reinaIdle = level.reinaIdle[i];
                this.game.addEntity(new ReinaIdle(this.game, reinaIdle.x, reinaIdle.y));
            }
        }

        if (level.mechagolem) {
            for (let i = 0; i < level.mechagolem.length; i++) {
                let mechagolem = level.mechagolem[i];
                this.game.addEntity(new MechaGolem(this.game, mechagolem.x, mechagolem.y));
            }
        }

        if (level.azucendaIdle) {
            for (let i = 0; i < level.azucendaIdle.length; i++) {
                let azucendaIdle = level.azucendaIdle[i];
                this.game.addEntity(new AzucendaIdle(this.game, azucendaIdle.x, azucendaIdle.y));
            }
        }

        if (level.boxes) {
            for (let i = 0; i < level.boxes.length; i++) {
                let boxes = level.boxes[i];
                this.game.addEntity(new Boxes(this.game, boxes.x, boxes.y, boxes.h));
            }
        }

        if (level.dungeonGround) {
            for (let i = 0; i < level.dungeonGround.length; i++) {
                let ground = level.dungeonGround[i];
                for (let k = 0; k < ground.w; k++) {
                    this.game.addEntity(new DungeonGround(this.game, ground.x + k, ground.y));
                }
            }
        }

        if (level.dungeonWall) {
            for (let i = 0; i < level.dungeonWall.length; i++) {
                let wall = level.dungeonWall[i];
                for (let k = 0; k < wall.h; k++) {
                    this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y + k));
                }
            }
        }

        if (level.dungeonTorch) {
            for (let i = 0; i < level.dungeonTorch.length; i++) {
                let torch = level.dungeonTorch[i];
                this.game.addEntity(new DungeonTorch(this.game, torch.x, torch.y));
            }
        }

        if (level.swordRack) {
            for (let i = 0; i < level.swordRack.length; i++) {
                let swordRack = level.swordRack[i];
                this.game.addEntity(new SwordRack(this.game, swordRack.x, swordRack.y));
            }
        }

        if (level.dungeonWorkbench) {
            for (let i = 0; i < level.dungeonWorkbench.length; i++) {
                let workbench = level.dungeonWorkbench[i];
                this.game.addEntity(new DungeonWorkbench(this.game, workbench.x, workbench.y));
            }
        }

        if (level.shieldRack) {
            for (let i = 0; i < level.shieldRack.length; i++) {
                let shieldRack = level.shieldRack[i];
                this.game.addEntity(new ShieldRack(this.game, shieldRack.x, shieldRack.y));
            }
        }


        if (level.wallAxe) {
            for (let i = 0; i < level.wallAxe.length; i++) {
                let wallAxe = level.wallAxe[i];
                this.game.addEntity(new WallAxe(this.game, wallAxe.x, wallAxe.y));
            }
        }

        if (level.dungeonAnvil) {
            for (let i = 0; i < level.dungeonAnvil.length; i++) {
                let anvil = level.dungeonAnvil[i];
                this.game.addEntity(new DungeonAnvil(this.game, anvil.x, anvil.y));
            }
        }

        if (level.dungeonDoor) {
            for (let i = 0; i < level.dungeonDoor.length; i++) {
                let door = level.dungeonDoor[i];
                this.game.addEntity(new DungeonDoor
                    (this.game, door.x, door.y, door.h));
            }
        }

        if (level.chandelier) {
            for (let i = 0; i < level.chandelier.length; i++) {
                let chandelier = level.chandelier[i];
                this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
            }
        }

        if (level.dungeonBackground) {
            for (let i = 0; i < level.dungeonBackground.length; i++) {
                let background = level.dungeonBackground[i];
                this.game.addEntity(new DungeonBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }
    };

    update() { 

        let middlepoint = PARAMS.SCREENWIDTH / 2 - 50;
        this.x = this.knight.x - middlepoint;
        //if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;

        if (this.level == shopkeeper && this.knight.x > 2000 && this.game.keys["e"]) {
            this.loadLevel(one, 0, 0, false, false)
        }
    };

    draw(ctx) {
    };  
};