import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useCookies} from "react-cookie";

const App = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Homepage/>}/>
          {authToken && <Route path={"/onboarding"} element={<OnBoarding/>}/>}
          {authToken && <Route path={"/dashboard"} element={<Dashboard/>}/>}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
