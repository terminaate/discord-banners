---
to: <%= path %>/index.ts
---

import <%= pageName %> from "./<%= pageName %>";

export * from './<%= pageName %>';
export default <%= pageName %>;