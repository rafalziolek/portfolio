import Text from '../Text/text';
function List({ children, title, ...delegated }) {
  return (
    <div className="flex flex-col gap-[var(--space-xxs)]" {...delegated}>
      <ul className="mt-[var(--space-xs)] mb-[var(--space-l)] flex list-disc flex-col gap-[var(--space-xs)] text-[var(--font-size-body)] [&_li]:font-[var(--font-weight-m)] [&_li]:leading-[var(--line-height-l)]">{children}</ul>
    </div>
  );
}
export default List;
