import MainLayout from "../MainScreen/MainLayout";
import SettingsLayout from "../Settings/SettingsLayout"
import { Switch, Route } from 'react-router-dom';

export default function Main() {
    return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={MainLayout}></Route>
        <Route exact path='/settings' component={SettingsLayout}></Route>
      </Switch>
    );
  }
