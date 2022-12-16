const initialState = {
    data: [],
    list: []
}

function reducer (state= initialState, {type, payload}) {
    switch(type){
        case 'GET_DATA':
            return{
                ...state,
                data: payload
            }

        case 'GET_LIST':
            return{
                ...state,
                list: payload
            }

        default:
            return state;
    }
}

export default reducer;