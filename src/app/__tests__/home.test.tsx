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
    inspectionOption: HTMLElement,
    inventoryOption: HTMLElement;

  beforeEach(() => {
    render(<HomePage />);
    label = screen.getByLabelText('Tank Number');
    input = screen.getByRole('spinbutton');
    inspectionOption = screen.getByRole('button', {
      name: /Inspection/,
    });
    inventoryOption = screen.getByRole('button', {
      name: /Inventory/,
    });
  });

  it('should render the label', () => {
    expect(label).toBeInTheDocument();
  });

  it('should render the input', () => {
    expect(input).toBeInTheDocument();
  });

  it('should render two options', () => {
    const options = screen.getAllByRole('button');
    expect(options).toHaveLength(2);
  });

  it('should render disabled options', () => {
    expect(inspectionOption).toBeDisabled();
    expect(inventoryOption).toBeDisabled();
  });

  describe('when entering incorrect value into the input', () => {
    beforeEach(async () => {
      await userEvent.type(input, '0');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(0);
    });

    it('should render disabled options', () => {
      expect(inspectionOption).toBeDisabled();
      expect(inventoryOption).toBeDisabled();
    });
  });

  describe('when entering correct value into the input', () => {
    beforeEach(async () => {
      await userEvent.type(input, '1');
    });

    it('should have entered value', () => {
      expect(input).toHaveValue(1);
    });

    it('should render enabled options', () => {
      expect(inspectionOption).toBeEnabled();
      expect(inventoryOption).toBeEnabled();
    });

    describe('when clicking on Inspection option', () => {
      let createNewButton: HTMLElement;
      let viewLastButton: HTMLElement;
      beforeEach(async () => {
        await userEvent.click(inspectionOption);
        createNewButton = screen.getByRole('button', {
          name: 'Create New',
        });
        viewLastButton = screen.getByRole('button', {
          name: 'View Last',
        });
      });

      it('should render enabled inspection action buttons', () => {
        expect(createNewButton).toBeEnabled();
        expect(viewLastButton).toBeEnabled();
      });

      it('should call redirect when clicking "Create New" button', async () => {
        await userEvent.click(createNewButton);
        expect(redirect).toHaveBeenCalledWith('/inspections/create/1');
      });

      it('should call redirect when clicking "View Last" button', async () => {
        await userEvent.click(viewLastButton);
        expect(redirect).toHaveBeenCalledWith(
          '/reports/tanks/1/last-inspection'
        );
      });

      describe('when clearing the input', () => {
        beforeEach(async () => {
          await userEvent.clear(input);
        });

        it('should have empty value', () => {
          expect(input).toHaveValue(null);
        });

        it('should render disabled options and buttons', () => {
          expect(inspectionOption).toBeDisabled();
          expect(inventoryOption).toBeDisabled();
          expect(createNewButton).toBeDisabled();
          expect(viewLastButton).toBeDisabled();
        });
      });
    });

    describe('when clicking on Inventory option', () => {
      let createNewButton: HTMLElement;
      let viewLastButton: HTMLElement;
      beforeEach(async () => {
        await userEvent.click(inventoryOption);
        createNewButton = screen.getByRole('button', {
          name: 'Create New',
        });
        viewLastButton = screen.getByRole('button', {
          name: 'View Last',
        });
      });

      it('should render inventory action buttons', () => {
        expect(createNewButton).toBeInTheDocument();
        expect(viewLastButton).toBeInTheDocument();
        expect(viewLastButton).toBeDisabled();
      });

      it('should call redirect when clicking "Create New" button', async () => {
        await userEvent.click(createNewButton);
        expect(redirect).toHaveBeenCalledWith('/inventory/create/1');
      });

      // it('should call redirect when clicking "View Last" button', async () => {
      //   await userEvent.click(viewLastButton);
      //   expect(redirect).toHaveBeenCalledWith(
      //     '/reports/tanks/1/last-inventory'
      //   );
      // });
    });
  });
});
