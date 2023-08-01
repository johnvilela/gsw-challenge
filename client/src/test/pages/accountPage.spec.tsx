import AccountPage from "@/app/account/page";
import { ACCOUNT_MOVEMENT_TYPE } from "@/types/AccountMovement";
import { render, screen } from "@testing-library/react";

jest.mock('../../hooks/useAccount', () => ({
  useAccount: jest.fn(() => ({
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

const renderComponent = () => render(<AccountPage />);

describe('AccountPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('it should render the user name and account balance', async () => {
    const userName = await screen.getByText('John Doe');
    const accountBalance = await screen.getByText('R$ 10.000,00');

    expect(userName).toBeInTheDocument();
    expect(accountBalance).toBeInTheDocument();
  })

  test('it should render the account movements', async () => {
    const depositMovement = await screen.getByText('R$ 1.000,00');
    const withdrawMovement = await screen.getByText('- R$ 500,00');

    expect(depositMovement).toBeInTheDocument();
    expect(withdrawMovement).toBeInTheDocument();
  })

  test('it should render the movements data formatted', async () => {
    const movementOne = await screen.getByText('07/07/2023 - 12:00');
    const movementTwo = await screen.getByText('08/07/2023 - 12:00');

    expect(movementOne).toBeInTheDocument();
    expect(movementTwo).toBeInTheDocument();
  })
});