import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import BudgetMenu from './BudgetMenu';

import { update } from '../services/withUser';
import "../styles/style.css";

const Navbar = (props) => {
  const { user } = props;
  const username = user ? user.username : null;
  const handleLogIn = () => {
    props.history.push('/login');
  };
  const handleLogOut = () => {
    axios.delete('/api/auth')
      .then(() => {
        // unsets the currently logged in user. all components wrapped in withUser
        // will be updated with a null user and rerender accordingly
        update(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTableNav = () => {
    props.history.push('/budget');
  }

  const handleHomeNav = () => {
    props.history.push('/');
  }

  const handleNotFoundNav = () => {
    props.history.push('/notfoundpage');
  }

  const handleSearchNav = () => {
    props.history.push('/scraper');
  }

  const handleSavedNav = () => {
    props.history.push('/scraper/saved');
  }

  return (
    <AppBar 
      title="BLIMP - Budget Line Item Management Program"
      
      style={{
        margin: '0 auto',
        border: '2px solid rgb(1,1,62)',
        backgroundColor: 'rgb(1,1,62)',
      }}

      showMenuIconButton={true}

      iconElementLeft={user ?
        <BudgetMenu username={username} tableNav={handleTableNav} homeNav={handleHomeNav} notFoundNav={handleNotFoundNav}
        searchNav={handleSearchNav} savedNav={handleSavedNav}/>
        : <div/>}

      // Icon and drop down for current logged in user and logout option.
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={handleLogOut} />
        : <LoginButton onClick={handleLogIn} />}
    />
  )
};

export default withRouter(Navbar);
