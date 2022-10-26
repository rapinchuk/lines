class Renderer{
    constructor(ctx,canvas){
        // this.lines = lines
        // this.line = line
        // this.points = points
        this.canvas = canvas
        this.ctx = ctx
    }
    renderLines(lines){
        lines.forEach(element => {
            
            this.ctx.beginPath();
            this.ctx.moveTo(element.A.x,element.A.y);
            this.ctx.lineTo(element.B.x,element.B.y);
            this.ctx.closePath(); 
            this.ctx.stroke();
            
            
            
           
        });
    }

    renderPoints(points){
        points.forEach(element => {
            if(element.x!==undefined){
               
            this.ctx.fillStyle = "red"
            this.ctx.beginPath();
            this.ctx.arc(element.x, element.y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath()
            }
        })
           
            
    }
    
    renderPoint(point){
        this.ctx.fillStyle = "red"
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath()
    }
    renderLine(line){
        
        this.ctx.beginPath();
        this.ctx.moveTo(line.A.x,line.A.y);
        this.ctx.lineTo(line.B.x,line.B.y);
        this.ctx.closePath();
       
        this.ctx.stroke();
       
    }
    clearCanvas(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }
}

class Point{
    constructor(xy){
        this.point = {x:xy.x,y:xy.y};
     
    }
  
   savePoint(pointsArr){
    if(this.point.x!==undefined)
    pointsArr.push(this.point)
   }
}


class Line{
    constructor(){
        this.A = {}
        this.B = {}
    }
    set setA(xy){
        this.A = xy
    }
    set setB(xy){
        this.B = xy
    }
    
    get getLine(){
        return {A:this.A,B:this.B}
    }

}

class CrossingChecker{
    constructor(){
        let x,y;
        let points1 = [];
        let A,B,C;
        let pointxx,pointyy;
        this.coords = []
    }  
    getCoords(){
        return this.coords
            
        
    }
    TempCheck(line1,lines,secondClick = false)// проверка отрезков на пересечение
        {
        
        
        ctx.fillStyle = "red"; 
        lines.forEach(element => {
            if(this.CrossingCheck(line1.A,line1.B,element.A,element.B))
            {
                var a1,b1,c1,a2,b2,c2;
                this.EquationOfTheLine(line1.A,line1.B);
                a1=this.A;b1=this.B;c1=this.C;
                this.EquationOfTheLine(element.A,element.B);
                a2=this.A;b2=this.B;c2=this.C;
                this.pointxx=this.IntersectionX(a1,b1,c1,a2,b2,c2);
                this.pointyy=this.IntersectionY(a1,b1,c1,a2,b2,c2);
                render.renderPoint({x:this.pointxx,y:this.pointyy})
                // console.log(this.pointxx,this.pointyy)
                if(secondClick){
                    this.coords.push({
                        x:this.pointxx,
                        y:this.pointyy
                    })
                }
               
               
                
                	
                
            }
           				
        
        });
            
        }
    IntersectionY(a1,b1,c1,a2,b2,c2) //поиск точки пересечения по Y
        {
            var d,dy,pointy;
            d=a1*b2-b1*a2;
            dy=-a1*c2+c1*a2;
            pointy=dy/d;
            return pointy;
        }

    VEK(ax,ay,bx,by)//векторное произведение
        {
            return ax*by-bx*ay;
        }
    
    CrossingCheck(p1,p2,p3,p4) //проверка пересечения
        {
            var v1,v2,v3,v4;
            
            v1=this.VEK(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y);
            v2=this.VEK(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y);
            v3=this.VEK(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y);
            v4=this.VEK(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y);
            if(v1*v2<0 && v3*v4<0) return true;
            else return false;
        }
    
    EquationOfTheLine(p1,p2) //построение уравнения прямой Ax+By+C
        {
            // var A,B,C;
            this.A=p2.y-p1.y;                                            
            this.B=p1.x-p2.x;
            this.C=-p1.x*(p2.y-p1.y)+p1.y*(p2.x-p1.x);
        
        }
    
    IntersectionX(a1,b1,c1,a2,b2,c2)// поиск точки пересечения по Х
        {
            var d,dx,pointx;
            d=a1*b2-b1*a2;
            dx=-c1*b2+b1*c2;
            pointx=dx/d;
            return pointx;
        }
    
 }











let line;
let clickCount = true
let point;

function start(e){
   
    
    if(clickCount){ 

        
        clickCount = false
        line = new Line()
        line.setA= 
            {   
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop
            }
        e.target.addEventListener('contextmenu',cancelClick)
        e.target.addEventListener("mousemove",move)
    }
    else{
        e.target.removeEventListener('mousemove',move);
        clickCount = true
        checker.TempCheck(line.getLine,lines, true)
        lines.push(line.getLine)
        
        checker.getCoords().forEach(element=>{
            new Point(element).savePoint(points)
        })
   
    
        
        console.log(lines)
        render.renderPoints(points) 
        
        
        
       
        
        
         
        
       
       
       
            
       
    }

}


function move(e){
    
    
    line.setB = 
    {   
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop
    }
    
    render.clearCanvas()
    
    
    render.renderLine(line.getLine)
    
    
    render.renderLines(lines)
    render.renderPoints(points)
    checker.TempCheck(line.getLine,lines)
    
   


}

function cancelClick(e){
    e.preventDefault();
    e.target.removeEventListener("mousemove", move)
    clickCount =true
    delete line.A
    delete line.B
    render.clearCanvas()
    render.renderLines(lines)
    render.renderPoints(points)
    

   

}









let lines = []

let points = []


let canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");

let render = new Renderer(ctx)
let checker = new CrossingChecker();

canvas.addEventListener("click",start)
