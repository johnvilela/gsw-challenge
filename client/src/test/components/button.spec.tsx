import { Button } from '@/components/inputs/Button';
import { render, fireEvent } from '@testing-library/react';


describe('Button', () => {
  it('renders the button with the correct text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument;
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when isLoading is true', () => {
    const { getByRole } = render(<Button isLoading>Click me</Button>);
    expect(getByRole('button')).toBeDisabled;
  });

  it('applies the customClass to the button', () => {
    const { getByText } = render(<Button customClass="my-class">Click me</Button>);
    expect(getByText('Click me')).toHaveClass('my-class');
  });

  it('applies the correct variant styles to the button', () => {
    const { getByText } = render(<Button variant="secondary">Click me</Button>);
    expect(getByText('Click me')).toHaveClass('bg-white');
    expect(getByText('Click me')).toHaveClass('text-pink-500');
  });
});