export const quillModules = {
  toolbar: {
    container: [
      ['undo', 'redo'],
      ['bold', 'italic', 'underline', 'strike'],
      [{ script: 'sub'}, { script: 'super' }],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      ['clean'],
      ['ixolink'], // TODO: Enable IxoLink: ['ixolink']
    ],
  },
};
