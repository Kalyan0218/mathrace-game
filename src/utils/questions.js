export const DIFFICULTIES = {
  grade1: { label: 'Grade 1', ops: ['+', '-'],           maxN: 10 },
  grade2: { label: 'Grade 2', ops: ['+', '-'],           maxN: 20 },
  grade3: { label: 'Grade 3', ops: ['+', '-', '×'],      maxN: 30 },
  grade4: { label: 'Grade 4', ops: ['+', '-', '×'],      maxN: 50 },
  grade5: { label: 'Grade 5', ops: ['+', '-', '×', '÷'], maxN: 75 },
  grade6: { label: 'Grade 6', ops: ['+', '-', '×', '÷'], maxN: 100 },
  grade7: { label: 'Grade 7', ops: ['+', '-', '×', '÷'], maxN: 150 },
};

export function generateQuestion(difficulty) {
  const { ops, maxN } = DIFFICULTIES[difficulty];
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

  return { text: `${a} ${op} ${b}`, answer, id: Math.random() };
}

export const QUESTION_TIME = 15;
export const ADVANCE_AMOUNT = 0.11;
export const WIN_PROGRESS = 0.995;
