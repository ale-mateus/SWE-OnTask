import { createContext, useReducer } from 'react'

export const eventsContext = createContext()

export const eventsReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            return { ...state, events: [...state.events, action.payload] };
        case 'SET_EVENTS': // Handle setting events
            return { ...state, events: action.payload };
        default:
            return state;
    }
}

export const EventsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(eventsReducer, {
        workouts: null,
        events: [] // Initialize events here
    })

    return (
        <eventsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </eventsContext.Provider>
    )
}