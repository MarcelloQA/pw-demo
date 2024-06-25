import { Filter } from 'interfaces/filter';

export const categoryFilter: {
  cardio: Filter;
  exercise: Filter;
} = {
  cardio: {
    name: 'Cardio',
  },
  exercise: {
    name: 'Exercise',
  },
};

export const activityFilter: {
  yoga: Filter;
  recreation: Filter;
  gym: Filter;
  athletic: Filter;
  sports: Filter;
} = {
  yoga: {
    name: 'Yoga',
  },
  recreation: {
    name: 'Recreation',
  },
  gym: {
    name: 'Gym',
  },
  athletic: {
    name: 'Athletic',
  },
  sports: {
    name: 'Sports',
  },
};
