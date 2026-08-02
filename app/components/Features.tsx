const features = [
  {
    title: "Real-Time Collaboration",
    description:
      "Work together with your team and edit code simultaneously from anywhere.",
    icon: "⚡",
  },
  {
    title: "AI Coding Assistant",
    description:
      "Get intelligent code suggestions, explanations, and debugging help.",
    icon: "🤖",
  },
  {
    title: "Team Workspace",
    description:
      "Manage projects, invite developers, and collaborate efficiently.",
    icon: "👥",
  },
  {
    title: "Code Execution",
    description:
      "Run, test, and debug your code directly inside Codivra.",
    icon: "▶️",
  },
];


export default function Features() {
  return (
    <section className="py-20 px-8">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Powerful Features
        </h2>

        <p className="mt-4 text-gray-600">
          Everything developers need to build together.
        </p>

      </div>


      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="border rounded-2xl p-8 hover:shadow-lg transition"
          >

            <div className="text-4xl mb-4">
              {feature.icon}
            </div>


            <h3 className="text-2xl font-semibold">
              {feature.title}
            </h3>


            <p className="mt-3 text-gray-600">
              {feature.description}
            </p>


          </div>
        ))}

      </div>

    </section>
  );
}