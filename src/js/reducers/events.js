export default function eventsCalendar ( state = [], action) {
    switch (action.type){
        case 'RECEIVE_DATA_EVENTS':
            return makeDB(action.payload);
        default: return state;
    }
}

function makeDB (data) {
    let dataBase = {};
    data.forEach(item => {
        let key = item.start.slice(0, 10);
        if(key in dataBase) {
            dataBase[key].push(item);
        }
        else{
            dataBase[key] = [item];
        }
    });
    return dataBase;
}