import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import  {Button} from './ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const goToPrev = () => emblaApi?.scrollPrev()
  const goToNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins().autoplay?.play()
  }, [emblaApi])

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>
      <ChevronRight className='absolute right-0 items-center' onClick={goToNext} />
      <ChevronLeft className='absolute left-0 items-center' onClick={goToPrev}/>
    </div>
  )
}