import { render, screen } from '@testing-library/react';
import Header from './Header.js';

const date = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
const location = 'Llanfairpwllgwyngyll­gogerychwyrndrobwllllanty­siliogogogoch';
const userName = 'Sakana <>(((*>'
const dateLocation = `${date}, ${location}`

test('renders date location', () => {
  render(<Header locationName={location} userName={userName}/>);
  
  const dateLocationElement = screen.getByText(dateLocation);
  expect(dateLocationElement).toBeInTheDocument();
});

test('renders user name', () => {
  render(<Header locationName={location} userName={userName}/>);
  
  const userNameElement = screen.getByText(userName);
  expect(userNameElement).toBeInTheDocument();
})