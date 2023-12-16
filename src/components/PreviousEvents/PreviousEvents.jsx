import React from "react";
import "./PreviousEvents.css";
import api, { eventsResource } from "../../Services/Service";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Link, useParams } from "react-router-dom";

const PreviousEvents = ({ title, description = "", eventDate = "", idEvent }) => {
  const eventoo = {};
  const {idEvento} = useParams();

  async function getEvento(){
    const promise = api.get(eventsResource + "/" + idEvent);
    eventoo = promise.data;
  }

  function conectar(idEvent) {
    // dá pra usar a prop idEvent? testar
    alert(`Chamar o recurso para conectar: ${idEvent}`);
  }
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

    
      <Link className="event-card__connect-link"
        to={`/detalhe-evento/${idEvento}`}
        // state={eventoo}
      >
        Detalhes
      </Link>
    </article>
  );
};

export default PreviousEvents;