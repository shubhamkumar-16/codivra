export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-6xl font-bold max-w-4xl">
        Code Together.
        <br />
        Build The Future.
      </h1>


      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        Codivra is a collaborative coding platform where
        developers can write code, share ideas, and build
        software together in real time.
      </p>


      <div className="mt-8 flex gap-4">

        <button className="bg-black text-white px-8 py-3 rounded-xl">
          Start Coding
        </button>


        <button className="border px-8 py-3 rounded-xl">
          Explore Platform
        </button>

      </div>


      <div className="mt-16 w-full max-w-4xl h-80 bg-gray-900 rounded-xl shadow-xl flex items-center justify-center">

        <p className="text-gray-400">
          Live Code Editor Preview
        </p>

      </div>


    </section>
  );
}