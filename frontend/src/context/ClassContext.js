import { createContext, useReducer, useEffect } from 'react';

export const ClassesContext = createContext();

export const ClassesReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_CLASS':
            return { classes: action.payload };
        default:
            return state;
    }
};

export const ClassesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassesReducer, {
        classes: null,
    });

    return (
        <ClassesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ClassesContext.Provider>
    );
};