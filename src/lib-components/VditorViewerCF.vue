<template>
  <div ref="vditorViewer" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vditor from '@chafan/vditor';
import { vditorCDN } from '@/common';

@Component
export default class Viewer extends Vue {
  @Prop() private readonly body!: string;
  @Prop() public readonly onViewerReady!: () => void;

  public textContent: string | null = null;

  mounted() {
    Vditor.preview(this.$refs.vditorViewer as HTMLDivElement, this.body, {
      mode: 'light',
      cdn: vditorCDN,
      after: () => {
        this.onViewerReady();
      },
    });
  }
}
</script>
