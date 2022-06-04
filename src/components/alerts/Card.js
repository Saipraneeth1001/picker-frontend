import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function OutlinedCard(props) {
  return (
    <Box sx={{ maxWidth: 275 }}>
       <Card variant="outlined">
        <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Alert Name or Alert Id
          </Typography>
          <Typography variant="h5" component="div">
          
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography> */}
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to = {{pathname: `${props.url}`}}>
            Take me to the Product
            </Link>
          </Button>
        </CardActions>
      </React.Fragment>
      </Card>
    </Box>
  );
}
