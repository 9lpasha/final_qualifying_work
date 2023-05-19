// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exercises = require('./dataset_sorted.json');

// console.log(exercises);

const muscleGroups = new Set();

exercises.forEach((item) =>
  !muscleGroups.has(item.bodyPart) ? muscleGroups.add(item.bodyPart) : null,
);

// console.log(muscleGroups);

const idByTitle = (title) => {
  switch (title) {
    case 'lower arms':
      return 10;
    case 'upper legs':
      return 2;
    case 'upper arms':
      return 5;
    case 'back':
      return 8;
    case 'cardio':
      return 6;
    case 'waist':
      return 4;
    case 'chest':
      return 1;
    case 'shoulders':
      return 3;
    case 'neck':
      return 9;
    case 'lower legs':
      return 7;
  }
};

let n = 0;
const request = (n) => {
  axios
    .post(
      'http://185.225.35.213:3000/exercises/create',
      {
        title: exercises[n].name,
        description: null,
        image: exercises[n].gifUrl,
        difficulty: exercises[n].difficulty,
        energy: null,
        overall_rating: null,
        muscleGroupId: idByTitle(exercises[n].bodyPart),
        target: exercises[n].target,
        equipment: exercises[n].equipment,
      },
      {
        headers: {
          Cookie:
            'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6bnVsbCwiaWF0IjoxNjg0MjUzMTE0LCJleHAiOjE2OTIwMjkxMTR9.7fyWWmD3asrwxPJ5w4UvZYvkivwcoZF89F1jRaR7LSY',
        },
      },
    )
    .then(() => {
      n++;
      request(n);
      if (n === exercises.length) {
        console.log('ГОТОВО');
      }
    })
    .catch((error) => {
      console.log('error');
      console.log(item.name);
      console.log(item.bodyPart);
      console.log(error);
    });
};
// request(n);

axios
  .post('http://185.225.35.213:3000/users/rec-training?userId=1', {
    difficulty: 1,
    rating: 5,
  })
  .then((res) => {
    console.log(res.data.slice(1000, 1010));
  });
