"use client";
import { YMaps, Map, Placemark } from "react-yandex-maps";

export default function YandexMap() {


  const defaultState = {
    center: [53.910548, 27.529707], // Координаты ул. Амураторская 4, Минск
    zoom: 17,
  };

  return (
    <section className="relative w-full bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Как до нас добраться?
          </h2>
          <h3 className="text-xl text-muted-foreground">
            220004, г. Минск, ул. Амураторская, д. 4, каб. 209
          </h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 container mx-auto px-4">
        {/* Информационный блок */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/3">
          <h2 className="text-xl font-bold mb-2">
            Общество защиты потребителей
          </h2>
          <p className="text-gray-600 mb-4">
            Защита прав потребителей во всех сферах потребительского рынка
          </p>

          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              4.8 ★ (61 отзыв)
            </span>
            <span className="ml-2 text-gray-500">Закрыто до завтра</span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>220004, г. Минск, ул. Амураторская, д. 4, каб. 209</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+375 29 606-25-98</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Ближайшие районы:</h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Центр - 0.5 км</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Площадь Победы - 1.2 км</span>
              </li>
            </ul>
          </div>

          <a
            href="https://yandex.by/maps/?text=220004,+г.+Минск,+ул.+Амураторская,+д.+4,+каб.+209"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Открыть в Яндекс Картах
          </a>
        </div>

        {/* Карта */}
        <div className="w-full lg:w-2/3 h-[500px] rounded-lg overflow-hidden shadow-lg">
          <YMaps query={{ apikey: "b758d8a7-6b04-428a-8075-287f16ed6f8d" }}>
            <Map
              defaultState={defaultState}
              width="100%"
              height="100%"
              options={{
                suppressMapOpenBlock: true,
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
              <Placemark
                geometry={defaultState.center}
                properties={{
                  iconContent: "Мы здесь!",
                  hintContent: "Наш офис",
                }}
                options={{
                  preset: "islands#blueStretchyIcon",
                }}
              />
             
            </Map>
          </YMaps>
        </div>
      </div>
    </section>
  );
}
