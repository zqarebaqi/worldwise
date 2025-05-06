import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import Login from './pages/Login';
 import Homepage from "./pages/Homepage.jsx";
import AppLayout from './pages/AppLayout.jsx'
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const App = () => {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={<ProtectedRoute> <AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
