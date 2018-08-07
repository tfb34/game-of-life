import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Cell from "./Cell.js";
import './Grid.css';


class Grid extends Component{
	constructor(props){
		super(props);
		this.state ={
			gen1: getAllCellCoords(props.size),
			gen2: [],
			size: this.props.size, //default size
			value: this.props.size,
			isActive: "visible",
			startColor: "none"
		}
		this.startGame = this.startGame.bind(this);
		this.endGame = this.endGame.bind(this);
		this.changeGridSize = this.changeGridSize.bind(this);
		this.handleChange  = this.handleChange.bind(this);
	}

	startGame(){
	  	this.timerID = setInterval(
	  		() => this.calculateSuccessors(),
	  		50// every second  for now
	  	);
	  	this.setState({
	  		isActive: "none",
	  		startColor: "pink"
	  	});

	}

	endGame(){
		clearInterval(this.timerID);
		this.setState({
			isActive: "visible",
			startColor: "white"
		});
		console.log("end Game");
	}

	calculateSuccessors(){
		for(let i=0;i<this.state.gen1.length;i++){
			let r = this.state.gen1[i][0];
			let c = this.state.gen1[i][1];
	
			let cell = getCell(r,c);
			this.state.gen2[i] = cell.evaluateCell();
		}

		for(let i=0;i<this.state.gen1.length;i++){
			let r = this.state.gen1[i][0];
			let c = this.state.gen1[i][1];
			getCell(r,c).tick(this.state.gen2[i]);

		}

	}

	changeGridSize(){
		this.setState({
			gen1: getAllCellCoords(parseInt(this.state.value)),
			size: parseInt(this.state.value)
		});
		/*this.props.size = this.state.size;*/
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	render(){
		return(
			<div className="wrapper">
				<input type="text" value={this.state.value} onChange={this.handleChange}/>
				<button onClick={this.changeGridSize}>Enter</button>
				
				<RowList size={this.state.size}/>
				<a href="javascript:;" id="start" onClick={this.startGame} style={{pointerEvents: this.state.isActive, backgroundColor: this.state.startColor}}>start</a>
				<a href="javascript:;" id="end" onClick={this.endGame}> stop</a>
			</div>
		);
	}
}

function getAllCellCoords(max){
	let list = [];
	for(let row=0;row<max;row++){
		for(let col=0;col<max;col++){
			list.push([row,col]);
		}
	}
	return list;
}

function RowList(props){
	let children = []
	for(let i=0;i<props.size;i++){
		children.push(<Row key={i} size={props.size} id={i}/>)
	}
	return <div className="grid" style={{width: 22*props.size +'px'}}>{children}</div>
}

function Row(props){
	let children = [];


	for(let i=0;i<props.size;i++){
		if(props.id == 4){//Refactor
			if(i == 3 || i==4 || i==5){
				children.push(<Cell key={i} gridSize={props.size} column={i} alive={true} row={props.id}/>)
			}else{
				children.push(<Cell key={i} gridSize={props.size} column={i} alive={false} row={props.id}/>)
			}
		}else{
		children.push(<Cell key={i} gridSize={props.size} column={i} alive={false} row={props.id}/>)
		}
	}


	return(
		<div id={"row"+props.id}>{children}</div>
	);	
}


function getCell(row,col){
	let e = document.getElementById('row'+row).children[col];
	return findReactElement(e);
}


function findReactElement(node) {
    for (var key in node) {
        if (key.startsWith("__reactInternalInstance$")) {
            return node[key]._debugOwner.stateNode;
        }
    }
    return null;
}



export default hot(module)(Grid);