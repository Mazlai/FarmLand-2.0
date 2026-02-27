import type { Meta, StoryObj } from '@storybook/angular';
import { FarmSelect } from './farm-select';

const meta: Meta<FarmSelect> = {
  title: 'Farm components/Farm select',
  component: FarmSelect,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<FarmSelect>;

const selectableValues = [
  {label: 'First option', value: 1},
  {label: 'Second option', value: 2},
  {label: 'Third option', value: 3},
];

export const select: Story = {
  args: {
    label: 'Farm select',
    selectableValues: selectableValues
  }
};
