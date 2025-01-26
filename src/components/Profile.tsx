import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React from "react";
import { useFormContextValue } from "./FormProviderWrapper";
import { Controller } from "react-hook-form";
import { useTabContext } from "./TabForm";

function Profile() {
  const {
    formState: { errors },
    control,
  } = useFormContextValue();

  const handleChange = useTabContext();

  console.log(errors);
  return (
    <Box className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <FormControl fullWidth className="!mb-6">
        <InputLabel htmlFor="name" className="!text-gray-700">
          Name
        </InputLabel>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  className="!mt-2 !border-gray-300 !shadow-sm !rounded-md"
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </>
            );
          }}
        />
      </FormControl>

      <FormControl fullWidth className="!mb-6">
        <InputLabel htmlFor="email" className="!text-gray-700">
          Email Address
        </InputLabel>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                {...field}
                id="email"
                type="email"
                className="!mt-2 !border-gray-300 !shadow-sm !rounded-md"
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth className="!mb-6">
        <InputLabel htmlFor="password" className="!text-gray-700">
          Password
        </InputLabel>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                {...field}
                id="password"
                type="password"
                className="!mt-2 !border-gray-300 !shadow-sm !rounded-md"
              />

              {error && <p className="text-red-500">{error.message}</p>}
            </>
          )}
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleChange(1)}
      >
        Next
      </Button>
    </Box>
  );
}

export default Profile;
