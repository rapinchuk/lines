export class CrossingChecker{
    constructor(render){
        let x,y;
        let points1 = [];
        let A,B,C;
        let pointxx,pointyy;
        this.coords = []
        this.render = render
    }  
    getCoords(){
        return this.coords
            
        
    }
    TempCheck(line1,lines,secondClick = false)// проверка отрезков на пересечение
        {
        
        
        // this.ctx.fillStyle = "red"; 
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
                this.render.renderPoint({x:this.pointxx,y:this.pointyy})
                // console.log({
                //     x:this.pointxx,
                //     y:this.pointyy
                // })
                // // return{
                // //     x:this.pointxx,
                // //     y:this.pointyy
                // // }
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

