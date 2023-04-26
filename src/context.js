import React, {useState, useContext} from "react";

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showProduct, setShowProduct] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [optionValue, setOptionValue] = useState("select request")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [privacy, setPrivacy] = useState(null)
    const [moduleContact, setModuleContact] = useState({})
    const [users, setUsers] = useState([])
    const [password, setPassword] = useState("")
    const [loginState, setLoginState] = useState({})
    const [activeForm, setActiveForm] = useState(true)
    const [invalidLogin, setInvalidLogin] = useState("")
    const [name, setName] = useState("")
    const [userPost, setUserPost] = useState()
    const [data, setData] = useState()
    const [cart, setCart] = useState([])
    const [cartProduct, setCartProduct] = useState([])

    return(
        <AppContext.Provider value ={
            {
                user, setUser,
                isAuthenticated, setIsAuthenticated,
                showProduct, setShowProduct,
                isLoading, setIsLoading,
                favorites, setFavorites,
                firstName, setFirstName,
                lastName, setLastName,
                optionValue, setOptionValue,
                email, setEmail,
                message, setMessage,
                privacy, setPrivacy,
                moduleContact, setModuleContact,
                users, setUsers,
                password, setPassword,
                loginState, setLoginState,
                activeForm, setActiveForm,
                invalidLogin, setInvalidLogin,
                name, setName,
                userPost, setUserPost,
                data, setData,
                cart, setCart,
                cartProduct, setCartProduct
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }