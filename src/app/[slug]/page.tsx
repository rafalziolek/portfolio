export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="bg-white min-h-[300vh] flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold tracking-tight capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-neutral-600">Case study page coming soon.</p>
      </div>
    </main>
  );
}
