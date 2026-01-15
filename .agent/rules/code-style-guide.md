---
trigger: always_on
---

Always use Tailwind.css
Follow accessibility standards: use semantic HTML, include aria tags if necessary.
Follow React best practices for composability and component data ownership.
Use principle of least privilage for that.
Client components should have as little scope as possible to make them work. If page needs state, extract the specific part to a separate component to leverage server components on static elements.
If element repeats on one page, or on several pages, extract it as a separate component. Focus on reusability and configuration.
