/**
 * typingGameコンポーネントにわたすオプションのインターフェース
 */
export interface typingOption {
  forceDvorakMode: boolean,
}

/**
 * forceDvorakModeオプションの取得
 */
export const loadForceDvorakModeOption = (): boolean => {
  const forceDvorak: string | null = localStorage.getItem('forceDvorakMode');
  return toBoolean(forceDvorak)
}

/**
 * forceDvorakModeオプションの保存
 * @param forceDvorakMode
 */
export const saveForceDvorakModeOption = (forceDvorakMode: boolean) => {
  localStorage.setItem('forceDvorakMode', forceDvorakMode.toString())
}

/**
 * localStorageにstringとして保存したbool値をbooleanに戻す
 * @param option bool値に戻したいオプション
 */
const toBoolean = (option: string | null): boolean  => {
  const booleanOption = option === null ? false : option.toLowerCase() === 'true';
  return booleanOption
}
