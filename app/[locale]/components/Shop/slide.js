import "../../customCss/base.css";
import "../../customCss/embla.css";
import "../../customCss/sandbox.css";
import EmblaCarousel from "../Carousel/EmblaCarousel";

export default function CustomSlide({ arr }) {
  return (
    <section className="sandbox__carousel w-[550px] max-[500px]:w-full ">
      <EmblaCarousel slides={arr} options={{}} />
    </section>
  );
}
