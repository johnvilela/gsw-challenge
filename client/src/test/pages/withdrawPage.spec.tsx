import WithdrawPage from "@/app/account/withdraw/page";
import { ACCOUNT_MOVEMENT_TYPE } from "@/types/AccountMovement";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock('../../hooks/useBanknotes', () => ({
  useBanknotes: jest.fn(() => ({
    setNotesAmount: jest.fn(),
    saveNotesAmount: jest.fn(),
    notesAmount: { '100': 10, '50': 10, '20': 10, '10': 10 },
  })),
}));

const createAccountMovementMock = jest.fn(() => (
  {
    id: '3',
    movementType: ACCOUNT_MOVEMENT_TYPE.WITHDRAW,
    value: 500,
    accountId: '1',
    createdAt: new Date('07/07/2023 12:00:00'),
    banknotes: { '100': 5, }
  }
));

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

const renderComponent = () => render(<WithdrawPage />);

describe('WithDrawPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('it should call the createAccountMovement hook when the form is submitted', async () => {
    const valueInput = await screen.getByLabelText('Value') as HTMLInputElement;
    const submitButton = await screen.getByRole('button', { name: /withdraw money/i });

    fireEvent.change(valueInput, { target: { value: '500' } });
    act(() => {
      fireEvent.click(submitButton);
    });

    expect(createAccountMovementMock).toHaveBeenCalledWith({
      value: 500,
      movementType: ACCOUNT_MOVEMENT_TYPE.WITHDRAW,
      banknotes: { '100': 10, '50': 10, '20': 10, '10': 10 }
    });

    waitFor(() => expect(routerPushMock).toHaveBeenCalled());
  });

  test('it should show the current ammount of banknotes', async () => {
    const valueInput = await screen.getByLabelText('Value') as HTMLInputElement;
    const submitButton = await screen.getByRole('button', { name: /withdraw money/i });

    fireEvent.change(valueInput, { target: { value: '1000' } });

    act(() => {
      fireEvent.click(submitButton);
    });

    waitForElementToBeRemoved(() => submitButton);

    waitFor(() => expect(screen.getByText('R$ 500,00')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('x5')).toBeInTheDocument());
  })
});