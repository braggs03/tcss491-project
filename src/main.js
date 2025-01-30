const werewolf = './resources/werewolf/';
const REINA = './resources/Reina.png';

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload(MECHA_GOLEM);
ASSET_MANAGER.queueDownload(DUNGEON);
ASSET_MANAGER.queueDownload(TORCH);
ASSET_MANAGER.queueDownload("./resources/Azucena.png");
ASSET_MANAGER.queueDownload(REINA);
ASSET_MANAGER.queueDownload("../resources/Magic/Lightning.png")
ASSET_MANAGER.queueDownload(GORGON + "Attack1.png")
ASSET_MANAGER.queueDownload(GORGON + "Attack2.png")
ASSET_MANAGER.queueDownload(GORGON + "Attack3.png")
ASSET_MANAGER.queueDownload(GORGON + "Dead.png")
ASSET_MANAGER.queueDownload(GORGON + "Hurt.png")
ASSET_MANAGER.queueDownload(GORGON + "Idle1.png")
ASSET_MANAGER.queueDownload(GORGON + "Idle2.png")
ASSET_MANAGER.queueDownload(GORGON + "Run.png")
ASSET_MANAGER.queueDownload(GORGON + "Special.png")
ASSET_MANAGER.queueDownload(GORGON + "Walk.png")
ASSET_MANAGER.queueDownload(CELES + "Attack1.png")
ASSET_MANAGER.queueDownload(CELES + "Attack2.png")
ASSET_MANAGER.queueDownload(CELES + "Charge.png")
ASSET_MANAGER.queueDownload(CELES + "Dead.png")
ASSET_MANAGER.queueDownload(CELES + "Hurt.png")
ASSET_MANAGER.queueDownload(CELES + "Idle.png")
ASSET_MANAGER.queueDownload(CELES + "LightBall.png")
ASSET_MANAGER.queueDownload(CELES + "LightCharge.png")
ASSET_MANAGER.queueDownload(CELES + "Run.png")
ASSET_MANAGER.queueDownload(CELES + "Walk.png")
ASSET_MANAGER.queueDownload(DUNGEON_BACKGROUND_IMAGE);
ASSET_MANAGER.queueDownload("../resources/Title.png")
ASSET_MANAGER.queueDownload("./resources/nightBorneWarrior/NightBorneWarrior.png"); 
ASSET_MANAGER.queueDownload(werewolf +"Attack_1.png");
ASSET_MANAGER.queueDownload(werewolf +"Attack_2.png");
ASSET_MANAGER.queueDownload(werewolf + "Attack_3.png");
ASSET_MANAGER.queueDownload(werewolf + "Dead.png");
ASSET_MANAGER.queueDownload(werewolf + "Hurt.png");
ASSET_MANAGER.queueDownload(werewolf + "Idle.png"); 
ASSET_MANAGER.queueDownload(werewolf + "Jump.png"); 
ASSET_MANAGER.queueDownload(werewolf + "Run.png"); 
ASSET_MANAGER.queueDownload(werewolf + "Run+Attack.png"); 
ASSET_MANAGER.queueDownload(werewolf + "walk.png");
//Knight
ASSET_MANAGER.queueDownload(KNIGHT_SPRITE)
//Skeleton Warrior
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_1.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_2.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_3.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Dead.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Hurt.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Idle.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Protect.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run+attack.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Walk.png")


ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	ctx.imageSmoothingEnabled = false;
	
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});