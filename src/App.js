import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {green100, green500, green700} from 'material-ui/styles/colors';
import Layout from './components/layout';
import Header from './components/header';
import Footer from './components/footer';

class App extends Component {
  constructor(props){
      super(props); //Mandatory      
      this.state={
        date: new Date()
      };
    }  
    render() {
     setTimeout(()=>{
      this.setState({date:new Date()});
    },1000);
    return (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      
      <div>        
          <Header/> 
          <div className="App">                   
              <Layout/>
          </div>
          <Footer date={this.state.date}/>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default App;