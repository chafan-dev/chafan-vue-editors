Init is complete, your files have been generated and saved into the directory you specified above.
Within that directory, you will find a sample SFC at src/lib-components/chafan-vue-editors-sample.vue.
**NOTE** Any components you wish to expose as part of your library should be saved in that directory, and
an entry must be added to src/lib-components/index.ts and chafan-vue-editors.d.ts so rollup is aware of it
and typescript users can receive proper support.
When you're ready, run npm run build to generate the redistributable versions.
