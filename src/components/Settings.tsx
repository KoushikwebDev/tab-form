import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useFormContextValue } from "./FormProviderWrapper";
import { Controller } from "react-hook-form";

function Settings() {
  const {
    control,
    formState: { errors },
  } = useFormContextValue();
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Theme</FormLabel>
        <Controller
          name="theme"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="light"
                {...field}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label="Light"
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label="Dark"
                />
              </RadioGroup>
              {error && <p className="text-red-500">{error.message}</p>}
            </>
          )}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full !mt-4"
      >
        Submit
      </Button>
    </div>
  );
}

export default Settings;
