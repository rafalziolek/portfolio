import WorksPageClient from '@/components/portfolio/WorksPageClient';
import { workItems } from '@/data/portfolio.mjs';

function Work() {
  return <WorksPageClient items={workItems} />;
}

export default Work;
