import { EventEmitter } from "events";
import dispatcher from '../dispatchers/dispatcher';
import * as constants from '../shared/constants';
let dataField = constants.DataCallback.Data;
let pageCountField = constants.DataCallback.pageCount;
let totalCountField = constants.DataCallback.totalCount;

class personsStore extends EventEmitter{
    
    constructor(){
        super();
        this.personData=[];
        this.dataCount = 0;
        this.totalCount = 0;
    }

    getPersons(){
        return { dataField :this.personData,pageCountField: this.dataCount,totalCountField:this.totalCount };        
    }
    
    handleActions(action) {
        switch(action.type) {
        case constants.ActionEvents.createNew: {
            //Handle CREATE data here
            break;
        }
        case constants.ActionEvents.receiveData: {
            this.personData = action.personData;
            this.dataCount = action.dataCount;
            this.totalCount= action.totalCount;            
            this.emit("change");
            break;
        }
    }
}
}
const personStore = new personsStore();
dispatcher.register(personStore.handleActions.bind(personStore));
export default personStore;