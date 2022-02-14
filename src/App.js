import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isRunning: true,
      position: null,
      interval: 0,
      intervalId: null,
      
      
    };
  }

  componentDidMount() {
    this.getCoordinates(1000);
  }

  handleClick = (interval) => {
    clearInterval(this.state.intervalId);
    this.setState({ interval: interval });
    this.setState({ isRunning: true }, () => this.getCoordinates(interval));
  };

  getCoordinates = (interval) => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      return;
    }
    const intervalId = setInterval(() => {
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response) => response.json())
        .then((data) => {
          let coordinates = [];
          coordinates.push(+data.latitude);
          coordinates.push(+data.longitude);
          this.setState({ position: coordinates});
        });
    }, interval);
    this.setState({ intervalId });
  };

  displayC() {
    if (this.state.position) {
      return (
        <div className="px-2 d-flex">
          <div className="py-4 w-25">
            <h2 className="py-2 text-center">
              Live location of the International Space Station
            </h2>

            <div className="p-3">
              <input
                className="mx-2"
                type="range"
                min="1"
                max="5"
                defaultValue="1"
                step="1"
                id="secondsRange"
                onChange={() => {
                  this.handleClick(
                    document.querySelector("#secondsRange").value * 1000
                  );
                }}
              />

              <div className="d-block">
                <button
                  disabled={this.state.isRunning}
                  className="d-sm-block btn btn-sm btn-primary py-1 mx-2"
                  onClick={() =>
                    this.handleClick(
                      document.querySelector("#secondsRange").value * 1000
                    )
                  }
                >
                  {this.state.isRunning
                    ? `Running at ${this.state.interval / 1000} interval`
                    : "Start"}
                </button>

                <button
                  disabled={!this.state.isRunning}
                  onClick={() => {
                    clearInterval(this.state.intervalId);
                    this.setState({ isRunning: false });
                  }}
                  className="d-sm-block btn btn-primary btn-sm py-1 mx-2 my-2"
                >
                  Stop
                </button>
              </div>
            </div>

            <div className="p-3">
              <h3>
                {this.state.isRunning
                  ? "Current location is:"
                  : "Last location was:"}{" "}
              </h3>
              <p>Latitude : "{+this.state.position[0]}"</p>
              <p>Longitude: "{+this.state.position[1]}"</p>
            </div>
          </div>
          <MapContainer
            className="rounded-3 border border-warning shadow-lg mx-5"
            center={this.state.position}
            zoom={5}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="text-primary bg-light my-1 mx-2 border rounded shadow py-4 text-center">
            Gps Tracker
          </h1>
        </header>
        <div className="d-flex justify-content-around">
          <div id="av-orbit"></div>
          <div id="av-orbit-48274"></div>
        </div>
        <div className="d-flex px-3 py-3 mb-2 h-fluid">{this.displayC()}</div>
        <footer className="d-flex bg-light mx-2 my-2 border rounded shadow justify-content-around py-3">
          <div>
            <h4>Resources</h4>
            <p>
              <a href="https://leafletjs.com/reference.html">Leaflet Docs</a>
            </p>
            <p>
              <a href="https://react-leaflet.js.org">React Leaflet</a>
            </p>
            <p>
              <a href="https://stackoverflow.com/search?q=react+leaflet">
                StackOverflow
              </a>
            </p>
            <p>
              <a href="http://api.open-notify.org/iss-now.json">
                ISS Location API
              </a>
            </p>
            <p>
              <a href="https://github.com/marin-stefan/Gps-Tracker.git">
                GitHub repository
              </a>
            </p>
          </div>
          <div>
            <h4>About me</h4>
            <h5>Marin Stefan Daniel</h5>
            <h6>&#9993; stefann06@yahoo.com</h6>
            <h6>&#9743; +40734576702</h6>
            <h6>
              Follow me on &nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://linkedin.com/in/marinstefan"
              >
                LinkedIn
              </a>
            </h6>
            <h6>
              I'm on &nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/marin-stefan"
              >
                GitHub
              </a>
            </h6>
            <h6>
              These are my &nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://marinstefan.herokuapp.com"
              >
                Projects
              </a>
            </h6>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;
