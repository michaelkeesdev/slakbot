class StringBuilder {
    strings;

    constructor() {
        this.strings = [];
        return this;
    }

    append(value) {
        if (value) {
            this.strings.push(value);
        }
        return this;
    }

    appendFullStopIfNone() {
        if (!StringUtil.lastCharEqualsOneOf(this.toString(), [".", "?", "!"])) {
            responseBuilder.append(".")
        }
    }

    clear() {
        this.strings = [];
        return this;
    }

    toString() {
        return this.strings.join("");
    }
}

export { StringBuilder };
