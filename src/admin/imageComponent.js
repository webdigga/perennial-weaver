CMS.registerEditorComponent({
  label: 'Image',
  id: 'image',
  fromBlock: match =>
    match && {
      image: match[1],
      alt: match[2],
      title: match[3],
      position: match[4],
      width: match[5],
      height: match[6],
      loading: match[7]
    },
  toBlock: function({ image, alt, position, width, height }, getAsset, fields) {
    const cleanImage = (image || '').replace(/\\/g, '/');
    return `<img src="${cleanImage}" alt="${alt || ''}" title="${alt || ''}" class="${position || ''}" width="${width || '600px'}" height="${height || '450px'}" loading="lazy"/>`
  },
  toPreview: ({ image, alt, position, width, height }, getAsset, fields) => {
    return `<img src="${image}" alt="${alt}" title="${alt}" class="${position}" width="${width || '600px'}" height="${height || '450px'}" loading="lazy"/>`;
  },
  pattern:  /^<img src="(.*?)" alt="(.*?)" title="(.*?)" class="(.*?)" width="(.*?)" height="(.*?)" loading="(.*?)"\/>$/s,
  fields: [
    {
      label: 'Picture',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
      hint: "*Try and make sure this image is 4:3*"
    },
    {
      label: 'Alt Text',
      name: 'alt',
      widget: 'string'
    },
    {
      label: 'Position',
      name: 'position',
      widget: 'select',
      options: ['Left', 'Right', 'Centre']
    },
    {
      label: 'Width',
      name: 'width',
      widget: 'string',
      default: '600px'
    },
    {
      label: 'Height',
      name: 'height',
      widget: 'string',
      default: '450px'
    }
  ]
})