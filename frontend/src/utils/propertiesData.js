// Complete properties reference for DarkSpace gear
export const PROPERTIES_DATA = {
  // Weapon Properties
  '2H': {
    name: 'Two-Handed',
    description: 'This weapon requires two hands to use.',
    category: 'Weapon'
  },
  '1H': {
    name: 'One-Handed',
    description: 'This weapon or armor occupies one hand.',
    category: 'Weapon/Armor'
  },
  'Am': {
    name: 'Ammo',
    description: 'This weapon requires an ammo magazine to use. On a critical failure (natural 1 on 1d20 attack roll), the ammo magazine runs out and will need to be swapped out as an action.',
    category: 'Weapon'
  },
  'AP': {
    name: 'Armor Piercing',
    description: "Target's AC is as if they are unarmored. Ignores physical armor.",
    category: 'Weapon'
  },
  'Bl': {
    name: 'Blast',
    description: 'This weapon does blast damage. Roll 1d6 to determine the number of targets affected besides the intended target.',
    category: 'Weapon'
  },
  'EC': {
    name: 'Energy Cell',
    description: 'This weapon/armor requires an energy cell to use. On a critical failure (natural 1 on 1d20 attack roll) for weapons, or critical hit (20 on 1d20 attack roll) against armor, the energy cell is exhausted and will need to be swapped out as an action.',
    category: 'Weapon/Armor'
  },
  'EG': {
    name: 'Energy Generator',
    description: 'This ship weapon requires an energy generator to use. On a critical failure (natural 1 on 1d20 attack roll), the energy generator shorts out and must be repaired.',
    category: 'Ship Weapon'
  },
  'R': {
    name: 'Repeating',
    description: 'This weapon has an alternate repeating mode which allows for a second shot at disadvantage.',
    category: 'Weapon'
  },
  'Th': {
    name: 'Thrown',
    description: 'This weapon can be thrown to make a ranged attack with it using STR or DEX.',
    category: 'Weapon'
  },
  'V': {
    name: 'Versatile',
    description: 'This weapon can be used either one-handed or two-handed. If used two-handed, use the larger die for damage.',
    category: 'Weapon'
  },
  'F': {
    name: 'Finesse',
    description: 'You may use your STR or DEX when attacking with this weapon.',
    category: 'Weapon'
  },
  'S': {
    name: 'Sundering',
    description: 'When you are hit with a melee attack, you may choose to destroy this weapon or armor to negate all damage from the attack.',
    category: 'Weapon/Armor'
  },
  'L': {
    name: 'Loading',
    description: 'This weapon takes time to reload.',
    category: 'Weapon'
  },
  
  // Armor Properties
  'Ph': {
    name: 'Physical Armor',
    description: 'Weapons with the Armor Piercing (AP) property ignore this armor.',
    category: 'Armor'
  },
  'EN': {
    name: 'Energy Armor',
    description: 'Weapons with the Disabling (D) property affect this armor.',
    category: 'Armor'
  },
  
  // Ship Weapon Properties
  'D': {
    name: 'Disabling',
    description: 'This weapon is designed to disable a ship\'s functions rather than damage it. On a successful hit, the target ship makes a CON check against the listed DC. On a failure, a system at random goes offline. If the weapon has the Bl property as well, 1d6 systems go offline.',
    category: 'Ship Weapon'
  }
};

// Helper function to parse properties string and return data
export const parseProperties = (propertiesString) => {
  if (!propertiesString) return [];
  
  const props = propertiesString.split(',').map(p => p.trim()).filter(p => p);
  return props.map(prop => {
    const propData = PROPERTIES_DATA[prop];
    return {
      abbreviation: prop,
      ...propData
    };
  });
};

// Get category icon
export const getCategoryIcon = (category) => {
  switch(category) {
    case 'Weapon': return '⚔️';
    case 'Armor': return '🛡️';
    case 'Weapon/Armor': return '⚔️🛡️';
    case 'Ship Weapon': return '🚀';
    default: return '📦';
  }
};
