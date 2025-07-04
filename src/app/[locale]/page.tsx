// import { AuthRequiredError } from "@/lib/exception";

import { CarouselDApiDemo } from "@/components/(landing)/carousel/CarouselComponent";
import { MarqueeDemo } from "@/components/(landing)/testimonial/TestimonialComponent";
import { HeroVideoDialogDemo } from "@/components/(landing)/VideoComponent/VideoComponent";
// import { useTranslations } from "next-intl";
// import Link from "next/link";


// import { LinkComponent } from "@/components/ProfileComponent/ProfileComponent";

export default function HomePage() {
  // const session = null;

  // if(!session) throw new AuthRequiredError();
  // const t = useTranslations('HomePage');

  return (
    <div>
      <CarouselDApiDemo />
      {/* testimonial */}
      <MarqueeDemo />
      {/* video  */}
      <HeroVideoDialogDemo />

      {/* <Link href="/todo">Navigate to Todo</Link> */}
      {/* 
       <button className="bg-red-500 border p-4">
        Click to navigate Todo
        <Link href="/todo" prefetch={false}>Navigate to Todo</Link>
       </button> */}
      {/* <div>
        <h1>{t('title')}</h1>
        <Link href="/about">{t('about')}</Link>
      </div> */}
    </div>

  )


}
