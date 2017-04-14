import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';
import _ from 'lodash';
import * as constants from '../shared/constants';
axios.defaults.timeout = 3000;

export function getAppendableMessages(apiUrl){
    dispatcher.dispatch('FETCH');
    axios.get(apiUrl)
    .then(result =>{
         dispatcher.dispatch({type: constants.MessageActionEvents.receiveData,
         appendableMessagesData: result.data,
         dataCount: result.data.length,
         message: constants.SuccessMessage
         });
    })
    .catch(result =>{
        if(result instanceof Error) {
            console.log(result.message);
        } else {
            console.log(result.data);
        }
        dispatcher.dispatch({type: constants.MessageActionEvents.receiveData,
            appendableMessagesData: result.data,
            dataCount: 0,
            totalCount: 0
         });
    });
}
export function createNewAppendableMessage(apiUrl, postData){
    dispatcher.dispatch('BEFORECREATE');
    axios.post(apiUrl, postData)
    .then( result =>{
        if(result.status===201){
            dispatcher.dispatch({
                type: constants.MessageActionEvents.createNew,
                createdData: result.data
            })
        }
    })
    .catch(result =>{
        dispatcher.dispatch({
            type: constants.MessageActionEvents.createNew,
            createdData: result.data
        })        
    })
}