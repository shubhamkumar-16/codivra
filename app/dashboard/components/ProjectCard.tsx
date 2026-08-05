type Props = {
  name: string;
  description: string;
  language: string;
};

export default function ProjectCard({
  name,
  description,
  language,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {name}
          </h2>

          <p className="mt-2 text-gray-600">
            {description}
          </p>

          <span className="mt-4 inline-block rounded bg-gray-100 px-3 py-1 text-sm">
            {language}
          </span>
        </div>

        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Open
        </button>
      </div>
    </div>
  );
}