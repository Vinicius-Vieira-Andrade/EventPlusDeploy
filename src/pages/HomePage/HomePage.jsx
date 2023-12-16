import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api, {
  oldEventResource,
  nextEventResource,
  eventsResource,
  previousEventResource,
} from "../../Services/Service";
import Notification from "../../components/Notification/Notification";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PreviousEvents from "../../components/PreviousEvents/PreviousEvents";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [previousEvent, setPreviousEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state
      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    async function getOldEvents() {
      try {
        const promise = await api.get(previousEventResource);
        const dados = await promise.data;
        console.log(dados);
        setPreviousEvents(dados);
      } catch (error) {
        console.log(error);
      }
    }

    getOldEvents(); //busca eventos anteriores
    getNextEvents(); //busca próximos eventos
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            <Swiper
              spaceBetween={20}
              slidesPerView={window.innerWidth > 992 ? 3 : 1}
              pagination={{ dynamicBullet: true, clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {nextEvents.map((e) => {
                return (
                  <SwiperSlide>
                    <NextEvent
                      key={e.idEvento}
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvent={e.idEvento}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <Title titleText={"Antigos Eventos"} />
          <div className="events-box">
            <Swiper
              spaceBetween={20}
              slidesPerView={window.innerWidth > 992 ? 3 : 1}
              pagination={{ dynamicBullet: true, clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {previousEvent.map((e) => {
                if (
                  new Date(e.dataEvento).toLocaleDateString() <
                  new Date().toLocaleDateString()
                ) {
                  return (
                    <SwiperSlide>
                      <PreviousEvents
                        key={e.idEvento}
                        title={e.nomeEvento}
                        description={e.descricao}
                        eventDate={e.dataEvento}
                        idEvent={e.idEvento}
                      />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
