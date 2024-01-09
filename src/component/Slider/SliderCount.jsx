import { message } from "antd";
import { useEffect, useState } from "react";
import Sliders from "./Slider";

const SliderCount = () => {
  const [sliderCount, setSliderCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/slider/getactive`);

        if (response.ok) {
          const data = await response.json();
          setSliderCount(data.length);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSlider();
  }, [apiUrl]);
  return <div>{<Sliders count={sliderCount} />}</div>;
};

export default SliderCount;
