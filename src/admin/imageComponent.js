// Strip backslashes that Decap's Slate markdown serialiser can insert before
// underscores in image paths. Guards against the round-trip escape bug even
// after the main fix (moving images to a path with no underscores).
const stripBackslashes = (value) => (value || '').replace(/\\/g, '');

CMS.registerEditorComponent({
  label: 'Image',
  id: 'image',
  fromBlock: match =>
    match && {
      image: stripBackslashes(match[1]),
      alt: match[2],
      title: match[3],
      position: match[4],
      width: match[5],
      height: match[6],
      loading: match[7]
    },
  toBlock: function({ image, alt, position, width, height }, getAsset, fields) {
    const cleanImage = stripBackslashes(image);
    return `<img src="${cleanImage}" alt="${alt || ''}" title="${alt || ''}" class="${position || ''}" width="${width || '600px'}" height="${height || '450px'}" loading="lazy"/>`
  },
  toPreview: ({ image, alt, position, width, height }, getAsset, fields) => {
    const cleanImage = stripBackslashes(image);
    return `<img src="${cleanImage}" alt="${alt}" title="${alt}" class="${position}" width="${width || '600px'}" height="${height || '450px'}" loading="lazy"/>`;
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