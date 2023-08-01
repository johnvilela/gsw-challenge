import { Textfield } from '@/components/inputs/Textfield';
import { render, fireEvent } from '@testing-library/react';
import { AiOutlineUser } from 'react-icons/ai';

describe('Textfield', () => {
  it('renders the label and input with the correct attributes', () => {
    const { getByLabelText } = render(<Textfield id="username" label="Username" />);
    const input = getByLabelText('Username') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBe('username');
  });

  it('renders the icon when provided', () => {
    const { getByTestId } = render(<Textfield icon={AiOutlineUser} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('calls the onChange function when the input value changes', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<Textfield id="username" label="Username" onChange={handleChange} />);
    const input = getByLabelText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('test');
  });
});