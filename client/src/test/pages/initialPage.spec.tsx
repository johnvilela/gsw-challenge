import InitialPage from "@/app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const users = [
  { id: '1', name: 'John Doe', email: 'john.doe@gmail.com' },
];
const findByEmailMock = jest.fn((email: string) => users.find(user => user.email === email));

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(() => ({
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    listUsers: jest.fn(),
    findByEmail: findByEmailMock,
    status: 'success',
    users,
  })),
}));

const routerPushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: routerPushMock,
  })),
}));

const renderComponent = () => render(<InitialPage />);

describe('InitialPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('redirects to the account page when the form is submitted', async () => {
    const emailInput = await screen.getByPlaceholderText('Email') as HTMLInputElement;
    const submitButton = await screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'john.vdoe@gmail.com' } });
    fireEvent.click(submitButton);

    expect(findByEmailMock).toHaveBeenCalled();
    waitFor(() => expect(routerPushMock).toHaveBeenCalled());
  });
});