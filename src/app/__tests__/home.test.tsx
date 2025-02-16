import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { redirect } from 'next/navigation';
import HomePage from '../page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('HomePage', () => {
  let label: HTMLElement,
    input: HTMLElement,
    inspectionButton: HTMLElement,
    inventoryButton: HTMLElement;

  beforeEach(() => {
    render(<HomePage />);
    label = screen.getByLabelText('Tank Number');
    input = screen.getByRole('spinbutton');
    inspectionButton = screen.getByRole('button', {
      name: 'Inspection',
    });
    inventoryButton = screen.getByRole('button', {
      name: 'Inventory',
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
    expect(inspectionButton).toBeDisabled();
    expect(inventoryButton).toBeDisabled();
  });

  describe('when entering incorrect value into the input', () => {
    beforeEach(async () => {
      await userEvent.type(input, '0');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(0);
    });

    it('should render disabled buttons', () => {
      expect(inspectionButton).toBeDisabled();
      expect(inventoryButton).toBeDisabled();
    });
  });

  describe('when entering correct value into the input', () => {
    beforeEach(async () => {
      await userEvent.type(input, '1');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(1);
    });

    it('should render activated buttons', () => {
      expect(inspectionButton).toBeEnabled();
      expect(inventoryButton).toBeEnabled();
    });

    it.only('should render menu items', async () => {
      await userEvent.click(inspectionButton);
      const inspection = await screen.findByTestId('inspection');
      expect(inspection).toBeInTheDocument();
      // screen.debug(inspection);
      // expect(redirect).toHaveBeenCalledWith('/inspections/create/1');
    });

    it.skip('should call redirect when clicking "View Last Inspection"', async () => {
      await userEvent.click(inventoryButton);
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
        expect(inspectionButton).toBeDisabled();
        expect(inventoryButton).toBeDisabled();
      });
    });
  });
});
