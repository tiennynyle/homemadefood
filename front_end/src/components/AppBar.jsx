
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {Button, Link} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpen2 = Boolean(anchorEl2);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        <Link href="/posts/mostpopular/1/2020/" >
   <MenuItem>January</MenuItem>
</Link>
<Link href="/posts/mostpopular/2/2020/" >
   <MenuItem>February</MenuItem>
</Link>

<Link href="/posts/mostpopular/3/2020/" >
   <MenuItem>March</MenuItem>
</Link>
<Link href="/posts/mostpopular/4/2020/" >
   <MenuItem>April</MenuItem>
</Link>
<Link href="/posts/mostpopular/5/2020/" >
   <MenuItem>May</MenuItem>
</Link>
<Link href="/posts/mostpopular/6/2020/" >
   <MenuItem>June</MenuItem>
</Link>
<Link href="/posts/mostpopular/7/2020/" >
   <MenuItem>July</MenuItem>
</Link>
<Link href="/posts/mostpopular/8/2020/" >
   <MenuItem>August</MenuItem>
</Link>
<Link href="/posts/mostpopular/9/2020/" >
   <MenuItem>September</MenuItem>
</Link>
<Link href="/posts/mostpopular/11/2020/" >
   <MenuItem>November</MenuItem>
</Link>
<Link href="/posts/mostpopular/12/2020/" >
   <MenuItem>December</MenuItem>
</Link>
    </Menu>
  );

  const renderMenu2 = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen2}
      onClose={handleMenuClose2}
    >
        <Link href="/posts/mostpopular/2020/" >
   <MenuItem>2020</MenuItem>
</Link>

    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            HomeMadeFood
          </Typography>
      
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Button className={classes.title} variant="h6" noWrap   style={{color: 'black' , background:'pink'}}  onClick={handleProfileMenuOpen}>
            Monthly Favorite
          </Button>
          <Link href="/posts/mostpopular/last3months/" ><Button className={classes.title} variant="h6" noWrap   style={{color: 'black' , background:'pink'}}  >
            Last 3 Months Favorite
          </Button></Link>
          <Button className={classes.title} variant="h6" noWrap   style={{color: 'black' , background:'pink'}}  onClick={handleProfileMenuOpen2}>
            Year's Favorite
          </Button>
       
          </div>
        
        </Toolbar>
      </AppBar>

      {renderMenu}
      {renderMenu2}

    </div>
  );
}