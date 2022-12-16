import axios from "axios";

export function getData(){
    return async function(dispatch){
        console.log('aaa')
        const json = await axios.get('http://localhost:3000/files/data');
        return dispatch({
            type: 'GET_DATA',
            payload: json.data
        })
    }
}

export function getList(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3000/files/list');
        return dispatch({
            type: 'GET_LIST',
            payload: json.data
        })
    }
}