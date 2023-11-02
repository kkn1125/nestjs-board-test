const solution = (
  o: {
    birth: Date;
    username: string;
  },
  value: string,
  checkDuplicateWordLength: number,
) => {
  if (
    value.includes(o.username) ||
    value.includes(
      o.birth
        .toLocaleDateString('ko')
        .slice(0, -1)
        .replace(/\.\s/g, '-')
        .replace(/\-+/g, ''),
    )
  ) {
    return false;
  }

  for (let i = 0; i < value.length ** 2; i++) {
    const moveIndex = i % value.length;
    const moveLimit = Math.floor(i / value.length);
    const wordRange = value.slice(moveIndex, moveIndex + moveLimit);
    if (wordRange.length < checkDuplicateWordLength) continue;
    if (value.indexOf(wordRange) !== value.lastIndexOf(wordRange)) return false;
  }

  return true;
};

const userInfo = {
  birth: new Date('1993-11-25'),
  username: 'kimson',
};

const testCases = [
  'test123132',
  'test123test123',
  'tesv15v845',
  'tesv15v845tesv15v845',
  'password123',
  'ad19931125ddd',
  '54568kimson456',
];
for (const tCase of testCases) {
  console.log(tCase.padEnd(20, '-'), solution(userInfo, tCase, 4));
}
