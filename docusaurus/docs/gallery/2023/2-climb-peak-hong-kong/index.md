# 夜行香港太平山顶

import '@site/src/css/slider.css';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';

export default function App() {
  return <ImageSlider slides={SliderData} />;
}
