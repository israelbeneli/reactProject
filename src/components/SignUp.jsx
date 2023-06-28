import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import Joi from "joi";
import { createUser } from "../services/usersService";
import Input from "../common/input";
import PageHeader from "../common/pageHeader";
import { useFormik } from "formik";
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/;
export function SignUp({redirect="/Sing-in"}){
    const [error,seterror]=useState("");
    const [modePassword,setPasswordMode]=useState("password");
    function chengePasswordMode(){
        if(modePassword==="password"){
            setPasswordMode("text");
        }
        else{
            setPasswordMode("password");
        }
    }
    const [biz,setIsBiz]=useState(false);
    const navigate = useNavigate();
    const form = useFormik({
        validateOnMount: true,
        initialValues: {
          email: "",
          password: "",
          name: "",
          biz:false,
        },
        validate: formikValidateUsingJoi({
          name: Joi.string().min(2).max(255).required().label("Name"),
          email: Joi.string()
            .min(6)
            .max(255)
            .required()
            .email({ tlds: { allow: false } })
            .label("Email"),
          password: Joi.string().regex(passwordRegex).required().label("Password"),
          biz:Joi.required().label("To bissnes user")
        }),
        async onSubmit(values) {
          try {
            if(!biz){
                console.log(values)
                await createUser({ ...values, biz: false });
                navigate(redirect);
            }else{
                await createUser({ ...values, biz: true });
                navigate(redirect);
            }
          } catch ({ response }) {
            if (response && response.status === 400) {
              seterror(response.data);
            }
          }
        },
      });


      return(<>
       <PageHeader
        title="Sign Up with B.Cards App"
        description="You can singup free or bisness"
      />

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
        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          required
          error={form.touched.name && form.errors.name}
        />
        <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
        <label className="btn btn-outline-primary" htmlFor="btncheck1" onClick={()=>setIsBiz(!biz)}>Bisnness User</label>


        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
      </>)
}