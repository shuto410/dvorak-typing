export const enableForceDvorakMode = () => {
    Object.defineProperty(KeyboardEvent.prototype, 'key', {
        configurable: true,
        get: function() {
            if (this.shiftKey) {
                switch (this.code) {
                case 'BracketLeft': return '?'
                case 'Digit1': return '!'
                default: return ''
                }
            }
            switch (this.code) {
                // 真ん中の列
                case 'KeyA': return 'a'
                case 'KeyS': return 'o'
                case 'KeyD': return 'e'
                case 'KeyF': return 'u'
                case 'KeyG': return 'i'
                case 'KeyH': return 'd'
                case 'KeyJ': return 'h'
                case 'KeyK': return 't'
                case 'KeyL': return 'n'
                case 'Semicolon': return 's'
                case 'Quote': return '-'
                // 上段
                case 'KeyQ': return '\''
                case 'KeyW': return ','
                case 'KeyE': return '.'
                case 'KeyR': return 'p'
                case 'KeyT': return 'y'
                case 'KeyY': return 'f'
                case 'KeyU': return 'g'
                case 'KeyI': return 'c'
                case 'KeyO': return 'r'
                case 'KeyP': return 'l'
                // 下段
                case 'KeyZ': return ';'
                case 'KeyX': return 'q'
                case 'KeyC': return 'j'
                case 'KeyV': return 'k'
                case 'KeyB': return 'x'
                case 'KeyN': return 'b'
                case 'KeyM': return 'm'
                case 'Comma': return 'w'
                case 'Period': return 'v'
                case 'Slash': return 'z'
                default: return ''
            }
        }
    })
}
export const disableForceDvorakMode = () => {
    Object.defineProperty(KeyboardEvent.prototype, 'key', {
        configurable: true,
        get: function() {
            if (this.shiftKey) {
                switch (this.code) {
                case 'BracketLeft': return '{'
                case 'Digit1': return '!'
                default: return ''
                }
            }
            switch (this.code) {
                // 真ん中の列
                case 'KeyA': return 'a'
                case 'KeyS': return 's'
                case 'KeyD': return 'd'
                case 'KeyF': return 'f'
                case 'KeyG': return 'g'
                case 'KeyH': return 'h'
                case 'KeyJ': return 'j'
                case 'KeyK': return 'k'
                case 'KeyL': return 'l'
                case 'Semicolon': return ';'
                case 'Quote': return '\''
                // 上段
                case 'KeyQ': return 'q'
                case 'KeyW': return 'w'
                case 'KeyE': return 'e'
                case 'KeyR': return 'r'
                case 'KeyT': return 't'
                case 'KeyY': return 'y'
                case 'KeyU': return 'u'
                case 'KeyI': return 'i'
                case 'KeyO': return 'o'
                case 'KeyP': return 'p'
                // 下段
                case 'KeyZ': return 'z'
                case 'KeyX': return 'x'
                case 'KeyC': return 'c'
                case 'KeyV': return 'v'
                case 'KeyB': return 'b'
                case 'KeyN': return 'n'
                case 'KeyM': return 'm'
                case 'Comma': return ','
                case 'Period': return '.'
                case 'Slash': return '/'
                default: return ''
            }
        }
    })
}