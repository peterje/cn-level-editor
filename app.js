var canvas = new fabric.Canvas('c');
var _clipboard;
canvas.preserveObjectStacking = true;

document.querySelectorAll('img').forEach(el => {
	el.addEventListener("click", () => {
		console.log("clicked")
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


function Copy() {
	// clone what are you copying since you
	// may want copy and paste on different moment.
	// and you do not want the changes happened
	// later to reflect on the copy.
	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}

function Paste() {
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + clonedObj.width,
			top: clonedObj.top,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.left += _clipboard.width;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
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
