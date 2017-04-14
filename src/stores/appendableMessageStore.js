import { EventEmitter } from "events";
import dispatcher from '../dispatchers/dispatcher';
import {MessageActionEvents} from '../shared/constants';

class AppendableMessageStore extends EventEmitter{
    constructor(){
        super();
        this.appendableMessagesData=[];
        this.dataCount = 0;
        this.totalCount = 0;
    }
    getAppendableMessages(){
        return { dataField: this.appendableMessagesData, pageCountField: this.dataCount, totalCountField:this.totalCount }
    }
	handleActions(action) {
		switch(action.type) {
			case MessageActionEvents.createNew: {
					//Handle CREATE data here
					break;
				}
			case MessageActionEvents.receiveData: {
					this.appendableMessagesData = action.appendableMessagesData;
					this.dataCount = action.dataCount;
					this.totalCount= action.totalCount;            
					this.emit("change");
					break;
			}
            case MessageActionEvents.modifyOrUpdate:{
                break;
            }
        }
    }
}
const appendableMessageStore = new AppendableMessageStore();
dispatcher.register(appendableMessageStore.handleActions.bind(appendableMessageStore));
export default appendableMessageStore;