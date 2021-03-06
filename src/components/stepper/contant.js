export const matchResult = [
  {
    type: 'XS',
    range: [0, 39]
  },
  {
    type: 'S',
    range: [38, 41]
  },
  {
    type: 'M',
    range: [42, 43]
  },
  {
    type: 'L',
    range: [44, 45]
  },
  {
    type: 'XL',
    range: [46, 47]
  },
  {
    type: 'XXL',
    range: [48, 56]
  }
];

export const shoulderShape = {
  Narrow: -1,
  Regular: 0,
  Broad: 1
};

export const bellyShape = {
  Regular: 0,
  Flat: -0.5,
  Rounded: 0.5
};

export const fit = {
  Regular: 0,
  Snug: -0.5,
  Loose: 0.5
};

export const company = {
  Roadster: {
    XS: [40, 26, 15.4],
    S: [42, 26.5, 16.2],
    M: [44, 27, 17],
    L: [46, 27.5, 17.8],
    XL: [48.5, 28.5, 18.6],
    XXl: [51, 29.5, 19.5]
  },
  WROGN: {
    XS: [39, 26, 17],
    S: [41, 26.6, 17.5],
    M: [43, 27, 18],
    L: [45, 27.5, 18.5],
    XL: [47, 28, 19.5],
    XXL: [49, 28.5, 20.3]
  },
  HNM: {
    XS: [36.5, 32, 0],
    S: [38.5, 33, 0],
    M: [39.5, 34.5, 0],
    L: [42.5, 37.8, 0],
    XL: [45.5, 41, 0],
    XXL: [48.5, 44.2, 0]
  },
  Fort_collins: {
    XS: [40, 26, 16.5],
    S: [42, 26.5, 17],
    M: [44, 27, 17.5],
    L: [46, 28, 18.5],
    XL: [48, 29, 19.5],
    XXL: [50, 30, 20.5]
  }
};

export const weight = [
  [0, 55],
  [56, 60],
  [61, 65],
  [66, 70],
  [71, 75],
  [76, 80],
  [81, 85],
  [86, 90],
  [91, 95],
  [96, 100],
  [101, 105],
  [106, 200]
];
export const height = [
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10',
  '5.11',
  '6',
  '6.1',
  '6.2',
  '6.3',
  '6.4',
  '6.5'
];

export const calculator = [
  ['xs', 's', '', '', '', '', '', '', '', '', '', ''],
  ['xs', 's', 'm', '', '', '', '', '', '', '', '', ''],
  ['xs', 's', 'm', '', '', '', '', '', 'xl', '', '', ''],
  ['xs', 'm', 'm', '', '', '', '', '', 'xl', '', '', ''],
  ['s', 'm', 's/m', 'm', 'm', 'm', 'm/l', 'm/l', 'l', 'l', '', ''],
  ['s', 'm', 's/m', 'm', 'm', 'm', 'm/l', 'm/l', 'l', 'l', '', ''],
  ['s', 'm/l', 's/m', 'm', 'm', 'l', 'm/l', 'm/l', 'l', 'l', 'xl', ''],
  ['s', 'm/l', 'm', 'm/l', 'm/l', 'l', 'm/l', 'm/l', 'xxl', 'l', 'xl', ''],
  ['s', 'm/l', 'm/l', 'm/l', 'm/l', 'l', 'm/l', 'm/l', 'xxl', 'l', 'xl', 'xxl'],
  ['s', 'm/l', 'm/l', 'l', 'm/l', 'l', 'm/l', 'l', 'xxl', 'l', 'xl', 'xxl'],
  ['', 'm/l', 'm/l', 'l', 'm', 'm/l', 'm/l', 'l', 'xl/xxl', 'l', 'xl', 'xxl'],
  [
    '',
    'm/ l',
    'm/ l',
    'l',
    'm',
    'm/ l',
    'm/ l',
    'l',
    'xl&xxl',
    'l',
    'xl',
    'xxl'
  ],
  ['', '', 'm/l', 'xl', 'm', 'm/l', 'm/l', 'l/xl', 'xl/xxl', 'xl', 'xl', 'xxl'],
  [
    '',
    '',
    'm/l',
    'xl',
    'm/l',
    'm/l',
    'm/l',
    'l/xl',
    'xl/xxl',
    'xl',
    'xl',
    'xxl'
  ],
  [
    '',
    '',
    'm/l',
    'xl',
    'm/l',
    'm/l',
    'm/l',
    'l/xl',
    'xl&xxl',
    'xl',
    'xl',
    'xxl'
  ],
  ['', '', '', 'xl', 'm/l', 'm/l', 'm/l', 'l/xl', 'xl/xxl', 'xl', 'xl', 'xxl'],
  ['', '', '', 'xl', 'm/l', 'm/l', 'l/xl', 'l/xl', 'xl/xxl', 'xl', 'xl', 'xxl']
];
