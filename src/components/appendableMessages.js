import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Modal  from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Table from 'react-bootstrap/lib/Table';
import Collapse from 'react-bootstrap/lib/Collapse';
import Pagination from 'react-bootstrap/lib/Pagination';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Alert from 'react-bootstrap/lib/Alert';
import Label from 'react-bootstrap/lib/Label';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Well from 'react-bootstrap/lib/Well';
import DatePicker from 'material-ui/DatePicker';
import * as Diff from 'json-diff-patch';
import * as appendableMessageActions from '../actions/appendableMessageActions';
import appendableMessageStore from '../stores/appendableMessageStore';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';

let languageCodeMap = [{code: "en_US",text: "English"}, {code: "es_US", text: "Spanish"}]

class AppendableMessage extends Component{
    constructor(props){
        super(props);
        let returnValues = appendableMessageStore.getAppendableMessages();
        this.state = {
            componentData: [],
            showModal: false,
            dataCount: 0,
            totalCount: 0,
            messageId: 0,
            editMessageId: 0,
            filterMessageId: 0,
            showChildTable: false,
            conflictData: [],
            taggedFor: null,
            code: "en_US",
            messageText: "",            
            callableUrl: "/appendableMessages" 
        };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);        
    }
    componentWillMount() {
      appendableMessageStore.on("change", this.storeDataHandler.bind(this));
      this.refreshForData();
    }

    componentWillUnmount() {
      appendableMessageStore.removeListener("change", this.storeDataHandler);
    }
    openModal () { console.log('msg'); this.setState({showModal: true}); }

    closeModal () { this.setState({showModal: false}); }
    refreshForData(){
        let serverParams="?";      
        this.getServerData(serverParams,0,this.state.pageLimit,this.state.sortColumn);
    }

    getServerData(params,offset,limit,sortCol){
      let callParams = params;
      let serverParams = params.concat("offset="+offset+"&limit="+limit+"&sort="+sortCol);
      let callableUrl = this.state.callableUrl +serverParams;
      console.log(callableUrl);
      this.setState({apiUrl: callableUrl, onSortParams: callParams});
      appendableMessageActions.getAppendableMessages(callableUrl);
    }    
    storeDataHandler() {
      let returnValues = appendableMessageStore.getAppendableMessages();
      let maxMessageId;
      if(returnValues.dataField.length > 1){
        maxMessageId = returnValues.dataField.reduce((accumulator, current)=>{
            return Math.max(accumulator.messageId,current.messageId)
        });
      }
      else{
          maxMessageId = returnValues.dataField[0].messageId
      }
      let conflictData = returnValues.dataField.reduce((previous, current)=>{
          return [...previous.Conflicts,...current.Conflicts]
      })
      let modifiedData = returnValues.dataField.map((item, i)=>{
          var taggedForDate = new Date(item.taggedFor)
          item.taggedFor = taggedForDate;
          return item;
      })
      //let combinedData = returnValues.dataField.concat(data);
      //  let count = 0
      //   let messageGroupCount = combinedData.reduce((previous, current)=>{
      //       return {previous.messageId === current.messageId
      //   })
      this.setState({
          componentData: modifiedData,
          dataCount: returnValues.pageCountField,
          totalCount: returnValues.totalCountField,
          messageId: maxMessageId,
          conflictData: conflictData          
        });
        
    }
    sortOnClick(eventKey){
      let sortCol = eventKey.target.id;
      let sortDirection = "";
      switch (eventKey.target.id){
      }
      sortCol = sortDirection+sortCol;
      //this.getServerData(this.state.onSortParams,0,this.state.pageLimit,sortCol);
    }
    handleSelect(eventKey){
        
    }
    handlePaging(eventKey){

    }
    getCodeMapping(code){
        let mapItem =  _.find(this.state.languageCodeMap, (item) =>{ return _.eq(item.code, code)})
        return mapItem.text;
    }
    searchResults(e){
      let offset;   
      console.log(typeof e);
      if(e !== undefined){
        if(typeof e !== 'object'){
          console.log('inside page offset');
          offset = (e-1)*this.state.pageLimit;
        }     
        else{
          offset = 0;
        }
      }
      console.log('page offset '+ offset);
      let messageFilter = "";
      if(this.state.filterMessageId !== null && this.state.filterMessageId !== undefined &&
         this.state.filterMessageId !== "" && this.state.filterMessageId !== 0){
          messageFilter = `messageId=${this.state.filterMessageId}`
      }
      else{
          messageFilter = ""
      }
      let serverParams="?".concat(messageFilter);
      console.log('inside results click');
      this.getServerData(serverParams, offset, this.state.pageLimit, this.state.sortColumn);
    }
    messageIdFilterChange(e){
        this.setState({
            filterMessageId: e.target.value
        })
    }
    languageCodeSelectChange(e){
        this.setState({
            code: e.target.value
        })
    }
    messageTextChange(e){
        this.setState({
            messageText: e.target.value
        })
    }
    taggedForDatePickerChange(e, date){
        this.setState({
            taggedFor: date.toISOString()
        })
    }
    getMessageId(){
        return  this.state.editMessageId == 0 ? this.state.messageId+1 : this.state.editMessageId
    }
    saveChanges(e){
        this.closeModal();
        let newData = { 
            messageId: this.getMessageId(),
            status: 'Ready-For-Test',
            taggedFor: this.state.taggedFor,
            localeBasedMessages: [
                {
                    code: this.state.code,
                    messageText: this.state.messageText
                }
            ]        
        }
        appendableMessageActions.createNewAppendableMessage(this.state.callableUrl, newData)
        this.refreshForData()
    }
    dateFormatter(cell, row) {
        //let cellDate = new Date(cell);
        return `${('0' + (cell.getMonth() + 1)).slice(-2)}-${('0' + cell.getDate()).slice(-2)}-${cell.getFullYear()}`;
    }
    isExpandableRow(row){
        return true;
    }
    expandComponent(row){
        return (<BootstrapTable data={row.localeBasedMessages} striped condensed height='120px' 
                containerStyle={{background:'aliceblue'}}>
                    <TableHeaderColumn isKey dataField='code' style={{columnWidth:"60px"}}>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='messageText'>Text</TableHeaderColumn>
                </BootstrapTable>
                );
    }
    localeMessageFormatter(cell, row){
        let codeMap = languageCodeMap
        return (      <div>
                        {row.localeBasedMessages.map((message, i) =>
                            <Panel key={i+1} header={`${ _.find(codeMap, (item) =>{ return _.eq(item.code, message.code)}).text}`}>
                                    {message.messageText}
                                    {(row.Conflicts.length >= 1) &&
                                        <Accordion>
                                            {row.Conflicts.map((ConflictsData, row)=>
                                            <Panel bsStyle='warning' header={`Conflict Messages with release tagged as ${ConflictsData.taggedFor.toString()} for ${ConflictsData.status}`}  eventKey={row+1} key={row+1} >
                                            {ConflictsData.localeBasedMessages.map((conflictMessage, i) =>                                                                    
                                            <FormGroup key={i+1}>
                                                <Form inline>
                                                    <ControlLabel>Code :</ControlLabel>
                                                    <Label>{ _.find(codeMap, (item) =>{ return _.eq(item.code, conflictMessage.code)}).text}</Label>
                                                </Form>
                                                <Form>
                                                    {' '}
                                                    <ControlLabel>Text :</ControlLabel>
                                                    <FormControl componentClass="textarea" defaultValue={conflictMessage.messageText}/>
                                                </Form>
                                            </FormGroup>
                                            )}
                                            </Panel>
                                        )}
                                        </Accordion>
                                    }
                                </Panel>                                
                            )
                        }
                    </div>
                    )
                }
    handleRowSelect(row, isSelected, e){
        this.setState({
            editMessageId: row.messageId,
            taggedFor: row.taggedFor,
            code: row.localeBasedMessages[0].code,
            messageText: row.localeBasedMessages[0].messageText
        })
        this.openModal();
    }
    render() {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.handleRowSelect.bind(this)
        };
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column'  // Currently, available value is row and column, default is row
        };
        return (
            <div>
                <div className="static-modal">
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Create/Edit Locale Based Messages  <Label>MessageId: {this.getMessageId()}</Label> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <FormGroup controlId="formAppendableMessage">
                                    <ControlLabel> Select Language Code </ControlLabel>
                                    <FormControl componentClass="select" placeholder="select" onChange={this.languageCodeSelectChange.bind(this)} defaultValue={this.state.code}>
                                        <option value="en_US">English</option>
                                        <option value="es_US">Spanish</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Release Date</ControlLabel>
                                    <DatePicker hintText="Pick a release date" container="inline" mode="landscape" onChange={this.taggedForDatePickerChange.bind(this)} value={this.state.taggedFor} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Language Text</ControlLabel>
                                    <FormControl componentClass="textarea" rows="10" cols="100" placeholder="Enter Language Text" onChange={this.messageTextChange.bind(this)} defaultValue={this.state.messageText} />
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal.bind(this)}>Close</Button>
                            <Button bsStyle="primary" onClick={this.saveChanges.bind(this)}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>               
                <Form inline>                
                    <Button bsStyle="primary" onClick={this.openModal.bind(this)} style={{float:"left"}}><i className="material-icons">create</i><ControlLabel>Create New Message</ControlLabel></Button>
                    <FormControl type="text" placeholder="Enter MessageId to filter" bsSize="large" onChange={this.messageIdFilterChange.bind(this)}/>
                    {' '}
                    <FormGroup controlId="formInlineText">                                                
                        <Button onClick={this.searchResults.bind(this)} value="0" bsStyle="primary">
                            <i className="material-icons">refresh</i><ControlLabel>Refresh Messages By Filter</ControlLabel>
                        </Button>                    
                    </FormGroup>                
                </Form>
                <br/>
                <BootstrapTable data={this.state.componentData} striped hover height='120px' exportCSV
                containerStyle={{background:'aliceblue'}} bodyStyle={{background:'#00ff00'}} 
                selectRow={selectRow}>
                    <TableHeaderColumn isKey dataField='messageId' width="5%">Message Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='localeBasedMessages' width="70%" dataFormat={this.localeMessageFormatter}>Locale Based Messages</TableHeaderColumn>
                    <TableHeaderColumn dataField='taggedFor' width="15%" dataFormat={this.dateFormatter}>Release Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' width="10%">Status</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default AppendableMessage;