import { Tokenizer, NNTokenizer, WordPieceTokenizer }  from 'nlp-tokenizer';

class TokenizerService {
  tokenizer;

  constructor() {
     this.tokenizer = new Tokenizer()
  }

  tokenize = (text) => {
    return this.tokenizer.tokenize(text);
  } 
}

export { TokenizerService };
