import { Button, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

import Checkbox from "@mui/material/Checkbox";
import { useFormContextValue } from "./FormProviderWrapper";
import { Controller } from "react-hook-form";
import { useTabContext } from "./TabForm";

const skillOptions: string[] = ["Java", "C++", "Python"];
function Interest() {
  const {
    control,
    formState: { errors },
  } = useFormContextValue();

  const handleChange = useTabContext();

  return (
    <div>
      <p>Select your skills</p>
      <Controller
        name="skills"
        control={control}
        defaultValue={[]} 
        render={({ field, fieldState: { error } }) => (
          <>
            <FormGroup>
              {skillOptions.map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={field.value.includes(skill)} 
                      onChange={(e) => {
                        const selectedSkills = field.value;
                        if (e.target.checked) {
                          field.onChange([...selectedSkills, skill]); 
                        } else {
                          field.onChange(
                            selectedSkills.filter((s: string) => s !== skill)
                          ); 
                        }
                      }}
                    />
                  }
                  label={skill}
                />
              ))}
            </FormGroup>
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleChange(2)}
      >
        Next
      </Button>
    </div>
  );
}

export default Interest;
