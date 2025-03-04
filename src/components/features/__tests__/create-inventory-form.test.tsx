import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CreateInventoryForm } from '../CreateInventoryForm';
import { useToast } from '@/hooks/use-toast';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [null, jest.fn(), false]),
}));

jest.mock('@/actions/inventory-actions', () => ({
  createInventory: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/components/composites/TextareaField', () => ({
  TextareaField: ({ name }: any) => (
    <textarea name={name} data-testid='textarea' />
  ),
}));
jest.mock('@/components/composites/RadioField', () => ({
  RadioField: ({ name, options }: any) => (
    <div data-testid='radio-field'>
      {options.map((option: any) => (
        <label key={option.optionId}>
          <input
            type='radio'
            name={name}
            value={option.value}
            data-testid={`radio-${option.optionId}`}
          />
          {option.label}
        </label>
      ))}
    </div>
  ),
}));

describe('CreateInventoryForm', () => {
  const mockTankNumber = '123';
  const mockToast = {
    toast: jest.fn(),
  };

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue(mockToast);
    render(<CreateInventoryForm tankNumber={mockTankNumber} />);
    jest.clearAllMocks();
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
    expect(screen.getByLabelText('Internal tank number')).toHaveValue(123);
    expect(screen.getByLabelText('Executor')).toHaveValue('Deripalov Andrii');
  });

  it('should disable submit button when `isPending` is true', () => {
    (jest.requireMock('react') as any).useActionState.mockReturnValue([
      null,
      jest.fn(),
      true,
    ]);

    render(<CreateInventoryForm tankNumber={mockTankNumber} />);

    expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
  });
});
