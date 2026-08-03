export const DIFFICULTIES = {
  grade1: { label: 'Grade 1', ops: ['+', '-'], maxN: 10 },
  grade2: { label: 'Grade 2', ops: ['+', '-'], maxN: 99 },
  grade3: { label: 'Grade 3', ops: ['+', '-', '×', '÷'], maxN: 999 },
  grade4: { label: 'Grade 4', ops: ['+', '-', '×', '÷'], maxN: 10000 },
  grade5: { label: 'Grade 5', ops: ['+', '-', '×', '÷'], maxN: 100000 },
  grade6: { label: 'Grade 6', ops: ['+', '-', '×', '÷'], maxN: 1000000 },
  grade7: { label: 'Grade 7', ops: ['+', '-', '×', '÷'], maxN: 1000000 },
};

export const TOPICS = {
  grade1: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations & Algebraic Thinking' },
    { key: 'placevalue', label: 'Number & Operations in Base Ten' },
    { key: 'random', label: 'Random' },
  ],
  grade2: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations & Algebraic Thinking' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'random', label: 'Random' },
  ],
  grade3: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations & Algebraic Thinking' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'random', label: 'Random' },
  ],
  grade4: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations' },
    { key: 'algebra', label: 'Algebraic Thinking' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'fractions', label: 'Fractions' },
    { key: 'random', label: 'Random' },
  ],
  grade5: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations' },
    { key: 'algebra', label: 'Algebraic Patterns & Functions' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'fractions', label: 'Fractions' },
    { key: 'measurement', label: 'Measurement & Data' },
    { key: 'random', label: 'Random' },
  ],
  grade6: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations' },
    { key: 'algebra', label: 'Algebraic Patterns & Functions' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'fractions', label: 'Fractions & Decimals' },
    { key: 'numbers', label: 'Primes, Factors & Multiples' },
    { key: 'measurement', label: 'Measurement & Data' },
    { key: 'random', label: 'Random' },
  ],
  grade7: [
    { key: 'counting', label: 'Counting & Cardinality' },
    { key: 'operations', label: 'Operations' },
    { key: 'algebra', label: 'Algebra & Number Sentences' },
    { key: 'placevalue', label: 'Place Value' },
    { key: 'fractions', label: 'Fractions & Decimals' },
    { key: 'percentages', label: 'Percentages' },
    { key: 'exponents', label: 'Exponents' },
    { key: 'ratios', label: 'Ratios & Rates' },
    { key: 'numbers', label: 'Primes, Factors & Multiples' },
    { key: 'geometry', label: 'Geometry' },
    { key: 'measurement', label: 'Measurement & Data' },
    { key: 'random', label: 'Random' },
  ],
};

function generateArithmeticQuestion(difficulty, maxN) {
  const { ops } = DIFFICULTIES[difficulty] || DIFFICULTIES.grade1;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  if (op === '+') {
    a = Math.floor(Math.random() * maxN) + 1;
    b = Math.floor(Math.random() * maxN) + 1;
    answer = a + b;
  } else if (op === '-') {
    b = Math.floor(Math.random() * maxN) + 1;
    a = b + Math.floor(Math.random() * maxN) + 1;
    answer = a - b;
  } else if (op === '×') {
    a = Math.floor(Math.random() * 12) + 2;
    b = Math.floor(Math.random() * 12) + 2;
    answer = a * b;
  } else {
    b = Math.floor(Math.random() * 11) + 2;
    answer = Math.floor(Math.random() * 11) + 2;
    a = b * answer;
  }

  return { text: `${a} ${op} ${b}`, answer, kind: 'arithmetic', id: Math.random() };
}

function generateCountingQuestion(maxN, difficulty) {
  const questionTypes = ['more', 'less', 'next', 'previous', 'compare'];
  const stepOptions = ['1s', '2s', '3s', '4s', '5s', '10s'];

  if (difficulty === 'grade2') {
    questionTypes.push('pattern', 'backwardPattern');
  }

  if (difficulty === 'grade3') {
    questionTypes.push('pattern', 'backwardPattern');
    stepOptions.push('20s', '25s', '50s', '100s');
  }

  if (difficulty === 'grade4') {
    questionTypes.push('pattern', 'backwardPattern');
    stepOptions.push('20s', '25s', '50s', '100s');
  }

  if (difficulty === 'grade5' || difficulty === 'grade6' || difficulty === 'grade7') {
    questionTypes.push('pattern', 'backwardPattern');
    stepOptions.push('20s', '25s', '50s', '100s', '200s', '250s', '500s', '1000s');
  }

  if (difficulty === 'grade6' || difficulty === 'grade7') {
    stepOptions.push('2000s', '5000s', '10000s');
  }

  if (difficulty === 'grade7') {
    stepOptions.push('20000s', '50000s', '100000s');
  }

  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const value = Math.floor(Math.random() * maxN) + 1;
  const stepKey = stepOptions[Math.floor(Math.random() * stepOptions.length)];
  const step = parseInt(stepKey, 10);

  if (type === 'more') {
    return {
      text: `Count ${step} more than ${value}`,
      answer: value + step,
      kind: 'counting',
      id: Math.random(),
    };
  }

  if (type === 'less') {
    const n = value + step;
    return {
      text: `Count ${step} less than ${n}`,
      answer: n - step,
      kind: 'counting',
      id: Math.random(),
    };
  }

  if (type === 'next') {
    return {
      text: `What number comes next after ${value}?`,
      answer: value + 1,
      kind: 'counting',
      id: Math.random(),
    };
  }

  if (type === 'previous') {
    const n = value + 1;
    return {
      text: `What number comes before ${n}?`,
      answer: value,
      kind: 'counting',
      id: Math.random(),
    };
  }

  if (type === 'pattern' || type === 'backwardPattern') {
    const maxStart = Math.max(1, maxN - step - 10);
    const start = Math.floor(Math.random() * maxStart) + 1;
    if (type === 'pattern') {
      return {
        text: `Count forward by ${step}s starting at ${start}. What number comes next?`,
        answer: start + step,
        kind: 'counting',
        id: Math.random(),
      };
    }

    const backwardStart = start + step;
    return {
      text: `Count backward by ${step}s starting at ${backwardStart}. What number comes next?`,
      answer: backwardStart - step,
      kind: 'counting',
      id: Math.random(),
    };
  }

  const a = Math.floor(Math.random() * Math.min(maxN, 20)) + 1;
  const b = Math.floor(Math.random() * Math.min(maxN, 20)) + 1;
  return {
    text: `Which number is larger: ${a} or ${b}?`,
    answer: Math.max(a, b),
    kind: 'counting',
    id: Math.random(),
  };
}

function generateOperationQuestion(difficulty, maxN) {
  const baseTypes = ['add', 'subtract', 'missing', 'word'];
  const grade3Types = ['divide', 'sharing'];
  const grade4Types = ['multiply', 'divide', 'sharing'];
  const grade7Types = ['multiply', 'divide', 'sharing', 'exponent'];
  const questionTypes = difficulty === 'grade7'
    ? [...baseTypes, ...grade7Types]
    : difficulty === 'grade4'
      ? [...baseTypes, ...grade4Types]
      : difficulty === 'grade3'
        ? [...baseTypes, ...grade3Types]
        : baseTypes;

  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const a = Math.floor(Math.random() * maxN) + 1;
  const b = Math.floor(Math.random() * maxN) + 1;

  if (type === 'add') {
    const isDecimal = difficulty === 'grade7' && Math.random() > 0.5;
    if (isDecimal) {
      const x = Number((Math.random() * (maxN / 10)).toFixed(2));
      const y = Number((Math.random() * (maxN / 10)).toFixed(2));
      return {
        text: `${x} + ${y} = ?`,
        answer: Number((x + y).toFixed(2)),
        kind: 'operations',
        id: Math.random(),
      };
    }

    const x = Math.floor(Math.random() * (maxN - 1)) + 1;
    const y = Math.floor(Math.random() * (maxN - x)) + 1;
    return {
      text: `${x} + ${y} = ?`,
      answer: x + y,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'subtract') {
    const isDecimal = difficulty === 'grade7' && Math.random() > 0.5;
    if (isDecimal) {
      const larger = Number((Math.random() * (maxN / 10) + 1).toFixed(2));
      const smaller = Number((Math.random() * larger).toFixed(2));
      return {
        text: `${larger} - ${smaller} = ?`,
        answer: Number((larger - smaller).toFixed(2)),
        kind: 'operations',
        id: Math.random(),
      };
    }

    const larger = Math.floor(Math.random() * maxN) + 1;
    const smaller = Math.floor(Math.random() * larger) + 1;
    return {
      text: `${larger} - ${smaller} = ?`,
      answer: larger - smaller,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'multiply') {
    const x = Math.floor(Math.random() * 12) + 2;
    const y = Math.floor(Math.random() * 12) + 2;
    return {
      text: `${x} × ${y} = ?`,
      answer: x * y,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'missing') {
    const total = Math.floor(Math.random() * (maxN - 4)) + 5;
    const part = Math.floor(Math.random() * Math.min(total - 1, 20)) + 1;
    return {
      text: `? + ${part} = ${total}`,
      answer: total - part,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'exponent') {
    const base = Math.floor(Math.random() * 5) + 2;
    const exponent = Math.floor(Math.random() * 3) + 2;
    return {
      text: `What is ${base}^${exponent}?`,
      answer: Math.pow(base, exponent),
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'divide') {
    const divisor = Math.floor(Math.random() * 9) + 2;
    const quotient = Math.floor(Math.random() * 10) + 2;
    const dividend = divisor * quotient;
    return {
      text: `What is ${dividend} ÷ ${divisor}?`,
      answer: quotient,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'sharing') {
    const divisor = Math.floor(Math.random() * 9) + 2;
    const dividend = Math.floor(Math.random() * 100) + divisor;
    const remainder = dividend % divisor;
    return {
      text: `Share ${dividend} equally among ${divisor} people. How many are left over?`,
      answer: remainder,
      kind: 'operations',
      id: Math.random(),
    };
  }

  const larger = Math.max(a, b);
  const smaller = Math.min(a, b);
  return {
    text: `Sam had ${larger} marbles and gave ${smaller} away. How many does he have left?`,
    answer: larger - smaller,
    kind: 'operations',
    id: Math.random(),
  };
}

function generateAlgebraQuestion(difficulty, maxN) {
  if (difficulty === 'grade6') {
    if (Math.random() > 0.5) {
      const m = Math.floor(Math.random() * 9) + 2;
      const b = Math.floor(Math.random() * 20) + 1;
      const x = Math.floor(Math.random() * 10) + 2;
      return {
        text: `If f(x) = ${m}x + ${b}, what is f(${x})?`,
        answer: m * x + b,
        kind: 'operations',
        id: Math.random(),
      };
    }

    const start = Math.floor(Math.random() * 11) + 2;
    const step = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
    const sequence = [start, start + step, start + step * 2, start + step * 3].join(', ');
    return {
      text: `What is the next number in the pattern ${sequence}, ?`,
      answer: start + step * 4,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (difficulty === 'grade5') {
    const useFunction = Math.random() > 0.5;
    if (useFunction) {
      const m = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 10) + 1;
      const x = Math.floor(Math.random() * 10) + 2;
      return {
        text: `If f(x) = ${m}x + ${b}, what is f(${x})?`,
        answer: m * x + b,
        kind: 'operations',
        id: Math.random(),
      };
    }

    const start = Math.floor(Math.random() * 6) + 2;
    const step = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
    const sequence = [start, start + step, start + step * 2, start + step * 3].join(', ');
    return {
      text: `What is the next number in the pattern ${sequence}, ?`,
      answer: start + step * 4,
      kind: 'operations',
      id: Math.random(),
    };
  }

  const types = ['linearAdd', 'linearSubtract', 'simpleMultiply', 'simpleDivide'];
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === 'linearAdd') {
    const x = Math.floor(Math.random() * 10) + 2;
    const addend = Math.floor(Math.random() * 10) + 1;
    return {
      text: `Solve for x: x + ${addend} = ${x + addend}`,
      answer: x,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'linearSubtract') {
    const x = Math.floor(Math.random() * 10) + 2;
    const subtrahend = Math.floor(Math.random() * 10) + 1;
    return {
      text: `Solve for x: x - ${subtrahend} = ${x - subtrahend}`,
      answer: x,
      kind: 'operations',
      id: Math.random(),
    };
  }

  if (type === 'simpleMultiply') {
    const multiplier = Math.floor(Math.random() * 8) + 2;
    const x = Math.floor(Math.random() * 10) + 2;
    return {
      text: `Solve for x: ${multiplier} × x = ${multiplier * x}`,
      answer: x,
      kind: 'operations',
      id: Math.random(),
    };
  }

  const divisor = Math.floor(Math.random() * 8) + 2;
  const x = Math.floor(Math.random() * 10) + 2;
  return {
    text: `Solve for x: x ÷ ${divisor} = ${x}`,
    answer: x * divisor,
    kind: 'operations',
    id: Math.random(),
  };
}

function generateIntegerQuestion(difficulty) {
  const value = Math.floor(Math.random() * 20) - 10;
  const second = Math.floor(Math.random() * 20) - 10;
  const type = ['add', 'subtract', 'compare', 'absolute'][Math.floor(Math.random() * 4)];

  if (type === 'add') {
    return {
      text: `What is ${value} + ${second}?`,
      answer: value + second,
      kind: 'integers',
      id: Math.random(),
    };
  }

  if (type === 'subtract') {
    return {
      text: `What is ${value} - ${second}?`,
      answer: value - second,
      kind: 'integers',
      id: Math.random(),
    };
  }

  if (type === 'compare') {
    return {
      text: `Which is greater: ${value} or ${second}?`,
      answer: Math.max(value, second),
      kind: 'integers',
      id: Math.random(),
    };
  }

  return {
    text: `What is the absolute value of ${value}?`,
    answer: Math.abs(value),
    kind: 'integers',
    id: Math.random(),
  };
}

function generatePercentageQuestion(difficulty) {
  const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
  const whole = (Math.floor(Math.random() * 9) + 2) * 10;
  return {
    text: `What is ${percent}% of ${whole}?`,
    answer: Number(((percent / 100) * whole).toFixed(2)),
    kind: 'percentages',
    id: Math.random(),
  };
}

function generateExponentQuestion(difficulty) {
  const base = Math.floor(Math.random() * 5) + 2;
  const exponent = Math.floor(Math.random() * 3) + 2;
  return {
    text: `What is ${base}^${exponent}?`,
    answer: Math.pow(base, exponent),
    kind: 'exponents',
    id: Math.random(),
  };
}

function generateRatioQuestion(difficulty) {
  const a = Math.floor(Math.random() * 4) + 2;
  const b = Math.floor(Math.random() * 4) + 2;
  const multiplier = Math.floor(Math.random() * 5) + 2;
  const total = (a + b) * multiplier;
  return {
    text: `If the ratio of cats to dogs is ${a}:${b} and there are ${total} animals, how many dogs are there?`,
    answer: b * multiplier,
    kind: 'ratios',
    id: Math.random(),
  };
}

function generateNumberConceptsQuestion(difficulty) {
  if (difficulty === 'grade6') {
    const type = ['prime', 'factor', 'multiple'][Math.floor(Math.random() * 3)];
    if (type === 'prime') {
      const options = [12, 15, 17, 21, 23];
      return {
        text: `Which of these numbers is prime? ${options.join(', ')}`,
        answer: 17,
        kind: 'numbers',
        id: Math.random(),
      };
    }

    if (type === 'factor') {
      const factor = Math.floor(Math.random() * 8) + 2;
      const product = factor * (Math.floor(Math.random() * 8) + 2);
      return {
        text: `What factor pairs with ${factor} to make ${product}?`,
        answer: product / factor,
        kind: 'numbers',
        id: Math.random(),
      };
    }

    const base = Math.floor(Math.random() * 8) + 2;
    const multiple = Math.floor(Math.random() * 10) + 5;
    return {
      text: `What is the ${multiple}th multiple of ${base}?`,
      answer: base * multiple,
      kind: 'numbers',
      id: Math.random(),
    };
  }

  const number = Math.floor(Math.random() * 20) + 2;
  return {
    text: `What is a multiple of ${number}?`,
    answer: number * 2,
    kind: 'numbers',
    id: Math.random(),
  };
}

function generateGeometryQuestion(difficulty) {
  if (difficulty === 'grade6') {
    const type = ['perimeter', 'area', 'volume'][Math.floor(Math.random() * 3)];
    if (type === 'perimeter') {
      const length = Math.floor(Math.random() * 20) + 5;
      const width = Math.floor(Math.random() * 15) + 3;
      return {
        text: `What is the perimeter of a rectangle with length ${length} cm and width ${width} cm?`,
        answer: 2 * (length + width),
        kind: 'geometry',
        id: Math.random(),
      };
    }

    if (type === 'area') {
      const width = Math.floor(Math.random() * 15) + 3;
      const height = Math.floor(Math.random() * 15) + 3;
      return {
        text: `What is the area of a rectangle with width ${width} m and height ${height} m?`,
        answer: width * height,
        kind: 'geometry',
        id: Math.random(),
      };
    }

    const length = Math.floor(Math.random() * 8) + 2;
    const width = Math.floor(Math.random() * 8) + 2;
    const height = Math.floor(Math.random() * 8) + 2;
    return {
      text: `What is the volume of a rectangular prism with dimensions ${length} m by ${width} m by ${height} m?`,
      answer: length * width * height,
      kind: 'geometry',
      id: Math.random(),
    };
  }

  return {
    text: 'Geometry questions are not available for this grade yet.',
    answer: 0,
    kind: 'geometry',
    id: Math.random(),
  };
}

function generateMeasurementQuestion(difficulty, maxN) {
  const type = ['speed', 'time', 'distance'][Math.floor(Math.random() * 3)];

  if (type === 'speed') {
    const distance = difficulty === 'grade6'
      ? Math.floor(Math.random() * 400) + 100
      : Math.floor(Math.random() * 90) + 10;
    const time = ((Math.floor(Math.random() * 16) + 5) / 4).toFixed(difficulty === 'grade6' ? 2 : 1);
    const speed = Number((distance / Number(time)).toFixed(difficulty === 'grade6' ? 2 : 1));
    return {
      text: `A car travels ${distance} km in ${time} hours. What is its speed in km/h?`,
      answer: speed,
      kind: 'measurement',
      id: Math.random(),
    };
  }

  if (type === 'time') {
    const speed = difficulty === 'grade6'
      ? Math.floor(Math.random() * 60) + 30
      : Math.floor(Math.random() * 40) + 20;
    const distance = speed * (Math.floor(Math.random() * 8) + 2);
    const time = Number((distance / speed).toFixed(difficulty === 'grade6' ? 2 : 1));
    return {
      text: `How many hours does it take to travel ${distance} km at ${speed} km/h?`,
      answer: time,
      kind: 'measurement',
      id: Math.random(),
    };
  }

  const speed = Math.floor(Math.random() * 20) + 5;
  const time = (Math.floor(Math.random() * 6) + 5) / 2;
  return {
    text: `A cyclist rides for ${time} hours at ${speed} km/h. How far do they travel?`,
    answer: Number((speed * time).toFixed(1)),
    kind: 'measurement',
    id: Math.random(),
  };
}

function generatePlaceValueQuestion(difficulty) {
  if (difficulty === 'grade4') {
    const thousands = Math.floor(Math.random() * 9) + 1;
    const hundreds = Math.floor(Math.random() * 10);
    const tens = Math.floor(Math.random() * 10);
    const ones = Math.floor(Math.random() * 10);
    const number = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
    const type = Math.random() > 0.5 ? 'identify' : 'build';

    if (type === 'identify') {
      const digitType = ['thousands', 'hundreds', 'tens', 'ones'][Math.floor(Math.random() * 4)];
      if (digitType === 'thousands') {
        return {
          text: `What is the value of the thousands digit in ${number}?`,
          answer: thousands * 1000,
          kind: 'placevalue',
          id: Math.random(),
        };
      }
      if (digitType === 'hundreds') {
        return {
          text: `What is the value of the hundreds digit in ${number}?`,
          answer: hundreds * 100,
          kind: 'placevalue',
          id: Math.random(),
        };
      }
      if (digitType === 'tens') {
        return {
          text: `What is the value of the tens digit in ${number}?`,
          answer: tens * 10,
          kind: 'placevalue',
          id: Math.random(),
        };
      }
      return {
        text: `What is the value of the ones digit in ${number}?`,
        answer: ones,
        kind: 'placevalue',
        id: Math.random(),
      };
    }

    return {
      text: `What number is ${thousands} thousands, ${hundreds} hundreds, ${tens} tens and ${ones} ones?`,
      answer: number,
      kind: 'placevalue',
      id: Math.random(),
    };
  }

  if (difficulty === 'grade3') {
    const hundreds = Math.floor(Math.random() * 9) + 1;
    const tens = Math.floor(Math.random() * 10);
    const ones = Math.floor(Math.random() * 10);
    const number = hundreds * 100 + tens * 10 + ones;
    const type = Math.random() > 0.5 ? 'identify' : 'build';

    if (type === 'identify') {
      const digitType = Math.random() > 0.5 ? 'hundreds' : 'ones';
      if (digitType === 'hundreds') {
        return {
          text: `What is the value of the hundreds digit in ${number}?`,
          answer: hundreds * 100,
          kind: 'placevalue',
          id: Math.random(),
        };
      }
      return {
        text: `What is the value of the ones digit in ${number}?`,
        answer: ones,
        kind: 'placevalue',
        id: Math.random(),
      };
    }

    return {
      text: `What number is ${hundreds} hundreds, ${tens} tens and ${ones} ones?`,
      answer: number,
      kind: 'placevalue',
      id: Math.random(),
    };
  }

  const tens = Math.floor(Math.random() * 9) + 1;
  const ones = Math.floor(Math.random() * 10);
  const number = tens * 10 + ones;
  const type = Math.random() > 0.5 ? 'identify' : 'build';

  if (type === 'identify') {
    return {
      text: `How many tens are in ${number}?`,
      answer: tens,
      kind: 'placevalue',
      id: Math.random(),
    };
  }

  return {
    text: `What number is ${tens} tens and ${ones} ones?`,
    answer: number,
    kind: 'placevalue',
    id: Math.random(),
  };
}

function generateFractionQuestion(difficulty) {
  if (difficulty === 'grade6') {
    if (Math.random() > 0.5) {
      const decimals = [0.12, 0.25, 0.33, 0.50, 0.75, 0.88];
      const decimal = decimals[Math.floor(Math.random() * decimals.length)];
      const whole = (Math.floor(Math.random() * 20) + 5) * 10;
      return {
        text: `What is ${decimal.toFixed(2)} of ${whole}?`,
        answer: Number((decimal * whole).toFixed(2)),
        kind: 'fractions',
        id: Math.random(),
      };
    }

    const denominatorOptions = [2, 3, 4, 5, 6, 8, 10, 12];
    const denominator = denominatorOptions[Math.floor(Math.random() * denominatorOptions.length)];
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    const multiple = Math.floor(Math.random() * 8) + 3;
    const whole = denominator * multiple;

    return {
      text: `What is ${numerator}/${denominator} of ${whole}?`,
      answer: (numerator * whole) / denominator,
      kind: 'fractions',
      id: Math.random(),
    };
  }

  if (difficulty === 'grade5') {
    if (Math.random() > 0.5) {
      const decimals = [0.1, 0.2, 0.25, 0.5, 0.75];
      const decimal = decimals[Math.floor(Math.random() * decimals.length)];
      const whole = (Math.floor(Math.random() * 8) + 2) * 10;
      return {
        text: `What is ${decimal} of ${whole}?`,
        answer: Number((decimal * whole).toFixed(1)),
        kind: 'fractions',
        id: Math.random(),
      };
    }

    const denominatorOptions = [2, 3, 4, 5, 6, 8, 10];
    const denominator = denominatorOptions[Math.floor(Math.random() * denominatorOptions.length)];
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    const multiple = Math.floor(Math.random() * 5) + 2;
    const whole = denominator * multiple;

    return {
      text: `What is ${numerator}/${denominator} of ${whole}?`,
      answer: (numerator * whole) / denominator,
      kind: 'fractions',
      id: Math.random(),
    };
  }

  const denominatorOptions = difficulty === 'grade4'
    ? [2, 3, 4, 5, 6, 8, 10]
    : [2, 3, 4, 5];
  const denominator = denominatorOptions[Math.floor(Math.random() * denominatorOptions.length)];
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  const multiple = Math.floor(Math.random() * 5) + 2;
  const whole = numerator * multiple;

  return {
    text: `What is ${numerator}/${denominator} of ${whole}?`,
    answer: (numerator * whole) / denominator,
    kind: 'fractions',
    id: Math.random(),
  };
}

export function generateQuestion(difficulty = 'grade1', topic = 'random') {
  const normalizedDifficulty = DIFFICULTIES[difficulty] ? difficulty : 'grade1';
  const { maxN } = DIFFICULTIES[normalizedDifficulty];
  const availableTopics = TOPICS[normalizedDifficulty] || [{ key: 'random', label: 'Random' }];
  const selectedTopic = topic === 'random' || !availableTopics.some(item => item.key === topic)
    ? availableTopics[Math.floor(Math.random() * availableTopics.length)].key
    : topic;

  const countMax = normalizedDifficulty === 'grade2'
    ? 200
    : normalizedDifficulty === 'grade3' || normalizedDifficulty === 'grade4'
      ? 1000
      : normalizedDifficulty === 'grade5' || normalizedDifficulty === 'grade6'
        ? 100000
        : normalizedDifficulty === 'grade7'
          ? 1000000
          : maxN;

  if (selectedTopic === 'counting') {
    return generateCountingQuestion(countMax, normalizedDifficulty);
  }

  if (selectedTopic === 'operations') {
    return generateOperationQuestion(normalizedDifficulty, maxN);
  }

  if (selectedTopic === 'algebra') {
    return generateAlgebraQuestion(normalizedDifficulty, maxN);
  }

  if (selectedTopic === 'integers') {
    return generateIntegerQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'percentages') {
    return generatePercentageQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'exponents') {
    return generateExponentQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'ratios') {
    return generateRatioQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'numbers') {
    return generateNumberConceptsQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'geometry') {
    return generateGeometryQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'measurement') {
    return generateMeasurementQuestion(normalizedDifficulty, maxN);
  }

  if (selectedTopic === 'placevalue') {
    return generatePlaceValueQuestion(normalizedDifficulty);
  }

  if (selectedTopic === 'fractions') {
    return generateFractionQuestion(normalizedDifficulty);
  }

  return generateArithmeticQuestion(normalizedDifficulty, maxN);
}

export const QUESTION_TIME = 15;
export const ADVANCE_AMOUNT = 0.11;
export const WIN_PROGRESS = 0.995;
