const recipeMocks = [{
  id: 1,
  name: 'Aenean auctor gravida sem.',
  method: 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
  servings: 4,
  cooking_time: 152,
  tags: null,
  ingredients: [
    {
      name: 'vel accumsan',
      category: 'poultry',
      number_of: 87,
      measurement_unit: 'kg',
      derived_cost: 6.09
    },
    {
      name: 'est phasellus',
      category: 'dairy',
      number_of: 32,
      measurement_unit: 'kg',
      derived_cost: 1.64
    },
    {
      name: 'mollis',
      category: 'vegetable',
      number_of: 39,
      measurement_unit: 'kg',
      derived_cost: 8.96
    },
    {
      name: 'sodales sed',
      category: 'longlife',
      number_of: 95,
      measurement_unit: 'mg',
      derived_cost: 0.21
    },
    {
      name: 'vivamus',
      category: 'meat',
      number_of: 99,
      measurement_unit: 'g',
      derived_cost: 8.25
    },
    {
      name: 'sem',
      category: 'bread',
      number_of: 40,
      measurement_unit: 'kg',
      derived_cost: 7.58
    },
    {
      name: 'platea',
      category: 'vegetable',
      number_of: 87,
      measurement_unit: 'mg',
      derived_cost: 8.05
    },
    {
      name: 'id',
      category: 'fish',
      number_of: 32,
      measurement_unit: 'L',
      derived_cost: 5.66
    }
  ]
}, {
  id: 2,
  name: 'Suspendisse potenti.',
  method: 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
  servings: 8,
  cooking_time: 287,
  tags: 'GF',
  ingredients: [
    {
      name: 'at feugiat',
      category: 'bread',
      number_of: 26,
      measurement_unit: 'kg',
      derived_cost: 5.34
    },
    {
      name: 'neque vestibulum',
      category: 'grains',
      number_of: 39,
      measurement_unit: 'mL',
      derived_cost: 4.46
    },
    {
      name: 'ante ipsum',
      category: 'vegetable',
      number_of: 36,
      measurement_unit: 'g',
      derived_cost: 8.79
    },
    {
      name: 'convallis morbi',
      category: 'bread',
      number_of: 62,
      measurement_unit: 'mg',
      derived_cost: 0.65
    },
    {
      name: 'vestibulum proin',
      category: 'grains',
      number_of: 65,
      measurement_unit: 'kg',
      derived_cost: 3.59
    },
    {
      name: 'ligula vehicula',
      category: 'longlife',
      number_of: 57,
      measurement_unit: 'L',
      derived_cost: 7.67
    },
    {
      name: 'in consequat',
      category: 'vegetable',
      number_of: 93,
      measurement_unit: 'mL',
      derived_cost: 1.74
    },
    {
      name: 'nisl',
      category: 'meat',
      number_of: 26,
      measurement_unit: 'mL',
      derived_cost: 0.0
    },
    {
      name: 'pede',
      category: 'meat',
      number_of: 76,
      measurement_unit: 'mL',
      derived_cost: 8.32
    }
  ]
}, {
  id: 3,
  name: 'Integer tincidunt ante vel ipsum.',
  method: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
  servings: 6,
  cooking_time: 237,
  tags: null,
  ingredients: [
    {
      name: 'in ante',
      category: 'meat',
      number_of: 29,
      measurement_unit: 'mg',
      derived_cost: 0.08
    },
    {
      name: 'suspendisse ornare',
      category: 'fish',
      number_of: 99,
      measurement_unit: 'mg',
      derived_cost: 9.81
    },
    {
      name: 'sed vestibulum',
      category: 'poultry',
      number_of: 100,
      measurement_unit: 'mg',
      derived_cost: 5.6
    },
    {
      name: 'eu pede',
      category: 'dairy',
      number_of: 40,
      measurement_unit: 'mL',
      derived_cost: 7.32
    },
    {
      name: 'neque',
      category: 'bread',
      number_of: 30,
      measurement_unit: 'kg',
      derived_cost: 5.77
    },
    {
      name: 'metus vitae',
      category: 'fish',
      number_of: 36,
      measurement_unit: 'mg',
      derived_cost: 4.08
    },
    {
      name: 'a ipsum',
      category: 'bread',
      number_of: 76,
      measurement_unit: 'mg',
      derived_cost: 7.91
    },
    {
      name: 'justo',
      category: 'poultry',
      number_of: 47,
      measurement_unit: 'L',
      derived_cost: 5.25
    }
  ]
}, {
  id: 4,
  name: 'Nulla tellus.',
  method: 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
  servings: 7,
  cooking_time: 200,
  tags: null,
  ingredients: [
    {
      name: 'consectetuer',
      category: 'fish',
      number_of: 46,
      measurement_unit: 'kg',
      derived_cost: 7.28
    },
    {
      name: 'est',
      category: 'dairy',
      number_of: 23,
      measurement_unit: 'mg',
      derived_cost: 3.66
    },
    {
      name: 'dictumst maecenas',
      category: 'poultry',
      number_of: 49,
      measurement_unit: 'L',
      derived_cost: 3.34
    },
    {
      name: 'nulla',
      category: 'fish',
      number_of: 88,
      measurement_unit: 'mg',
      derived_cost: 7.52
    },
    {
      name: 'et',
      category: 'grains',
      number_of: 95,
      measurement_unit: 'mg',
      derived_cost: 5.73
    },
    {
      name: 'ante',
      category: 'vegetable',
      number_of: 18,
      measurement_unit: 'g',
      derived_cost: 6.08
    },
    {
      name: 'at nulla',
      category: 'dairy',
      number_of: 70,
      measurement_unit: 'mL',
      derived_cost: 7.17
    },
    {
      name: 'interdum',
      category: 'fish',
      number_of: 29,
      measurement_unit: 'L',
      derived_cost: 2.91
    },
    {
      name: 'sed',
      category: 'fish',
      number_of: 83,
      measurement_unit: 'g',
      derived_cost: 9.28
    }
  ]
}, {
  id: 5,
  name: 'In hac habitasse platea dictumst.',
  method: 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  servings: 2,
  cooking_time: 56,
  tags: null,
  ingredients: [
    {
      name: 'eget',
      category: 'fruit',
      number_of: 84,
      measurement_unit: 'mL',
      derived_cost: 5.35
    },
    {
      name: 'leo odio',
      category: 'fish',
      number_of: 87,
      measurement_unit: 'mg',
      derived_cost: 2.6
    },
    {
      name: 'volutpat in',
      category: 'grains',
      number_of: 33,
      measurement_unit: 'g',
      derived_cost: 7.64
    },
    {
      name: 'neque',
      category: 'grains',
      number_of: 99,
      measurement_unit: 'mg',
      derived_cost: 4.15
    },
    {
      name: 'neque aenean',
      category: 'grains',
      number_of: 84,
      measurement_unit: 'mL',
      derived_cost: 4.78
    }
  ]
}, {
  id: 6,
  name: 'Proin at turpis a pede posuere nonummy.',
  method: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
  servings: 3,
  cooking_time: 238,
  tags: 'low GI',
  ingredients: [
    {
      name: 'orci',
      category: 'longlife',
      number_of: 37,
      measurement_unit: 'mg',
      derived_cost: 1.29
    },
    {
      name: 'at',
      category: 'vegetable',
      number_of: 52,
      measurement_unit: 'g',
      derived_cost: 6.27
    },
    {
      name: 'non',
      category: 'bread',
      number_of: 17,
      measurement_unit: 'mL',
      derived_cost: 2.58
    },
    {
      name: 'ultrices',
      category: 'longlife',
      number_of: 76,
      measurement_unit: 'kg',
      derived_cost: 5.86
    }
  ]
}, {
  id: 7,
  name: 'Duis at velit eu est congue elementum.',
  method: 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
  servings: 6,
  cooking_time: 7,
  tags: null,
  ingredients: [
    {
      name: 'in',
      category: 'dairy',
      number_of: 70,
      measurement_unit: 'g',
      derived_cost: 7.68
    },
    {
      name: 'eros',
      category: 'grains',
      number_of: 6,
      measurement_unit: 'mL',
      derived_cost: 1.84
    },
    {
      name: 'felis donec',
      category: 'grains',
      number_of: 50,
      measurement_unit: 'L',
      derived_cost: 4.77
    },
    {
      name: 'nullam porttitor',
      category: 'dairy',
      number_of: 35,
      measurement_unit: 'mg',
      derived_cost: 7.45
    },
    {
      name: 'elementum nullam',
      category: 'fruit',
      number_of: 92,
      measurement_unit: 'kg',
      derived_cost: 0.96
    },
    {
      name: 'ipsum primis',
      category: 'grains',
      number_of: 15,
      measurement_unit: 'mL',
      derived_cost: 6.25
    },
    {
      name: 'nulla',
      category: 'poultry',
      number_of: 46,
      measurement_unit: 'g',
      derived_cost: 0.07
    },
    {
      name: 'nulla',
      category: 'bread',
      number_of: 10,
      measurement_unit: 'kg',
      derived_cost: 8.52
    },
    {
      name: 'consequat',
      category: 'longlife',
      number_of: 73,
      measurement_unit: 'g',
      derived_cost: 9.68
    },
    {
      name: 'ante',
      category: 'meat',
      number_of: 4,
      measurement_unit: 'mL',
      derived_cost: 1.97
    }
  ]
}, {
  id: 8,
  name: 'Donec semper sapien a libero.',
  method: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
  servings: 5,
  cooking_time: 12,
  tags: 'dairy-free',
  ingredients: [
    {
      name: 'arcu sed',
      category: 'dairy',
      number_of: 10,
      measurement_unit: 'g',
      derived_cost: 3.65
    },
    {
      name: 'eu',
      category: 'vegetable',
      number_of: 66,
      measurement_unit: 'mg',
      derived_cost: 5.02
    },
    {
      name: 'erat',
      category: 'fruit',
      number_of: 78,
      measurement_unit: 'L',
      derived_cost: 4.21
    },
    {
      name: 'nibh in',
      category: 'poultry',
      number_of: 30,
      measurement_unit: 'mg',
      derived_cost: 2.57
    }
  ]
}, {
  id: 9,
  name: 'Pellentesque eget nunc.',
  method: 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
  servings: 5,
  cooking_time: 19,
  tags: null,
  ingredients: [
    {
      name: 'enim',
      category: 'longlife',
      number_of: 83,
      measurement_unit: 'mL',
      derived_cost: 5.38
    },
    {
      name: 'convallis',
      category: 'vegetable',
      number_of: 99,
      measurement_unit: 'L',
      derived_cost: 7.66
    },
    {
      name: 'ipsum',
      category: 'dairy',
      number_of: 82,
      measurement_unit: 'mL',
      derived_cost: 0.47
    },
    {
      name: 'tortor',
      category: 'meat',
      number_of: 70,
      measurement_unit: 'L',
      derived_cost: 9.64
    },
    {
      name: 'justo',
      category: 'longlife',
      number_of: 77,
      measurement_unit: 'mL',
      derived_cost: 8.59
    },
    {
      name: 'odio curabitur',
      category: 'fruit',
      number_of: 2,
      measurement_unit: 'L',
      derived_cost: 1.0
    },
    {
      name: 'ut',
      category: 'grains',
      number_of: 15,
      measurement_unit: 'kg',
      derived_cost: 3.32
    }
  ]
}, {
  id: 10,
  name: 'Proin at turpis a pede posuere nonummy.',
  method: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
  servings: 2,
  cooking_time: 20,
  tags: null,
  ingredients: [
    {
      name: 'nunc',
      category: 'vegetable',
      number_of: 93,
      measurement_unit: 'L',
      derived_cost: 4.01
    },
    {
      name: 'lacinia aenean',
      category: 'poultry',
      number_of: 93,
      measurement_unit: 'mg',
      derived_cost: 3.02
    },
    {
      name: 'aliquam',
      category: 'grains',
      number_of: 25,
      measurement_unit: 'mg',
      derived_cost: 5.16
    },
    {
      name: 'nisl nunc',
      category: 'longlife',
      number_of: 57,
      measurement_unit: 'L',
      derived_cost: 0.64
    },
    {
      name: 'ut rhoncus',
      category: 'bread',
      number_of: 13,
      measurement_unit: 'mg',
      derived_cost: 4.13
    }
  ]
}, {
  id: 11,
  name: 'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
  method: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
  servings: 2,
  cooking_time: 163,
  tags: 'high fibre',
  ingredients: [
    {
      name: 'tellus',
      category: 'grains',
      number_of: 46,
      measurement_unit: 'kg',
      derived_cost: 9.85
    },
    {
      name: 'faucibus orci',
      category: 'poultry',
      number_of: 52,
      measurement_unit: 'kg',
      derived_cost: 2.07
    },
    {
      name: 'lobortis vel',
      category: 'bread',
      number_of: 8,
      measurement_unit: 'L',
      derived_cost: 3.3
    },
    {
      name: 'eu magna',
      category: 'bread',
      number_of: 98,
      measurement_unit: 'kg',
      derived_cost: 0.88
    },
    {
      name: 'vulputate vitae',
      category: 'poultry',
      number_of: 9,
      measurement_unit: 'L',
      derived_cost: 9.79
    },
    {
      name: 'nec molestie',
      category: 'vegetable',
      number_of: 82,
      measurement_unit: 'kg',
      derived_cost: 0.31
    },
    {
      name: 'nulla elit',
      category: 'fish',
      number_of: 48,
      measurement_unit: 'L',
      derived_cost: 2.39
    },
    {
      name: 'luctus',
      category: 'grains',
      number_of: 15,
      measurement_unit: 'mL',
      derived_cost: 9.33
    },
    {
      name: 'eu',
      category: 'fish',
      number_of: 53,
      measurement_unit: 'g',
      derived_cost: 2.63
    },
    {
      name: 'et tempus',
      category: 'fruit',
      number_of: 8,
      measurement_unit: 'L',
      derived_cost: 5.85
    }
  ]
}, {
  id: 12,
  name: 'Suspendisse potenti.',
  method: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
  servings: 7,
  cooking_time: 202,
  tags: null,
  ingredients: [
    {
      name: 'curae',
      category: 'poultry',
      number_of: 9,
      measurement_unit: 'mL',
      derived_cost: 8.43
    },
    {
      name: 'augue a',
      category: 'fish',
      number_of: 99,
      measurement_unit: 'mg',
      derived_cost: 9.79
    },
    {
      name: 'quam',
      category: 'poultry',
      number_of: 100,
      measurement_unit: 'mL',
      derived_cost: 2.33
    },
    {
      name: 'rhoncus dui',
      category: 'grains',
      number_of: 28,
      measurement_unit: 'mL',
      derived_cost: 3.33
    },
    {
      name: 'rutrum ac',
      category: 'dairy',
      number_of: 73,
      measurement_unit: 'g',
      derived_cost: 3.91
    },
    {
      name: 'ultrices',
      category: 'grains',
      number_of: 83,
      measurement_unit: 'L',
      derived_cost: 2.75
    }
  ]
}, {
  id: 13,
  name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  method: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  servings: 6,
  cooking_time: 261,
  tags: null,
  ingredients: [
    {
      name: 'ultrices phasellus',
      category: 'poultry',
      number_of: 84,
      measurement_unit: 'L',
      derived_cost: 6.8
    },
    {
      name: 'adipiscing elit',
      category: 'poultry',
      number_of: 7,
      measurement_unit: 'L',
      derived_cost: 6.81
    },
    {
      name: 'lectus pellentesque',
      category: 'grains',
      number_of: 16,
      measurement_unit: 'g',
      derived_cost: 4.44
    },
    {
      name: 'ac',
      category: 'bread',
      number_of: 54,
      measurement_unit: 'mL',
      derived_cost: 7.89
    },
    {
      name: 'posuere',
      category: 'longlife',
      number_of: 21,
      measurement_unit: 'mg',
      derived_cost: 1.61
    },
    {
      name: 'porta',
      category: 'dairy',
      number_of: 78,
      measurement_unit: 'g',
      derived_cost: 6.15
    },
    {
      name: 'nulla',
      category: 'bread',
      number_of: 48,
      measurement_unit: 'mg',
      derived_cost: 8.38
    }
  ]
}, {
  id: 14,
  name: 'Curabitur in libero ut massa volutpat convallis.',
  method: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
  servings: 4,
  cooking_time: 208,
  tags: null,
  ingredients: [
    {
      name: 'nullam porttitor',
      category: 'vegetable',
      number_of: 30,
      measurement_unit: 'mg',
      derived_cost: 7.65
    },
    {
      name: 'congue risus',
      category: 'meat',
      number_of: 84,
      measurement_unit: 'mL',
      derived_cost: 5.75
    },
    {
      name: 'in',
      category: 'grains',
      number_of: 40,
      measurement_unit: 'g',
      derived_cost: 9.55
    },
    {
      name: 'sodales sed',
      category: 'vegetable',
      number_of: 21,
      measurement_unit: 'L',
      derived_cost: 4.06
    },
    {
      name: 'est congue',
      category: 'fruit',
      number_of: 98,
      measurement_unit: 'mg',
      derived_cost: 0.56
    },
    {
      name: 'nec sem',
      category: 'poultry',
      number_of: 65,
      measurement_unit: 'mL',
      derived_cost: 3.98
    },
    {
      name: 'est',
      category: 'grains',
      number_of: 96,
      measurement_unit: 'g',
      derived_cost: 7.63
    }
  ]
}, {
  id: 15,
  name: 'Sed ante.',
  method: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
  servings: 7,
  cooking_time: 296,
  tags: 'dairy-free',
  ingredients: [
    {
      name: 'integer',
      category: 'fruit',
      number_of: 85,
      measurement_unit: 'mg',
      derived_cost: 6.65
    },
    {
      name: 'pellentesque viverra',
      category: 'meat',
      number_of: 2,
      measurement_unit: 'L',
      derived_cost: 1.69
    },
    {
      name: 'libero',
      category: 'meat',
      number_of: 98,
      measurement_unit: 'g',
      derived_cost: 8.0
    },
    {
      name: 'sed tincidunt',
      category: 'dairy',
      number_of: 14,
      measurement_unit: 'L',
      derived_cost: 8.89
    },
    {
      name: 'in tempus',
      category: 'meat',
      number_of: 13,
      measurement_unit: 'L',
      derived_cost: 0.78
    },
    {
      name: 'curabitur convallis',
      category: 'grains',
      number_of: 63,
      measurement_unit: 'mg',
      derived_cost: 9.64
    },
    {
      name: 'varius integer',
      category: 'meat',
      number_of: 6,
      measurement_unit: 'g',
      derived_cost: 4.83
    }
  ]
}, {
  id: 16,
  name: 'Donec ut dolor.',
  method: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  servings: 5,
  cooking_time: 115,
  tags: 'GF',
  ingredients: [
    {
      name: 'eros vestibulum',
      category: 'fruit',
      number_of: 44,
      measurement_unit: 'g',
      derived_cost: 6.88
    },
    {
      name: 'ut blandit',
      category: 'grains',
      number_of: 24,
      measurement_unit: 'mg',
      derived_cost: 6.75
    },
    {
      name: 'porta volutpat',
      category: 'vegetable',
      number_of: 67,
      measurement_unit: 'kg',
      derived_cost: 2.27
    },
    {
      name: 'risus dapibus',
      category: 'meat',
      number_of: 96,
      measurement_unit: 'mL',
      derived_cost: 8.06
    },
    {
      name: 'enim in',
      category: 'fruit',
      number_of: 48,
      measurement_unit: 'g',
      derived_cost: 6.16
    },
    {
      name: 'lectus',
      category: 'fruit',
      number_of: 11,
      measurement_unit: 'kg',
      derived_cost: 8.32
    },
    {
      name: 'et ultrices',
      category: 'bread',
      number_of: 33,
      measurement_unit: 'mg',
      derived_cost: 7.07
    },
    {
      name: 'lacinia erat',
      category: 'poultry',
      number_of: 33,
      measurement_unit: 'mL',
      derived_cost: 0.6
    },
    {
      name: 'in leo',
      category: 'vegetable',
      number_of: 29,
      measurement_unit: 'L',
      derived_cost: 3.07
    },
    {
      name: 'malesuada',
      category: 'vegetable',
      number_of: 12,
      measurement_unit: 'mg',
      derived_cost: 7.41
    },
    {
      name: 'eu massa',
      category: 'poultry',
      number_of: 100,
      measurement_unit: 'L',
      derived_cost: 1.05
    }
  ]
}, {
  id: 17,
  name: 'Maecenas ut massa quis augue luctus tincidunt.',
  method: 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
  servings: 7,
  cooking_time: 120,
  tags: null,
  ingredients: [
    {
      name: 'nulla',
      category: 'vegetable',
      number_of: 100,
      measurement_unit: 'mg',
      derived_cost: 3.61
    },
    {
      name: 'donec ut',
      category: 'fish',
      number_of: 33,
      measurement_unit: 'kg',
      derived_cost: 2.1
    },
    {
      name: 'in eleifend',
      category: 'grains',
      number_of: 63,
      measurement_unit: 'mL',
      derived_cost: 7.41
    },
    {
      name: 'vitae',
      category: 'dairy',
      number_of: 4,
      measurement_unit: 'kg',
      derived_cost: 3.64
    },
    {
      name: 'accumsan',
      category: 'meat',
      number_of: 24,
      measurement_unit: 'g',
      derived_cost: 6.88
    },
    {
      name: 'convallis',
      category: 'dairy',
      number_of: 21,
      measurement_unit: 'mL',
      derived_cost: 9.88
    }
  ]
}, {
  id: 18,
  name: 'Curabitur at ipsum ac tellus semper interdum.',
  method: 'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
  servings: 7,
  cooking_time: 261,
  tags: 'vegan',
  ingredients: [
    {
      name: 'neque duis',
      category: 'poultry',
      number_of: 37,
      measurement_unit: 'g',
      derived_cost: 3.76
    },
    {
      name: 'lorem',
      category: 'meat',
      number_of: 24,
      measurement_unit: 'L',
      derived_cost: 9.64
    },
    {
      name: 'auctor sed',
      category: 'fish',
      number_of: 93,
      measurement_unit: 'kg',
      derived_cost: 3.1
    },
    {
      name: 'at',
      category: 'poultry',
      number_of: 37,
      measurement_unit: 'L',
      derived_cost: 8.99
    },
    {
      name: 'amet',
      category: 'dairy',
      number_of: 33,
      measurement_unit: 'mL',
      derived_cost: 7.18
    },
    {
      name: 'cubilia curae',
      category: 'dairy',
      number_of: 23,
      measurement_unit: 'mL',
      derived_cost: 8.07
    },
    {
      name: 'et ultrices',
      category: 'poultry',
      number_of: 94,
      measurement_unit: 'g',
      derived_cost: 5.24
    },
    {
      name: 'lobortis',
      category: 'meat',
      number_of: 30,
      measurement_unit: 'mL',
      derived_cost: 9.1
    },
    {
      name: 'nulla',
      category: 'longlife',
      number_of: 5,
      measurement_unit: 'L',
      derived_cost: 9.27
    },
    {
      name: 'in',
      category: 'vegetable',
      number_of: 23,
      measurement_unit: 'g',
      derived_cost: 2.92
    },
    {
      name: 'ac',
      category: 'fruit',
      number_of: 86,
      measurement_unit: 'L',
      derived_cost: 5.01
    },
    {
      name: 'consectetuer adipiscing',
      category: 'poultry',
      number_of: 27,
      measurement_unit: 'L',
      derived_cost: 4.46
    }
  ]
}, {
  id: 19,
  name: 'Curabitur gravida nisi at nibh.',
  method: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
  servings: 5,
  cooking_time: 103,
  tags: null,
  ingredients: [
    {
      name: 'sed lacus',
      category: 'poultry',
      number_of: 51,
      measurement_unit: 'L',
      derived_cost: 9.35
    },
    {
      name: 'dis',
      category: 'dairy',
      number_of: 83,
      measurement_unit: 'g',
      derived_cost: 0.32
    },
    {
      name: 'luctus cum',
      category: 'fruit',
      number_of: 48,
      measurement_unit: 'kg',
      derived_cost: 7.82
    },
    {
      name: 'tellus',
      category: 'grains',
      number_of: 20,
      measurement_unit: 'kg',
      derived_cost: 9.74
    },
    {
      name: 'orci',
      category: 'fruit',
      number_of: 38,
      measurement_unit: 'kg',
      derived_cost: 1.06
    },
    {
      name: 'commodo',
      category: 'fruit',
      number_of: 95,
      measurement_unit: 'L',
      derived_cost: 5.43
    },
    {
      name: 'nibh',
      category: 'vegetable',
      number_of: 63,
      measurement_unit: 'mg',
      derived_cost: 2.79
    },
    {
      name: 'lacinia',
      category: 'fruit',
      number_of: 7,
      measurement_unit: 'kg',
      derived_cost: 6.56
    },
    {
      name: 'nullam',
      category: 'fruit',
      number_of: 17,
      measurement_unit: 'kg',
      derived_cost: 5.97
    },
    {
      name: 'et',
      category: 'fruit',
      number_of: 64,
      measurement_unit: 'L',
      derived_cost: 3.41
    }
  ]
}, {
  id: 20,
  name: 'Duis consequat dui nec nisi volutpat eleifend.',
  method: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
  servings: 8,
  cooking_time: 62,
  tags: null,
  ingredients: [
    {
      name: 'libero',
      category: 'poultry',
      number_of: 47,
      measurement_unit: 'L',
      derived_cost: 3.25
    },
    {
      name: 'diam',
      category: 'dairy',
      number_of: 98,
      measurement_unit: 'g',
      derived_cost: 5.16
    },
    {
      name: 'aliquam augue',
      category: 'poultry',
      number_of: 92,
      measurement_unit: 'kg',
      derived_cost: 0.31
    },
    {
      name: 'ante',
      category: 'grains',
      number_of: 76,
      measurement_unit: 'kg',
      derived_cost: 2.24
    },
    {
      name: 'vel',
      category: 'poultry',
      number_of: 99,
      measurement_unit: 'L',
      derived_cost: 0.2
    },
    {
      name: 'in',
      category: 'fruit',
      number_of: 10,
      measurement_unit: 'mL',
      derived_cost: 7.19
    },
    {
      name: 'ante',
      category: 'longlife',
      number_of: 18,
      measurement_unit: 'mg',
      derived_cost: 1.74
    },
    {
      name: 'tincidunt eu',
      category: 'longlife',
      number_of: 74,
      measurement_unit: 'mL',
      derived_cost: 2.76
    }
  ]
}, {
  id: 21,
  name: 'In sagittis dui vel nisl.',
  method: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  servings: 2,
  cooking_time: 40,
  tags: 'vegan',
  ingredients: [
    {
      name: 'vel',
      category: 'dairy',
      number_of: 25,
      measurement_unit: 'kg',
      derived_cost: 5.78
    },
    {
      name: 'aliquet',
      category: 'dairy',
      number_of: 18,
      measurement_unit: 'kg',
      derived_cost: 2.94
    },
    {
      name: 'phasellus sit',
      category: 'bread',
      number_of: 42,
      measurement_unit: 'g',
      derived_cost: 0.87
    },
    {
      name: 'in',
      category: 'meat',
      number_of: 66,
      measurement_unit: 'g',
      derived_cost: 7.54
    },
    {
      name: 'vel',
      category: 'dairy',
      number_of: 88,
      measurement_unit: 'mL',
      derived_cost: 1.44
    },
    {
      name: 'sapien in',
      category: 'bread',
      number_of: 81,
      measurement_unit: 'L',
      derived_cost: 0.42
    },
    {
      name: 'eget elit',
      category: 'fish',
      number_of: 41,
      measurement_unit: 'kg',
      derived_cost: 7.25
    },
    {
      name: 'velit',
      category: 'poultry',
      number_of: 70,
      measurement_unit: 'L',
      derived_cost: 1.02
    },
    {
      name: 'pulvinar',
      category: 'meat',
      number_of: 86,
      measurement_unit: 'g',
      derived_cost: 9.65
    }
  ]
}, {
  id: 22,
  name: 'Pellentesque viverra pede ac diam.',
  method: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
  servings: 4,
  cooking_time: 2,
  tags: null,
  ingredients: [
    {
      name: 'non quam',
      category: 'fruit',
      number_of: 51,
      measurement_unit: 'kg',
      derived_cost: 2.94
    },
    {
      name: 'varius',
      category: 'fruit',
      number_of: 11,
      measurement_unit: 'L',
      derived_cost: 2.8
    },
    {
      name: 'consequat',
      category: 'grains',
      number_of: 93,
      measurement_unit: 'g',
      derived_cost: 9.88
    },
    {
      name: 'curae',
      category: 'fish',
      number_of: 7,
      measurement_unit: 'L',
      derived_cost: 1.1
    }
  ]
}, {
  id: 23,
  name: 'Etiam justo.',
  method: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
  servings: 5,
  cooking_time: 295,
  tags: null,
  ingredients: [
    {
      name: 'mauris',
      category: 'grains',
      number_of: 23,
      measurement_unit: 'kg',
      derived_cost: 0.35
    },
    {
      name: 'dui vel',
      category: 'vegetable',
      number_of: 14,
      measurement_unit: 'g',
      derived_cost: 0.74
    },
    {
      name: 'vel',
      category: 'fish',
      number_of: 80,
      measurement_unit: 'L',
      derived_cost: 3.58
    },
    {
      name: 'lorem vitae',
      category: 'poultry',
      number_of: 55,
      measurement_unit: 'kg',
      derived_cost: 0.41
    },
    {
      name: 'vel nisl',
      category: 'poultry',
      number_of: 69,
      measurement_unit: 'g',
      derived_cost: 9.35
    },
    {
      name: 'lacus at',
      category: 'grains',
      number_of: 54,
      measurement_unit: 'g',
      derived_cost: 4.89
    },
    {
      name: 'quis',
      category: 'dairy',
      number_of: 34,
      measurement_unit: 'kg',
      derived_cost: 8.73
    },
    {
      name: 'donec semper',
      category: 'bread',
      number_of: 37,
      measurement_unit: 'L',
      derived_cost: 6.1
    },
    {
      name: 'eros vestibulum',
      category: 'meat',
      number_of: 0,
      measurement_unit: 'mg',
      derived_cost: 7.45
    },
    {
      name: 'urna',
      category: 'vegetable',
      number_of: 23,
      measurement_unit: 'g',
      derived_cost: 6.66
    },
    {
      name: 'posuere',
      category: 'vegetable',
      number_of: 86,
      measurement_unit: 'g',
      derived_cost: 2.52
    }
  ]
}, {
  id: 24,
  name: 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
  method: 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
  servings: 4,
  cooking_time: 210,
  tags: null,
  ingredients: [
    {
      name: 'metus vitae',
      category: 'fruit',
      number_of: 99,
      measurement_unit: 'mL',
      derived_cost: 7.6
    },
    {
      name: 'proin',
      category: 'grains',
      number_of: 85,
      measurement_unit: 'g',
      derived_cost: 3.35
    },
    {
      name: 'tempus',
      category: 'meat',
      number_of: 46,
      measurement_unit: 'L',
      derived_cost: 6.58
    },
    {
      name: 'dictumst etiam',
      category: 'fruit',
      number_of: 68,
      measurement_unit: 'mL',
      derived_cost: 5.64
    },
    {
      name: 'potenti in',
      category: 'fruit',
      number_of: 57,
      measurement_unit: 'kg',
      derived_cost: 2.03
    },
    {
      name: 'aliquam',
      category: 'vegetable',
      number_of: 27,
      measurement_unit: 'mL',
      derived_cost: 1.51
    },
    {
      name: 'sed',
      category: 'fruit',
      number_of: 0,
      measurement_unit: 'g',
      derived_cost: 9.51
    }
  ]
}, {
  id: 25,
  name: 'Nullam varius.',
  method: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
  servings: 3,
  cooking_time: 297,
  tags: null,
  ingredients: [
    {
      name: 'convallis nunc',
      category: 'vegetable',
      number_of: 61,
      measurement_unit: 'L',
      derived_cost: 1.54
    },
    {
      name: 'donec posuere',
      category: 'poultry',
      number_of: 75,
      measurement_unit: 'mg',
      derived_cost: 4.58
    },
    {
      name: 'tincidunt eget',
      category: 'meat',
      number_of: 55,
      measurement_unit: 'kg',
      derived_cost: 9.31
    },
    {
      name: 'fusce lacus',
      category: 'poultry',
      number_of: 26,
      measurement_unit: 'mg',
      derived_cost: 8.59
    },
    {
      name: 'at nibh',
      category: 'grains',
      number_of: 22,
      measurement_unit: 'mg',
      derived_cost: 6.84
    },
    {
      name: 'orci nullam',
      category: 'meat',
      number_of: 76,
      measurement_unit: 'L',
      derived_cost: 0.26
    },
    {
      name: 'eget',
      category: 'grains',
      number_of: 95,
      measurement_unit: 'mg',
      derived_cost: 1.25
    }
  ]
}, {
  id: 26,
  name: 'In congue.',
  method: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
  servings: 6,
  cooking_time: 296,
  tags: null,
  ingredients: [
    {
      name: 'lacus',
      category: 'vegetable',
      number_of: 38,
      measurement_unit: 'g',
      derived_cost: 8.75
    },
    {
      name: 'placerat praesent',
      category: 'bread',
      number_of: 10,
      measurement_unit: 'mg',
      derived_cost: 2.91
    },
    {
      name: 'aliquet',
      category: 'fruit',
      number_of: 40,
      measurement_unit: 'mL',
      derived_cost: 1.15
    },
    {
      name: 'ante',
      category: 'longlife',
      number_of: 21,
      measurement_unit: 'kg',
      derived_cost: 9.55
    },
    {
      name: 'sagittis dui',
      category: 'vegetable',
      number_of: 65,
      measurement_unit: 'mL',
      derived_cost: 1.99
    },
    {
      name: 'lorem',
      category: 'fruit',
      number_of: 5,
      measurement_unit: 'L',
      derived_cost: 4.87
    },
    {
      name: 'sapien',
      category: 'dairy',
      number_of: 66,
      measurement_unit: 'mL',
      derived_cost: 3.88
    },
    {
      name: 'arcu',
      category: 'fruit',
      number_of: 48,
      measurement_unit: 'mg',
      derived_cost: 3.07
    },
    {
      name: 'mattis nibh',
      category: 'grains',
      number_of: 8,
      measurement_unit: 'g',
      derived_cost: 1.76
    },
    {
      name: 'magna bibendum',
      category: 'dairy',
      number_of: 43,
      measurement_unit: 'kg',
      derived_cost: 9.03
    },
    {
      name: 'pede',
      category: 'meat',
      number_of: 89,
      measurement_unit: 'mg',
      derived_cost: 8.46
    }
  ]
}, {
  id: 27,
  name: 'Donec ut mauris eget massa tempor convallis.',
  method: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
  servings: 8,
  cooking_time: 229,
  tags: null,
  ingredients: [
    {
      name: 'donec',
      category: 'meat',
      number_of: 83,
      measurement_unit: 'mg',
      derived_cost: 3.9
    },
    {
      name: 'augue vestibulum',
      category: 'dairy',
      number_of: 2,
      measurement_unit: 'kg',
      derived_cost: 0.02
    },
    {
      name: 'est',
      category: 'meat',
      number_of: 86,
      measurement_unit: 'L',
      derived_cost: 3.91
    },
    {
      name: 'et',
      category: 'bread',
      number_of: 92,
      measurement_unit: 'kg',
      derived_cost: 9.54
    },
    {
      name: 'consectetuer',
      category: 'bread',
      number_of: 27,
      measurement_unit: 'g',
      derived_cost: 5.22
    },
    {
      name: 'ac',
      category: 'bread',
      number_of: 36,
      measurement_unit: 'L',
      derived_cost: 4.67
    }
  ]
}, {
  id: 28,
  name: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
  method: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  servings: 6,
  cooking_time: 57,
  tags: null,
  ingredients: [
    {
      name: 'id pretium',
      category: 'poultry',
      number_of: 10,
      measurement_unit: 'g',
      derived_cost: 2.97
    },
    {
      name: 'ultrices phasellus',
      category: 'bread',
      number_of: 17,
      measurement_unit: 'kg',
      derived_cost: 2.51
    },
    {
      name: 'elementum',
      category: 'fish',
      number_of: 98,
      measurement_unit: 'mg',
      derived_cost: 3.95
    },
    {
      name: 'erat eros',
      category: 'bread',
      number_of: 63,
      measurement_unit: 'mL',
      derived_cost: 4.83
    },
    {
      name: 'consequat',
      category: 'meat',
      number_of: 80,
      measurement_unit: 'g',
      derived_cost: 7.38
    },
    {
      name: 'consequat',
      category: 'dairy',
      number_of: 3,
      measurement_unit: 'mL',
      derived_cost: 4.76
    },
    {
      name: 'sed',
      category: 'fish',
      number_of: 44,
      measurement_unit: 'g',
      derived_cost: 1.53
    },
    {
      name: 'tempus',
      category: 'grains',
      number_of: 84,
      measurement_unit: 'g',
      derived_cost: 9.19
    },
    {
      name: 'ut blandit',
      category: 'vegetable',
      number_of: 20,
      measurement_unit: 'mg',
      derived_cost: 8.43
    },
    {
      name: 'vulputate',
      category: 'longlife',
      number_of: 19,
      measurement_unit: 'kg',
      derived_cost: 9.37
    },
    {
      name: 'in',
      category: 'fish',
      number_of: 4,
      measurement_unit: 'L',
      derived_cost: 7.16
    },
    {
      name: 'dictumst etiam',
      category: 'meat',
      number_of: 80,
      measurement_unit: 'mL',
      derived_cost: 2.51
    }
  ]
}, {
  id: 29,
  name: 'Morbi porttitor lorem id ligula.',
  method: 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
  servings: 4,
  cooking_time: 289,
  tags: null,
  ingredients: [
    {
      name: 'habitasse',
      category: 'fish',
      number_of: 80,
      measurement_unit: 'g',
      derived_cost: 6.52
    },
    {
      name: 'luctus ultricies',
      category: 'bread',
      number_of: 31,
      measurement_unit: 'mg',
      derived_cost: 4.03
    },
    {
      name: 'consequat varius',
      category: 'poultry',
      number_of: 20,
      measurement_unit: 'g',
      derived_cost: 3.67
    },
    {
      name: 'vulputate justo',
      category: 'bread',
      number_of: 43,
      measurement_unit: 'mL',
      derived_cost: 8.54
    },
    {
      name: 'in',
      category: 'poultry',
      number_of: 62,
      measurement_unit: 'L',
      derived_cost: 1.08
    },
    {
      name: 'turpis adipiscing',
      category: 'poultry',
      number_of: 15,
      measurement_unit: 'mg',
      derived_cost: 5.3
    },
    {
      name: 'euismod scelerisque',
      category: 'poultry',
      number_of: 70,
      measurement_unit: 'mL',
      derived_cost: 0.18
    },
    {
      name: 'nulla suspendisse',
      category: 'grains',
      number_of: 63,
      measurement_unit: 'mL',
      derived_cost: 7.03
    },
    {
      name: 'mauris non',
      category: 'vegetable',
      number_of: 20,
      measurement_unit: 'mL',
      derived_cost: 8.07
    },
    {
      name: 'libero quis',
      category: 'fruit',
      number_of: 58,
      measurement_unit: 'g',
      derived_cost: 9.27
    },
    {
      name: 'turpis integer',
      category: 'longlife',
      number_of: 34,
      measurement_unit: 'kg',
      derived_cost: 9.08
    }
  ]
}, {
  id: 30,
  name: 'Nulla facilisi.',
  method: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
  servings: 4,
  cooking_time: 265,
  tags: 'vegetarian',
  ingredients: [
    {
      name: 'at',
      category: 'meat',
      number_of: 22,
      measurement_unit: 'mL',
      derived_cost: 8.52
    },
    {
      name: 'ornare consequat',
      category: 'fish',
      number_of: 96,
      measurement_unit: 'kg',
      derived_cost: 0.14
    },
    {
      name: 'lacus',
      category: 'dairy',
      number_of: 92,
      measurement_unit: 'mg',
      derived_cost: 7.32
    },
    {
      name: 'quam sollicitudin',
      category: 'grains',
      number_of: 92,
      measurement_unit: 'mg',
      derived_cost: 2.33
    }
  ]
}, {
  id: 31,
  name: 'Pellentesque eget nunc.',
  method: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
  servings: 6,
  cooking_time: 65,
  tags: 'low GI',
  ingredients: [
    {
      name: 'maecenas tincidunt',
      category: 'fruit',
      number_of: 92,
      measurement_unit: 'mL',
      derived_cost: 7.73
    },
    {
      name: 'sit',
      category: 'grains',
      number_of: 29,
      measurement_unit: 'mL',
      derived_cost: 6.94
    },
    {
      name: 'sem',
      category: 'poultry',
      number_of: 40,
      measurement_unit: 'mg',
      derived_cost: 1.82
    },
    {
      name: 'accumsan',
      category: 'dairy',
      number_of: 29,
      measurement_unit: 'kg',
      derived_cost: 7.28
    },
    {
      name: 'rhoncus aliquam',
      category: 'meat',
      number_of: 85,
      measurement_unit: 'kg',
      derived_cost: 4.95
    },
    {
      name: 'eu',
      category: 'bread',
      number_of: 40,
      measurement_unit: 'L',
      derived_cost: 0.05
    }
  ]
}, {
  id: 32,
  name: 'Vestibulum sed magna at nunc commodo placerat.',
  method: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
  servings: 4,
  cooking_time: 70,
  tags: null,
  ingredients: [
    {
      name: 'nisl',
      category: 'bread',
      number_of: 49,
      measurement_unit: 'mL',
      derived_cost: 6.88
    },
    {
      name: 'nullam',
      category: 'poultry',
      number_of: 59,
      measurement_unit: 'L',
      derived_cost: 5.66
    },
    {
      name: 'elit proin',
      category: 'fruit',
      number_of: 73,
      measurement_unit: 'L',
      derived_cost: 9.77
    },
    {
      name: 'fusce posuere',
      category: 'dairy',
      number_of: 39,
      measurement_unit: 'mg',
      derived_cost: 9.15
    },
    {
      name: 'in',
      category: 'vegetable',
      number_of: 46,
      measurement_unit: 'g',
      derived_cost: 1.15
    },
    {
      name: 'quis',
      category: 'meat',
      number_of: 60,
      measurement_unit: 'L',
      derived_cost: 9.65
    },
    {
      name: 'id ligula',
      category: 'dairy',
      number_of: 76,
      measurement_unit: 'mg',
      derived_cost: 4.8
    },
    {
      name: 'at velit',
      category: 'vegetable',
      number_of: 69,
      measurement_unit: 'g',
      derived_cost: 5.06
    },
    {
      name: 'eget nunc',
      category: 'vegetable',
      number_of: 91,
      measurement_unit: 'g',
      derived_cost: 4.43
    },
    {
      name: 'vestibulum',
      category: 'fruit',
      number_of: 24,
      measurement_unit: 'L',
      derived_cost: 7.33
    }
  ]
}, {
  id: 33,
  name: 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
  method: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
  servings: 3,
  cooking_time: 38,
  tags: null,
  ingredients: [
    {
      name: 'tincidunt in',
      category: 'meat',
      number_of: 60,
      measurement_unit: 'L',
      derived_cost: 1.8
    },
    {
      name: 'ac diam',
      category: 'dairy',
      number_of: 76,
      measurement_unit: 'g',
      derived_cost: 1.96
    },
    {
      name: 'in',
      category: 'grains',
      number_of: 52,
      measurement_unit: 'mL',
      derived_cost: 7.99
    },
    {
      name: 'enim',
      category: 'poultry',
      number_of: 64,
      measurement_unit: 'kg',
      derived_cost: 8.15
    },
    {
      name: 'pede',
      category: 'fish',
      number_of: 40,
      measurement_unit: 'L',
      derived_cost: 7.38
    },
    {
      name: 'nam congue',
      category: 'poultry',
      number_of: 42,
      measurement_unit: 'mL',
      derived_cost: 6.79
    },
    {
      name: 'eget orci',
      category: 'fruit',
      number_of: 55,
      measurement_unit: 'g',
      derived_cost: 1.55
    }
  ]
}, {
  id: 34,
  name: 'Donec posuere metus vitae ipsum.',
  method: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
  servings: 5,
  cooking_time: 145,
  tags: null,
  ingredients: [
    {
      name: 'sed tincidunt',
      category: 'fish',
      number_of: 1,
      measurement_unit: 'g',
      derived_cost: 1.02
    },
    {
      name: 'blandit ultrices',
      category: 'bread',
      number_of: 29,
      measurement_unit: 'mg',
      derived_cost: 6.07
    },
    {
      name: 'in faucibus',
      category: 'dairy',
      number_of: 85,
      measurement_unit: 'g',
      derived_cost: 5.74
    },
    {
      name: 'dui',
      category: 'vegetable',
      number_of: 36,
      measurement_unit: 'mg',
      derived_cost: 2.84
    },
    {
      name: 'sapien non',
      category: 'meat',
      number_of: 25,
      measurement_unit: 'mg',
      derived_cost: 2.36
    },
    {
      name: 'pede libero',
      category: 'vegetable',
      number_of: 69,
      measurement_unit: 'mg',
      derived_cost: 9.71
    }
  ]
}, {
  id: 35,
  name: 'In blandit ultrices enim.',
  method: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
  servings: 5,
  cooking_time: 246,
  tags: null,
  ingredients: [
    {
      name: 'eget',
      category: 'poultry',
      number_of: 35,
      measurement_unit: 'g',
      derived_cost: 3.67
    },
    {
      name: 'sapien',
      category: 'fruit',
      number_of: 0,
      measurement_unit: 'g',
      derived_cost: 5.64
    },
    {
      name: 'etiam faucibus',
      category: 'vegetable',
      number_of: 49,
      measurement_unit: 'kg',
      derived_cost: 5.77
    },
    {
      name: 'posuere nonummy',
      category: 'grains',
      number_of: 11,
      measurement_unit: 'mg',
      derived_cost: 4.03
    },
    {
      name: 'duis',
      category: 'vegetable',
      number_of: 43,
      measurement_unit: 'mL',
      derived_cost: 5.35
    },
    {
      name: 'odio curabitur',
      category: 'longlife',
      number_of: 44,
      measurement_unit: 'L',
      derived_cost: 8.17
    },
    {
      name: 'proin leo',
      category: 'fruit',
      number_of: 15,
      measurement_unit: 'g',
      derived_cost: 1.78
    },
    {
      name: 'curabitur gravida',
      category: 'dairy',
      number_of: 58,
      measurement_unit: 'L',
      derived_cost: 5.13
    },
    {
      name: 'duis consequat',
      category: 'vegetable',
      number_of: 70,
      measurement_unit: 'g',
      derived_cost: 2.21
    },
    {
      name: 'luctus',
      category: 'bread',
      number_of: 34,
      measurement_unit: 'mg',
      derived_cost: 1.78
    },
    {
      name: 'in purus',
      category: 'bread',
      number_of: 20,
      measurement_unit: 'kg',
      derived_cost: 6.71
    }
  ]
}, {
  id: 36,
  name: 'Quisque ut erat.',
  method: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
  servings: 2,
  cooking_time: 29,
  tags: null,
  ingredients: [
    {
      name: 'duis consequat',
      category: 'meat',
      number_of: 10,
      measurement_unit: 'L',
      derived_cost: 7.06
    },
    {
      name: 'magna',
      category: 'dairy',
      number_of: 17,
      measurement_unit: 'mg',
      derived_cost: 8.36
    },
    {
      name: 'nibh',
      category: 'grains',
      number_of: 32,
      measurement_unit: 'mL',
      derived_cost: 6.6
    },
    {
      name: 'aenean',
      category: 'fish',
      number_of: 89,
      measurement_unit: 'L',
      derived_cost: 9.64
    },
    {
      name: 'id',
      category: 'bread',
      number_of: 60,
      measurement_unit: 'kg',
      derived_cost: 7.29
    },
    {
      name: 'odio',
      category: 'grains',
      number_of: 88,
      measurement_unit: 'L',
      derived_cost: 9.14
    },
    {
      name: 'proin',
      category: 'bread',
      number_of: 28,
      measurement_unit: 'mL',
      derived_cost: 7.74
    }
  ]
}];

module.exports = recipeMocks;
