import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';
import _ from 'lodash';
import * as constants from '../shared/constants';
axios.defaults.timeout = 3000;

export function getPersons(apiUrl){
    dispatcher.dispatch('FETCH');
    axios.get(apiUrl)
    .then(result =>{
         dispatcher.dispatch({type: constants.ActionEvents.receiveData,
            personData: result.data,
            dataCount: result.data.length,
            totalCount: _.get(result.headers,"x-row-count"),
            message: constants.SuccessMessage
         });
    })
    .catch(result =>{
        if(result instanceof Error) {
            console.log(result.message);
        } else {
            console.log(result.data);
        }
        dispatcher.dispatch({type: constants.ActionEvents.receiveData,
            personData: result.data,
            dataCount: 0,
            totalCount: 0
         });
    });
}