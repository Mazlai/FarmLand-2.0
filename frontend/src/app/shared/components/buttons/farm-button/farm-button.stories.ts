import type { Meta, StoryObj } from '@storybook/angular';
import { FarmButton } from './farm-button';
import { FarmButtonKind } from '../../../enums/farm-button-kind';

const meta: Meta<FarmButton> = {
  title: 'Farm components/Farm button',
  component: FarmButton,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<FarmButton>;

export const primaryButton: Story = {
  args: {
    label: 'Primary farm button',
    kind: FarmButtonKind.PRIMARY,
    onClick: () => alert('Primary farm button clicked!')
  }
};

export const secondaryButton: Story = {
  args: {
    label: 'Secondary farm button',
    kind: FarmButtonKind.SECONDARY,
    onClick: () => alert('Secondary farm button clicked!')
  }
};

export const tertiaryButton: Story = {
  args: {
    label: 'Tertiary farm button',
    kind: FarmButtonKind.TERTIARY,
    onClick: () => alert('Tertiary farm button clicked!')
  }
};

export const infoButton: Story = {
  args: {
    label: 'Info farm button',
    kind: FarmButtonKind.INFO,
    onClick: () => alert('Info farm button clicked!')
  }
};

export const warningButton: Story = {
  args: {
    label: 'Warning farm button',
    kind: FarmButtonKind.WARNING,
    onClick: () => alert('Warning farm button clicked!')
  }
};

export const dangerButton: Story = {
  args: {
    label: 'Danger farm button',
    kind: FarmButtonKind.DANGER,
    onClick: () => alert('Danger farm button clicked!')
  }
};
