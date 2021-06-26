<template>
  <div class="tiptap-editor">
    <div v-if="editor" :class="{'tw-border tw-border-gray-300 tw-rounded tw-border-solid': editable}">
      <template v-if="editable">
        <Dialog @confirm="insertImage" @cancel="showImageDialog = false" v-if="showImageDialog">
          <template v-slot:title>
            <h1>添加图片</h1>
          </template>
          <template v-slot:content>
            <input class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                   v-model="insertImageUrl"
                   type="text" placeholder="图片 URL">
          </template>
        </Dialog>

        <Dialog @confirm="insertVideo" @cancel="showVideoDialog = false" v-if="showVideoDialog">
          <template v-slot:title>
            <h1>添加视频</h1>
          </template>
          <template v-slot:content>
            <div class="tw-space-y-3">
              <input class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                     v-model="youtubeUrl"
                     type="text" placeholder="YouTube URL">
              <input class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                     v-model="bilibiliEmbedCode"
                     type="text" placeholder="哔哩哔哩 Embed Code">
            </div>
          </template>
        </Dialog>

        <!-- Fixed menu -->
        <div v-if="!commentMode" class="tw-flex tw-space-x-0.5 tw-p-1 tw-border-0 tw-border-b tw-border-solid tw-border-gray-300">
            <Btn @click="editor.chain().focus().toggleBold().run()" :active="editor.isActive('bold')">
              <BoldIcon />
            </Btn>
            <Btn @click="editor.chain().focus().toggleItalic().run()" :active="editor.isActive('italic')">
              <ItalicIcon />
            </Btn>
            <Btn @click="editor.chain().focus().toggleStrike().run()" :active="editor.isActive('strike')">
              <StrikethroughIcon />
            </Btn>
            <Btn @click="editor.chain().focus().toggleCodeBlock().run()" :active="editor.isActive('codeBlock')">
              <CodeBlockIcon />
            </Btn>
            <Btn @click="showImageDialog = true">
              <ImageIcon />
            </Btn>
            <Btn @click="showVideoDialog = true">
              <VideoIcon />
            </Btn>
        </div>
        <BubbleMenu :editor="editor" v-if="commentMode">
            <Btn @click="editor.chain().focus().toggleBold().run()"
                 :active="editor.isActive('bold')"
                 color="dark">
              <BoldIcon />
            </Btn>
            <Btn color="dark"
                 @click="editor.chain().focus().toggleItalic().run()"
                 :active="editor.isActive('italic')">
              <ItalicIcon />
            </Btn>
            <Btn color="dark"
                 @click="editor.chain().focus().toggleStrike().run()"
                 :active="editor.isActive('strike')">
              <StrikethroughIcon />
            </Btn>
        </BubbleMenu>
      </template>

      <EditorContent :editor="editor" class="editor__content" :class="{
        'tw-p-2': editable,
        'editable-comment': commentMode && editable,
        'editable-non-comment': !commentMode && editable,
      }" />
    </div>
  </div>
</template>

<script lang="ts">
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import c from 'highlight.js/lib/languages/c';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import go from 'highlight.js/lib/languages/go';
import ruby from 'highlight.js/lib/languages/ruby';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';
import rust from 'highlight.js/lib/languages/rust';
import swift from 'highlight.js/lib/languages/swift';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';

import {
  mergeAttributes,
} from '@tiptap/core'

import { Editor, EditorContent, BubbleMenu, VueRenderer } from '@tiptap/vue-2';
import MentionList from '@/extensions/MentionList.vue';

import { defaultExtensions } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Mention from '@tiptap/extension-mention'

import lowlight from 'lowlight/lib/core'
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('c', c);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('cpp', cpp);
lowlight.registerLanguage('csharp', csharp);
lowlight.registerLanguage('json', json);
lowlight.registerLanguage('sql', sql);
lowlight.registerLanguage('typescript', typescript);
lowlight.registerLanguage('go', go);
lowlight.registerLanguage('ruby', ruby);
lowlight.registerLanguage('bash', bash);
lowlight.registerLanguage('xml', xml);
lowlight.registerLanguage('php', php);
lowlight.registerLanguage('rust', rust);
lowlight.registerLanguage('swift', swift);
lowlight.registerLanguage('yaml', yaml);
lowlight.registerLanguage('markdow', markdown);


import ImageUpload from '@/extensions/ImageUpload';
import Iframe from "@/extensions/Iframe";

import tippy from 'tippy.js';
import * as _ from 'lodash';

import { Component, Prop, Vue } from 'vue-property-decorator';

import '@/styles/main.css';

import Btn from "@/widgets/Btn.vue";
import ImageIcon from "@/widgets/ImageIcon.vue";
import VideoIcon from "@/widgets/VideoIcon.vue";
import CodeBlockIcon from "@/widgets/CodeBlockIcon.vue";
import BoldIcon from "@/widgets/BoldIcon.vue";
import ItalicIcon from "@/widgets/ItalicIcon.vue";
import StrikethroughIcon from "@/widgets/StrikethroughIcon.vue";
import Dialog from "@/widgets/Dialog.vue";
import getYouTubeID from 'get-youtube-id';

const EMPTY_DOCUMENT = {
  type: 'doc',
  content: [{
    type: 'paragraph',
  }],
};

@Component({
  components: {
    Dialog,
    StrikethroughIcon,
    ItalicIcon,
    BoldIcon,
    CodeBlockIcon,
    VideoIcon,
    ImageIcon,
    Btn,
    EditorContent,
    BubbleMenu,
  },
})
export default class TiptapCF extends Vue {
  @Prop() public readonly onEditorChange: ((body: string) => void) | undefined;

  @Prop({ default: true }) public readonly editable!: boolean;
  @Prop() public readonly placeholder: string | undefined;
  @Prop({ default: false }) public readonly commentMode!: boolean;

  // Customizable utils for mention
  @Prop() public readonly searchUsers!: (query: string) => any[];
  @Prop() public readonly userLabel!: (userItem: any) => string;
  @Prop() public readonly userHref!: (userItem: any) => string;

  @Prop() public readonly bodyFormat: 'html' | 'tiptap_json' | undefined;
  @Prop() public readonly body: string | undefined;
  @Prop() public readonly upload: ((blob: Blob) => Promise<string>) | undefined;
  @Prop() public readonly onEditorReady: ((contentElem: HTMLElement) => void) | undefined;

  private editor: any = null;

  showVideoDialog = false;
  showImageDialog = false;
  private insertImageUrl = '';

  insertImage() {
    this.addImage(this.insertImageUrl);
    this.showImageDialog = false;
  }

  private youtubeUrl = '';
  private bilibiliEmbedCode = '';

  insertVideo() {
    let url = '';
    if (this.youtubeUrl) {
      const youtubeId = getYouTubeID(this.youtubeUrl);
      if (youtubeId) {
        url = `https://www.youtube.com/embed/${youtubeId}`;
      }
    } else if (this.bilibiliEmbedCode) {
      const bilibiliEmbedDOM = new DOMParser().parseFromString(this.bilibiliEmbedCode, 'text/html');
      const iframe = bilibiliEmbedDOM.getElementsByTagName('iframe')[0];
      if (iframe) {
        const iframeUrl = new URL(iframe.src);
        if (iframeUrl.hostname === 'player.bilibili.com') {
          url = iframeUrl.href;
        }
      }
    }

    if (!url) {
      return;
    }
    this.addVideo(url);
    this.showVideoDialog = false;
  }

  get jsonBody() {
    if (!this.body) {
      return undefined;
    }
    if (!this.bodyFormat || this.bodyFormat === 'tiptap_json') {
      return JSON.parse(this.body);
    }
    return undefined;
  }

  mounted() {
    const userLabel = this.userLabel;
    const userHref = this.userHref;
    this.editor = new Editor({
      onCreate: () => {
        if (this.onEditorReady) {
          const editorContentElem = this.$el.getElementsByClassName("editor__content")[0] as HTMLElement;
          if (editorContentElem) {
            this.onEditorReady(editorContentElem);
          } else {
            const domString = new XMLSerializer().serializeToString(this.$el);
            throw `TiptapCF onCreate editorContentElem is undefined. DOM: ${domString}`;
          }
        }
      },
      content: this.jsonBody,
      extensions: [
          Underline,
          Link,
          Iframe,
          Placeholder.configure({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            placeholder: this.placeholder || '',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
          ImageUpload.configure({
            uploadFunc: this.upload,
          }),
          CodeBlockLowlight.configure({
            lowlight,
          }),
          Mention.configure({
            HTMLAttributes: {
              class: 'mention',
            },
            suggestion: {
              items: this.searchUsers,
              render: () => {
                let component
                let popup

                return {
                  onStart: props => {
                    (props as any).userLabel = userLabel;
                    component = new VueRenderer(MentionList, {
                      parent: this,
                      propsData: props,
                    })

                    popup = tippy('body', {
                      getReferenceClientRect: props.clientRect,
                      appendTo: () => document.body,
                      content: component.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: 'manual',
                      placement: 'bottom-start',
                    })
                  },
                  onUpdate(props) {
                    component.updateProps(props)

                    popup[0].setProps({
                      getReferenceClientRect: props.clientRect,
                    })
                  },
                  onKeyDown(props) {
                    return component.ref?.onKeyDown(props)
                  },
                  onExit() {
                    popup[0].destroy()
                    component.destroy()
                  }
                }
              },
            },
          }).extend({
            renderHTML({ node, HTMLAttributes }) {
              return ['a', mergeAttributes(mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), {
                href: userHref(node.attrs.id),
              }), '@' + userLabel(node.attrs.id)]
            },
            renderText({ node }) {
              return '@' + userLabel(node.attrs.id)
            },
          }),
          ...defaultExtensions()
      ],
      onUpdate: () => {
        if (this.onEditorChange) {
          this.onEditorChange(this.getText());
        }
      },
      editable: this.editable,
    });
    if (this.body) {
      if (!this.bodyFormat || this.bodyFormat === 'tiptap_json') {
        this.loadJSON(JSON.parse(this.body));
      } else if (this.bodyFormat === 'html') {
        this.loadHTML(this.body);
      }
    }
  }

  public loadHTML(htmlBody: string) {
    this.editor.commands.setContent(htmlBody);
  }

  public getText() {
    return (this.$el.querySelector('.editor__content')! as HTMLElement).innerText || '';
  }

  public getJSON(): object | null {
    const json = this.editor.getJSON();
    if (_.isEqual(json, EMPTY_DOCUMENT)) {
      return null;
    }
    return json;
  }

  public loadJSON(object: any) {
    this.editor.commands.setContent(object);
  }

  public getHTML() {
    return this.editor.getHTML();
  }

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  addImage(url: string) {
    this.editor.chain().focus().setImage({ src: url }).run()
  }

  addVideo(url: string) {
    this.editor.chain().focus().setIframe({
      src: url,
      height: 315,
      width: 500
    }).run()
  }

  public reset() {
    this.editor.commands.clearContent();
  }


}
</script>

<style lang="scss">
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;
$body-font-family: 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'PingFang SC',
sans-serif, 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei';
$mono-font-family: mononoki, Consolas, Liberation Mono, Courier, monospace !important;

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  p {
    margin: 0;
  }
}


/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

.editor {
  &__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    font-family: $body-font-family;

    * {
      line-height: 1.5rem;
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: rgba($color-grey, 0.3);
      color: $color-black;
      overflow-x: auto;

      code {
        display: block;
        font-family: $mono-font-family;
      }
    }

    p code {
      padding: 0.2rem 0.4rem;
      border-radius: 5px;
      background: rgba($color-grey, 0.3);
      color: $color-black;
      font-family: $mono-font-family;
    }

    ul,
    ol {
      padding-left: 1rem;
      margin-top: 0;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      text-decoration: none;
      color: #1976d2;
    }

    blockquote {
      border-left: 3px solid rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin-bottom: 0.25rem;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid $color-grey;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: col-resize;
    }
  }
}

.editable-comment .ProseMirror {
  min-height: 5rem;
}

.editable-non-comment .ProseMirror {
  min-height: 30rem;
}

.ProseMirror-focused {
   outline: none !important;
}

.mention {
  font-family: $body-font-family;
  text-decoration: none;
  color: #1976d2;
}
</style>
