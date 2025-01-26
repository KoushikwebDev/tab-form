import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Profile from "./Profile";
import { Inter } from "next/font/google";
import Interest from "./Interest";
import Settings from "./Settings";
import { useFormContextValue } from "./FormProviderWrapper";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
type HandleChangeType = (value: number) => void;

const TabContext = React.createContext<HandleChangeType>(() => {});

export const useTabContext = () => React.useContext(TabContext);

export default function TabForm() {
  const [value, setValue] = React.useState(0);

  const handleChange = ( newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      name: "Profile",
      component: <Profile />,
    },
    {
      name: "Interest",
      component: <Interest />,
    },
    {
      name: "Settings",
      component: <Settings />,
    },
  ];

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useFormContextValue();

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Form submitted");
    reset();
  };

  const onError = async () => {
    const isValid = await trigger();
    console.log(isValid);
    console.log(errors);
    if (errors?.name) {
      setValue(0); // Switch to the first tab if there's an error in name
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            handleChange(newValue);
          }}
          aria-label="basic tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Interest" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {tabs.map((tab, index) => {
          return (
            <CustomTabPanel key={tab.name} value={value} index={index}>
              <TabContext.Provider value={handleChange}>
                {tab.component}
              </TabContext.Provider>
            </CustomTabPanel>
          );
        })}
      </form>
    </Box>
  );
}
