import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import SearchShows from './SearchShows';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
  } from '@mui/material';
import Error from './Error';

const VenuesList = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  const [b_disabled, setBDisable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  let [hasError,setError] = useState(false);
  let card = null;
  let page_player = useParams().page;

  const clickEvent = () => {
    setBDisable(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBDisable(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [b_disabled]);


  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?apikey=warSGkq8x1F6LCOY87TvxjzAZk1ysAlF&countryCode=US&page=${page_player}`);
        setShowsData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [page_player]);

    //search stuffff

    useEffect(() => {
      console.log('search useEffect fired');
      async function fetchData() {
        try {
          console.log(`in fetch searchTerm: ${searchTerm}`);
          const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?apikey=warSGkq8x1F6LCOY87TvxjzAZk1ysAlF&countryCode=US&keyword=${searchTerm}`);
          if(data._embedded){
            setSearchData(data);
            setLoading(false);
          }
           else{
            setSearchData(undefined);
          }
          
        } catch (e) {
          console.log(e);
        }
      }
      if (searchTerm) {
        console.log('searchTerm is set');
        fetchData();
      }
    }, [searchTerm]);
  
    const searchValue = async (value) => {
      setSearchTerm(value);
    };

  const buildCard = (event) => {
    return (
      <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={event.id}>
        <Card
          //variant='outlined'
          sx={{
            maxWidth: 350,
            height: 'auto',
            maxHeight:400,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop:5,
            boxShadow:
              '0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);',
            textDecoration: 'none'
          }}
        >
          <CardActionArea>
            <Link className='Link-for-eventcard' to={`/venues/${event.id}`}>
              <CardMedia
                sx={{
                  height: '250px',
                  width: '350px'
                }}
                component='img'
                image={
                  event.images && event.images[0]
                    ? event.images[0].url
                    : noImage
                }
                title='show image'
              />

              <CardContent>
                <Typography
                  sx={{
                    borderBottom: '1px solid #1e8678',
                    fontWeight: 'bold',
                    height:'60px',
                    textDecoration: 'none'
                  }}
                   gutterBottom
                  component='h3'
                >
                  {event.name.replace(regex, '').substring(0, 35).toString()}
                </Typography>
                {/* <Typography  component='h6' >
                <Icon component={EventNoteIcon}/>
                  {event.dates.start
                    ? '\u00A0' +event.dates.start.localDate
                    : 'No start date given'}
                </Typography>
                <Typography  component='h6' >
                <Icon component={PaidIcon}/>
                  {event.priceRanges
                    ? +event.priceRanges[0].min + ' - ' + event.priceRanges[0].max 
                    : 'No price Range given'}
                </Typography> */}
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };


  if(searchTerm){
    card =
    searchData &&
    searchData._embedded.venues.map((event) => {
      return buildCard(event);
    });
  }else{
    card =
    showsData &&
    showsData._embedded.venues.map((event) => {
      return buildCard(event);
    });
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if(hasError){
    return (<Error error={' 404 Not Found'}/>);   
  } else {
    return (
        <div className='main-div'>
          <SearchShows searchValue={searchValue} />
            {
              searchTerm ? 
              undefined : 
              <div className='page-div'>
                {page_player > 1 && (<Link to={`/venues/page/${Number(page_player) - 1}`}><button className='page_button' type='button' disabled={b_disabled} onClick={clickEvent}>previous</button></Link>)}
                <h2 className='page_indicator'>{page_player}</h2>
                {page_player < 49 && (<Link to={`/venues/page/${Number(page_player) + 1}`}><button className='page_button' type='button' disabled={b_disabled} onClick={clickEvent}>next</button></Link>)}
                <br></br>
                <br></br>
              </div>
            }

            <div>
                <Grid 
                    container 
                    spacing={1}
                    sx={{
                        flexGrow: 1,
                        flexDirection: 'row'
                    }}>
                    {card}
                </Grid>
            </div>
        </div>
    );
  }
}

export default VenuesList;