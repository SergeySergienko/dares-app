import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { redirect } from 'next/navigation';
import HomePage from '../page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('HomePage', () => {
  let label: HTMLElement,
    input: HTMLElement,
    createButton: HTMLElement,
    viewButton: HTMLElement;

  beforeEach(() => {
    render(<HomePage />);
    label = screen.getByLabelText('Tank Number');
    input = screen.getByRole('spinbutton');
    createButton = screen.getByRole('button', {
      name: 'Create Inspection',
    });
    viewButton = screen.getByRole('button', {
      name: 'View Last Inspection',
    });
  });

  it('should render the label', () => {
    expect(label).toBeInTheDocument();
  });

  it('should render the input', () => {
    expect(input).toBeInTheDocument();
  });

  it('should render two buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should render disabled buttons', () => {
    expect(createButton).toBeDisabled();
    expect(viewButton).toBeDisabled();
  });

  describe('when entering incorrect value into the input', () => {
    beforeEach(async () => {
      await userEvent.setup().type(input, '0');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(0);
    });

    it('should render disabled buttons', () => {
      expect(createButton).toBeDisabled();
      expect(viewButton).toBeDisabled();
    });
  });

  describe('when entering correct value into the input', () => {
    beforeEach(async () => {
      await userEvent.setup().type(input, '1');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(1);
    });

    it('should render activated buttons', () => {
      expect(createButton).not.toBeDisabled();
      expect(viewButton).not.toBeDisabled();
    });

    it('should call redirect when clicking "Create Inspection"', async () => {
      await userEvent.click(createButton);
      expect(redirect).toHaveBeenCalledWith('/inspections/create/1');
    });

    it('should call redirect when clicking "View Last Inspection"', async () => {
      await userEvent.click(viewButton);
      expect(redirect).toHaveBeenCalledWith('/reports/tanks/1/last-inspection');
    });

    describe('when clearing the input', () => {
      beforeEach(async () => {
        await userEvent.clear(input);
      });

      it('should not have entered value', () => {
        expect(input).toHaveValue(null);
      });

      it('should render disabled buttons', () => {
        expect(createButton).toBeDisabled();
        expect(viewButton).toBeDisabled();
      });
    });
  });
});
