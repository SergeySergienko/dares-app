import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CreateTerminationForm } from '../CreateTerminationForm';
import { useToast } from '@/hooks/use-toast';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [null, jest.fn(), false]),
}));

jest.mock('@/actions/termination-actions', () => ({
  createTermination: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('CreateTerminationForm', () => {
  const mockTankNumber = '123';
  const mockToast = {
    toast: jest.fn(),
  };

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue(mockToast);
    render(<CreateTerminationForm tankNumber={mockTankNumber} />);
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    expect(screen.getByLabelText('Internal tank number')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason')).toBeInTheDocument();
    expect(screen.getByLabelText('Executor')).toBeInTheDocument();
    expect(screen.getByLabelText('Approver')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should set default values', () => {
    expect(screen.getByLabelText('Internal tank number')).toHaveValue(123);
    expect(screen.getByLabelText('Executor')).toHaveValue('Deripalov Andrii');
    expect(screen.getByLabelText('Approver')).toHaveValue('Deripalov Andrii');
  });

  it('should disable submit button when `isPending` is true', () => {
    (jest.requireMock('react') as any).useActionState.mockReturnValue([
      null,
      jest.fn(),
      true,
    ]);

    render(<CreateTerminationForm tankNumber={mockTankNumber} />);

    expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
  });
});
