import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import Grid from "./Grid.js";

class App extends Component{

  render(){
    return(
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <h4>A simulation of the evolution of life patterns. A cell is a single square on the grid and it has eight neighbors. If a live cell
        has more than three live neighbors(overpopulation) or less than two live neighbors(underpopulation), it will die. If a live cell has exactly two or three
        live neighbors, it will live on to the next generation. Any dead cell with exactly three live neighbors will become a live cell(reproduction). Create an initial pattern by selecting
        cells on the grid and then click start.</h4>
        <Grid size={20}/>
      </div>
    );
  }
}

export default hot(module)(App);