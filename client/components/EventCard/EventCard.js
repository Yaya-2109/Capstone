import React from "react";

import { Link } from "react-router-dom";
import { removeEvent } from "../../store/itinerary";

const EventCard = (props) => {
  return (
    <div className="border-t-0 border-r-2 border-l-2 border-b-2 my-1 grid grid-cols-12 bg-white filter drop-shadow-md">
      <div className="col-span-2">
        <img src={props.imageUrl} className="h-full w-full object-cover" />
      </div>
      <div className="col-span-10 mx-3 p-1">
        <div className="flex justify-between">
          <p className="text-xs font-bold">{props.name}</p>
          {/* removeEvent needs accurate arguments */}
          <span onClick={() => removeEvent(itineraryId, eventId)}>X</span>
        </div>
        <p className="text-xs">{props.location}</p>
        <p className="text-xs">{props.description}</p>

        <img
          src={props.attendees}
          className="mt-4 mb-2 flex rounded-full h-8 w-8"
        ></img>
      </div>
      <button></button>
    </div>
  );
};

export default EventCard;
