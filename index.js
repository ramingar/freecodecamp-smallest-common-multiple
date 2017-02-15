/**
 * Created by rafael on 14/02/17.
 */
$(() => {

    const isPrime = (num) => {
        for (let ii = 2; ii <= num; ii++) {
            if (num % ii === 0) {
                return num === ii;
            }
        }
    };

    const primeNumbers = (num) => {
        let primes = [];
        for (let ii = 2; ii <= num; ii++) {
            if (isPrime(ii)) {
                primes.push(ii);
            }
        }

        return primes;
    };

    const isDivisor = (num, prime) => num % prime === 0;

    const getDivisors = (num) => {
        const primes = primeNumbers(num);
        let divisors = [];

        for (let ii = 0; ii < primes.length && !isPrime(num);) {
            if (isDivisor(num, primes[ii])) {
                divisors.push(primes[ii]);
                num = num / primes[ii];
            } else {
                ii++;
            }
        }
        divisors.push(num);
        return divisors;
    };

    /**
     *
     * @param num e.g. = 120 = [2, 2, 2, 3, 5]
     * @returns counts e.g. = { 2: 3, 3: 1, 5: 1 }
     */
    const primeFactorization = (num) => {
        const divisors = getDivisors(num);
        const factor = {};
        for (let ii = 0; ii < divisors.length; ii++) {
            let divisor = divisors[ii];
            factor[divisor] = factor[divisor] ? factor[divisor] + 1 : 1;
        }
        return factor;
    };

    function smallestCommons(arr) {
        arr = arr.sort((a, b) => a - b);

        let factorizedNumbers = [];
        for (let ii = arr[0]; ii <= arr[arr.length - 1]; ii++) {
            factorizedNumbers.push(primeFactorization(ii));
        }

        // Choose the highest power of each prime number
        const lcmExponentiation = {};
        for (let ii = 0; ii < factorizedNumbers.length; ii++) {
            let primeKeys = Object.keys(factorizedNumbers[ii]);
            for (let jj = 0; jj < primeKeys.length; jj++) {
                let prime = Object.keys(factorizedNumbers[ii])[jj];
                if (!lcmExponentiation[prime] || (lcmExponentiation[prime] && lcmExponentiation[prime] < factorizedNumbers[ii][prime])) {
                    lcmExponentiation[prime] = factorizedNumbers[ii][prime];
                }
            }
        }

        // The lcm will be the product of multiplying the highest power of each prime number together
        const primes = Object.keys(lcmExponentiation);
        let lcm = 1;
        for (let ii = 0; ii < primes.length; ii++) {
            lcm *= Math.pow(primes[ii], lcmExponentiation[primes[ii]]);
        }

        return lcm;
    }


    smallestCommons([23, 18]);


});