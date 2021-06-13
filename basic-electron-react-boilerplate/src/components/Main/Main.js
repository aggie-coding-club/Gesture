import MainLayout from "../MainScreen/MainLayout";
import SettingsLayout from "../Settings/SettingsLayout";
import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

class Hiya extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState((prev) => ({counter: prev.counter+1}))
  }

  render() {
    return(
      <button onClick={this.handleClick}>{this.state.counter}</button>    )
  }
}

export default function Main() {
    return (
      <SettingsLayout />
      // <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      //   <Route exact path='/' component={MainLayout}></Route>
      //   <Route exact path='/settings' component={SettingsLayout}></Route>
      // </Switch>
    );
  }
