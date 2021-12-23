const PID_100 = 20;
const PID_1000 = 40;

class HowMuchService {
    mood;
    inputText;
    responseBuilder;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

  answer = () => {
        let pid100 = Math.floor(Math.random() * PID_100);
        let pid1000 = Math.floor(Math.random() * PID_1000);

        if(pid1000 === 1) {
            this.responseBuilder.append(Math.floor(Math.random() * 1000));
        } else if(pid100 === 1) {
            this.responseBuilder.append(Math.floor(Math.random() * 100));
        } else {
            this.responseBuilder.append(Math.floor(Math.random() * 10));
        }
        return this.responseBuilder.toString();
    }
}

export {HowMuchService};
