import type { Meta, StoryObj } from '@storybook/angular';
import { FarmInput } from './farm-input';
import { FarmInputType } from '../../../enums/farm-input-type';

const meta: Meta<FarmInput> = {
  title: 'Farm components/Farm input',
  component: FarmInput,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<FarmInput>;

export const textInput: Story = {
  args: {
    label: 'Text farm input',
    type: FarmInputType.TEXT
  }
};

export const emailInput: Story = {
  args: {
    label: 'Email farm input',
    type: FarmInputType.EMAIL
  }
};

export const dateInput: Story = {
  args: {
    label: 'Date farm input',
    type: FarmInputType.DATE
  }
};

export const passwordInput: Story = {
  args: {
    label: 'Password farm input',
    type: FarmInputType.PASSWORD
  }
};

