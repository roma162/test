import { useState } from "react";
import { useMediaQuery, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { FormControl, MenuItem, Select, InputLabel} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Dropzone from "react-dropzone";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    role: yup.string().required("required"),
    location: yup.string().required("required"),
    picture: yup.string().required("required"),
    email: yup.string().email("invalid email").required(""),
    password: yup.string().required(""),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    role: "",
    location: "",
    picture: "",
    email: "",
    password: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [showOption, setShowOption] = useState(false);
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [test, setTest] = useState("");
    let [loading, setLoading] = useState(false);

    const cregister = (values ) => {
        if (pageType === "register") {
            if(values.firstName === undefined) toast.error('Molimo unesite ime!');    
            if(values.lastName === undefined) toast.error('Molimo unesite prezime!');
            if(values.role === undefined) toast.error('Molimo unesite vrstu računa!');
            if(values.location === undefined) toast.error('Molimo unesite odakle ste!');
            if(values.picture === undefined) toast.error('Molimo odaberite sliku profila!');
            if(values.email === undefined || values.email === "") toast.error('Molimo odaberite postojeći email!');
            if(values.password === undefined || values.password === "") toast.error('Molimo odaberite lozinku računa!');
        } 
    }
    
    const testImg = (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64Image = reader.result;
              setTest(base64Image)
              console.log("base", base64Image)
            }
            reader.readAsDataURL(file);
        }
        console.log("test", test)
    }
    
    const register = async (values, onSubmitProps) => {
        console.log(test)
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        formData.append("picturePath", test);

        const savedUserResponse = await fetch(
          "https://tripplanner-zavrsni.onrender.com/auth/register",
          {
            method: "POST",
            body: formData,
          }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        
        if (savedUser && test !== "") {
          setPageType("login");
          toast.success('Uspješno ste registrirani, prijavite se!');
          setTest("");
        }   
    };

    const login = async (values, onSubmitProps) => {
        setLoading(true);
        const loggedInResponse = await fetch("https://tripplanner-zavrsni.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        } else {
            navigate("/login");
        }
        if(loggedIn.msg === "Incorrect password.") {
            navigate("/login");
            toast.error('Pogrešna lozinka!');
        }
        if(loggedIn.msg === "Incorrect email.") {
            navigate("/login");
            toast.error('Pogrešan email!');
        }
        setLoading(false);
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };
    
    return (
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form" sx={{"& < div": { gridColumn : isNonMobile ? undefined : "span 4" }}}>
                    
                        {isRegister && (
                            <>
                                <TextField 
                                    label="Ime"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName || ''}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                         
                                <TextField 
                                    label="Prezime"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName || ''}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            <Tooltip title="Recenzent - Preporučuje lokacije za posjetiti u svome gradu, 
                                            Putnik - Posjećuje grad i traži preporuke za posjetu" placement="top-start">
                                <FormControl sx={{ gridColumn: "span 4" }}>
                                    <InputLabel id="demo-simple-select-label">Putnik ili Recenzent?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="role"
                                        value={values.role || ''}
                                        label="Role"
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (e.target.value === "Recenzent") setShowOption(true);
                                            else setShowOption(false);
                                        }}
                                    >
                                        <MenuItem value={"Recenzent"}>Recenzent</MenuItem>
                                        <MenuItem value={"Putnik"}>Putnik</MenuItem>
                                    </Select>
                                </FormControl>
                            </Tooltip>
                                {
                                showOption && <FormControl sx={{ gridColumn: "span 4" }}>
                                    <InputLabel id="demo-simple-select-label">Lokacija</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="location"
                                        value={values.location || ''}
                                        label="Location"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Zagreb"}>Zagreb</MenuItem>
                                        <MenuItem value={"Split"}>Split</MenuItem>
                                        <MenuItem value={"Dubrovnik"}>Dubrovnik</MenuItem>
                                        <MenuItem value={"Osijek"}>Osijek</MenuItem>
                                    </Select>
                                </FormControl>
                                }
                                {
                                 !showOption && <TextField 
                                    label="Odakle si?"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location || ''}
                                    name="location"
                                    sx={{ gridColumn: "span 4" }}
                                />
                                }
                                <div className="form__dropzone">
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                        setFieldValue("picture", acceptedFiles[0])
                                            testImg(acceptedFiles);
                                        }
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <div className="form__dropzone"
                                            {...getRootProps()}
                                            border={`2px dashed gray`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Dodaj sliku profila ovdje!</p>
                                            ) : (
                                            <div className="form__dropzone--edit">
                                                <span>{values.picture.name}</span>
                                                <div><i className='icons icons--edit icons--xsm mr-2'/></div>
                                            </div>
                                            )}
                                        </div>
                                        )}
                                    </Dropzone>
                                </div>
                                
                            </>
                        )}

                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField 
                            label="Lozinka"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </div>

                    <div>
                        <Button       
                            fullWidth
                            type="submit"
                            sx={{
                                backgroundColor: "#6C63FF",
                                color: "#fff",
                                padding: "0.8rem 0",
                                margin: "1rem 0",
                                "&:hover": { backgroundColor: "#4a43c1" }
                            }}
                            onClick={() => {
                                cregister(values)
                            }}
                        >
                            {isLogin ? "PRIJAVA" : "REGISTRACIJA"}
                            { loading === true ? <span className="loader" /> : null}
                        </Button>
                        <span
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            className="form__link"
                        >
                           {isLogin ? "Još nemaš račun? Registriraj se ovdje!" 
                                    : "Već imaš račun? Prijavi se ovdje!"} 
                        </span>
                    </div>
                </form>   
            )}
        </Formik>
    )
}

export default Form
