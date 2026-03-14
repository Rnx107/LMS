import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      <section className="py-20 bg-[#0f172a]">
        <h2 className="text-center text-3xl font-bold text-white mb-10">
          Popular Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          <CourseCard
            title="Frontend Development"
            description="Learn frontend development from scratch"
            price={399}
            level="Medium"
            author="Hitesh Chaudhary"
            image="/images/frontend.jpg"
          />

          <CourseCard
            title="Backend Development"
            description="Learn backend development from scratch"
            price={599}
            level="Advance"
            author="Hitesh Chaudhary"
            image="/images/backend.jpg"
          />

          <CourseCard
            title="Full Stack Roadmap"
            description="Complete roadmap for web developers"
            price={799}
            level="Beginner"
            author="Hitesh Chaudhary"
            image="/images/fullstack.jpg"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
