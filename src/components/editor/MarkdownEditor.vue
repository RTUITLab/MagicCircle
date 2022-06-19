<template>
  <div class="markdown-block" >
    <div class="todo">
      <div class="markdown-title">
        <span v-text="'Редактор'" />
      </div>
      <div class="markdown-btns" style="text-align: left">
        <img class="img-btn" :src="('/svg/editor/heading.svg')" @click="() => press('h')" />
        <img class="img-btn" :src="('/svg/editor/icon_w.svg')" @click="() => press('b')" />
        <img class="img-btn" :src="('/svg/editor/italic.svg')" @click="() => press('i')" />

        <img class="img-btn" :src="('/svg/editor/code-view.svg')" @click="() => press('q')" />
        <img class="img-btn" :src="('/svg/editor/link.svg')" @click="() => press('k')" />
        <img class="img-btn" :src="('/svg/editor/list-check.svg')" @click="() => press('l')" />

        <img class="img-btn" :src="('/svg/editor/list-unordered.svg')" @click="() => press('u')" />
        <img class="img-btn" :src="('/svg/editor/list-ordered.svg')" @click="() => press('o')" />
        <img class="img-btn" :src="('/svg/editor/checkbox-line.svg')" @click="() => press('j')" />

      </div>
      <textarea 
        v-model="markdown"
        @keydown="onKeyDown"
        @dragover="(e) => e.preventDefault()"
        class="markdown-area"
        placeholder="Введите Markdown разметку"
      />
    </div>
    <div class="todo">
      <div class="markdown-title">
        <span v-text="'Просмотр'" />
      </div>
      <div 
      v-html="markdownToHtml"
      class="markdown-preview"
      />
    </div>
  </div>
 
</template>
<script>
import { marked } from 'marked'
export default {
  data() {
    return {
      markdown:  "",
      textArea: HTMLTextAreaElement,
    }
  },
  computed: {
    markdownText() {
      return this.$store.state.selectedSector.description
    },
   markdownToHtml(){
     this.$store.dispatch('changeMarkdown', this.markdown)
     return marked(this.markdown);
   },
   
  },
  methods: {
    press(key) {
      const e = new KeyboardEvent('keydown', { key: key, ctrlKey: true});
      this.textArea.dispatchEvent(e);
    },

    // Отслеживаем нажатие клавиш
    onKeyDown(e) {
    this.textArea = e.target;
    let start = this.textArea.selectionStart;
    let end = this.textArea.selectionEnd;

    let changed = false;
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      changed = true;

      let place = 0;
      for (let i = start - 1; i >= 0 && place === 0; i--) {
        if (this.markdown.charAt(i) === `\n`) {
          place = i + 1;
        }
      }
      this.markdown = this.markdown.substring(0, place) + `### `
        + this.markdown.substring(place, this.markdown.length);
      start = start + 4;
      end = end + 4;

      for (let i = start; i < end; i++) {
        if (this.markdown.charAt(i) === `\n`) {
          this.markdown = this.markdown.substring(0, i + 1) + `### `
            + this.markdown.substring(i + 1, this.markdown.length);
          end = end + 4;
        }
      }
    } else if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      changed = true;

      this.markdown = this.markdown.substring(0, start) + `*`
        + this.markdown.substring(start, this.markdown.length);
      start = start + 1;
      end = end + 1;
      this.markdown = this.markdown.substring(0, end) + `*`
        + this.markdown.substring(end, this.markdown.length);
    } else if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      changed = true;

      this.markdown = this.markdown.substring(0, start) + `**`
        + this.markdown.substring(start, this.markdown.length);
      start = start + 2;
      end = end + 2;
      this.markdown = this.markdown.substring(0, end) + `**`
        + this.markdown.substring(end, this.markdown.length);
    } else if (e.ctrlKey && e.key === 'q') {
      e.preventDefault();
      changed = true;

      let place = 0;
      for (let i = start - 1; i >= 0 && place === 0; i--) {
        if (this.markdown.charAt(i) === `\n`) {
          place = i + 1;
        }
      }
      this.markdown = this.markdown.substring(0, place) + `> `
        + this.markdown.substring(place, this.markdown.length);
      start = start + 2;
      end = end + 2;

      for (let i = start; i < end; i++) {
        if (this.markdown.charAt(i) === `\n`) {
          this.markdown = this.markdown.substring(0, i + 1) + `> `
            + this.markdown.substring(i + 1, this.markdown.length);
          end = end + 2;
        }
      }
    } else if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      changed = true;

      this.markdown = this.markdown.substring(0, start) + `\``
        + this.markdown.substring(start, this.markdown.length);
      start = start + 1;
      end = end + 1;
      this.markdown = this.markdown.substring(0, end) + `\``
        + this.markdown.substring(end, this.markdown.length);
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      changed = true;

      this.markdown = this.markdown.substring(0, start) + `[`
        + this.markdown.substring(start, this.markdown.length);
      start = start + 1;
      end = end + 1;
      this.markdown = this.markdown.substring(0, end) + `](url)`
        + this.markdown.substring(end, this.markdown.length);
    } else if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      changed = true;

      let place = 0;
      for (let i = start - 1; i >= 0 && place === 0; i--) {
        if (this.markdown.charAt(i) === `\n`) {
          place = i + 1;
        }
      }
      this.markdown = this.markdown.substring(0, place) + `- `
        + this.markdown.substring(place, this.markdown.length);
      start = start + 2;
      end = end + 2;

      for (let i = start; i < end; i++) {
        if (this.markdown.charAt(i) === `\n`) {
          this.markdown = this.markdown.substring(0, i + 1) + `- `
            + this.markdown.substring(i + 1, this.markdown.length);
          end = end + 2;
        }
      }
    } else if (e.ctrlKey && e.key === 'o') {
      e.preventDefault();
      changed = true;

      let place = 0;
      let order = 1;
      for (let i = start - 1; i >= 0 && place === 0; i--) {
        if (this.markdown.charAt(i) === `\n`) {
          place = i + 1;
        }
      }
      this.markdown = this.markdown.substring(0, place) + `${order}. `
        + this.markdown.substring(place, this.markdown.length);
      start = start + 2 + order.toString().length;
      end = end + 2 + order.toString().length;
      order = order + 1;

      for (let i = start; i < end; i++) {
        if (this.markdown.charAt(i) === `\n`) {
          this.markdown = this.markdown.substring(0, i + 1) + `${order}. `
            + this.markdown.substring(i + 1, this.markdown.length);
          end = end + 2 + order.toString().length;
          order = order + 1;
        }
      }
    } else if (e.ctrlKey && e.key === 'j') {
      e.preventDefault();
      changed = true;

      let place = 0;
      for (let i = start - 1; i >= 0 && place === 0; i--) {
        if (this.markdown.charAt(i) === `\n`) {
          place = i + 1;
        }
      }
      this.markdown = this.markdown.substring(0, place) + `- [ ] `
        + this.markdown.substring(place, this.markdown.length);
      start = start + 6;
      end = end + 6;

      for (let i = start; i < end; i++) {
        if (this.markdown.charAt(i) === `\n`) {
          this.markdown = this.markdown.substring(0, i + 1) + `- [ ] `
            + this.markdown.substring(i + 1, this.markdown.length);
          end = end + 6;
        }
      }
    }

    if (changed) {
      setTimeout(() => {
        this.textArea.selectionStart = start;
        this.textArea.selectionEnd = end;
      }, 100);
    }
  }
  },
  mounted() {
    this.markdown = this.$store.state.selectedSector.description

  }
}
</script>
<style lang="scss" scoped>
.markdown-block {
  display: grid;
  justify-content: space-between;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  margin: 0 10px;
}
.markdown-title{
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #131523;
  text-align: left;
  margin-bottom: 10px;

}
.markdown-area {
  // width: 466px;
  height: auto;
  width: 100%;
  // border: 1px solid #D7DBEC;
  margin-right: 10px;
  border: 0;
  height: 550px;
  // border-top: 1px solid #D7DBEC;
  padding-top: 20px;
}
.markdown-btns {
  border-top: 1px solid #D7DBEC;

}
.markdown-preview{
  width: 100%;
  max-width: 380px;
  min-height: 95%;
  position: relative;
  text-align: left;
  border-top: 1px solid #D7DBEC;
  padding-top: 10px;
  border-top-width: calc(100% - 10px);


  &::after {
    content: ' ';
    position: absolute;
    left: -10px;
    top: 5px;
    border-right: 1px solid #D7DBEC;
    height: calc(100% - 10px);
  }
}

.img-btn {
  cursor: pointer;
  margin-right: 10px;
  &:nth-child(3n) {
    padding-right: 10px;
    border-right: 1px solid #D7DBEC;
  }
  &:last-child {
    border: 0;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>