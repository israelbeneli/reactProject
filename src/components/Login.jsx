import { useState } from "react";
import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import { Navigate, useNavigate } from "react-router-dom";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useFormik } from "formik";
import { authContext, useAuth } from "../context/auth.context";
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/;
export function LoginForm({redirect="/"}){
    const [error,setError]=useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [modePassword,setPasswordMode]=useState("password");
    function chengePasswordMode(){
        if(modePassword==="password"){
            setPasswordMode("text");
        }
        else{
            setPasswordMode("password");
        }
    }

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
          email: "",
          password: "",
        },
        validate: formikValidateUsingJoi({
          email: Joi.string()
            .min(6)
            .max(255)
            .required()
            .email({ tlds: { allow: false } })
            .label("Email"),
          password: Joi.string().regex(passwordRegex).required().label("Password"),
        }),
        async onSubmit(values) {
            try {
                await login(values);
                navigate("/My-cards");
            } catch ({ response }) {
              if (response && response.status === 400) {
                setError(response.data);
              }
            }
          },
    });
    if (user) {
        return <Navigate to="/" />;
        }
    return(
        <>
            <PageHeader title="Login To B.Cards" description="You can login wite regular acount or bissness acount"></PageHeader>
            <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          error={form.touched.email && form.errors.email}
        />
        <div className="input-grupe">
        <Input
          {...form.getFieldProps("password")}
          type={modePassword}
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />
        <i className={modePassword==="text"?"bi bi-eye-slash":"bi bi-eye"} onClick={()=>chengePasswordMode()}></i>
        </div>
    
        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </form>

        </>
    )
}