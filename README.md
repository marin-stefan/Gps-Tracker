# JavaScript Advanced - REACT - Gps-Tracker project

## Contains

#### 1. Header

#### 2. SideBar

#### 3. Map

#### 4. Footer

## Description

This is a small project that fetches a location (long/lat) of the International Space Station from a free API at http://api.open-notify.org/iss-now.json. With that data it renders to the screen a Map of the World with the current location of the ISS. 
It is a SPA displaying a Header with a title, a main section and a footer.
The Main section is divided into a SideBar with a range selector and two buttons for options to the left and a content with the map to the right. The position on the map refreshes according to the user's choosing between 1-5 seconds. The map is displayed using Leaflet package. The footer contains useful links to the resources needed for this project, the GitHub repository for the project as well as information about the developer.

Update: To avoid issues for http calls over https i changed the API to : "https://api.wheretheiss.at/v1/satellites/25544"



## Requirements were :


* Start by creating a new React Project.

* Add a header with a title.

* Add a main section to house the SideMenu and the Map.

* Add a Footer with useful information.

* On loading fetch data from http://api.open-notify.org/iss-now.json
* Edit-Changed API to : https://api.wheretheiss.at/v1/satellites/25544

* Add a range slider with values as you wish for the refresh interval.

* Add two buttons to start and to stop refreshing the map.

* Add Leaflet to the project.

* Render the map with the Location of the ISS live on the Main section with a standard refresh rate.

* Add a color input button to change the background color of the window, set the initial background to white.

* Add styling and structural design for more user-friendly experience.

* Deploy the project to your Github account.
