getExactMatches = (tokens) => this.matches.filter((match) =>
    match.filter(match.keyword).filter((keyword)) =>
    tokens.some((token) => keyword.includes(token))
);

filterKeyWordByToken = (token, keywords) => {
    return keywords.includes(token)
};