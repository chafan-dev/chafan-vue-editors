## Chafan Vue Editors


## Use in Vue project

```bash
npm add chafan-vue-editors --save
# or
yarn add chafan-vue-editors
```

Then before your `new Vue(...)`:

```typescript
import ChafanVueEditors from 'chafan-vue-editors';

Vue.use(ChafanVueEditors);
```

You can also import component individually rather than registering globally:

```typescript
import { Tiptap } from 'chafan-vue-editors';
```

Remember to import tippy CSS:

```ts
import 'tippy.js/dist/tippy.css';
```

## Development

Update `src/lib-components/index.ts` and `chafan-vue-editors.d.ts` after adding a new component to `src/lib-components/`.

Run `npm run build` to generate the redistributable versions.
