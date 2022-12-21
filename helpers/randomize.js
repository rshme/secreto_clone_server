const randomize = length => {
    const sources = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let chars = ""

    for (let i = 0; i < length; i++) {
        chars += sources.charAt(Math.floor(Math.random() * sources.length))
    }

    return chars
}

export default randomize