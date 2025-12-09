import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <header className="py-6 border-b border-gray-300 font-serif">
      <div className="max-w-5xl mx-auto px-10 grid grid-cols-3 items-center">
        
        <h1 className="text-black text-4xl font-serif text-center col-start-2">
          Event Scheduler
        </h1>

        <nav className="space-x-6 justify-self-end">
          <a href="#" className="text-gray-700 hover:text-black">Sign In</a>
          <a href="#" className="text-gray-800 hover:text-black">Sign Up</a>
        </nav>
      </div>
    </header>
  );
}


export default Navbar;
