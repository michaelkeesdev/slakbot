class StringUtil {
    static firstCharToLower = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toLowerCase() + string.slice(1)
    }
}

export { StringUtil };

