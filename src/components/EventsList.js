import React from 'react';
import faker from 'faker';
import EventItem from "./EventItem";

const EventsList = ({ events }) =>{
    const renderedList = events.map((events) => {
        return <EventItem key={events.id} events={events}/>
    });
    //props.videos
    return <div className="ui inverted relaxed divided list">{renderedList}</div>
};

export default EventsList;