import { useContext } from 'react';
import { useReducer } from 'react';
import {useState,useEffect} from 'react';
import { createContext } from 'react';

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";


const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error:""
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    
    case 'city/created':
      return { ...state, isLoading: false, cities:[...state.cities, action.payload],currentCity:action.payload };
    
    case 'city/deleted':
      return { ...state, isLoading: false, cities: state.cities.filter((city)=>city.id!==action.payload) ,currentCity:{}}

      
    case 'rejected':
      return {
        ...state, isLoading: false ,error:action.payload
      }

    default:
      throw new Error("unknown action type");
  }
}

const CitiesProvider = ({ children }) => {


  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

  //  const [cities,setCities]=useState([])
  //  const [isLoading, setIsLoading] = useState(false);
  //  const [currentCity,setCurrentCity]=useState({})

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' })
      try {
        // setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        // setCities(data)
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        // alert("there was an error loading data")
        dispatch({ type: 'rejected', payload: "there was an error loading data" })
        // } finally {
        //   // setIsLoading(false)
        // }
      }
      }
      fetchCities();
    }, [])




  async function getCity(id) {
    if(Number(id)===currentCity.id) return
   dispatch({type:"loading"})
      try {
        // setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        // setCurrentCity(data)
        dispatch({type:'city/loaded',payload:data})
      } catch {
        // alert("there was an error loading city data")
        dispatch({type:'rejected',payload:"there was an error loading city data"})
      } 
    
  }

  async function createCity(newCity) {
    
         dispatch({type:'loading'})
      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          method:'POST',
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json", 
          },
        })
        const data = await res.json()
        // setCities((cities)=>[...cities,data])
        dispatch({ type: 'city/created', payload: data });
      } catch {
        dispatch({type:'rejected',payload:"there was an error creating city."})
      } 
  }

  async function deleteCity(id) {
         dispatch({type:'loading'})
      try {
        await fetch(`${BASE_URL}/cities/${id }`, {
          method:'DELETE',
        })
        // setCities((cities) => cities.filter((city) => city.id !== id))
        dispatch({type:'city/deleted',payload:id })
      } catch {
        dispatch({type:'rejected',payload:""})
      } 
  }
 

    return (
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          currentCity,
          getCity,
          createCity,
          deleteCity
        }}
      >
        {children}
      </CitiesContext.Provider>
    );
}


function useCities() {
    const context = useContext(CitiesContext)
    if(context===undefined)throw new Error("CitiesContex was used outside the CitiesProvider ");
    
    return context;
}


export  {CitiesProvider,useCities}
 