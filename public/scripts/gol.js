

/*
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

var cell1 = new cell(0,0,true);
var cell2 = new cell(1,0,true);
var cell3 = new cell(2,0);
var cell4 = new cell(0,1,true);
var cell5 = new cell(1,1);
var cell6 = new cell(2,1);
var cell7 = new cell(0,2);
var cell8 = new cell(1,2);
var cell9 = new cell(2,2);
var arr = [cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9];

var pass = function() {
  arr.forEach(function(o){
    o.update();
  });
   arr.forEach(function(o){
    o.setState();
  });
};

var res = function() {
  arr.forEach(function(o){
    console.log(o.x);
    console.log(o.y);
    console.log(o.state);  
  });
};

pass();
//res();
*/
var COUNTERCELL = -1;
var COUNTERLOGIC = 0;
var CELLS = [];
var Board = React.createClass({
  render: function() {
    var rows = [];
    for(var i = 0; i < 10; i++){
      rows.push(<BoardRow y={i} key={i} />);
    }
    return (
      <table className="border">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var BoardRow = React.createClass({ 
  render: function() {
    var self = this;
    var data = [];
    for(var i = 0; i < 10; i++){ 
      var randomAlive = Math.random() > 0.05 ? true : false;
      var logicCell = (<LogicCell 
                         key={COUNTERLOGIC} 
                         id={COUNTERLOGIC} 
                         alive={randomAlive}
                         x={i} 
                         y={this.props.y}
                         />
                      );
      data.push(logicCell);
      COUNTERLOGIC++;
    }
    return (
      <tr key={Math.random()}>
        {data}
      </tr>
    );
  }
});

var LogicCell = React.createClass({
  getInitialState: function (){
    return {alive: this.props.alive, tempAlive: false};
  },
  onClicked: function() {
    this.setState({alive: !this.state.alive});
    //CELLS[this.props.id].tempState = !this.state.alive;
  },
  mixins: [SetIntervalMixin],
  componentDidMount: function() {
     CELLS.push({id: this.props.id, alive: this.state.alive, x: this.props.x, y: this.props.y});
     this.setInterval(this.update, 100);
     this.setInterval(this.setAlive, 100);
  },
  update: function() {
    var count = 0;
    var x = this.props.x;
    var y = this.props.y;
    
    // var xOffset = 0;
    // var yOffset = 0;
    // var len = CELLS.length;
     
//     if(x-1 < 0 ){
//       xOffset = len;
//     }
//     if(x+1 === len){
//       xOffset = -len;
//     }
    
//     if(y-1 < 0){
//       yOffset = len;
//     }
    
//     if(y+1 === len){
//       yOffset = -len;
//     }
    
    CELLS.forEach(function(o) {
      if(o.x === x-1 && o.y === y-1){ 
        if(o.alive) { count++; }
      }
      if(o.x === x && o.y === y-1){ 
        if(o.alive) { count++; }
      }
      if(o.x === x+1 && o.y === y-1){ 
        if(o.alive) { count++; }
      }
      if(o.x === x-1 && o.y === y){ 
        if(o.alive) { count++; }
      }
      if(o.x === x+1 && o.y === y){ 
        if(o.alive) { count++; }
      }
       if(o.x === x-1 && o.y === y+1){ 
        if(o.alive) { count++; }
      }
      if(o.x === x && o.y === y+1){ 
        if(o.alive) { count++; }
      }
      if(o.x === x+1 && o.y === y+1){ 
        if(o.alive) { count++; }
      }
     });
    switch(count){
      case 8:
      case 7:
      case 6:
      case 5:
      case 4:  
        this.setState({alive: false});
        CELLS[this.props.id].tempState = false;
        break;
      case 3:
        this.setState({alive: true});
        CELLS[this.props.id].tempState = true;
        break;
      case 2:
        this.setState({alive: this.state.alive ? true : false});
        CELLS[this.props.id].tempState = this.state.alive ? true : false;
        break;
      case 1:
      case 0:
        this.setState({alive: false});
        CELLS[this.props.id].tempState = false;
        break;
      default:
        this.setState({alive: false});
        CELLS[this.props.id].tempState = false;
    }
    COUNTERCELL = -1;
   },
  setAlive: function() { 
    CELLS[this.props.id].alive = CELLS[this.props.id].tempState;
  },
  render: function() {
    COUNTERCELL++;
    return (
      <Cell 
        key={COUNTERCELL} 
        id={COUNTERCELL}
        x={this.props.x}
        y={this.props.y}
        alive={this.state.alive}
        onClicked={this.onClicked}
        />
      );
  }
});

var Cell = React.createClass({
  render: function() {
    var style = this.props.alive ? {backgroundColor: 'red'} : null;
    return (
      <td className="sq" onClick={this.props.onClicked} style={style}>
      </td>
    );
  }
});

ReactDOM.render(<Board />, document.getElementById('content'));
