
const Hero = () => {
  return (
    <section className="bg-[#0f172a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* LEFT SIDE: Text Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Explore Our <span className="text-blue-500">140+</span> <br />
            Online courses for all
          </h1>
          <p className="text-gray-400 text-lg">
            Learn new skills with top mentors. Hands-on projects, peer support, and job-ready tracks.
          </p>          
        </div>

        {/* RIGHT SIDE: The Image */}
        <div className="relative">
          <img 
            src="src/assets/entrepreneurs-meeting-office.jpg" 
            alt="Student studying" 
            className="rounded-2xl w-full h-125 object-cover shadow-2xl"
          />
          
          {/* Floating Badge (Like the "184+" in your photo) */}
          <div className="absolute top-10 -left-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hidden lg:block">
            <p className="text-2xl font-bold">184+</p>
            <p className="text-xs text-gray-300">Certified Students</p>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Hero;