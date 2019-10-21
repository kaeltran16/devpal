import React from "react";
import { ThemeProvider } from "styled-components";
import { appTheme } from "./styles/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Landing } from "./components/Landing";
import { AppLayout } from "./commons/AppLayout";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            <Route exact path={"/"} component={Landing} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
