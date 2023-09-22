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

const Event = (props) => {
  const [eventData, setEventData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let [hasError,setError] = useState(false);
  let {id} = useParams();

  const formatDate = (showdate) => {
    var year = showdate.substring(0, 4);
    var month = showdate.substring(5, 7);
    var day = showdate.substring(8, 10);
    return month + '/' + day + '/' + year;
  };

  useEffect(() => {
    console.log('SHOW useEffect fired');
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=warSGkq8x1F6LCOY87TvxjzAZk1ysAlF&countryCode=US`);
        setEventData(data);
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
          title={eventData.name}
          sx={{
            borderBottom: '1px solid #1e8678',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={
            eventData.images && eventData.images[0]
              ? eventData.images[0].url
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
                {eventData && eventData.type ? (
                  <dd>{eventData.type}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Offical Site:</dt>
                {eventData && eventData.url ? (
                  <dd>
                    <a
                      rel='noopener noreferrer'
                      target='_blank'
                      href={eventData.url}
                    >
                      {eventData.name} Offical Site
                    </a>
                  </dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Date:</dt>
                {eventData.dates && eventData.dates.start ? (
                  <dd>{formatDate(eventData.dates.start.localDate)}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Time:</dt>
                {eventData.dates && eventData.dates.start ? (
                  <dd>{eventData.dates.start.localTime}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Category:</dt>
                {eventData.classifications && eventData.classifications[0].segment ? (
                  <dd>{eventData.classifications[0].segment.name}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Genres:</dt>
                {eventData.classifications && eventData.classifications[0].genre && eventData.classifications[0].subGenre ? (
                  <dd>{eventData.classifications[0].genre.name + ' / ' + eventData.classifications[0].subGenre.name}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Promter:</dt>
                {eventData &&
                eventData.promoter ? (
                  <dd>{eventData.promoter.name}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>PriceRange:</dt>
                {eventData &&
                eventData.priceRanges &&
                eventData.priceRanges[0] ? (
                  <dd>{ `$ ${eventData.priceRanges[0].min} - $ ${eventData.priceRanges[0].max}`}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Venues:</dt>
                {eventData &&
                eventData._embedded &&
                eventData._embedded.venues[0] ? (
                  <dd>
                    {eventData._embedded.venues[0].name + ', ' + eventData._embedded.venues[0].address.line1 + ', ' 
                    + eventData._embedded.venues[0].city.name + ', '+ eventData._embedded.venues[0].state.stateCode} 
                  </dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              {/* <p>
                <dt className='title'>Status:</dt>
                {eventData && eventData.status ? (
                  <dd>{eventData.status}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p> */}

              {/* <p>
                <dt className='title'>Genres:</dt>
                {eventData && eventData.genres && eventData.genres.length >= 1 ? (
                  <span>
                    {eventData.genres.map((genre) => {
                      if (eventData.genres.length > 1)
                        return <dd key={genre}>{genre},</dd>;
                      return <dd key={genre}>{genre}</dd>;
                    })}
                  </span>
                ) : (
                  <dd>N/A</dd>
                )}
              </p> */}
            </dl>
            {/* <Link to='/shows'>Back to all shows...</Link> */}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Event;