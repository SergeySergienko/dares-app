import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateInventoryForm } from '../CreateInventoryForm';
import { createInventory } from '@/actions/inventory-actions';
import { TankOutputDTO } from '@/models/TankModel';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [
    null,
    jest.fn(() => Promise.resolve()),
    false,
  ]),
}));

jest.mock('@/actions/inventory-actions', () => ({
  createInventory: jest.fn(),
}));

jest.mock('@/components/composites/TextareaField', () => ({
  TextareaField: () => <textarea data-testid='textarea' />,
}));
jest.mock('@/components/composites/RadioField', () => ({
  RadioField: ({ name }: { name: string }) => (
    <div data-testid='radio-field'>
      <input
        type='radio'
        name={name}
        value='In use'
        data-testid='radio-in-use'
      />
      <input type='radio' name={name} value='Lost' data-testid='radio-lost' />
    </div>
  ),
}));
describe('CreateInventoryForm', () => {
  const mockTank: TankOutputDTO = {
    id: '1020304050',
    internalNumber: 2,
    serialNumber: 'zzz123abc',
    manufacturer: 'Catalina',
    workPressure: 207,
    material: 'Carbon Composite',
    volume: 4.1,
    valve: 'DIN',
    color: 'Black/White',
    status: 'Lost',
    fillingType: 'Nitrox',
    firstHydrotestDate: new Date('2018-02-17T16:42:13.953+00:00'),
    lastHydrotestDate: new Date('2023-02-17T16:42:13.953+00:00'),
    lastInspectionDate: new Date('2018-02-14T16:42:13.953+00:00'),
    lastInventoryDate: new Date('2018-02-17T16:42:13.953+00:00'),
    createdAt: new Date('2018-02-17T16:42:13.953+00:00'),
  };

  beforeEach(() => {
    render(<CreateInventoryForm tank={mockTank} />);
  });

  it('should render all form fields', () => {
    expect(screen.getByLabelText('Internal tank number')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByTestId('radio-field')).toBeInTheDocument();
    expect(screen.getByLabelText('Executor')).toBeInTheDocument();
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should set default values', () => {
    expect(screen.getByLabelText('Internal tank number')).toHaveValue(2);
    expect(screen.getByLabelText('Executor')).toHaveValue('Deripalov Andrii');
  });

  it('should call `createInventory` when form is submitted', async () => {
    const dateInput = screen.getByLabelText('Date');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const radioButton = screen.getByTestId('radio-in-use');

    await userEvent.type(dateInput, '2025-01-01');
    await userEvent.click(radioButton);

    // await userEvent.click(submitButton);
    const form = screen.getByTestId('form') as HTMLFormElement;
    form.requestSubmit();
    await waitFor(() => expect(createInventory).toHaveBeenCalledTimes(1));
  });

  it.skip('should disable submit button when `isPending` is true', () => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useActionState: jest.fn(() => [null, jest.fn(), true]),
    }));

    render(<CreateInventoryForm tank={mockTank} />);

    expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
  });
});
