---
to: <%= path %>/index.ts
---

import <%= contextName %> from './<%= contextName %>';

export * from './<%= contextName %>';
export * from './<%= contextName %>Provider';
export * from './<%= contextName %>Reducer';
export default <%= contextName %>;
