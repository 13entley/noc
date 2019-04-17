import React from 'react';
import faker from 'faker';
import './EventStyle.css';
import EventDetail from "./EventDetail";
import EventsList from "./EventsList";
import moment from 'moment';
import NocHeader from "./NocHeader";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {},
            showMyComponent: false
        }
    }

    componentWillMount(){
        var events = [];

        for (let i = 0; i < 15; i++) {
            events.push({
                venue: faker.internet.email(),
                name: faker.name.findName(), // used for artist
                pic: faker.internet.avatar(50, 50),
                location: faker.address.city(),
                date: moment(faker.date.between('2019-04-02', '2019-04-12')).format('DD. MM. YYYY')
            });
            /*
            this.setState(prevState => ({
                events: [...prevState.events, event],
            }))
            */
        }

        var eventData = new Map(), eventDataUnsorted = new Map();

        events.forEach(event => {
            if (!eventDataUnsorted.has(event.date)) eventDataUnsorted.set(event.date, []);

            eventDataUnsorted.get(event.date).push(event);
        });

        console.log(eventDataUnsorted);
        console.log(eventDataUnsorted.keys());
        console.log(Array.from(eventDataUnsorted.keys()).sort((a, b) => {
            a = moment(a, 'DD. MM. YYYY');
            b = moment(b, 'DD. MM. YYYY');
            return a-b;
        }));

        Array.from(eventDataUnsorted.keys()).sort((a, b) => {
            a = moment(a, 'DD. MM. YYYY');
            b = moment(b, 'DD. MM. YYYY');
            return a-b;
        }).forEach(key => {
            eventData.set(key, eventDataUnsorted.get(key));
        });

        console.log(eventData);

        this.setState(prevState => ({
            events: eventData,
        }))
    }

    displayDetails(){
        this.setState({
            showMyComponent: this.state.showMyComponent
        })
    }

    /* create map of date to all events */

    renderEvents(event) {
        return (
            <div className="ui-items dark">
                {console.log('Creating event')}
                <div className="date">
                    <div className="item center">
                        <div className="img-container">
                            <img className="image artist" src={event.pic}/>
                        </div>
                        <div className="content">
                            <div className="header">{event.name}</div>
                            <div className="venue-location">
                                <div className="venue">neni chytry</div>
                                <div className="location">{event.location}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )


    }

    renderHeader(date, events) {
        let elements = [];
        events.forEach(event => {
            console.log(event);
            elements.push(this.renderEvents(event));
        });

        return (
            <div>
                <h3 className="date-header">{date}</h3>
                <hr/>
                {elements}
            </div>
        )
    }

    render() {
        let elements = [];
        this.state.events.forEach((events, date) => {
            console.log('date: ' + date);
            elements.push(this.renderHeader(date, events));
        });

        return (
            <div className="noc-body">
                <div className="noc-content">
                    <NocHeader />
                    <div>
                        {elements}
                    </div>
                </div>
            </div>
        )
    }



}

export default App;
