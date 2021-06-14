import MainLayout from "../MainScreen/MainLayout";
import SettingsLayout from "../Settings/SettingsLayout";
import AboutLayout from "../About/AboutLayout";
import React from 'react';
import { Switch, Route } from 'react-router-dom';


export default function Main() {
    return (
      <MainLayout />
      // <SettingsLayout />
      // <AboutLayout />


      //FIXME: ROUTES NOT WORKING

      // <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      //   <Route exact path='/' component={MainLayout}></Route>
      //   <Route exact path='/settings' component={SettingsLayout}></Route>
      //   <Route exact path='/about' component={AboutLayout}></Route>
      // </Switch>
    );
  }
