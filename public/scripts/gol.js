
/*
single cell constructor

var cell = function(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = state ? state : false;
  this.tempState = false;
  this.update = function() {
    var count = 0;
    var x = this.x;
    var y = this.y;
    
    arr.forEach(function(o) {
      if(o.x === x-1 && o.y === y-1){ 
        if(o.state) { count++; }
      }
      if(o.x === x && o.y === y-1){ 
        if(o.state) { count++; }
      }
      if(o.x === x+1 && o.y === y-1){ 
        if(o.state) { count++; }
      }
      if(o.x === x-1 && o.y === y){ 
        if(o.state) { count++; }
      }
      if(o.x === x+1 && o.y === y){ 
        if(o.state) { count++; }
      }
       if(o.x === x-1 && o.y === y+1){ 
        if(o.state) { count++; }
      }
      if(o.x === x && o.y === y+1){ 
        if(o.state) { count++; }
      }
      if(o.x === x+1 && o.y === y+1){ 
        if(o.state) { count++; }
      }  
    });
    switch(count){
      case 2:
        this.tempState = this.state ? true : false;
        break;
      case 3:
        this.tempState = true;
        break;
      default:
        this.tempState = false;
    }
  },
    this.setState = function() { 
      this.state = this.tempState;
    }
}

*/