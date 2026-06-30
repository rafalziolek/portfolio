import HighlightedTextLink from "./HighlightedTextLink";

function BodySection({ section }) {
  return (
    <section className="grid gap-2">
      <h1>{section.heading}</h1>
      <div className="ml-8 grid gap-4">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ListSection({ section }) {
  return (
    <section className="grid gap-2">
      <h2>{section.heading}</h2>
      <ul className="ml-8">
        {section.items.map((item) => (
          <li key={`${section.heading}-${item.label}`}>
            {item.href ? (
              <HighlightedTextLink href={item.href}>
                {item.label}
              </HighlightedTextLink>
            ) : (
              <span>{item.label}</span>
            )}
            {item.meta ? (
              <span className="ml-1 text-neutral-500">{item.meta}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HomeIntro({ sections }) {
  return (
    <div className="grid gap-10 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-neutral-200">
      {sections.map((section) =>
        section.body ? (
          <BodySection key={section.heading} section={section} />
        ) : (
          <ListSection key={section.heading} section={section} />
        ),
      )}
    </div>
  );
}
