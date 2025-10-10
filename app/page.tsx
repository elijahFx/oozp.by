import Hero from '@/components/home/hero'
import Services from '@/components/home/services'
import Testimonials from '@/components/home/testimonials'
import CTA from '@/components/home/cta'
import RecentNews from '@/components/home/recent-news'
import Map from '@/components/home/map'
import ContactUs from '@/components/home/contactus'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <RecentNews />
      <ContactUs />
      <Map />
      <CTA />
    </>
  );
}