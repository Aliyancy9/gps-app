import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react';
import axios from "axios";


const mapStyles = {
    width: '100%',
    height: '100%'
}


export class MapContainer extends Component {


    constructor() {
        super();
        this.lastUpdateDate = new Date();
        this.interval = {};
        this.state = {
            showingInfoWindow: false,
            selectedPlace: {},
            activeMarker: {},
            assets: {Items: []}
        }
    }


    onMarkerClick = (props, marker, e) => {
        console.log("onclickerer");
        return this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onClose = () => {
        return this.setState({
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false
        });
    };

    updateAssets = () => {
        axios.get('...')
            .then(response => {
                console.log("Getting data ...\n", response.data);
                this.setState({assets: response.data});
                this.render()
            });
    };

    componentWillMount() {
        this.updateAssets();
    }


    tick() {
        this.updateAssets();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    render() {

        console.log("in render");

        let markers = this.state.assets.Items.map((e, i) => {

            const marker = {
                position: {
                    lat: e.lat,
                    lng: e.lng
                }
            }


            return <Marker key={i} {...marker} dataAssetId={e.assetId} dataAssetType={e.assetType}
                           onClick={this.onMarkerClick}/>
        })


        let markerName = "";

        if (this.activeMarker) {
            if (this.activeMarker.dataName) {
                markerName = this.activeMarker.dataName;
            }
        }

        return (
            <Map items

                 google={this.props.google}

                 zoom={13}
                 style={mapStyles}
                 initialCenter=

                     {{//Sydney central station
                         lat: -33.8922,
                         lng: 151.1990
                     }
                     }>

                {markers}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>ID: {this.state.activeMarker.dataAssetId}</h1>
                        <h1>Type: {this.state.activeMarker.dataAssetType}</h1>
                    </div>
                </InfoWindow>

            </Map>


        );
    }
}


export default GoogleApiWrapper({
    apiKey: '...'
})(MapContainer);
