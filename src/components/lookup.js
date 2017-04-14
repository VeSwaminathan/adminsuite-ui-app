import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Modal  from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import LookupStore from '../stores/LookupStore'

class Lookup extends Component{
    constructor(props){
        super(props)
        this.state={
                initialValues= [],
                dataCount: 0
            }
        }
        componentWillMount() {
            LookupStore.on("change",this.lookupDataHandler.bind(this))
        }
        componentWillUnMount() {
            LookupStore.removeListener("change",this.lookupDataHandler)
        }

        lookupDataHandler(){
            let returnValues = LookupStore.getLookup();
            this.setState({
                lookupData: returnValues.dataField,
                dataCount: returnValues.pageCountField,
                totalCount: returnValues.totalCountField
          });
        }

    render(){
        <div>        
            <Form inline>
            <FormGroup controlId="formInlineText">
                <ControlLabel>MeType</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="MeType" bsSize="large" onkeyup />
                <ControlLabel>Text</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="Just another Text" bsSize="large"/>                  
                {' '}
            </FormGroup>
            <FormGroup controlId="formInlineButton">
                <Button bsStyle="primary">
                Search Results 
                </Button>
            </FormGroup>
            {' '}
            </Form>
        </div>        
    }
}