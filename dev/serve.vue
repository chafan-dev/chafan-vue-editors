<template>
  <div id="app">
    <tiptap ref="tiptap" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Tiptap} from "@/lib-components";

@Component
export default class ServeDev extends Vue {
  public mounted() {
    const editor = (this.$refs.tiptap as Tiptap)
    console.log(editor.getJSON());
  }
}
</script>
