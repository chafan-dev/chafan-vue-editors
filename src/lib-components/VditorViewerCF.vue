<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vditor from '@chafan/vditor';
import { vditorCDN } from '@/common';

@Component
export default class Viewer extends Vue {
  @Prop() private readonly body!: string;
  @Prop() public readonly onViewerReady!: (HTMLDivElement) => void;

  public textContent: string | null = null;

  mounted() {
    const vditorElem = this.$el as HTMLDivElement;
    Vditor.preview(vditorElem, this.body, {
      mode: 'light',
      cdn: vditorCDN,
      after: () => {
        this.onViewerReady(vditorElem);
      },
    });
  }
}
</script>
