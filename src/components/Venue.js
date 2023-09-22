import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import '../App.css';
import Error from './Error';

const Venue = (props) => {
  const [venueData, setVenueData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let [hasError,setError] = useState(false);
  let {id} = useParams();

  useEffect(() => {
    console.log('SHOW useEffect fired');
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${id}?apikey=warSGkq8x1F6LCOY87TvxjzAZk1ysAlF&countryCode=US`);
        setVenueData(data);
        setLoading(false);
      } catch (e) {
        //console.log(e);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [id]);  

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if(hasError){
    return (<Error error={' 404 Not Found'}/>);   
  }else {
    return (
      <Card
        variant='outlined'
        sx={{
          maxWidth: 600,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop:5,
          marginBottom: 10,
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
        <CardHeader
          title={venueData.name}
          sx={{
            borderBottom: '1px solid #1e8678',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={
            venueData.images && venueData.images[0]
              ? venueData.images[0].url
              : noImage
          }
          title='show image'
        />

        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='span'
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}
          >
            <dl>
              <p>
                <dt className='title'>Type:</dt>
                {venueData && venueData.type ? (
                  <dd>{venueData.type}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Offical Site:</dt>
                {venueData && venueData.url ? (
                  <dd>
                    <a
                      rel='noopener noreferrer'
                      target='_blank'
                      href={venueData.url}
                    >
                      {venueData.name} Offical Site
                    </a>
                  </dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              {/* <p>
                <dt className='title'>Date:</dt>
                {venueData.dates && venueData.dates.start ? (
                  <dd>{formatDate(venueData.dates.start.localDate)}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p> */}
              <p>
                <dt className='title'>Address</dt>
                {venueData.address && venueData.city && venueData.state && venueData.postalCode? (
                  <dd>{venueData.address.line1 + ', ' + venueData.city.name + ', ' 
                  + venueData.state.stateCode + ', '+ venueData.postalCode}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Upcoming Events:</dt>
                {venueData.upcomingEvents && venueData.upcomingEvents._total? (
                  <dd>{venueData.upcomingEvents._total}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
            </dl>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Venue;