export default function CodePreview() {
  return (
    <section className="px-8 py-20">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Build Together In Real-Time
        </h2>

        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl">

          <div className="flex items-center gap-2 px-5 py-3 bg-gray-900">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>

            <p className="text-gray-400 ml-4">
              Codivra Editor
            </p>
          </div>


          <div className="grid md:grid-cols-4 min-h-100">

            <div className="p-5 border-r border-gray-800 text-gray-400">
              <p>📁 src</p>
              <p className="ml-4">App.tsx</p>
              <p className="ml-4">main.tsx</p>
              <p className="ml-4">style.css</p>
            </div>


            <div className="md:col-span-3 p-6 text-green-400 font-mono">
              <p>function Codivra() &#123;</p>

              <p className="ml-6">
                return (
              </p>

              <p className="ml-12">
                &lt;Collaborate /&gt;
              </p>

              <p className="ml-6">
                )
              </p>

              <p>
                &#125;
              </p>
            </div>

          </div>


          <div className="border-t border-gray-800 p-5 text-gray-400 font-mono">
            $ npm run dev
            <br />
            ✓ Server running on localhost:3000
          </div>

        </div>

      </div>

    </section>
  );
}