# React Ticketmaster API

## Overview

Welcome to the React Ticketmaster API Single Page Application project! This application is designed to provide a seamless experience for users interested in exploring events, attractions, venues, and more through the Ticketmaster API.

## Introduction

Our application leverages React, create-react-app, and React Router 6 to create an interactive and user-friendly experience. By integrating the Ticketmaster Discovery API, we offer access to a vast repository of event-related data right at your fingertips.

## Getting Started

### Obtain Your API Key

Before diving into the application, you'll need to obtain your own individual API key by registering for a free account on the Ticketmaster platform. Once you have your API key, insert it into the URL for Axios requests within the application. Ensure that you filter data to only include results found in the United States using the `countryCode` URL parameter.

For example, when querying events, your URL should look like this:

```bash
https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&countryCode=US
```

### Application Pages
## Home Page
The root directory of our application serves as an informative landing page. Here, you can discover the purpose of our site, explore details about Ticketmaster and its API, and even read about our favorite events and concerts. Get creative with this page!  
You'll also find links to essential sections of the application, including the Events Listing, Attractions Listing, and Venues Listing.  

## Events Listing
This route utilizes the Ticketmaster API to fetch and display a paginated list of events. The :page parameter determines which page of events to request. The application provides navigation buttons for moving between pages. If there are no more events on a particular page, the SPA will redirect to a 404 page.

## Event Details
This route provides comprehensive details about a single event. It works for every event in the API. If the event does not exist, the SPA redirects to a 404 page.

## Attractions Listing
Similar to the events listing, this route displays a paginated list of attractions using data from the Ticketmaster API. Again, the :page parameter controls the page requested. If no more attractions are available on a specific page, the SPA redirects to a 404 page.

## Attraction Details
Here, users can explore detailed information about a single attraction. Just like with events, this route works for every attraction in the API, and it handles cases where an attraction doesn't exist.

## Venues Listing
The venues listing route presents a paginated list of venues, making use of the :page parameter for page selection. A pagination UI is provided for ease of navigation. When there are no more venues on a page, the SPA redirects to a 404 page.

## Venue Details
This route offers in-depth information about a specific venue. It is designed to work for every venue in the Ticketmaster API, and it handles scenarios where a venue is not found.
