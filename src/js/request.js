export function dataLoadingMiddleware( { dispatch} ) {
    return (next) => (action) => {
        if (action.type ===  'LOAD_DATA') {
            fetchEvents().then(data => {
                dispatch({ type: 'RECEIVE_DATA_EVENTS', payload: data })
            });
            fetchTrainers().then(data => {
                dispatch({ type: 'RECEIVE_DATA_TRAINERS', payload: data })
            });
        }
        return next(action);
    }
}

function fetchEvents() {
    const URL = "http://128.199.53.150/events";
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response.json()]))
        .then( res => res[0]);
}

function fetchTrainers() {
    const URL = "http://128.199.53.150/trainers";
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response.json()]))
        .then( res => res[0]);
}