function patternFunction(n) {
    for (let i = 1; i <= n; i++) {
        let output = '';
        for (let j = 1; j <= n + 3; j++) {
            output += j;
            if (i === j) {
                output += '**';
                j += 2;
            }
        }
        console.log(output);
    }
}

// Contoh penggunaan
patternFunction(5);
patternFunction(4);
