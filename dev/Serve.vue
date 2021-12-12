<template>
  <div id="app" class="tailwind">
    <section class="box">
      <h1 class="tw-text-4xl tw-font-sans">Tiptap Editor Demo</h1>
      <button @click="commentMode = !commentMode" class="tw-mb-2">
        切换成
        <span v-if="commentMode">正常模式</span>
        <span v-else>评论模式</span>
      </button>
      <div class="tw-grid tw-grid-cols-2 tw-space-x-1">
        <TiptapCF
          ref="tiptap"
          :upload="upload"
          :search-users="searchUsers"
          :user-label="userLabel"
          :commentMode="commentMode"
          :user-href="userHref"
          placeholder="Enter here..."
          :on-editor-change="onEditorChange"
          @shortcutSubmit="onShortcutSubmit"
        />
        <div>
          <div v-if="content">
            <h2>数据</h2>
            <pre><code>{{ content }}</code></pre>
          </div>
          <div v-if="tiptapTextContent">
            <h2>文本</h2>
            <pre><code>{{ tiptapTextContent }}</code></pre>
          </div>
        </div>
      </div>
    </section>
    <section class="box">
      <h1 class="tw-text-4xl tw-font-sans">Tiptap Viewer Demo</h1>
      <TiptapCF :body="body" :editable="false" />
    </section>
    <section class="box">
      <h1 class="tw-text-4xl tw-font-sans">Vditor Demo</h1>
      <div class="tw-grid tw-grid-cols-2 tw-space-x-1">
        <VditorCF
          ref="vditor"
          editor-mode="markdown_splitview"
          @shortcutSubmit="onShortcutSubmit"
          :on-editor-change="updateVditorContent"
        />
        <div>
          <div v-if="vditorContent">
            <h2>数据</h2>
            <pre><code>{{ vditorContent }}</code></pre>
          </div>
          <div v-if="vditorTextContent">
            <h2>文本</h2>
            <pre><code>{{ vditorTextContent }}</code></pre>
          </div>
          <div v-if="vditorContent">
            <h2>预览</h2>
            <VditorViewerCF :body="vditorContent" :key="vditorContent" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TiptapCF } from '@/lib-components';
import axios from 'axios';
import 'tippy.js/dist/tippy.css';
import VditorCF from '@/lib-components/VditorCF.vue';
import VditorViewerCF from '@/lib-components/VditorViewerCF.vue';

@Component({
  components: { VditorViewerCF, VditorCF, TiptapCF },
})
export default class Serve extends Vue {
  commentMode: boolean = false;
  vditorContent: string = '';
  vditorTextContent: string = '';

  readonly body = JSON.stringify({
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'test' }] },
      {
        type: 'iframe',
        attrs: {
          src: 'https://www.youtube.com/embed/NUYvbT6vTPs',
          frameborder: 0,
          allowfullscreen: true,
        },
      },
    ],
  });
  content = '';
  tiptapTextContent = '';
  onEditorChange() {
    this.content = JSON.stringify((this.$refs.tiptap as TiptapCF).getJSON(), null, 2) || '';
    this.tiptapTextContent = (this.$refs.tiptap as TiptapCF).getText();
  }

  async upload(blob: Blob) {
    let formData = new FormData();
    formData.append('file', blob);
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await axios.post(
      'http://100.120.141.73:4582/api/v1/upload/images/',
      formData,
      { headers: headers }
    );
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
    ];
  }

  userLabel(user: any) {
    console.log(user);
    return user.label;
  }

  userHref(user: any) {
    return user.href;
  }

  onShortcutSubmit() {
    alert('shortcutSubmit');
  }

  updateVditorContent() {
    this.vditorContent = (this.$refs.vditor as VditorCF).getContent();
    this.vditorTextContent = (this.$refs.vditor as VditorCF).getText() || '';
  }
}
</script>

<style>
.box {
  margin: 5px;
  padding: 10px;
  border: 1px solid lightgray;
}
</style>
