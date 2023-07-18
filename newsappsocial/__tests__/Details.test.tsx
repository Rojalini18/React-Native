import React from 'react';
import {render} from '@testing-library/react-native';
import Details from '../Pages/Details';

describe('Details component', () => {
  const article = {
    title: 'Test Article',
    urlToImage: 'https://google.com/image.jpg',
    description: 'Test article description',
    source: {name: 'Test Source'},
  };

  it('renders the article details correctly', () => {
    const route = {params: {article}};
    const {getByText, getByTestId} = render(<Details route={route} />);

    const title = getByText(article.title);
    const description = getByText(article.description);
    const source = getByText(article.source.name);
    const articleImage = getByTestId('article-image');

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(source).toBeTruthy();
    expect(articleImage.props.source.uri).toBe(article.urlToImage);
  });
});
