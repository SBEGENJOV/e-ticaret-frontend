import { useEffect, useState } from "react";
import "./Slider.css";
import SliderItem from "./SliderItem";
import PropTypes from "prop-types";
import { message } from "antd";

const Sliders = ({ count }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [slider, setSlider] = useState({});
  const [sliderRes, setSliderRes] = useState(false);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/slider/getactive`);

        if (response.ok) {
          const data = await response.json();
          setSliderRes(true);
          setSlider(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSlider();
  }, [apiUrl]);
console.log(count);
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % count);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + count) % count);
  };
  return (
    <section className="slider">
      <div className="slider-elements">
        {sliderRes && <>{<SliderItem imageSrc={slider[currentSlide]} />}</>}
        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        {/* <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => setCurrentSlide(0)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => setCurrentSlide(1)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => setCurrentSlide(2)}
          >
            <span></span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Sliders;

Sliders.propTypes = {
  count: PropTypes.number,
  sliderRes: PropTypes.array,
};
