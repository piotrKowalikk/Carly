import axios from 'axios'

export const fetchUsers = () => {
    return async dispatch => {
        try {
            //lefted as example of requesting data
            var response;
            response = await axios.get('http://localhost:8080/scan/', {
                headers: {
                    crossDomain: true,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                dispatch(successHandle(response));
            }, error => {
                dispatch(errorHandle());
            });


        }
        catch (error) {
            dispatch(errorHandle());
        }
        return 'done';
    }
}

//enums would be better
const successHandle = (mockData) => {
    return {
        type: 'SEARCH',
        payload: {
            errorMessage: null
        }
    }
}

const errorHandle = () => {
    return {
        type: 'ERROR',
        payload: {
            errorMessage: 'Not valid input.'
        }
    }
}