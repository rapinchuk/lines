export class Point{
    constructor(xy){
        this.point = {x:xy.x,y:xy.y};
     
    }
  
   savePoint(pointsArr){
    if(this.point.x!==undefined)
    pointsArr.push(this.point)
   }
}