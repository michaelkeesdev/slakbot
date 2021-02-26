import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

const SIZE_DUPLICATE = 3;
const SIZE_MONOLOGUE = 7;
const PID_DUPLICATE = 3;
const PID_MONOLOGUE = 5;

class Maggie {
  id = "U01NEE5JYSY";

  getMentionResponse = async (textInput, context, files) => {
    const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
    let imageUrl;
    if (files?.length > 0) {
      imageUrl = files[0]?.thumb_960;
    }
    const tokens = maggieBrein.getTokens(text);
    const exactMatches = await maggieBrein.getExactMatches(tokens);
    const fuzzyMatch = await maggieBrein.getFuzzyMatch(tokens);

    let response = "";
    if (fuzzyMatch) {
      response = await fuzzyMatch?.action(text, context, imageUrl);
    } else if (exactMatches) {
      response = await exactMatches[0]?.action(text, context, imageUrl);
    }

    if (!response) {
      switch (true) {
        case maggieBrein.needsToDecide(text):
          response = maggieMond.speakDecision(text);
          break;
        default:
          response = maggieMond.giveBasicAnswer();
      }
    }
    return response;
  };

  getMessageResponses = async (message, user) => {
    maggieBrein.pushMessage({ text: message, user });
    const latestMessages = maggieBrein?.messages;
    const matches = this.getMessageMatches(latestMessages);
    const responses = matches.reduce((result, match) => {
      const message = match.getMessage();
      if(Math.floor(Math.random() * match.pid) === 1 && message) {
        result.push(message);
        maggieBrein.pushMessage({ text: message, user: this.id });
      }
      return result;
    }, [])
    return responses;
  };

  isDuplicateAnswer = (messages, size) => {
    const startIndex = messages?.length - size;
    const endIndex = messages?.length - 1;
    const messagesBag = messages?.slice(startIndex, endIndex);
    return messagesBag?.every((m) => m.text === messagesBag[0].text && m.user !== this.id);
  };

  isMonologueAnswer = (messages, size) => {
    const startIndex = messages.length - size;
    const endIndex = messages.length - 1;
    const messagesBag = messages.slice(startIndex, endIndex);
    return messagesBag?.every((m) => m.user === messagesBag[0].user);
  };

  getMessageMatches = (messages) => {
    const matches = [
      {
        isMatchFn: () => messages?.length >= SIZE_DUPLICATE,
        getMessage: () => { if(this.isDuplicateAnswer(messages, SIZE_DUPLICATE)) { return messages[messages?.length - 1]?.text }},
        pid: PID_DUPLICATE,
      },
      {
        isMatchFn: () => messages?.length >= SIZE_MONOLOGUE,
        getMessage: () => { if(this.isMonologueAnswer(messages, SIZE_MONOLOGUE)) { return maggieMond.sayMonologue() }},
        pid: PID_MONOLOGUE,
      },
    ];
    return matches.filter((match) => match?.isMatchFn());
  };
}

export { Maggie };
