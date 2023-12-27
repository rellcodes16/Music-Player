import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action){
    switch(action.type){
        case 'login':
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case 'logout':
            return{
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            throw new Error('Unkown Action')
    }
}

const USER = {
    name: "Rell",
    email: "rell@example.com",
    password: "qwerty",
}

function AuthProvider({ children }){
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

    function Login(email, password){
        if(email === USER.email && password === USER.password)
            dispatch({ type: 'login', payload: USER })
    }

    function Logout(){
        dispatch({ type: 'logout' })
    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            Login,
            Logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('AuthContext is being called outside the Auth Provider')
    return context;
}

export {AuthProvider, useAuth}