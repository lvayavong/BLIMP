import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreHeadIcon from 'material-ui/svg-icons/navigation/menu';

const BudgetMenu = (props) => {
  const { onLogOut, tableNav, homeNav, notFoundNav, searchNav, savedNav, username, ...otherProps } = props;
  return (
    <IconMenu
      {...otherProps}
      iconButtonElement={
        <IconButton><MoreHeadIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    >
      <MenuItem primaryText="Homepage" onClick={homeNav}/>
      <MenuItem primaryText="Tablepage" onClick={tableNav}/>
      <MenuItem primaryText="Searchpage" onClick={searchNav}/>
      <MenuItem primaryText="Savedpage" onClick={savedNav}/>
      <MenuItem primaryText="NotFoundpage" onClick={notFoundNav}/>
    </IconMenu>
  )
};

export default BudgetMenu;
