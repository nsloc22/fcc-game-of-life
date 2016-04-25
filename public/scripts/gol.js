var update = React.addons.update;

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

var Board = React.createClass({
  getInitialState: function() {
    return {cells: [], running: false, cleared: false, generation: 0};
  },
  componentDidMount: function() {
    this.setState({cells: this.randCells()});
    this.onStart();
  },
  randCells: function() {
    var cells = [];
    var size = this.props.size;
    for(var i = 0; i < size; i++){
      for(var j = 0; j < size; j++){
        var randomAlive = Math.random() > 0.8 ? true : false;
        cells.push({x: j, y: i, alive: randomAlive, tempState: false, updateTemp: updateTemp});
      }
    }
    return cells; 
  },
  mixins: [SetIntervalMixin],
  onStart: function() {
    if(this.state.cleared){
      this.setState({cells: this.randCells(), cleared: false});
      this.setupIntervals();
      this.setState({running: true});
      return;
    }
    if(!this.state.running){
      this.setupIntervals();
      this.setState({running: true});
    } 
  },
  onPause: function() {
    this.intervals.forEach(clearInterval);
    this.setState({running: false});
  },
  onClear: function() {
    this.onPause();
    this.state.cells.forEach(function(o){
      o.alive = false;
    });
    this.setState({cells: this.state.cells, cleared: true, generation: 0});
    
  },
  setupIntervals: function() {
    this.setInterval(this.update, 100);
  },
  update: function() {
    var self = this;
    this.state.cells.forEach(function(o){
      o.updateTemp(o.x, o.y, self.state.cells);
    });
    this.state.cells.forEach(function(o) {
      o.alive = o.tempState;
    });
    this.setState({cells: this.state.cells, generation: this.state.generation + 1});
  },
  onClicked: function(id) {
    var cells = React.addons.update(this.state.cells, {
    [id]: { alive: {$set: !this.state.cells[id].alive} }
  });
  this.setState({cells});
  },
  render: function() {
    var rows = []; 
    var size = this.props.size;
    var counterCell = 0;
    var counterRow = size + 1;
    for(var i = 0; i < size; i++){
      rows.push(<BoardRow key={Math.random()}/>);
      counterRow++;
        for(var j= 0; j < size; j++){
          if(this.state.cells.length > 0){
            rows.push(<Cell 
                        id={counterCell} 
                        key={counterCell} 
                        alive={this.state.cells[counterCell].alive}
                        onClicked={this.onClicked}/>);
            counterCell++;
          }
        }
    }
    return (
      <div>
        <div className="page-header"><h2>Game of Life</h2></div>
        <div className="board none">{rows}</div>
        <div className="none">Generation: <span className="badge">{this.state.generation}</span></div><br />
        <button className="start btn" onClick={this.onStart}>Start</button>
        <button className="start btn" onClick={this.onPause}>Pause</button>
        <button className="start btn" onClick={this.onClear}>Clear</button>
        <div className="page-header"></div>
      </div>
    );
  }
}); 

var BoardRow = React.createClass({
  render: function() {
    return (
      <div className="boardRow"></div>
    );
  }
});

var Cell = React.createClass({
  onClicked: function() {
    this.props.onClicked(this.props.id);
  },
  render: function() {
    var style = this.props.alive ? {backgroundColor: 'red'} : null;
    return (
      <div className="cell" style={style} onClick={this.onClicked}></div>
    );
  }
});

var updateTemp = function(x,y,arr) {
  var count = 0;
  arr.forEach(function(o) {
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
        this.tempState = false;
        break;
      case 3:
        this.tempState = true;
        break;
      case 2:
        this.tempState = this.alive ? true : false;
        break;
      case 1:
      case 0:
        this.tempState = false;
        break;
      default:
        this.tempState = false;
    } 
};

ReactDOM.render(<Board size={30}/>, document.getElementById('content'));
