<template>
  <div id="app" class="p-5">
    <button @click="commentMode = false" v-if="commentMode">评论模式</button>
    <button @click="commentMode = true" v-if="!commentMode">正常模式</button>
    <div class="grid grid-cols-2 space-x-1">
      <TiptapCF ref="tiptap" :upload="upload" :search-users="searchUsers" :user-label="userLabel"
                :commentMode="commentMode"
                :user-href="userHref" placeholder="Enter here..."
                :on-editor-change="onEditorChange"
                :get-image-url="getImageUrl"
                :get-video-url="getVideoUrl" />
      <div>
        <h2>数据</h2>
        <pre v-if="content"><code>{{ content }}</code></pre>
      </div>
    </div>
    <hr class="my-2 border-black border-1" />
    <h2>预览</h2>
    <TiptapCF :body="body" :editable="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {TiptapCF} from "@/lib-components";
import axios from "axios";
import 'tippy.js/dist/tippy.css';

@Component({
  components: { TiptapCF }
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

  getImageUrl() {
    return window.prompt('图片 URL');
  }

  getVideoUrl() {
    return window.prompt('视频 URL');
  }
}
</script>
