export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200">

      <div className="text-2xl font-bold">
        Codivra
      </div>

      <div className="hidden md:flex gap-8 text-gray-600">
        <a href="#">Features</a>
        <a href="#">Solutions</a>
        <a href="#">Docs</a>
        <a href="#">Community</a>
      </div>

      <button className="bg-black text-white px-5 py-2 rounded-lg">
        Get Started
      </button>

    </nav>
  );
}