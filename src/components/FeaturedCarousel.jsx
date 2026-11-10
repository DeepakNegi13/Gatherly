import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export function FeaturedCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
	const [carousalData, setCarousalData] = useState("");
	const goToPrev = () => emblaApi?.scrollPrev();
	const goToNext = () => emblaApi?.scrollNext();

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.plugins().autoplay?.play();
	}, [emblaApi]);
	const fetchimg = async function () {
		const data = await axios.get(
			"https://eventsphere-server-mfdb.onrender.com/api/events/featured",
		);
		console.log(data);
		setCarousalData(data);
	};
	useEffect(() => {
		fetchimg();
	}, []);

	return (
		<div className="embla relative">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					<div className="embla__slide">Slide 1</div>
					<div className="embla__slide">Slide 2</div>
					<div className="embla__slide">Slide 3</div>
				</div>
			</div>
			<ChevronRight
				className="absolute right-0 items-center"
				onClick={goToNext}
			/>
			<ChevronLeft
				className="absolute left-0 items-center"
				onClick={goToPrev}
			/>
		</div>
	);
}
