import React, { createContext, useContext } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormContext = createContext<any>(null);

export const useFormContextValue = () => useContext(FormContext);


const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  skills : yup.array().required("Please select at least one skill").min(1, "Please select at least one skill"),
  theme : yup.string().required("Please select a theme")
});

const generateDefaultValues = () => {
  return {
    name: "",
    email: "",
    password: "",
    skills : [],
    theme : ""
  };
}
interface Props {
  children: React.ReactNode
}
function FormProviderWrapper({ children }: Props) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: generateDefaultValues(),
    mode : "onSubmit",
    
  });

  return (
    <div>
      <FormContext.Provider value={methods}>
        <FormProvider {...methods}>{children}</FormProvider>
        {/* {children} */}
      </FormContext.Provider>
    </div>
  )
}


export default FormProviderWrapper;