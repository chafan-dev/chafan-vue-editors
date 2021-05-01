<template>
  <div id="app">
    <div>
      <button @click="showImageDialog">
        Image
      </button>
      <button @click="showVideoDialog">
        Video
      </button>
    </div>
    <Tiptap ref="tiptap" :upload="upload" :search-users="searchUsers" :user-label="userLabel"
            :user-href="userHref" placeholder="Enter here..."
            :on-editor-change="onEditorChange"
            :video-dialog-controller="videoDialogController"
            :image-dialog-controller="imageDialogController" />
    <pre><code>{{ content }}</code></pre>
    <hr />
    <Tiptap :body="body" :editable="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Tiptap} from "@/lib-components";
import axios from "axios";
import 'tippy.js/dist/tippy.css';
import {ITiptapDialogController} from "@/lib-components/tiptap.vue";

@Component({
  components: { Tiptap }
})
export default class ServeDev extends Vue {
  readonly body = JSON.stringify({
    "type":"doc",
    "content":[
      {"type":"paragraph","content":[{"type":"text","text":"test"}]},
      {
        "type": "iframe",
        "attrs": {
          "src": "https://www.youtube.com/embed/PbDcLHE5Zwk",
          "frameborder": 0,
          "allowfullscreen": true
        }
      }
    ]
  });
  readonly videoDialogController: ITiptapDialogController = {
    onUrl: undefined,
  };
  content = '';

  readonly imageDialogController: ITiptapDialogController = {
    onUrl: undefined,
  };

  onEditorChange() {
    this.content = JSON.stringify((this.$refs.tiptap as Tiptap).getJSON()) || '';
  }

  showImageDialog() {
    const url = window.prompt('URL');
    if (this.imageDialogController.onUrl && url) {
      this.imageDialogController.onUrl(url);
    }
  }

  showVideoDialog() {
    const url = window.prompt('URL');
    if (this.videoDialogController.onUrl && url) {
      this.videoDialogController.onUrl(url);
    }
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

<style>
#app {
  margin-top: 100px;
}
</style>