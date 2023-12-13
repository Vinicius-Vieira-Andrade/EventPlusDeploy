import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import api, {
  detailsEventResource,
  eventsResource,
} from "../../Services/Service";
import "./DetalheEventoPage.css";
import Spinner from "../../components/Spinner/Spinner";

const DetalheEventoPage = () => {
  //recupera o id do evento como parâmetro na URL
  const { idEvento } = useParams();
  // const {showSpinner, setShowSpinner} = useState(false)
  const [evento, setEvento] = useState([]);

  useEffect(() => {
    async function buscaEventos() {
      try {
        const retorno = await api.get(`${eventsResource}/${idEvento}`);
        setEvento(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log(error);
      }
    }

    buscaEventos();

    console.log(evento);
  }, [idEvento]); //frmEdit[instituicao ]

  return (
    <MainContent>
      <section>
        <Title titleText={"Detalhes do evento"} />

        {/* <p>IdEvento: {idEvento}</p> */}
        <p>Título: {evento.nomeEvento}</p>
        <p>Descrição: {evento.descricao}</p>
        <p>Data do evento: {evento.dataEvento}</p>
        <p></p>
      </section>
    </MainContent>
  );
};
export default DetalheEventoPage;
