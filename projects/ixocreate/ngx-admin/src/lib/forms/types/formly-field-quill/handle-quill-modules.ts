import { QuillEditorComponent } from 'ngx-quill';

export const handleQuillModules = (modules, getEditor: () => QuillEditorComponent, openLinkModal: (value?: any) => void) => {
  modules.keyboard = {
    bindings: {
      smartbreak: {
        key: 13,
        shiftKey: true,
        handler(range) {
          this.quill.setSelection(range.index, 'silent');
          this.quill.insertText(range.index, '\n', 'user');
          this.quill.setSelection(range.index + 1, 'silent');
          this.quill.format('linebreak', true, 'user');
        },
      },
      paragraph: {
        key: 13,
        handler(range) {
          this.quill.setSelection(range.index, 'silent');
          this.quill.insertText(range.index, '\n', 'user');
          this.quill.setSelection(range.index + 1, 'silent');
          const f = this.quill.getFormat(range.index + 1);
          if (f.hasOwnProperty('linebreak')) {
            delete (f.linebreak);
            this.quill.removeFormat(range.index + 1);
            for (const key in f) {
              if (f.hasOwnProperty(key)) {
                this.quill.formatText(range.index + 1, key, f[key]);
              }
            }
          }
        },
      },
    },
  };

  if (!modules.handlers) {
    modules.toolbar.handlers = {};
  }

  modules.toolbar.handlers.ixolink = (value) => {
    openLinkModal();
  };

  modules.toolbar.handlers.undo = () => {
    getEditor().quillEditor.history.undo();
  };

  modules.toolbar.handlers.redo = () => {
    getEditor().quillEditor.history.redo();
  };

  return modules;
};
