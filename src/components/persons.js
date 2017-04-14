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
import * as personActions from "../actions/personActions";
import personStore from "../stores/personStore";


const collapseUpText="glyphicon glyphicon-menu-up";
const collapseDownText="glyphicon glyphicon-menu-down";
const sortedTextAscending = "glyphicon glyphicon-sort-by-alphabet";
const sortedTextDescending = "glyphicon glyphicon-sort-by-alphabet-alt";
const sortableText="glyphicon glyphicon-sort";

class Persons extends Component {  
    constructor (props) {           
      super(props);
      let returnValues=personStore.getPersons();
      this.state={
        open: false,
        alertVisible: false,
        collapseVisible: true,
        collapseGlyph: collapseUpText,
        codesortableGlyph: sortableText,
        textsortableGlyph: sortableText,
        groupingsortableGlyph:sortableText,
        classificationsortableGlyph:sortableText,
        specializationsortableGlyph:sortableText,
        activePage: 1,
        pageLimit:5,
        personData: returnValues.dataField,
        sortColumn:"code",
        dataCount:returnValues.pageCountField,
        totalCount:returnValues.totalCountField,
        dataUrl: this.props.Source,
        text:"",
        code:"",
        grouping:"",
        classification:"",
        specialization:"",
        apiUrl:"",
        onSortParams:""
      };
      //const personUrl= this.props.Source;
      console.log(this.state.dataUrl);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      console.log(this.state.codeSortColDesc);      
    }
    componentWillMount() {
      personStore.on("change", this.storeDataHandler.bind(this));
    }

    componentWillUnmount() {
      personStore.removeListener("change", this.storeDataHandler);
    }
    
    openModal () { console.log('msg'); this.setState({open: true}); }

    closeModal () { this.setState({open: false}); }

    openSearchScreen(){
      this.openModal();
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
      let serverParams="?";      
      console.log('inside results click');
      this.getServerData(serverParams,offset,this.state.pageLimit,this.state.sortColumn);
    }
    getServerData(params,offset,limit,sortCol){
      let callParams = params;
      let serverParams = params.concat("offset="+offset+"&limit="+limit+"&sort="+sortCol);
      let callableUrl=this.state.dataUrl+"/Persons"+serverParams;
      console.log(callableUrl);
      this.setState({apiUrl: callableUrl,onSortParams: callParams});
      personActions.getPersons(callableUrl);
    }    
    handleAlertDismiss(){
      this.setState({alertVisible: false});
    }
    collapseChange(e){
      this.setState({ 
        collapseVisible: !this.state.collapseVisible,
        collapseGlyph: this.state.collapseVisible?collapseDownText: collapseUpText });
    }
    handleSelect(eventKey) {
      console.log(eventKey);      
      this.setState({
        activePage: eventKey
      });
      this.searchResults(eventKey);
    }
    sortOnClick(eventKey){
      let sortCol = eventKey.target.id;
      let sortDirection = "";
      switch (eventKey.target.id){
        case 'code':
          sortDirection =  this.state.codesortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: this.state.codesortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText
          });
        break;
        case 'text':
        sortDirection =  this.state.textsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: this.state.textsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText            
          });            
          break;
        case 'grouping':
        sortDirection =  this.state.groupingsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: this.state.groupingsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText            
          });        
        break;
        case 'classification':
        sortDirection =  this.state.classificationsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: this.state.classificationsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            specializationsortableGlyph: sortableText            
          });        
        break;
        case 'specialization':
        sortDirection =  this.state.specializationsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: this.state.specializationsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending            
          });        
        break;        
      }
      sortCol = sortDirection+sortCol;
      this.getServerData(this.state.onSortParams,0,this.state.pageLimit,sortCol);
    }
    storeDataHandler() {
      let returnValues = personStore.getPersons();
      this.setState({
            personData: returnValues.dataField,
            dataCount: returnValues.pageCountField,
            totalCount: returnValues.totalCountField
          });
    }
  render() {
    let tooltip = <Tooltip id="tooltip">Collapse/Hide search results pane!</Tooltip>;
    return (
      <div>
          <div className="glyphButton">            
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <Button onClick={this.collapseChange.bind(this)}> 
                <Glyphicon glyph={this.state.collapseGlyph} />
              </Button>
            </OverlayTrigger>
          </div>      
        <div>
        <Collapse in={this.state.collapseVisible}>
          <div>        
              <Form inline>
                <FormGroup controlId="formInlineText">
                  <ControlLabel>Text</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Just a Text to showcase the possibility of a filter" bsSize="large"/>
                  <ControlLabel>Text</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Just another Text" bsSize="large"/>                  
                  {' '}
                </FormGroup>
                <FormGroup controlId="formInlineButton">
                  <Button onClick={this.searchResults.bind(this)} value="0" bsStyle="primary">
                    Search Results
                  </Button>
                </FormGroup>
                {' '}
              </Form>
            </div>
          </Collapse>            
        </div>
      <br/>
      <div id="table-container">
         <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th id="hashcol"/>
                <th>Person Id <Button bsStyle="link" onClick={this.sortOnClick.bind(this)}><Glyphicon glyph={this.state.codesortableGlyph} id="PERSONID"/></Button></th>
                <th>First Name <Button bsStyle="link" onClick={this.sortOnClick.bind(this)}><Glyphicon glyph={this.state.textsortableGlyph} id="FIRSTNM"/></Button></th>
                <th>Last Name <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="LASTNM"><Glyphicon glyph={this.state.groupingsortableGlyph} id="LASTNM"/></Button></th>                
                <th>Email Address <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="EMAILADDRESS"><Glyphicon glyph={this.state.classificationsortableGlyph} id="EMAILADDRESS"/></Button></th>
                <th>Last Modified <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="RECORDINSERTDT"><Glyphicon glyph={this.state.specializationsortableGlyph} id="RECORDINSERTDT"/></Button></th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.personData.map((person, idx) =>                   
                    <tr key={idx}>
                      <td id="hashcol">{idx+1}</td>
                      <td>{person.PERSONID}</td>
                      <td>{person.FIRSTNM}</td>
                      <td>{person.LASTNM}</td>
                      <td>{person.EMAILADDRESS}</td>
                      <td>{person.RECORDINSERTDT}</td>
                    </tr>
                  )
                }
          </tbody>
          {this.state.dataCount >= 1 ?
              <tfoot>
                    <tr>
                        <td colSpan="8">
                          <div>
                            <Pagination bsSize="small" prev next first last ellipsis boundaryLinks items={this.state.totalCount>5?Math.ceil(this.state.totalCount/5):0} maxButtons={5} activePage={this.state.activePage} onSelect={this.handleSelect.bind(this)}/>
                          </div>
                        </td>                          
                    </tr>                                        
              </tfoot>: null}
        </Table>
            <Alert bsStyle="success"> Api call: <br/> <p><strong>{this.state.apiUrl}</strong></p></Alert>
        </div>
      </div>);
  }
}

export default Persons; // Don’t forget to use export default!