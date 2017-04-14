import React,{ Component } from 'react';

class Footer extends Component
{        
    render(){
        return(
            <div>
                <div className="App-footer">
                    <span id="dateText">Date & time on the server is: {this.props.date.toTimeString()}</span>
                    <span>Copyright - The © symbol, or the word 'Copyright' or abbreviation 'Copr.'</span>                        
                </div>
            </div>
        );
    }
}
export default Footer;