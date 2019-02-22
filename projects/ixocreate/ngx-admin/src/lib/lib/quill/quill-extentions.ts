import Quill from 'quill';

export function registerQillExtentions() {
  quillRegisterLineBreak();
  quillRegisterLink();
}

function quillRegisterLineBreak() {
  const Parchment = Quill.import('parchment');
  const LineBreakClass = new Parchment.Attributor.Class('linebreak', 'linebreak', {scope: Parchment.Scope.BLOCK});
  Quill.register('formats/linebreak', LineBreakClass);
}

function quillRegisterLink() {
  const Link = Quill.import('formats/link');

  class LinkType extends Link {
    static create(options: { href: string, target: string }) {
      console.log(options);
      const node = super.create(options);
      const href = this.sanitize(options.href);
      node.setAttribute('href', href);
      node.setAttribute('data-test', href);
      if (options.target) {
        node.setAttribute('target', options.target);
      }
      return node;
    }

    static sanitize(url) {
      return super.sanitize(url);
    }
  }

  Quill.register('formats/link', LinkType);
}
