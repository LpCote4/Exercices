const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
    RESET: "reset",
    RENAME: "rename",
};

// - Ajouter l'attribut _maxValue_ dans l'état. Cet attribut est configuré à la création du compteur et représente la valeur maximale que votre compteur peut prendre lorsqu'il est incrémenté.
// - Borner les valeurs de _count_ à [0,_maxValue_]. Lorsqu'une action `INCREMENT` ou `DECREMENT` valide est envoyé au _reducer_, _count_ est 
//      modifiée, mais ne peut pas dépasser les bornes configurées.
// - Ajouter une nouvelle action `RENAME`. Cette action change le nom (_name_) du compteur seulement si le nouveau nom n'est 
//      pas vide et contient 10 caractères ou moins. Si ces conditions ne sont pas respectées, le nom du compteur reste le même.

/**
 * @param { {name : string, count : number, maxValue : number} } state l'état courrant
 * @param {{type : string, payload}} action action à appliquer. Contient un type et un contenu (payload)
 * @returns { state } le nouveau état modifié (ou non) par l'action
 */
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { ...state, count: Math.min(action.payload + state.count, state.maxValue) };
        case ACTIONS.DECREMENT:
            return { ...state, count: Math.max(state.count - action.payload, 0) };
        case ACTIONS.RESET:
            return { ...state, count: 0 };
        case ACTIONS.RENAME:
            return { 
                ...state,
                name: action.payload
             }
        default:
            return state;
    }
};

let counter = { name: "Timer", count: 0, maxValue: 10 };
const incrementAction = { type: ACTIONS.INCREMENT, payload: 1 };

counter = reducer(counter, incrementAction);
console.log(counter); // { name: 'Timer', count: 1, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.INCREMENT, payload: 15 });
console.log(counter); // { name: 'Timer', count: 10, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.DECREMENT, payload: 5 });
console.log(counter); // { name: 'Timer', count: 5, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.DECREMENT, payload: 10 });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: '' });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: 'Very Long Name' });
console.log(counter); // { name: 'Timer', count: 0, maxValue : 10}

counter = reducer(counter, { type: ACTIONS.RENAME, payload: 'New Timer' });
console.log(counter); // { name: 'New Timer', count: 0, maxValue : 10}
