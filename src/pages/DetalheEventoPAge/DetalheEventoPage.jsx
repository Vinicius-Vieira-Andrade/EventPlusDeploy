import React, { useContext, useState } from "react";
import { useEffect } from "react";
import {useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import api, {
  commentaryEventResource,
  detailsEventResource,
  eventsResource,
} from "../../Services/Service";
import "./DetalheEventoPage.css";
import Spinner from "../../components/Spinner/Spinner";
import Container from "../../components/Container/Container";
import Table from "./TableDe/TableDe";
import Notification from "../../components/Notification/Notification";
import { UserContext } from "../../context/AuthContext";

const DetalheEventoPage = () => {
  //recupera o id do evento como parâmetro na URL
  const { idEvento } = useParams();
  // const {showSpinner, setShowSpinner} = useState(false)
  
  const [evento, setEvento] = useState([]);
  const [comentario, setComentario] = useState([]);
  const {userData} = useContext(UserContext);
  const [notifyUser, setNotifyUser] = useState({}); //Componente Notification

  useEffect(() => {
    async function buscaEventos() {
      try {
        if (userData.role === "Administrador") {
          const retorno = await api.get(`${eventsResource}/${idEvento}`);
          setEvento(retorno.data);
          console.log(retorno.data);
          const retorno2 = await api.get(`${commentaryEventResource}?id=${idEvento}`)
          setComentario(retorno2.data);
        }
        if (userData.role === "Comum") {
          const retorno2 = await api.get(`${commentaryEventResource}/ListarSomenteExibe`)
          setComentario(retorno2.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    buscaEventos();

    console.log(evento);
  }, [userData]); //frmEdit[instituicao ]

  return (
    <>
      <MainContent>
          <Title titleText={"Detalhes do evento"} />


        <section>
      
          {/* <p>IdEvento: {idEvento}</p> */}
          <label className="title">Evento</label>
          <p>{evento.nomeEvento}</p>

          <label className="title">Descrição</label>
          <p>{evento.descricao}</p>

          <label className="title">Data do evento</label>
          <p>{new Date(evento.dataEvento).toLocaleDateString()}</p>

        </section>

        <section className="lista-eventos-section">
          <Container>
            <Table dados={comentario} />
          </Container>
        </section>
      </MainContent>
      {/* CARD NOTIFICATION */}
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
    </>
  );
};
export default DetalheEventoPage;
