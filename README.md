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

Remember to import other CSS and JavaScripts:

```ts
import 'tippy.js/dist/tippy.css';
import 'highlight.js/styles/github.css';
```

```html
<script
  defer
  src="//cdn.jsdelivr.net/npm/@chafan/vditor@3.8.2-chafan.3/dist/js/lute/lute.min.js"
></script>
<script
  defer
  src="//cdn.jsdelivr.net/npm/@chafan/vditor@3.8.2-chafan.3/dist/js/mermaid/mermaid.min.js"
></script>
```

## Use in HTML directly from CDN

See `docs/index.html` for an example.

NOTE: Select the newest version from https://www.jsdelivr.com/package/npm/chafan-vue-editors?path=dist

## Development

Update `src/lib-components/index.ts` and `chafan-vue-editors.d.ts` after adding a new component to `src/lib-components/`.

Run `yarn run build` to generate the redistributable versions.

Run `yarn run serve` to launch a preview server locally.