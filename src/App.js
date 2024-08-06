import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EmailVerification from "./pages/emailverification/EmailVerification";
import ROUTES from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path={ROUTES.EMAIL_VERIFICATION}
          element={<EmailVerification />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
