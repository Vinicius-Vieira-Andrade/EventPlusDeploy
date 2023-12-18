import React from "react";
import "./PreviousEvents.css";


import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Link } from "react-router-dom";

const PreviousEvents = ({ title, description, eventDate, idEvento }) => {
  
  
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

    
      <Link className="event-card__connect-link"
        to={`/detalhe-evento/${idEvento}`}
      >
        Detalhes
      </Link>
    </article>
  );
};

export default PreviousEvents;