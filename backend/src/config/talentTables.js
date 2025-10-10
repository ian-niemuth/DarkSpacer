// backend/src/config/talentTables.js
// Talent tables for each archetype based on 2d6 roll

const TALENT_TABLES = {
  'Charming': {
    2: {
      name: "Scoundrel's Luck",
      description: "You start each session with a Luck Token. After you have finished a rest, gain a Luck Token if you do not already have one. If you already have this Talent, start your session with one additional Luck Token. You may have multiple Luck Tokens.",
      stackable: true
    },
    3: {
      name: "Combat Training",
      description: "+1 to melee and ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    4: {
      name: "Combat Training",
      description: "+1 to melee and ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    5: {
      name: "Combat Training",
      description: "+1 to melee and ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    6: {
      name: "Carousing Expertise",
      description: "+1 to your carousing rolls",
      statBonus: 1
    },
    7: {
      name: "Stat Increase",
      description: "+2 to DEX, INT, or CHA stat",
      choice: true,
      options: ["DEX", "INT", "CHA"],
      statBonus: 2
    },
    8: {
      name: "Stat Increase",
      description: "+2 to DEX, INT, or CHA stat",
      choice: true,
      options: ["DEX", "INT", "CHA"],
      statBonus: 2
    },
    9: {
      name: "Stat Increase",
      description: "+2 to DEX, INT, or CHA stat",
      choice: true,
      options: ["DEX", "INT", "CHA"],
      statBonus: 2
    },
    10: {
      name: "Improved Sway",
      description: "Reduce the DC of one of your Sway effects by 3",
      choice: true,
      options: ["Befriend", "Charm", "Terrify", "Deceive"]
    },
    11: {
      name: "Improved Sway",
      description: "Reduce the DC of one of your Sway effects by 3",
      choice: true,
      options: ["Befriend", "Charm", "Terrify", "Deceive"]
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a Talent or +2 points to distribute to stats",
      choice: true,
      options: ["Choose another Charming Talent", "+2 to any stat(s)"]
    }
  },

  'Quick': {
    2: {
      name: "Initiative Advantage",
      description: "Gain advantage on initiative rolls",
      stackable: false
    },
    3: {
      name: "Improved Quick Shot",
      description: "Your Quick Shot deals +1 dice of damage",
      stackable: true
    },
    4: {
      name: "Improved Quick Shot",
      description: "Your Quick Shot deals +1 dice of damage",
      stackable: true
    },
    5: {
      name: "Improved Quick Shot",
      description: "Your Quick Shot deals +1 dice of damage",
      stackable: true
    },
    6: {
      name: "Stat Increase",
      description: "+2 to Dexterity, Wisdom or Charisma stat",
      choice: true,
      options: ["DEX", "WIS", "CHA"],
      statBonus: 2
    },
    7: {
      name: "Stat Increase",
      description: "+2 to Dexterity, Wisdom or Charisma stat",
      choice: true,
      options: ["DEX", "WIS", "CHA"],
      statBonus: 2
    },
    8: {
      name: "Stat Increase",
      description: "+2 to Dexterity, Wisdom or Charisma stat",
      choice: true,
      options: ["DEX", "WIS", "CHA"],
      statBonus: 2
    },
    9: {
      name: "Stat Increase",
      description: "+2 to Dexterity, Wisdom or Charisma stat",
      choice: true,
      options: ["DEX", "WIS", "CHA"],
      statBonus: 2
    },
    10: {
      name: "Ranged Combat Master",
      description: "+1 to ranged attacks",
      statBonus: 1
    },
    11: {
      name: "Ranged Combat Master",
      description: "+1 to ranged attacks",
      statBonus: 1
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a talent or +2 points to distribute to stats",
      choice: true,
      options: ["Choose another Quick Talent", "+2 to any stat(s)"]
    }
  },

  'Clever': {
    2: {
      name: "Enhanced Keen Support",
      description: "Gain one additional use of Keen Support",
      stackable: true,
      usesPerDay: 1
    },
    3: {
      name: "Expertise Advantage",
      description: "Gain advantage on one area of expertise you know",
      choice: true,
      options: ["Specify expertise area"]
    },
    4: {
      name: "Expertise Advantage",
      description: "Gain advantage on one area of expertise you know",
      choice: true,
      options: ["Specify expertise area"]
    },
    5: {
      name: "Expertise Advantage",
      description: "Gain advantage on one area of expertise you know",
      choice: true,
      options: ["Specify expertise area"]
    },
    6: {
      name: "Stat Increase",
      description: "+2 to Intelligence stat",
      choice: true,
      options: ["INT"],
      statBonus: 2
    },
    7: {
      name: "Expert Knowledge Bonus",
      description: "+1 to Expert Knowledge checks",
      statBonus: 1
    },
    8: {
      name: "Stat Increase",
      description: "+2 to Intelligence stat",
      choice: true,
      options: ["INT"],
      statBonus: 2
    },
    9: {
      name: "Additional Expertise",
      description: "Learn one additional area of expertise",
      choice: true,
      options: ["Specify new expertise"]
    },
    10: {
      name: "Additional Expertise",
      description: "Learn one additional area of expertise",
      choice: true,
      options: ["Specify new expertise"]
    },
    11: {
      name: "Additional Expertise",
      description: "Learn one additional area of expertise",
      choice: true,
      options: ["Specify new expertise"]
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a talent or +2 points to distribute to stats",
      choice: true,
      options: ["Choose another Clever Talent", "+2 to any stat(s)"]
    }
  },

  'Strong': {
    2: {
      name: "Expanded Weapon Expertise",
      description: "Gain Weapon Expertise with one additional weapon category",
      choice: true,
      options: ["Simple Melee", "Martial Melee", "Simple Ranged", "Martial Ranged"]
    },
    3: {
      name: "Melee Combat Master",
      description: "+1 to melee attacks",
      statBonus: 1
    },
    4: {
      name: "Melee Combat Master",
      description: "+1 to melee attacks",
      statBonus: 1
    },
    5: {
      name: "Melee Combat Master",
      description: "+1 to melee attacks",
      statBonus: 1
    },
    6: {
      name: "Melee Combat Master",
      description: "+1 to melee attacks",
      statBonus: 1
    },
    7: {
      name: "Stat Increase",
      description: "+2 to Strength, Dexterity, or Constitution stat",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    8: {
      name: "Stat Increase",
      description: "+2 to Strength, Dexterity, or Constitution stat",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    9: {
      name: "Stat Increase",
      description: "+2 to Strength, Dexterity, or Constitution stat",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    10: {
      name: "Armor Specialization",
      description: "Choose one category of armor. You get +1 AC from that armor",
      choice: true,
      options: ["Light Armor", "Medium Armor", "Heavy Armor"]
    },
    11: {
      name: "Armor Specialization",
      description: "Choose one category of armor. You get +1 AC from that armor",
      choice: true,
      options: ["Light Armor", "Medium Armor", "Heavy Armor"]
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a Strong Talent or +2 points to assign to stats",
      choice: true,
      options: ["Choose another Strong Talent", "+2 to any stat(s)"]
    }
  },

  'Tough': {
    2: {
      name: "Critical Strike",
      description: "Deal an additional +1d4 damage when scoring a critical hit",
      stackable: true
    },
    3: {
      name: "Shake it Off",
      description: "1/day, ignore all damage and effects from one attack. If you already have Shake it Off, you gain an additional use per day",
      stackable: true,
      usesPerDay: 1
    },
    4: {
      name: "Combat Training",
      description: "+1 to melee or ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    5: {
      name: "Combat Training",
      description: "+1 to melee or ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    6: {
      name: "Combat Training",
      description: "+1 to melee or ranged attacks",
      choice: true,
      options: ["Melee Attacks (+1)", "Ranged Attacks (+1)"],
      statBonus: 1
    },
    7: {
      name: "Stat Increase",
      description: "+2 to either Str, Dex, Con",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    8: {
      name: "Stat Increase",
      description: "+2 to either Str, Dex, Con",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    9: {
      name: "Stat Increase",
      description: "+2 to either Str, Dex, Con",
      choice: true,
      options: ["STR", "DEX", "CON"],
      statBonus: 2
    },
    10: {
      name: "Armor Specialization",
      description: "Choose one category of armor. You get +1 AC from that armor",
      choice: true,
      options: ["Light Armor", "Medium Armor", "Heavy Armor"]
    },
    11: {
      name: "Armor Specialization",
      description: "Choose one category of armor. You get +1 AC from that armor",
      choice: true,
      options: ["Light Armor", "Medium Armor", "Heavy Armor"]
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a talent or +2 points to distribute to stats",
      choice: true,
      options: ["Choose another Tough Talent", "+2 to any stat(s)"]
    }
  },

  'Wise': {
    2: {
      name: "Riposte",
      description: "1/day (or +1 use) Deflect a successful attack. Damage attacker or other target instead. You may gain this multiple times",
      stackable: true,
      usesPerDay: 1
    },
    3: {
      name: "Enlightenment or Triad",
      description: "Choose: Gain +1 Enlightenment use OR gain a new Triad Power (if available)",
      choice: true,
      options: ["Gain +1 Enlightenment use", "Gain Triad Power"]
    },
    4: {
      name: "Enlightenment or Triad",
      description: "Choose: Gain +1 Enlightenment use OR gain a new Triad Power (if available)",
      choice: true,
      options: ["Gain +1 Enlightenment use", "Gain Triad Power"]
    },
    5: {
      name: "Enlightenment or Triad",
      description: "Choose: Gain +1 Enlightenment use OR gain a new Triad Power (if available)",
      choice: true,
      options: ["Gain +1 Enlightenment use", "Gain Triad Power"]
    },
    6: {
      name: "Enlightenment or Triad",
      description: "Choose: Gain +1 Enlightenment use OR gain a new Triad Power (if available)",
      choice: true,
      options: ["Gain +1 Enlightenment use", "Gain Triad Power"]
    },
    7: {
      name: "Stat Increase",
      description: "+2 to INT, WIS, CON stat",
      choice: true,
      options: ["INT", "WIS", "CON"],
      statBonus: 2
    },
    8: {
      name: "Stat Increase",
      description: "+2 to INT, WIS, CON stat",
      choice: true,
      options: ["INT", "WIS", "CON"],
      statBonus: 2
    },
    9: {
      name: "Stat Increase",
      description: "+2 to INT, WIS, CON stat",
      choice: true,
      options: ["INT", "WIS", "CON"],
      statBonus: 2
    },
    10: {
      name: "Improved Optimization",
      description: "Increase the die category of your Optimization talent by one",
      stackable: true
    },
    11: {
      name: "Improved Optimization",
      description: "Increase the die category of your Optimization talent by one",
      stackable: true
    },
    12: {
      name: "Ultimate Choice",
      description: "Choose a Talent or +2 points to distribute to stats",
      choice: true,
      options: ["Choose another Wise Talent", "+2 to any stat(s)"]
    }
  }
};

const HIT_DICE = {
  'Charming': { die: 6, advantage: false },
  'Quick': { die: 6, advantage: false },
  'Clever': { die: 4, advantage: false },
  'Strong': { die: 8, advantage: false },
  'Tough': { die: 8, advantage: true },  // Tough gets advantage from Stout ability
  'Wise': { die: 4, advantage: false }
};

// Roll a die (1 to sides)
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Roll 2d6 for talent table
function rollTalentTable() {
  return rollDie(6) + rollDie(6);
}

// Roll HP with optional advantage
function rollHitPoints(archetype) {
  const hitDieInfo = HIT_DICE[archetype];
  if (!hitDieInfo) {
    throw new Error(`Unknown archetype: ${archetype}`);
  }

  const roll1 = rollDie(hitDieInfo.die);
  
  if (hitDieInfo.advantage) {
    const roll2 = rollDie(hitDieInfo.die);
    return {
      roll: Math.max(roll1, roll2),
      rolls: [roll1, roll2],
      advantage: true
    };
  }
  
  return {
    roll: roll1,
    rolls: [roll1],
    advantage: false
  };
}

// Get talent from table
function getTalent(archetype, roll) {
  const table = TALENT_TABLES[archetype];
  if (!table) {
    throw new Error(`Unknown archetype: ${archetype}`);
  }
  
  const talent = table[roll];
  if (!talent) {
    throw new Error(`Invalid talent roll ${roll} for ${archetype}`);
  }
  
  return { ...talent, roll };
}

// Get random talent for archetype
function getRandomTalent(archetype) {
  const roll = rollTalentTable();
  return getTalent(archetype, roll);
}

module.exports = {
  TALENT_TABLES,
  HIT_DICE,
  rollTalentTable,
  rollHitPoints,
  getTalent,
  getRandomTalent
};
