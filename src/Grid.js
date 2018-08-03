import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Cell from "./Cell.js";



class Grid extends Component{
	constructor(props){
		super(props);
		this.state ={
			gen1: getAllCellCoords(props),
			gen2: []
		}
		this.startGame = this.startGame.bind(this);
		this.endGame = this.endGame.bind(this);
	}

	startGame(){
	  	this.timerID = setInterval(
	  		() => this.calculateSuccessors(),
	  		1000// every second  for now
	  	);
	}

	endGame(){
		clearInterval(this.timerID);
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
		// traverse configured gen1 
			// find and update cell's death
			// if there is change then add to new list
		// update the the state of gen1 but no need to render new changes
/*		getCell(r,c).tick();*/
	}


	render(){
		return(
			<div>
			<RowList size={this.props.size}/>
			<a href="#" id="start" onClick={this.startGame}>start</a>
			<a href="#" id="end" onClick={this.endGame}> stop</a>
			</div>
		);
	}
}

/*function repeat(num){
	let list =[];

	for(let i=0;i<num;i++){
		list.push(<h1 key={i.toString()} className={i.toString()}>Hello</h1>);
	}
	return <div>{list}</div>	
}
*/
function getAllCellCoords(props){
	let list = [];
	for(let row=0;row<props.size;row++){
		for(let col=0;col<props.size;col++){
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
	return <div className="grid">{children}</div>
}

function Row(props){
	let children = [];


	for(let i=0;i<props.size;i++){
		if(props.id == 4){
			if(i == 3 || i==4 || i==5){
				children.push(<Cell key={i} column={i} alive={true} row={props.id}/>)
			}else{
				children.push(<Cell key={i} column={i} alive={false} row={props.id}/>)
			}
		}else{
		children.push(<Cell key={i} column={i} alive={false} row={props.id}/>)
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

/*function RowList(num){
	let listRows = [];

	for(let i=0; i<num;i++){
		listRows.push(Row(i,num))
	}

	return(
		<div className="grid">{listRows}</div>
	);
}

function Row(id,num){
	
	let rowItems = [];
	for(let i=0; i<num; i++){
		rowItems.push(<Cell column={i.toString()}/>);
	}

	return (
		<div key={id.toString()} className={id.toString()}>{rowItems}</div>
	);
}*/


export default hot(module)(Grid);