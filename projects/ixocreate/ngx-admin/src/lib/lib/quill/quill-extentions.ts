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

  class IxoLinkType extends Link {
    static blotName = 'ixolink';
    static tagName = 'link';
    static PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel', 'sitemap', 'media'];

    static create(options: any) {
      let href = '';
      if (options.type === 'external') {
        href = options.value;
      } else if (options.type === 'media') {
        href = 'media:' + options.value.id;
      } else if (options.type === 'sitemap') {
        href = 'sitemap:' + options.value.id;
      }
      const node = super.create(options);
      href = this.sanitize(href);
      node.setAttribute('href', href);
      if (options.target) {
        node.setAttribute('target', options.target);
      }
      node.linkData = options;
      return node;
    }

    static formats(domNode) {
      return domNode.linkData;
    }

    static sanitize(url) {
      return super.sanitize(url);
    }
  }

  Quill.register('formats/ixolink', IxoLinkType);
}
