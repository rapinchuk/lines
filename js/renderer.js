export class Renderer{
    constructor(ctx,canvas){
       
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    }
}