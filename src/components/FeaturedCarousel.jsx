import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
	ArrowRight,
	Calendar,
	ChevronLeft,
	ChevronRight,
	MapPin,
	Sparkles,
} from "lucide-react";
import { Button } from "@base-ui/react/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export function FeaturedCarousel({ events = [] }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true },
		[
			Autoplay({
				delay: 4000,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
				rootNode: (emblaRoot) => emblaRoot.parentElement,
			}),
		],
	);
	const scrollTo = (i) => {
		emblaApi.scrollTo(i);
	};

	const goToPrev = () => {
		emblaApi?.scrollPrev();
		emblaApi?.plugins().autoplay?.reset();
	};
	const goToNext = () => {
		emblaApi?.scrollNext();
		emblaApi?.plugins().autoplay?.reset();
	};
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on("select", () =>
			setSelectedIndex(emblaApi.selectedScrollSnap()),
		);
	}, [emblaApi]);

	return (
		<div className="relative group">
			{/* content of the carousal */}
			<div className="overflow-hidden rounded-3xl" ref={emblaRef}>
				<div className="flex">
					{events.map((event) => {
						const eventId = event._id || event.id;
						return (
							<div
								key={eventId}
								className="flex-[0_0_100%] min-w-0 relative aspect-video md:aspect-21/9 lg:aspect-24/9 max-h-125">
								{/* Background Image with warm rich gradient overlay */}
								<div className="absolute inset-0 bg-[#161513]">
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-full object-cover opacity-60 mix-blend-luminosity filter brightness-95"
									/>
									{/* Subtle editorial warm gradient */}
									<div className="absolute inset-0 bg-linear-to-t from-[#141312] via-[#141312]/60 to-transparent" />
									<div className="absolute inset-0 bg-linear-to-r from-[#141312] via-[#141312]/80 to-transparent" />
								</div>

								{/* Content Overlay */}
								<div className="relative h-full flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white max-w-3xl z-10">
									{/* content section */}
									<div className="space-y-3">
										{/* upper hero article  */}
										<div className="flex items-center gap-2 flex-wrap">
											{/* hero button */}
											<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E65100] text-white shadow-sm">
												<Sparkles className="w-3.5 h-3.5" />{" "}
												Featured Spotlight
											</span>
											{/* event name button */}
											{event.category?.name && (
												<Badge
													variant="outline"
													size="sm"
													className="text-stone-200 border-white/20 bg-white/10 backdrop-blur-sm px-2 py-3">
													{event.category.name}
												</Badge>
											)}
											{/* mode of event button */}
											<Badge variant="outline" size="sm" className="text-stone-200 px-2 py-3">
												{event.format === "online" ?
													"Online"
												: event.format === "hybrid" ?
													"Hybrid"
												:	"In-Person"}
											</Badge>
										</div>
										{/* main event name */}
										<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
											<Link
												to={`/events/${event.slug || eventId}`}
												className="hover:underline hover:pointer underline-offset-4 decoration-[#E65100]">
												{event.title}
											</Link>
										</h2>
										{/* Event description */}
										<p className="text-sm sm:text-base hover:underline underline-offset-4 text-stone-300 line-clamp-2 max-w-2xl font-normal leading-relaxed">
											{event.description}
										</p>
										{/* date and place */}
										<div className="flex items-center gap-5 pt-2 text-xs sm:text-sm text-stone-300 font-medium flex-wrap">
											<span className="flex items-center gap-1.5 text-orange-300 font-semibold">
												<Calendar className="w-4 h-4" />
												{/* {formatEventDate(event.startDate)} */}
												{event.startDate}
											</span>
											<span className="flex items-center gap-1.5 text-stone-300">
												<MapPin className="w-4 h-4 text-stone-400" />
												{event.venue}, {event.city}
											</span>
											<span className="flex items-center gap-1.5 font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
												{/* {formatPrice(event.price, event.currency)} */}
												{event.price}
											</span>
										</div>
										{/* buttons */}
										<div className="pt-3 flex items-center gap-3">
											{/* arrow button and first link */}
											<Link
												to={`/events/${event.slug || eventId}`}>
												<Button
													variant="primary"
													size="md"
													className="gap-2 shadow-lg flex items-center flex-row justify-center">
														<ArrowRight className="w-4 h-4" />
													<span className="text-ink-50">
														Explore Experience
													</span>
													
												</Button>
											</Link>
											{/* register button */}
											{	
												<Button
													variant="secondary"
													size="md"
													className="bg-white/20 border-white/30 text-ink-50 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-2xl">
													Quick Register
												</Button>
											}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{/* left arrow button */}
			<button
				onClick={goToPrev}
				aria-label="Previous slide"
				className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer backdrop-blur-sm">
				<ChevronLeft className="w-6 h-6" />{" "}
			</button>
			{/* right arrow button */}
			<button
				onClick={goToNext}
				aria-label="Next slide"
				className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer backdrop-blur-sm">
				<ChevronRight className="w-6 h-6" />
			</button>
			{/* dots for changing the image from any index  */}
			<div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
				{events.map((_, i) => (
					<button
						key={i}
						onClick={() => scrollTo(i)}
						className={`transition-all rounded-full ${
							i === selectedIndex ?
								"w-6 h-2 bg-[#E65100]"
							:	"w-2 h-2 bg-white/50 hover:bg-white/80"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
export default FeaturedCarousel;
