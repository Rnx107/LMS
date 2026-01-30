const Navbar = () => {
  return (
    // 'fixed' or 'sticky' keeps it at the top while scrolling
    <nav className="w-full bg-[#0f172a] text-white py-4 px-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO AREA */}
        <div className="flex items-center space-x-2">
          <a href="#">
            <span className="text-xl font-bold no-underline">LMS</span>
          </a>
        </div>

        {/* MENU LINKS (Hidden on small screens, flex on medium+) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition no-underline font-bold"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition no-underline font-bold"
          >
            Courses
          </a>
          <a
            href="/Login"
            className="text-gray-300 hover:text-white transition no-underline font-bold"
          >
            Login
          </a>
          <a
            href="/Signup"
            className="text-gray-300 hover:text-white transition no-underline font-bold"
          >
            Signup
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
