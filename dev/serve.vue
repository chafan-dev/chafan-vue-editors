<template>
  <div id="app">
    <Tiptap ref="tiptap" :upload="upload" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Tiptap} from "@/lib-components";
import axios from "axios";

@Component({
  components: { Tiptap }
})
export default class ServeDev extends Vue {
  public mounted() {
    const editor = (this.$refs.tiptap as Tiptap)
    console.log(editor.getJSON());
  }

  async upload(blob: Blob) {
    let formData = new FormData();
    formData.append('file', blob);
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await axios.post('http://100.120.141.73:4582/api/v1/upload/images/', formData, { headers: headers });
    return response.data.msg;
  }
}
</script>
