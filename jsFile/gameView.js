/**
 * Created by Yang.
 */

var stage = new createjs.Stage("gameView");

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
var circleArr = [[],[],[],[],[],[],[],[],[]];
var currentDot;

var MOVE_NONE=-1, MOVE_LEFT=0, MOVE_UP_LEFT=1, MOVE_UP_RIGHT=2, MOVE_RIGHT=3, MOVE_DOWN_RIGHT=4, MOVE_DOWN_LEFT=5;

var point = 0;

gameView.x = 100;
gameView.y = 100;


stage.addChild(gameView);

//calculate the blue dot's move directions
function getMoveDir(dot){
    var distanceMap = [];
    //left dir
    var can = true;
    for(var x=dot.indexX; x>=0; x--){
        if(circleArr[x][dot.indexY].getCircleType()==Circle.TYPE_SELECTED){
            can = false;
            //dot.indexX-x = how many steps the blue dot can move to left dir
            distanceMap[MOVE_LEFT] = dot.indexX-x;
            break;
        }
    }

    if(can){
        return MOVE_LEFT;
    }

    //left up dir
    can = true;
    var x = dot.indexX;
    var y = dot.indexY;

    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_LEFT] = dot.indexY-y;
            break;
        }
        if(y%2==0){
            x--;
        }
        y--;
        if(y<0||x<0){
            break;
        }
    }

    if(can){
        return MOVE_UP_LEFT;
    }

    //right up dir
    can = true;
    var x = dot.indexX;
    var y = dot.indexY;

    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_RIGHT]  = dot.indexY-y;
            break;
        }
        if(y%2==1){
            x++;
        }
        y--;
        if(y<0||x>8){
            break;
        }
    }
    if(can){
        return MOVE_UP_RIGHT;
    }

    //right dir

    can = true;
    for(var x=dot.indexX; x<9; x++){
        if(circleArr[x][dot.indexY].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_RIGHT] = x-dot.indexX;
            break;
        }
    }

    if(can){
        return MOVE_RIGHT;
    }

    //right down dir
    can = true;
    var x = dot.indexX;
    var y = dot.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_DOWN_RIGHT] = y-dot.indexY;
            break;
        }
        if(y%2==1){
            x++;
        }
        y++;
        if(x>8||y>8){
            break;
        }
    }
    if(can){
        return MOVE_DOWN_RIGHT;
    }

    //left down dir
    can = true;
    var x = dot.indexX;
    var y = dot.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_DOWN_LEFT] = y-dot.indexY;
            break;
        }
        if(y%2==0){
            x--;
        }
        y++;
        if(x<0||y>8){
            break;
        }
    }
    if(can){
        return MOVE_DOWN_LEFT;
    }
    //calculate which dir to move in
    var nextDir = -1;
    var maxValue = -1;

    for(var dir=0; dir<distanceMap.length; dir++){
        if(distanceMap[dir]>maxValue){
            maxValue = distanceMap[dir];
            nextDir = dir;
        }
    }

    if(maxValue>1){
        return nextDir;
    }else{
        return MOVE_NONE;
    }
}




//&&e.target.getCircleType()!=Circle.TYPE_SELECTED
//trigger the move actions
function circleClicked(e){
    if(e.target.getCircleType()!=Circle.TYPE_DOT){
        e.target.setCircleType(Circle.TYPE_SELECTED);
        point = point+1;

        document.getElementById("points").innerHTML = point;
    }else{
        return;
    }

    if(currentDot.indexX==0||currentDot.indexX==8||currentDot.indexY==0||currentDot.indexY==8){
        alert("Game Over! You have failed to trap the blue dot, Plz refresh the page and try it again");
        return;
    }
    //direction, we hav 6 directions Basic Ideas
    //var leftCircle = circleArr[currentCat.indexX-1][currentCat.indexY];
    //var rightCircle = circleArr[currentCat.indexX+1][currentCat.indexY];
    //var leftTopCircle = circleArr[currentCat.indexX-1][currentCat.indexY-1];
    //var rightTopCircle = circleArr[currentCat.indexX][currentCat.indexY-1];
    //var leftbotCircle = circleArr[currentCat.indexX-1][currentCat.indexY+1];
    //var rightbotCircle = circleArr[currentCat.indexX][currentCat.indexY+1];
    //if(leftCircle.getCircleType()==1){
    //    leftCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = leftCircle;
    //
    //}else if(rightCircle.getCircleType()==1){
    //    rightCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = rightCircle;
    //
    //}else if(leftTopCircle.getCircleType()==1){
    //    leftTopCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = leftTopCircle;
    //
    //}else if(rightTopCircle.getCircleType()==1){
    //    rightTopCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = rightTopCircle;
    //
    //}else if(leftbotCircle.getCircleType()==1){
    //    leftbotCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = leftbotCircle;
    //
    //}else if(rightbotCircle.getCircleType()==1){
    //    rightbotCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = rightbotCircle;
    //
    //}else{
    //    alert("Gratz u win! your point: "+ point);
    //}

    var dir = getMoveDir(currentDot);
    switch (dir){
        case MOVE_LEFT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexX-1][currentDot.indexY];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;
        case MOVE_UP_LEFT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexY%2?currentDot.indexX:currentDot.indexX-1][currentDot.indexY-1];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;
        case MOVE_UP_RIGHT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexY%2?currentDot.indexX+1:currentDot.indexX][currentDot.indexY-1];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;
        case MOVE_RIGHT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexX+1][currentDot.indexY];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;

        case MOVE_DOWN_RIGHT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexY%2?currentDot.indexX+1:currentDot.indexX][currentDot.indexY+1];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;
        case MOVE_DOWN_LEFT:
            currentDot.setCircleType(Circle.TYPE_UNSELECTED);
            currentDot = circleArr[currentDot.indexY%2?currentDot.indexX:currentDot.indexX-1][currentDot.indexY+1];
            currentDot.setCircleType(Circle.TYPE_DOT);
            break;
        default :
            alert("Gratz! You have used: "+point+" steps to trap the BLUE DOT!");
    }

}




function addCircles(){
    for(var indexY=0; indexY<9; indexY++){
        for(var indexX=0; indexX<9; indexX++){
            var c = new Circle();
            gameView.addChild(c);

            circleArr[indexX][indexY] = c;

            c.indexX = indexX;
            c.indexY = indexY;

            c.x = indexY%2?indexX*55+25:indexX*55;
            c.y = indexY*55;

            if(indexX==4&&indexY==4){
                c.setCircleType(3);
                currentDot = c;
            }else if(Math.random()<0.1){
                c.setCircleType(Circle.TYPE_SELECTED);
            }

            c.addEventListener("click",circleClicked);
        }
    }
}

addCircles();
