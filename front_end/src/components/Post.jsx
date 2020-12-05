import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Comment} from './Comment'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useHistory} from 'react-router-dom'
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    minHeight: 500
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function  Post ({data}) {

    const {category, availability, commentID, cuisine, foodName, photoURL, price, rating, sellerUsername, foodID} = data; 
    const history = useHistory()
  const classes = useStyles();

  const [url, setUrl ] = useState('')
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
      if (photoURL){
        let url = photoURL.split(',')[0]
        setUrl(url)
      }
 
  }, [data])
const handleOrder = () => {
  const username = localStorage.getItem("USERNAME");
  const data = {

    customerUsername : username,
    sellerUsername : sellerUsername,
    foodID: foodID,
    quantity :1
  }
      
  const url = "http://127.0.0.1:5000/order";

  fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
  }).then((res) => res.json())
  .catch((err) => {
      alert("Something is wrong please try again" + err)
  })

}
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {sellerUsername[0]}
          </Avatar>
        }
      
        title={sellerUsername }
        onClick={() => history.push(`/users/${sellerUsername}/posts`) }
      />
      <CardMedia
        className={classes.media}
        image={url}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            Availability : {availability} 
            <br/>
            Category: {category}
            <br/>
            Cuisine: {cuisine}
            <br/>
            Name: {foodName}
            <br/>
            Price: ${price}
            <br/>
            Rating : {rating}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button style={{color:'white', background:'red'}} onClick={handleOrder}>
          Order
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
       
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Comment comments={commentID} foodID={foodID}/>
        </CardContent>
      </Collapse>
    </Card>
  );
}