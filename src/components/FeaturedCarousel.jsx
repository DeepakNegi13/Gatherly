import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedCarousel({ event = [] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
	const goToPrev = () => emblaApi?.scrollPrev();
	const goToNext = () => emblaApi?.scrollNext();
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.plugins().autoplay?.play();
	}, [emblaApi]);

	return (
		<div className="embla relative">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{event.map((item) => (
						<div
							key={item._id}
							className="embla__slide min-h-[300px] rounded-3xl bg-cover bg-center bg-no-repeat"
							style={{
								backgroundImage: `url(${item.image})`,
							}}
							aria-label={item.title}
						/>
					))}
				</div>
			</div>
			<ChevronRight
				className="absolute right-0 top-1/2 size-10 text-background"
				onClick={goToNext}
			/>
			<ChevronLeft
				className="absolute left-0 top-1/2 size-10 text-background"
				onClick={goToPrev}
			/>
		</div>
	);
}
