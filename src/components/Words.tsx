export interface word {
  display: string;
  type: string;
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

export const englishWords: Array<word> = englishWordData
  .map((word: string) => {
    return {display: '', type: word}
  });

export const japaneseWords: Array<word> = [
  // {display: '', type: ''},
  {display: '犬', type: 'inu'},
  {display: '猫', type: 'neko'},
  {display: '兎', type: 'usagi'},
  {display: '鶏', type: 'niwatori'},
  {display: '熊', type: 'kuma'},
  {display: '鵺', type: 'nue'},
  {display: '鯨', type: 'kujira'},
  {display: '猪', type: 'inosisi'},
  {display: '鹿', type: 'sika'},
  {display: '狐', type: 'kitune'},
]