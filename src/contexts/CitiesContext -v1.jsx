import { useContext } from 'react';
import { useReducer } from 'react';
import {useState,useEffect} from 'react';
import { createContext } from 'react';


const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const CitiesProvider = ({children}) => {

     const [cities,setCities]=useState([])
     const [isLoading, setIsLoading] = useState(false);
     const [currentCity,setCurrentCity]=useState({})

    useEffect( function() {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch{
        alert("there was an error loading data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities();
  }, [])



 async function getCity(id){
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        setCurrentCity(data)
      } catch {
        alert("there was an error loading city data")
      } finally {
        setIsLoading(false)
      }
    
  }

 async function createCity(newCity){
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`, {
          method:'POST',
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json", 
          },
        })
        const data = await res.json()
        setCities((cities)=>[...cities,data])
        console.log(data);
      } catch {
        alert("there was an error creating city.")
      } finally {
        setIsLoading(false)
      }
  }

 async function deleteCity(id){
      try {
        setIsLoading(true)
        await fetch(`${BASE_URL}/cities/${id }`, {
          method:'DELETE',
        })
      setCities((cities) => cities.filter((city) => city.id !== id))
      } catch {
        alert("there was an error deleting city.")
      } finally {
        setIsLoading(false)
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
