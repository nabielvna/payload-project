import { CollectionConfig } from 'payload/types'

const Memberimages: CollectionConfig = {
  slug: 'memberimages',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/member-images',
    staticDir: 'member-images',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

export default Memberimages;