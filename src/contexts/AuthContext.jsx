import { useReducer } from "react";
import { useContext ,createContext } from "react";

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null
}
function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, isAuthenticated: true, user: action.payload }
        case 'logout':
            return { ...state, isAuthenticated: false, user: null };
        default:
            throw new Error ("unknown action ")
    }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


const AuthProvider = ({ children }) => {
    const[{isAuthenticated,user},dispatch]=useReducer(reducer,initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type:'login',payload:FAKE_USER})
        } else {
            console.log("login faild");
        }
    }    

    function logout() {
        dispatch({type:"logout"})
    }


    return(
    <AuthContext.Provider value={{login,logout,isAuthenticated,user}}>
      {children}
    </AuthContext.Provider>
    )
}


function useAuth() {
    const context=useContext(AuthContext)
    if (context === undefined)
        throw new Error("AuthContext was used outside the CitiesPosition")
    return context;
}

export { AuthProvider, useAuth };