var canvas = new fabric.Canvas('c');
canvas.preserveObjectStacking = true;

document.querySelectorAll('.library img').forEach(el => {
	el.addEventListener("click", () => {
		fabric.Image.fromURL(el.src, (img) => {
			var obj = canvas.add(img);
			obj.lockUniScaling = true;
			console.log(canvas.getObjects());
		});
	});
});

var spriteToType =
{
	"background.png": "background",
	"tree3.png": "background",
	"floor2.png": "solid",
	"chestopen.png": "chest",
	"floor3.png": "damage",
	"plank.png": "solid",
	"coin.png": "coin",
	"lava.png": "damage",
}
function exportToJson() {
	var world = new Object();
	var objects = [];
	canvas.getObjects().forEach(el => {
		const spriteImage = el._originalElement.currentSrc.replace(/^.*[\\\/]/, '');
		if (spriteImage == "1.png") {
			const player = new Player(el.left, el.top, el.width * el.scaleX, el.height * el.scaleY, 0, 0, false);
			world.hero = player;
		} else {
			gameObject = new GameObject(el.left, el.top, el.width * el.scaleX, el.height * el.scaleY, spriteToType[spriteImage], spriteImage);
			objects.push(gameObject);
		}
	});
	world.objects = objects;
	world.code = "mc100";
	console.log(JSON.stringify(world));
}
const showInfo = () => canvas.getActiveObject();
const deleteSelected = () => canvas.remove(canvas.getActiveObject());
const moveToTop = () => canvas.bringToFront(canvas.getActiveObject());
const deleteAll = () => canvas.clear();
const moveToBottom = () => canvas.sendToBack(canvas.getActiveObject());
const moveUpLayer = () => canvas.bringForward(canvas.getActiveObject());
const moveDownLayer = () => canvas.sendBackwards(canvas.getActiveObject());