import { render, screen } from '@testing-library/react';
import ItemCard from './ItemCard.js';

const props = {_id: 0, name: 'T-Shirt', weather: 'sunny', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09'}

test('title test item card', () => {
  render(<ItemCard id={props._id} name={props.name} weather={props.weather} link={props.link}/>);
  const linkElement = screen.getByText(props.name);
  expect(linkElement).toBeInTheDocument();
});

test('image test item card', () => {
  render(<ItemCard id={props._id} name={props.name} weather={props.weather} link={props.link} />)
  const imageElement = screen.getByAltText(props.name)
  expect(imageElement).toHaveAttribute('src', props.link);
  // expect(imageElement).to
})