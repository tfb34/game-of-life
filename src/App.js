import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import Grid from "./Grid.js";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
        <Grid size={15}/>
      </div>
    );
  }
}

export default hot(module)(App);