class NumberUtil {
    generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateRandomList(listSize, minNumber, maxNumber) {
        let numbers = [], random;
        do  {
            random = this.generateRandom(minNumber, maxNumber);
            if (!numbers.includes(random)) {
                numbers.push(random);
            }
        } while (numbers.length < listSize);

        return numbers.sort((a,b) => a - b);
    }
}

export { NumberUtil };

