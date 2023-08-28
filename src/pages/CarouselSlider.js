import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselSlider = () => {
  const [transforms, setTransforms] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTransforms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/transform/transforms');
        setTransforms(response.data);
      } catch (error) {
        console.error('Error fetching transforms:', error);
      }
    };

    fetchTransforms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % transforms.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, transforms.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/images/background2.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-10">
        <h1 className="font-roboto text-3xl text-center text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl border-black p-5">
          Client Success Story
        </h1>
        <Carousel
          showThumbs={false}
          selectedItem={activeIndex}
          onChange={(index) => setActiveIndex(index)}
          className="mt-6"
        >
          {transforms.map((transform, index) => (
            <div key={transform._id} className="w-full p-4 mx-auto ">
              <div className="mb-4 rounded-lg p-6 shadow-lg bg-transparent">
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 md:w-96 md:h-96 mr-4 md:mr-8 relative overflow-hidden border-yellow-500 border-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                    <div className="rounded-full overflow-hidden">
                      <img
                        className="w-full h-full rounded-full"
                        src={`http:/uploads/usersImages/${transform.imageBefore}`}
                        alt=""
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center text-yellow-500 text-lg font-semibold bg-black bg-opacity-50 opacity-100">
                        Before
                      </div>
                    </div>
                  </div>
                  <div className="w-64 h-64 md:w-96 md:h-96 ml-4 md:ml-8 relative overflow-hidden border-yellow-500 border-2 rounded-full transition-transform duration-300 transform hover:scale-110">
                    <div className="rounded-full overflow-hidden">
                      <img
                        className="w-full h-full rounded-full"
                        src={`http:/uploads/usersImages/${transform.imageAfter}`}
                        alt=""
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center text-yellow-500 text-lg font-semibold bg-black bg-opacity-50 opacity-100">
                        After
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[300px]">
                <p className="text-2xl text-white text-center ">{transform.descriptionTransform}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSlider;
