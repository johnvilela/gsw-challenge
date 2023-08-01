import AdminPage from '@/app/admin/page';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

const saveNotesAmountMock = jest.fn();

jest.mock('../../hooks/useBanknotes', () => ({
  useBanknotes: jest.fn(() => ({
    setNotesAmount: jest.fn(),
    saveNotesAmount: saveNotesAmountMock,
    notesAmount: { '100': 10, '50': 10, '20': 10, '10': 10 },
  })),
}));

const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@gmail.com' },
];
const createUserMock = jest.fn();
const deleteUserMock = jest.fn((id: string) => users.filter(user => user.id !== id));

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(() => ({
    createUser: createUserMock,
    deleteUser: deleteUserMock,
    listUsers: jest.fn(),
    status: 'success',
    users,
  })),
}));

const renderComponent = () => render(<AdminPage />);

describe('AdminPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('updates the amount of notes when the form is submitted', async () => {
    const hundredInput = await screen.getByRole('spinbutton', { name: /r\$ 100/i }) as HTMLInputElement;
    const saveButton = await screen.getByRole('button', { name: /save update/i })

    fireEvent.change(hundredInput, { target: { value: '10' } });
    fireEvent.click(saveButton);

    expect(saveNotesAmountMock).toHaveBeenCalled();
    expect(hundredInput.value).toBe('10');
  });

  test('creates a new user when the form is submitted', async () => {
    const nameInput = await screen.getByPlaceholderText('Name') as HTMLInputElement;
    const emailInput = await screen.getByPlaceholderText('Email') as HTMLInputElement;
    const createButton = await screen.getByRole('button', { name: /create user/i });;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(createButton);

    expect(createUserMock).toHaveBeenCalled();

    const newUser = await screen.queryByText('John Doe');

    expect(newUser).toBeInTheDocument();
  });

  test('deletes a user when the delete button is clicked', async () => {
    const deleteButton = await screen.getByTestId('delete-btn');

    fireEvent.click(deleteButton);

    expect(deleteUserMock).toHaveBeenCalled();

    waitForElementToBeRemoved(() => screen.queryByText('John Doe'));
  });
});