import React, {Component} from 'react';

import MapContainer from './MapContainer.js';

class App extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">GPS Tracker</h1>
                </header>
                <div>
                    <MapContainer/>
                </div>
            </div>
        );
    }
}

export default App;
