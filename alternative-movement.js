 let moveKeys = {
     left: false,
     right: false
 };


 window.addEventListener("keydown", function(event) {
     if (event.which === 68 || event.which === 39) {
         moveKeys.right = true;
     }
     if (event.which === 65 || event.which === 37) {
         moveKeys.left = true;
     }
 })

 window.addEventListener("keyup", function(event) {
     if (event.which === 68 || event.which === 39) {
         moveKeys.right = false;
     }
     if (event.which === 65 || event.which === 37) {
         moveKeys.left = false;
     }
 });

 function checkKeys() {

     if (moveKeys.right && moveKeys.left === false) {

         physicalFighter.speed.x = 5;

     }
     if (moveKeys.right === false) {
         physicalFighter.speed.x = 0
     }

     if (moveKeys.left && moveKeys.right === false) {
         physicalFighter.speed.x = -5;
     }
     if (moveKeys.right === false && moveKeys.left === false) {
         physicalFighter.speed.x = 0;
     }
     if (moveKeys.right === true && moveKeys.left === true) {
         physicalFighter.speed.x = 0;
     }


 };
 setInterval(checkKeys, 1000 / 64);