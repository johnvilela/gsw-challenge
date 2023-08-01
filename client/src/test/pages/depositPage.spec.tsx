import DepositPage from "@/app/account/deposit/page";
import { ACCOUNT_MOVEMENT_TYPE } from "@/types/AccountMovement";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const createAccountMovementMock = jest.fn();

jest.mock('../../hooks/useAccount', () => ({
  useAccount: jest.fn(() => ({
    createAccountMovement: createAccountMovementMock,
    userAccount: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      account: {
        id: '1',
        totalValue: 10000,
        movements: [
          {
            id: '1',
            movementType: ACCOUNT_MOVEMENT_TYPE.DEPOSIT,
            value: 1000,
            accountId: '1',
            createdAt: new Date('07/08/2023 12:00:00'),
          },
          {
            id: '2',
            movementType: ACCOUNT_MOVEMENT_TYPE.WITHDRAW,
            value: 500,
            accountId: '1',
            createdAt: new Date('07/07/2023 12:00:00'),
          },
        ]
      }
    }
  })),
}));

const routerPushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: routerPushMock,
  })),
}));

const renderComponent = () => render(<DepositPage />);

describe('DepositPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('it should call the createAccountMovement hook when the form is submitted', async () => {
    const valueInput = await screen.getByLabelText('Value') as HTMLInputElement;
    const submitButton = await screen.getByRole('button', { name: /deposit/i });

    fireEvent.change(valueInput, { target: { value: '1000' } });
    fireEvent.click(submitButton);

    expect(createAccountMovementMock).toHaveBeenCalledWith({
      value: 1000,
      movementType: ACCOUNT_MOVEMENT_TYPE.DEPOSIT,
    });

    waitFor(() => expect(routerPushMock).toHaveBeenCalled());
  });
});