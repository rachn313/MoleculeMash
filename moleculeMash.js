var context, controller, player, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 300;
context.canvas.width = 600;

player = {
    
    height: 50,
    //jumping: true, //in the air or on the ground
    width: 50,
    x: 0,
    x_velocity: 1.5, //constant x velocity
    y: 0,
    y_velocity: 0
};

controller = {
    up: false,
    down: false,
    keyListener: function (event) {
    
    //check event type
        "use strict";
        var key_state = (event.type === "keydown") ? true : false;
    
        switch (event.keyCode) {
    
        case 38: //up key
            controller.up = key_state;
            break;
        case 40: //down key
            controller.down = key_state;
            break;
        }
    }
    
    
    
};

loop =  function () {
    "use strict";
    if (controller.up && player.y >= 0 && player.y <= 600) {
        player.y_velocity -= 10; //-= gradually increases speed
        //player.jumping = true;
    }
    
    if (controller.down && player.y >= 0 && player.y <= 600) {
        player.y_velocity += 10;
    }
    
    //constant x velocity
    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.y_velocity *= 0.8; //friction 
    
    //collision detection with floor
    if (player.y > 300 - 50) {
        
        player.y = 250;
        player.y_velocity = 0;
    }
    
    //collision detection with ceiling
    if (player.y < 25) {
        
        player.y = 25;
        player.y_velocity = 0;
    }
    

        
    if (player.x > 600) {
        player.x = 50;
    }
    
    context.fillStyle = "black";
    context.fillRect(0, 0, 600, 300);
    context.fillStyle = "blue"; //player color
    context.fillRect(300, 150, 50, 50);
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();
    
    //call update when ready to draw again
    window.requestAnimationFrame(loop);
       
};
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
