var sceneObjects = []
var canvas = new fabric.Canvas('c');
fabric.Group.prototype.lockScalingX = true;
fabric.Group.prototype.lockScalingY = true;
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

canvas.onBeforeScaleRotate = function lock(object) {
  object.set({ lockScalingX: false, lockScalingY: false });
};
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
    var spriteImage = el._originalElement.currentSrc.replace(/^.*[\\\/]/, '');
    if (spriteImage == "1.png") {
      var hero =
      {
        x: el.left,
        y: el.top,
        vx: 0,
        vy: 0,
        w: el.width * el.scaleX,
        h: el.height * el.scaleY,
        og: false
      }
      world.hero = hero;
    }else{
    var sceneObject =
    {
      x: el.left,
      y: el.top,
      w: el.width * el.scaleX,
      h: el.height * el.scaleY,
      sprite: spriteImage,
      type: spriteToType[spriteImage]
    }
    objects.push(sceneObject);
    }
  });
  world.objects = objects;
  world.code = "mc100";
  console.log(JSON.stringify(world));
}
function showInfo() {
  var object = canvas.getActiveObject();
  console.log(object.left);
}
function deleteSelected() {
  canvas.remove(canvas.getActiveObject());
  console.log(canvas.getObjects());
}
function deleteAll() {
  canvas.remove(canvas.getObjects());
}
function moveToTop() {
  canvas.bringToFront(canvas.getActiveObject());
}
function moveToBottom() {
  canvas.sendToBack(canvas.getActiveObject());
}
function moveUpLayer() {
  canvas.bringForward(canvas.getActiveObject());
}
function moveDownLayer() {
  canvas.sendBackwards(canvas.getActiveObject());
}