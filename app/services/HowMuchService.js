const PID_100 = 20;
const PID_1000 = 40;

class HowMuchService {
    giveNumber() {
        let pid100 = Math.floor(Math.random() * PID_100);
        let pid1000 = Math.floor(Math.random() * PID_1000);

        if(pid1000 === 1) {
            return Math.floor(Math.random() * 1000);
        } else if(pid100 === 1) {
            return Math.floor(Math.random() * 100);
        } else {
            return Math.floor(Math.random() * 10);
        }
    }
}

export {HowMuchService};
