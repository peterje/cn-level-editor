var sceneObjects = []
var canvas = new fabric.Canvas('c');
// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

document.querySelectorAll('.library img').forEach(el => {
  el.addEventListener("click", ()=>{
    fabric.Image.fromURL(el.src, (img)=>{
      canvas.add(img);
    });
  });
});

var objectDictionary = {
    "background":["background", "background.png"],
    "lava":["damage", "floor3.png"],
    "grass":["solid", "floor2.png"],
    "wood":["solid", "plank.png"],
    "coin":["coin","coin.png"],
    "chest":["chest","chestopen.png"],
    "tree":["background","tree3.png"],
    }
function addObject(type){
    var objectType = objectDictionary[type][0];
    var objectSprite = objectDictionary[type][1];
    var image = new Image();
    image.src = "assets/" + objectSprite;
    sceneObjects.push({x:0, y:0, w:image.width, h:image.height, type:objectType, sprite:objectSprite})
}