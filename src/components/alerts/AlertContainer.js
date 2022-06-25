import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AlertContainer = ({props}) => {

  return (
    <Card sx={{ maxWidth: 345, margin:5 }}>
      <CardContent sx = {{ backgroundColor:'', }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Your Limit: {props.limit}
        </Typography>
      </CardContent>
      <CardActions sx={{  }}>
        <Button size="small" variant = "contained" href={props.item.itemUrl}>Take me to the Product</Button>
        <Button size="small" variant = "contained" href={"/update/"+props.id}>Update</Button>
      </CardActions>
    </Card> 
  );
}

export default AlertContainer;