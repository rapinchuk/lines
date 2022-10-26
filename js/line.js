export class Line{
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

