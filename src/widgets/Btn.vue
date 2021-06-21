<template>
  <button v-on="$listeners" class="p-1"
          :class="{ 'bg-black text-white rounded': active && color === 'light',
                    'bg-white text-black rounded': active && color === 'dark'}">
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