/* ==========================================================================  **
## HW Instructions

See this Google doc for clarifications:

https://docs.google.com/document/d/1FOT8mdx-UjH9cYgUYDRv1EqRMRSAEFINcxhzR6tLTi0/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in hw2.ts, back to the github classroom
   repository. Please make sure you solution compiles!!! 

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw2.ts
   ```
   to produce a file `hw2.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw2.ts must compile, and we must be able to run the compiled js file
   using `node`.
2. **Do not** change any of the function interfaces.
3. **Do not** use any external libraries.
4. Replace `throw Error("TODO")` with your code. If you do not attempt a problem,
   please leave the `throw Error("TODO")` code there unmodified.
5. Always remember to check the function input types and the output types.
6. You can create any other additional helper functions that you would like.
7. You can leave testing code in provided that your code compiles and does not
   depend on external libraries. Remember it is up to you to test your own code.
8. You can use your solutions to questions in this assignment to answer other question
   in this assignment.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "<your-full-name-here>"; // TODO: FILL ME IN

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];



/* ==========================================================================  **
## 1. Five Item Rows (30 pts)

In this problem, we'll work with rows of items that contain exactly five items.
The benefit of having exactly five items is that we can use the type-system
to help us enforce in-bounds accesses of the tuple. The drawback of having
exactly five items is that we may have to modify it to hold any number of items.

** ============================================================================ */

export type fiveItemRow<T> = {
    entries: [T, T, T, T, T]   // A five item row
};

type letter = 
    "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" |
    "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" |
    "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" |
    "Y" | "Z";

const row1: fiveItemRow<letter> = {
    entries: ['J', 'O', 'K', 'E', 'R']
};

const row2: fiveItemRow<letter> = {
    entries: ['P', 'O', 'K', 'E', 'R']
};

const row3: fiveItemRow<letter> = {
    entries: ['M', 'U', 'S', 'K', 'Y']
};

const row4: fiveItemRow<letter> = {
    entries: ['F', 'U', 'S', 'S', 'Y']
};

const row5: fiveItemRow<letter> = {
    entries: ['H', 'O', 'U', 'S', 'E']
};


/* ----------------------------------------------------- **
### 1a. Complete the function definition below. (10 pts)

`filterFiveItemRow` is a **pure** function that takes a row and
keeps those entries which satisfy the condition.

Example:
    filterFiveItemRow(row1, (arg) => arg === 'Z') = [ ]

Example:
    filterFiveItemRow(row2, (arg) => arg === 'K') = [ 'K' ]

Example:
    filterFiveItemRow(row3, (arg) => arg !== 'K') = [ 'M', 'U', 'S', 'Y' ]

Example:
    filterFiveItemRow(row4, (arg) => arg === 'S') = [ 'S', 'S' ]

Example:
    filterFiveItemRow(row5, (arg) => arg === 'S' || arg === 'O') = [ 'O', 'S' ]

** ----------------------------------------------------- */

export function filterFiveItemRow<T>(row: fiveItemRow<T>, cond: (arg: T) => boolean): T[] {
    throw Error("TODO");
}


/* ----------------------------------------------------- **
### 1b. Complete the function definition below. (10 pts)

`dropFiveItemRow` is a **pure** function that takes a row and
eliminates those entries whose indicies are specified in indices.

Example:
    dropFiveItemRow(row1, []) = [ 'J', 'O', 'K', 'E', 'R' ]

Example:
    dropFiveItemRow(row1, [4]) = [ 'J', 'O', 'K', 'E' ]

Example:
    dropFiveItemRow(row1, [3, 2]) = [ 'J', 'O', 'R' ]

Example:
    dropFiveItemRow(row1, [1, 2]) = [ 'J', 'E', 'R' ]

Example:
    dropFiveItemRow(row1, [1, 2, 3, 4]) = [ 'R' ]

** ----------------------------------------------------- */

export function dropFiveItemRow<T>(row: fiveItemRow<T>, indices: number[]): T[] {
    throw Error("TODO");
}

/* ----------------------------------------------------- **
### 1c. Complete the function definition below. (10 pts)

`mapFiveItemRow` is a **pure** function that takes a row and
produces a new row with the given function f.

Example:
    mapFiveItemRow(row1, (arg) => 0) = { 
        entries: [ 0, 0, 0, 0, 0 ] 
    }

Example:
    mapFiveItemRow(row1, (arg) => arg + "!") = { 
        entries: [ 'J!', 'O!', 'K!', 'E!', 'R!' ] 
    }

Example:
    mapFiveItemRow(row1, (arg) => arg.length) = {
        entries: [ 1, 1, 1, 1, 1 ]
    }

** ----------------------------------------------------- */

export function mapFiveItemRow<S, T>(row: fiveItemRow<S>, f: (arg: S) => T): fiveItemRow<T> {
    throw Error("TODO");
}
  

/* ==========================================================================  **
## 2. Basic Functions on Wordle Board (30 pts)

We'll now use the fiveItemRow from before to create a Wordle board with 3 guesses
and write basic functions that operate on this board.

Wordle game: https://www.nytimes.com/games/wordle/index.html

** ============================================================================ */

// Sum type used to encode the state of each letter
export type State =
    "GUESS"    // The user's guess.
  | "RED"      // Red means that the letter is nowhere in the word.
  | "GRAY"     // Gray means that the letter exists in the word but is not in the right position.
  | "GREEN";   // Green means that the letter is in the right position.


export type Wordle3 = {
    word: fiveItemRow<letter>,           // The word we are trying to guess
    guesses: [
        fiveItemRow<[State, letter]>,    // Guess 1
        fiveItemRow<[State, letter]>,    // Guess 2
        fiveItemRow<[State, letter]>     // Guess 3
    ]
};

export const wordle1: Wordle3 = {
    word: {
        entries: ['J', 'O', 'K', 'E', 'R']
    },
    guesses: [
        {
            entries: [
                ["GUESS", 'M'],
                ["GUESS", 'U'],
                ["GUESS", 'S'],
                ["GUESS", 'K'],
                ["GUESS", 'Y']
            ]
        },
        {
            entries: [
                ["GUESS", 'F'],
                ["GUESS", 'U'],
                ["GUESS", 'S'],
                ["GUESS", 'S'],
                ["GUESS", 'Y']
            ]
        },
        {
            entries: [
                ["GUESS", 'H'],
                ["GUESS", 'O'],
                ["GUESS", 'U'],
                ["GUESS", 'S'],
                ["GUESS", 'E']
            ]
        }
    ]
}

export const wordle2: Wordle3 = {
    word: {
        entries: ['J', 'O', 'K', 'E', 'R']
    },
    guesses: [
        {
            entries: [
                ["GUESS", 'C'],
                ["GUESS", 'A'],
                ["GUESS", 'K'],
                ["GUESS", 'E'],
                ["GUESS", 'S']
            ]
        },
        {
            entries: [
                ["GUESS", 'P'],
                ["GUESS", 'O'],
                ["GUESS", 'K'],
                ["GUESS", 'E'],
                ["GUESS", 'R']
            ]
        },
        {
            entries: [
                ["GUESS", 'J'],
                ["GUESS", 'O'],
                ["GUESS", 'K'],
                ["GUESS", 'E'],
                ["GUESS", 'R']
            ]
        },
    ]
}

/* ----------------------------------------------------- **
### 2a. Complete the function definition below. (15 pts)

`wordle3GetGuess` is a **pure** function that takes a Wordle board and
returns the `fiveItemRow` corresponding to the guess number. We are using
guess 1 to refer to index 0. If the guess index is out-of-bounds, you should
throw an error. This is because we have encoded in our type-system that
guesses should always be in-bounds.

Example:
    wordle3GetGuess(wordle1, 1) = {
        entries: [
            [ 'GUESS', 'M' ],
            [ 'GUESS', 'U' ],
            [ 'GUESS', 'S' ],
            [ 'GUESS', 'K' ],
            [ 'GUESS', 'Y' ]
        ]
    }

Example:
    wordle3GetGuess(wordle1, 2) = {
        entries: [
            [ 'GUESS', 'F' ],
            [ 'GUESS', 'U' ],
            [ 'GUESS', 'S' ],
            [ 'GUESS', 'S' ],
            [ 'GUESS', 'Y' ]
        ]
    }

Example:
    wordle3GetGuess(wordle1, 3) = {
        entries: [
            [ 'GUESS', 'H' ],
            [ 'GUESS', 'O' ],
            [ 'GUESS', 'U' ],
            [ 'GUESS', 'S' ],
            [ 'GUESS', 'E' ]
        ]
    }

** ----------------------------------------------------- */

export function wordle3GetGuess(wordle: Wordle3, guess: 1|2|3): fiveItemRow<[State, letter]> {
    throw Error("TODO");
}


/* ----------------------------------------------------- **
### 2b. Complete the function definition below. (15 pts)

`wordle3SetGuess` is a **pure** function that takes a Wordle board,
a guess position, and a fiveItemRow containing the guesses, and produces
a Wordle board with an updated guess. The State of each letter in the 
updated guess position should be "GUESS". Leave all other guesses
unchanged. If the guess position is out-of-bounds, return the Wordle
board unchanged.

Example:
    wordle3SetGuess(wordle1, 1, {entries: ['M', 'U', 'S', 'E', 'S']}) = 

        {
        word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
        guesses: [
            {
            entries: [
                [ 'GUESS', 'M' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'E' ],
                [ 'GUESS', 'S' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'F' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'Y' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'H' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'E' ]
            ]
            }
        ]
        }

Example:
    wordle3SetGuess(wordle1, 1, {entries: ['S', 'A', 'P', 'P', 'Y']}) = 
        {
        word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
        guesses: [
            {
            entries: [
                [ 'GUESS', 'M' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'K' ],
                [ 'GUESS', 'Y' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'A' ],
                [ 'GUESS', 'P' ],
                [ 'GUESS', 'P' ],
                [ 'GUESS', 'Y' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'H' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'E' ]
            ]
            }
        ]
        }

Example:
    wordle3SetGuess(wordle1, 3, {entries: ['H', 'A', 'P', 'P', 'Y']}) = 
        {
        word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
        guesses: [
            {
            entries: [
                [ 'GUESS', 'M' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'K' ],
                [ 'GUESS', 'Y' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'F' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'Y' ]
            ]
            },
            {
            entries: [
                [ 'GUESS', 'H' ],
                [ 'GUESS', 'A' ],
                [ 'GUESS', 'P' ],
                [ 'GUESS', 'P' ],
                [ 'GUESS', 'Y' ]
            ]
            }
        ]
        }
** ----------------------------------------------------- */

export function wordle3SetGuess(wordle: Wordle3, guess: 1|2|3, row: fiveItemRow<letter>): Wordle3 {
    throw Error("TODO");
}


/* ==========================================================================  **
## 3. Advanced Functions on Wordle Board (40 pts)

We'll now write advanced functions that operate on the Wordle board.

** ============================================================================ */

/* ----------------------------------------------------- **
### 3a. Complete the function definition below. (15 pts)

`wordle3UsedLetters` is a **pure** function that takes a Wordle board
and a guess position, and returns all the letters in that guess
position that also appear in the Wordle word.

Example:
    wordle3UsedLetters(wordle1, 1) = [ 'K' ]

Example:
    wordle3UsedLetters(wordle1, 2) = [ ]

Example:
    wordle3UsedLetters(wordle1, 3) = [ 'O', 'E' ]

** ----------------------------------------------------- */

export function wordle3UsedLetters(wordle: Wordle3, guess: 1|2|3): letter[] {
    throw Error("TODO");
}


/* ----------------------------------------------------- **
### 3b. Complete the function definition below. (25 pts)

`wordle3Update` is a **pure** function that updates the state of the
Wordle board at the guess position to reflect the rules of Worlde:
1. If the letter is in the position at the correct place, set the
   `State` of that position to "GREEN".
2. If the letter exists in the word but in the incorrect position, set the
   `State` of that position to "GRAY".
3. If the letter does not exist in the word, set the
   `State` of that position to "RED".
It **does not** matter what the starting State is.
**Do not** change the letters.


Example:
  
  const wordle1_1 = wordle3Update(wordle1, 1);
  const wordle1_2 = wordle3Update(wordle1_1, 2);
  const wordle1_3 = wordle3Update(wordle1_2, 3);
  
  wordle1_1 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'M' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'GRAY', 'K' ],
                [ 'RED', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'F' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'H' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'E' ]
            ]
        }
    ]
  }

  wordle1_2 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'M' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'GRAY', 'K' ],
                [ 'RED', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'RED', 'F' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'RED', 'S' ],
                [ 'RED', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'H' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'U' ],
                [ 'GUESS', 'S' ],
                [ 'GUESS', 'E' ]
            ]
        }
    ]
  }

  wordle1_3 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'M' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'GRAY', 'K' ],
                [ 'RED', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'RED', 'F' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'RED', 'S' ],
                [ 'RED', 'Y' ]
            ]
        },
        {
            entries: [
                [ 'RED', 'H' ],
                [ 'GREEN', 'O' ],
                [ 'RED', 'U' ],
                [ 'RED', 'S' ],
                [ 'GRAY', 'E' ]
            ]
        }
    ]
  }



Example:

  const wordle2_1 = wordle3Update(wordle2, 1);
  const wordle2_2 = wordle3Update(wordle2_1, 2);
  const wordle2_3 = wordle3Update(wordle2_2, 3);

  wordle2_1 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'C' ],
                [ 'RED', 'A' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'RED', 'S' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'P' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'K' ],
                [ 'GUESS', 'E' ],
                [ 'GUESS', 'R' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'J' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'K' ],
                [ 'GUESS', 'E' ],
                [ 'GUESS', 'R' ]
            ]
        }
    ]
  }

  wordle2_2 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'C' ],
                [ 'RED', 'A' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'RED', 'S' ]
            ]
        },
        {
            entries: [
                [ 'RED', 'P' ],
                [ 'GREEN', 'O' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'GREEN', 'R' ]
            ]
        },
        {
            entries: [
                [ 'GUESS', 'J' ],
                [ 'GUESS', 'O' ],
                [ 'GUESS', 'K' ],
                [ 'GUESS', 'E' ],
                [ 'GUESS', 'R' ]
            ]
        }
    ]
  }

  wordle2_3 = 
  {
    word: { entries: [ 'J', 'O', 'K', 'E', 'R' ] },
    guesses: [
        {
            entries: [
                [ 'RED', 'C' ],
                [ 'RED', 'A' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'RED', 'S' ]
            ]
        },
        {
            entries: [
                [ 'RED', 'P' ],
                [ 'GREEN', 'O' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'GREEN', 'R' ]
            ]
        },
        {
            entries: [
                [ 'GREEN', 'J' ],
                [ 'GREEN', 'O' ],
                [ 'GREEN', 'K' ],
                [ 'GREEN', 'E' ],
                [ 'GREEN', 'R' ]
            ]
        }
    ]
  }

** ----------------------------------------------------- */

export function wordle3Update(wordle: Wordle3, guess: 1|2|3): Wordle3 {
    throw Error("TODO");
}
