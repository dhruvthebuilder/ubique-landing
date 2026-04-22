import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import Plans from "@/components/Plans";
import Statement from "@/components/Statement";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Steps />
      <Plans />
      <Statement />
      <BookingForm />
      <Footer />
    </main>
  );
}
