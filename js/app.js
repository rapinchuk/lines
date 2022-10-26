import { Renderer } from '/js/renderer.js'
import { Line } from '/js/line.js'
import { Point } from '/js/point.js'
import { CrossingChecker } from '/js/crossingСhecker.js'


class App{
    constructor(){
        this.lines = []
        this.points = []
        this.canvas = document.getElementById("paint");
        this.ctx = this.canvas.getContext("2d");
        this.render = new Renderer(this.ctx,this.canvas)
        this.checker = new CrossingChecker(this.render);
        this.line;
        this.clickCount = true
        this.point;
        this.target;
        this.eventMap = new WeakMap();

    }

    init(){
        

        this.canvas.addEventListener("click",this.start.bind(this))
    }



    start(e){
       
        if(this.clickCount){ 
            
            
            this.clickCount = false
            
            this.line = new Line()
            this.line.setA= 
                {   
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
                e.target.addEventListener('contextmenu',this.cancelClick.bind(this))
                // e.target.addEventListener('mousemove',this.move.bind(this))
                this.eventMap.set(e.target,this.move.bind(this));
                e.target.addEventListener('mousemove', this.eventMap.get(e.target))
                
        }else
        {
            
            e.target.removeEventListener('mousemove',this.eventMap.get(e.target));
            this.clickCount = true
            this.checker.TempCheck(this.line.getLine,this.lines, true)
            this.lines.push(this.line.getLine)
            this.checker.getCoords().forEach(element=>{
                new Point(element).savePoint(this.points)
            })
           
            this.render.renderPoints(this.points) 
        

        }
    
    }

    move(e){
       
       
        this.line.setB = 
        {   
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop
        }
        
        this.render.clearCanvas()
        
        
        this.render.renderLine(this.line.getLine)
        
        
        this.render.renderLines(this.lines)
        this.render.renderPoints(this.points)
        this.checker.TempCheck(this.line.getLine,this.lines)
        
        
       
    
    
    }
    
    cancelClick(e){
        e.preventDefault();
        e.target.removeEventListener("mousemove", this.eventMap.get(e.target))
        this.clickCount =true
        delete this.line.A
        delete this.line.B
        this.render.clearCanvas()
        this.render.renderLines(this.lines)
        this.render.renderPoints(this.points)
        
    
       
    
    }
    



}

onload = () => { new App().init() }
