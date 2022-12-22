import { createContext , useState, useContext} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("");



    const weathers = {weather, setWeather,city, setCity}
    return (<ThemeContext.Provider value={weathers}>{children}</ThemeContext.Provider>)
}

export const useVars = () => useContext(ThemeContext);