import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import noImage from '../images/download.jpeg';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import BookIcon from '@mui/icons-material/Book';
import LanguageIcon from '@mui/icons-material/Language';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
    Icon
  } from '@mui/material';
import '../App.css';
import Error from './Error';
const Attraction = (props) => {
  const [attractionData, setAttractionData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let [hasError,setError] = useState(false);
  let {id} = useParams();

  // const formatDate = (showdate) => {
  //   var year = showdate.substring(0, 4);
  //   var month = showdate.substring(5, 7);
  //   var day = showdate.substring(8, 10);
  //   return month + '/' + day + '/' + year;
  // };

  useEffect(() => {
    console.log('Attraction - SHOW useEffect fired');
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions/${id}?apikey=warSGkq8x1F6LCOY87TvxjzAZk1ysAlF&countryCode=US`);
        setAttractionData(data);
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
          title={attractionData.name}
          sx={{
            borderBottom: '1px solid #1e8678',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={
            attractionData.images && attractionData.images[0]
              ? attractionData.images[0].url
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
                {attractionData && attractionData.type ? (
                  <dd>{attractionData.type}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Offical Site:</dt>
                {attractionData && attractionData.url ? (
                  <dd>
                    <a
                      rel='noopener noreferrer'
                      target='_blank'
                      href={attractionData.url}
                    >
                      {attractionData.name} Offical Site
                    </a>
                  </dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              {attractionData.externalLinks && (attractionData.externalLinks.youtube
              || attractionData.externalLinks.twitter || attractionData.externalLinks.wiki 
              || attractionData.externalLinks.homepage) ? (              
              <p>
                {/* <dt className='title'>YouTube:</dt> */}
                {attractionData.externalLinks && attractionData.externalLinks.youtube ? (
                  <dd>
                    <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href={attractionData.externalLinks.youtube[0].url}
                    >
                        {/* {attractionData.name} Offical Site */}
                        <Icon component={YouTubeIcon}/>
                </a></dd>
                ) : (
                  <dd></dd>
                )}
                {attractionData.externalLinks && attractionData.externalLinks.twitter ? (
                  <dd>
                    <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href={attractionData.externalLinks.twitter[0].url}
                    >
                        {/* {attractionData.name} Offical Site */}
                        <Icon component={TwitterIcon}/>
                </a></dd>
                ) : (
                  <dd></dd>
                )}
                {attractionData.externalLinks && attractionData.externalLinks.wiki ? (
                  <dd>
                    <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href={attractionData.externalLinks.wiki[0].url}
                    >
                        {/* {attractionData.name} Offical Site */}
                        <Icon component={BookIcon}/>
                </a></dd>
                ) : (
                  <dd></dd>
                )}
                {attractionData.externalLinks && attractionData.externalLinks.homepage ? (
                  <dd>
                    <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href={attractionData.externalLinks.homepage[0].url}
                    >
                        {/* {attractionData.name} Offical Site */}
                        <Icon component={LanguageIcon}/>
                </a></dd>
                ) : (
                  <dd></dd>
                )}
              </p>) : (<dd>No External Links</dd>)
              }
              <p>
                <dt className='title'>Genres:</dt>
                {attractionData.classifications && attractionData.classifications[0].genre && attractionData.classifications[0].subGenre ? (
                  <dd>{attractionData.classifications[0].genre.name + ' / ' + attractionData.classifications[0].subGenre.name}</dd>
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

export default Attraction;