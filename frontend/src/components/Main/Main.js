import MainLayout from "../MainScreen/MainLayout";
import SettingsLayout from "../Settings/SettingsLayout";
import AboutLayout from "../About/AboutLayout";
import CustomLayout from "../Custom/CustomLayout";
import React from "react";
import { HashRouter, Route } from "react-router-dom";

export default function Main() {
  return (
    <HashRouter>
      <Route exact path="/" component={MainLayout}></Route>
      <Route exact path="/settings" component={SettingsLayout}></Route>
      <Route exact path="/about" component={AboutLayout}></Route>
      <Route exact path="/custom" component={CustomLayout}></Route>
    </HashRouter>
  );
}
