<template>
  <button v-on="$listeners" class="tw-p-1"
          :class="{ 'tw-bg-black tw-text-white tw-rounded': active && color === 'light',
                    'tw-bg-white tw-text-black tw-rounded': active && color === 'dark'}">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Btn extends Vue {
  @Prop() public readonly active!: boolean;
  @Prop({default: 'light'}) public readonly color!: 'light' | 'dark';
}
</script>