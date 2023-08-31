import Form from "../components/Form"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="color-white">
      <div className="login-form">
        <h1 onClick={() => navigate("/")} className="login-form__desc">Ispunite polja za prijavu!</h1>
        <div>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default Login