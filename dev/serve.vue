<template>
  <div id="app" class="tw-p-5">
    <button @click="commentMode = false" v-if="commentMode">评论模式</button>
    <button @click="commentMode = true" v-if="!commentMode">正常模式</button>
    <div class="tailwind">
      <div class="tw-grid tw-grid-cols-2 tw-space-x-1">
        <TiptapCF ref="tiptap" :upload="upload" :search-users="searchUsers" :user-label="userLabel"
                  :commentMode="commentMode"
                  :user-href="userHref" placeholder="Enter here..."
                  :on-editor-change="onEditorChange" />
        <div>
          <h2>数据</h2>
          <pre v-if="content"><code>{{ content }}</code></pre>
        </div>
      </div>
      <hr class="tw-my-2 tw-border-black tw-border-1" />
      <h2>预览</h2>
      <TiptapCF :body="body" :editable="false" />
      <hr class="tw-my-2 tw-border-black tw-border-1" />
    </div>
    <h2>Vditor Demo</h2>
    <VditorCF ref="vditor" :is-mobile="false" :on-editor-change="() => {}" editor-mode="markdown_splitview" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {TiptapCF} from "@/lib-components";
import axios from "axios";
import 'tippy.js/dist/tippy.css';
import VditorCF from "@/lib-components/VditorCF.vue";

@Component({
  components: {VditorCF, TiptapCF }
})
export default class ServeDev extends Vue {
  commentMode: boolean = false;

  readonly body = JSON.stringify({
    "type":"doc",
    "content":[
      {"type":"paragraph","content":[{"type":"text","text":"test"}]},
      {
        "type": "iframe",
        "attrs": {
          "src": "https://www.youtube.com/embed/NUYvbT6vTPs",
          "frameborder": 0,
          "allowfullscreen": true
        }
      }
    ]
  });
  content = '';
  onEditorChange() {
    this.content = JSON.stringify((this.$refs.tiptap as TiptapCF).getJSON()) || '';
  }

  async upload(blob: Blob) {
    let formData = new FormData();
    formData.append('file', blob);
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await axios.post('http://100.120.141.73:4582/api/v1/upload/images/', formData, { headers: headers });
    return response.data.msg;
  }

  async searchUsers() {
    return [
      {
        uuid: 'user1',
        label: 'User 1',
        href: '/users/1',
      },
      {
        uuid: 'user2',
        label: 'User 2',
        href: '/users/2',
      },
    ]
  }

  userLabel(user: any) {
    console.log(user);
    return user.label;
  }

  userHref(user: any) {
    return user.href;
  }
}
</script>
