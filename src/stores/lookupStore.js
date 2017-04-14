import { EventEmitter } from "events";
import dispatcher from '../dispatchers/dispatcher';
import * as constants from '../shared/constants';

class LookupStore extends EventEmitter{

    constructor(){
        super();
        this.lookupData=[];
        this.dataCount = 0;
        this.totalCount = 0;
    }
    getLookup(){
        return {data: this.lookupData}
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
const lookupStore = new LookupStore();
dispatcher.register(lookupStore.handleActions.bind(lookupStore));
export default lookupStore;