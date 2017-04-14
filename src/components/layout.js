import React, { Component } from 'react';
//import Modal  from 'react-bootstrap/lib/Modal';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
//import Button  from 'react-bootstrap';
import Persons from './persons';
import AppendableMessages from './appendableMessages'

let host = location.hostname;
let port = location.port;
let protocol = location.protocol;
let sourceUrl = `${protocol}\\${host}:${port}`;
class Layout extends Component {  
    constructor (props) {           
      super(props);
      this.state={
        open: false
      };
    }
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix">
                            <Col sm={2}>
                                <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first">
                                    Home
                                </NavItem>                            
                                <NavItem eventKey="second">
                                    Persons
                                </NavItem>
                                <NavItem eventKey="third">
                                    Appendable Messages
                                </NavItem>
                                <NavItem eventKey="fourth">
                                    Fourth
                                </NavItem>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="first">
                                        <Well bsSize="large"><p><strong>Welcome to UI App prototype consuming the new Web API!</strong></p>
                                        <ul>
                                            <li>This app showcases how to consume hosted Adminsuite Web Api's.</li> 
                                            <li>click on the second/third tab to see the sample working app.</li>
                                            <li></li>
                                        </ul>
                                        </Well>
                                    </Tab.Pane>                            
                                    <Tab.Pane eventKey="second">
                                        <Persons className="App-entry" Source=""/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <AppendableMessages className="App-entry" Source=""/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                        fourth pane Content
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
        );
    }
}
export default Layout;