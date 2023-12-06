import { CollectionConfig } from 'payload/types';
import Divisions from './Divisions'

const Staffs: CollectionConfig = {
  slug: 'staffs',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'nrp',
      label: 'NRP',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'division',
      label: 'Division',
      type: 'relationship',
      relationTo: 'divisions',
      hasMany: false,
      required: true,
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
    },
    {
      name: 'studentMentor',
      label: 'Student Mentor',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'major',
      label: 'Major',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
  ],
};

export default Staffs;
