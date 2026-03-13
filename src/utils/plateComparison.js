export function getPlateComparisonAlignment(expected, read) {
  const expectedChars = Array.from(expected);
  const readChars = Array.from(read);
  const rows = expectedChars.length;
  const cols = readChars.length;

  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

  for (let i = 0; i <= rows; i += 1) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= cols; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= rows; i += 1) {
    for (let j = 1; j <= cols; j += 1) {
      const matchCost = expectedChars[i - 1] === readChars[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + matchCost,
      );
    }
  }

  const aligned = [];
  let i = rows;
  let j = cols;

  while (i > 0 || j > 0) {
    const expectedChar = i > 0 ? expectedChars[i - 1] : '';
    const readChar = j > 0 ? readChars[j - 1] : '';

    const isMatch =
      i > 0 &&
      j > 0 &&
      expectedChar === readChar &&
      dp[i][j] === dp[i - 1][j - 1];

    if (isMatch) {
      aligned.push({ displayChar: readChar, isMatch: true });
      i -= 1;
      j -= 1;
      continue;
    }

    if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      aligned.push({ displayChar: readChar, isMatch: false });
      i -= 1;
      j -= 1;
      continue;
    }

    if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
      aligned.push({ displayChar: readChar, isMatch: false });
      j -= 1;
      continue;
    }

    if (i > 0) {
      aligned.push({ displayChar: expectedChar, isMatch: false });
      i -= 1;
    }
  }

  return aligned.reverse();
}
