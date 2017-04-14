import React,{ Component } from 'react';
import logo from '../logo.svg';
//import logo from '../image2.svg';
//import vscode from '../download.svg';
import '../App.css';

class Header extends Component
{
    render(){
        return(
            <div>
                <div className="App-header">                    
                    <img src={logo} className="App-logo" alt="logo" />
                    {/*<img src={vscode} className="App-logo-vscode" alt="logo vscode" />*/}
                    <h2>Welcome to Adminsuite UI app created with React to showcase how to integrate with express based Web API</h2>                                                                            
                </div>        
                <div>
                    <h4>{this.props.name} {this.props.greeting}</h4>        
                </div>        
            </div>
        );
    }
}
export default Header;