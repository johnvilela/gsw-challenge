import AdminPage from '@/app/admin/page';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(() => ({
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    listUsers: jest.fn(),
    status: 'success',
    users: [
      { id: '1', name: 'John Doe', email: 'john.doe@gmail.com' },
    ],
  })),
}));

describe('AdminPage', () => {
  test('renders the amount of notes section', () => {
    render(<AdminPage />);
    const notesAmountSection = screen.getByText('Amount of notes');
    expect(notesAmountSection).toBeInTheDocument();
  });

  test('renders the manage users section', () => {
    render(<AdminPage />);
    const manageUsersSection = screen.getByText('Manage users');
    expect(manageUsersSection).toBeInTheDocument();
  });

  test('updates the amount of notes when the form is submitted', () => {
    const { getByLabelText, getByText } = render(<AdminPage />);
    const hundredInput = getByLabelText('R$ 100') as HTMLInputElement;
    const fiftyInput = getByLabelText('R$ 50') as HTMLInputElement;
    const twentyInput = getByLabelText('R$ 20') as HTMLInputElement;
    const tenInput = getByLabelText('R$ 10') as HTMLInputElement;
    const saveButton = getByText('Save update');

    fireEvent.change(hundredInput, { target: { value: '10' } });
    fireEvent.change(fiftyInput, { target: { value: '20' } });
    fireEvent.change(twentyInput, { target: { value: '30' } });
    fireEvent.change(tenInput, { target: { value: '40' } });
    fireEvent.click(saveButton);

    expect(hundredInput.value).toBe('10');
    expect(fiftyInput.value).toBe('20');
    expect(twentyInput.value).toBe('30');
    expect(tenInput.value).toBe('40');
  });

  test('creates a new user when the form is submitted', () => {
    const { getByTestId, getByText } = render(<AdminPage />);
    const nameInput = getByTestId('name') as HTMLInputElement;
    const emailInput = getByTestId('email') as HTMLInputElement;
    const createButton = getByText('Create user');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(createButton);

    const userItem = screen.getByText('John Doe');
    expect(userItem).toBeInTheDocument();
  });

  test('deletes a user when the delete button is clicked', () => {
    const { getByTestId } = render(<AdminPage />);
    const deleteButton = getByTestId('delete-btn');

    fireEvent.click(deleteButton);

    const userItem = screen.queryByText('John Doe');
    expect(userItem).not.toBeInTheDocument();
  });
});