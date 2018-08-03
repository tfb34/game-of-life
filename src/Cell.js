import React, {Component} from "react";
import {hot} from "react-hot-loader";
import './Cell.css';

const max = 14;

class Cell extends Component{
	constructor(props){
		super(props);
		this.state = {
			isAlive: props.alive,
			neighbors: getNeighbors(props)
		};
		this.tick = this.tick.bind(this);
		this.getAddress = this.getAddress.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle(){// when clicked this function should be called
		if(this.state.isAlive){
			this.tick(false);
		}else{
			this.tick(true);
		}
	}

	getLifeStatus(){
		return this.state.isAlive;
	}

	tick(lifeStatus){// returns 1 or 0
		this.setState({
			isAlive: lifeStatus
		});
	}
	// returns true if cell is alive else false
	evaluateCell(){
		let liveNeighbors = 0;
		for(let i=0;i<this.state.neighbors.length;i++){
			//get cell and obtain its state
			let r = this.state.neighbors[i][0];
			let c = this.state.neighbors[i][1];
			
			if(getCell(r,c).state.isAlive){
				liveNeighbors+=1;	
			}
		}
		let lifeStatus = this.state.isAlive;

		if(liveNeighbors < 2 || liveNeighbors > 3){
			lifeStatus = false;
		}else if(liveNeighbors == 3){
			lifeStatus = true;
		}
		return lifeStatus;
	}

	getAddress(){
		return [this.props.row, this.props.col];
	}

  	render(){
	    return(
	      <div key={this.props.column} onClick={this.toggle} id={"col"+this.props.column} className={"cell " + (this.state.isAlive? 'alive' : 'dead')}></div>
	    );
  	}

}



function getNeighbors(props){
	console.log("hello");
	let row = props.row;
	let col = props.column;
	let list = [];
	console.log(row);
	for(let c=col-1; c<=(col+1);c++){

		list.push([row-1, c]);
		if(c!=col) list.push([row,c]);
		list.push([row+1,c]);
	}
	console.log(list);
	return fixOutOfBounds(list);
}

function fixOutOfBounds(list){
	let fixedList = list.map((coord) =>
		[fixValue(coord[0]), fixValue(coord[1])]
	);

	return fixedList;
}

function fixValue(x){
	if(x < 0){
		x = max;
	}else if(x > max){
		x = 0;
	}
	return x;
}

function findReactElement(node) {
    for (var key in node) {
        if (key.startsWith("__reactInternalInstance$")) {
            return node[key]._debugOwner.stateNode;
        }
    }
    return null;
}

function getCell(row,col){
	let e = document.getElementById('row'+row).children[col];
	return findReactElement(e);
}

export default hot(module)(Cell);