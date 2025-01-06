import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './gallerySwiperCustom.css';

import { Dialog } from '@headlessui/react';
import logo from '../../../../public/logo.webp';

const SettingPageGoChasseGallery = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  const illustrationOne =
    userData.status_photo_illustrataion_one === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_one}` : logo;
  const illustrationtwo =
    userData.status_photo_illustrataion_two === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_two}` : logo;
  const illustrationthree =
    userData.status_photo_illustrataion_three === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_three}` : logo;

  return (
    <section className="w-7/12 h-72 flex justify-center items-center">
      <div className="flex justify-around gap-4">
        <button type="button" onClick={() => setIsDialogOpen(true)} className="h-60 rounded-2xl object-cover max-w-[30%] focus:outline-none">
          <img src={illustrationOne} alt="Illustration 1" className="h-full w-full object-fit rounded-2xl" />
        </button>
        <button type="button" onClick={() => setIsDialogOpen(true)} className="h-60 rounded-2xl object-cover max-w-[30%] focus:outline-none">
          <img src={illustrationtwo} alt="Illustration 2" className="h-full w-full object-fit rounded-2xl" />
        </button>
        <button type="button" onClick={() => setIsDialogOpen(true)} className="h-60 rounded-2xl object-cover max-w-[30%] focus:outline-none">
          <img src={illustrationthree} alt="Illustration 3" className="h-full w-full object-fit rounded-2xl" />
        </button>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        className="relative z-10"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="button"
          tabIndex={0}
          onClick={() => setIsDialogOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsDialogOpen(false);
            }
          }}
        >
          <div
            className="bg-white rounded-lg w-11/12 max-w-3xl h-[530px] p-4"
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          >
            <button type="button" onClick={() => setIsDialogOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="w-full h-[500px]"
              keyboard={{ enabled: true, onlyInViewport: false }}
            >
              <SwiperSlide className="flex justify-center items-center">
                <img src={illustrationOne} alt="Illustration 1" className="h-full rounded-2xl object-contain px-5" />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <img src={illustrationtwo} alt="Illustration 2" className="h-full rounded-2xl object-contain" />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <img src={illustrationthree} alt="Illustration 3" className="h-full rounded-2xl object-contain" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default SettingPageGoChasseGallery;
