export interface Word {
  label: string;
  letter: string;
}

const englishWordData: Array<string> = [
  'the',
  'quick',
  'brown',
  'fox',
  'jumps',
  'over',
  'lazy',
  'dog',
];

export const englishWords: Array<Word> = englishWordData
  .map((word: string) => {
    return {label: '', letter: word}
  });

export const japaneseWords: Array<Word> = [
  // {label: '', letter: ''},
  {label: '犬', letter: 'inu'},
  {label: '猫', letter: 'neko'},
  {label: '兎', letter: 'usagi'},
  {label: '鶏', letter: 'niwatori'},
  {label: '熊', letter: 'kuma'},
  {label: '鵺', letter: 'nue'},
  {label: '鯨', letter: 'kujira'},
  {label: '猪', letter: 'inosisi'},
  {label: '鹿', letter: 'sika'},
  {label: '狐', letter: 'kitune'},
]