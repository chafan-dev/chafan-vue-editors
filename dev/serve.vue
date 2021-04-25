<template>
  <div id="app">
    <Tiptap ref="tiptap" :upload="upload" :search-users="searchUsers" :user-label="userLabel" :user-href="userHref" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Tiptap} from "@/lib-components";
import axios from "axios";
import 'tippy.js/dist/tippy.css';

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