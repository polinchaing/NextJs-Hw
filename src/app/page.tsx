// import { AuthRequiredError } from "@/lib/exception";

import { CarouselDApiDemo } from "@/components/(landing)/carousel/CarouselComponent";
import { MarqueeDemo } from "@/components/(landing)/testimonial/TestimonialComponent";
import { HeroVideoDialogDemo } from "@/components/(landing)/VideoComponent/VideoComponent";

export default function Home() {

  // const session = null;

  // if(!session) throw new AuthRequiredError();

  return(
    <div>
       <CarouselDApiDemo/>
       {/* testimonial */}
       <MarqueeDemo/>
       {/* video  */}
       <HeroVideoDialogDemo/>
       
    </div>
   
    
  )
 
}
