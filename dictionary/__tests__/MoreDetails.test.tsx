import {render} from '@testing-library/react-native';
import {MoreDetails} from '../Pages/MoreDetails';

describe('MoreDetails', () => {
  it('should render the page correctly with provided parameters', () => {
    const route = {
      params: {
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'An instance',
                example: 'This is an example',
              },
            ],
          },
        ],
        word: 'example',
        phonetic: 'ɪɡˈzæmpəl',
      },
    };

    const {getByText} = render(<MoreDetails route={route} />);

    const wordText = getByText('example');
    const phoneticText = getByText('Pronunciation: ɪɡˈzæmpəl');
    const partOfSpeechText = getByText('noun:');
    const definitionText = getByText('An instance Example: This is an example');
    const playSoundText = getByText('Play Sound');

    expect(wordText).toBeDefined();
    expect(phoneticText).toBeDefined();
    expect(partOfSpeechText).toBeDefined();
    expect(definitionText).toBeDefined();
    expect(playSoundText).toBeDefined();
  });
});
