// Frontend Archetype Ability System
// Mirrors backend calculations for preview purposes

/**
 * Calculate HP bonus from archetype
 */
export function calculateArchetypeHPBonus(archetype, level = 1) {
  switch (archetype) {
    case 'Tough':
      return 2; // Stout: +2 HP
    default:
      return 0;
  }
}

/**
 * Calculate inventory slot bonus from archetype
 */
export function calculateArchetypeInventoryBonus(archetype, strength, constitution) {
  switch (archetype) {
    case 'Strong':
      // Hauler: Add CON modifier if positive
      const conMod = Math.floor((constitution - 10) / 2);
      return conMod > 0 ? conMod : 0;
    default:
      return 0;
  }
}

/**
 * Calculate AC bonus from archetype
 */
export function calculateArchetypeACBonus(archetype, level = 1) {
  switch (archetype) {
    case 'Wise':
      // Insightful Defense: Add half level (min 1)
      return Math.max(1, Math.floor(level / 2));
    default:
      return 0;
  }
}

/**
 * Check if archetype starts with a luck token
 */
export function archetypeStartsWithLuck(archetype) {
  switch (archetype) {
    case 'Quick':
      return true; // Never Tell Me the Odds
    default:
      return false;
  }
}

/**
 * Get all archetype bonuses for a character
 */
export function getAllArchetypeBonuses(character) {
  const { archetype, level = 1, strength, constitution } = character;
  
  return {
    hpBonus: calculateArchetypeHPBonus(archetype, level),
    inventoryBonus: calculateArchetypeInventoryBonus(archetype, strength, constitution),
    acBonus: calculateArchetypeACBonus(archetype, level),
    startsWithLuck: archetypeStartsWithLuck(archetype)
  };
}

/**
 * Get archetype passive ability descriptions
 */
export function getArchetypePassiveDescriptions(archetype) {
  const descriptions = {
    'Tough': {
      hp: 'Stout: +2 HP',
      hpRoll: 'Stout: Roll HP with advantage'
    },
    'Strong': {
      inventory: 'Hauler: Add CON modifier to gear slots'
    },
    'Quick': {
      luck: 'Never Tell Me the Odds: Start with Luck Token after rest'
    },
    'Wise': {
      ac: 'Insightful Defense: Add half level to AC (min 1)'
    },
    'Clever': {},
    'Charming': {}
  };
  
  return descriptions[archetype] || {};
}

/**
 * Get a friendly explanation of archetype bonuses for display
 */
export function getArchetypeBonusExplanation(archetype, character) {
  const bonuses = getAllArchetypeBonuses(character);
  const explanations = [];
  
  if (bonuses.hpBonus > 0) {
    explanations.push(`+${bonuses.hpBonus} HP from ${archetype} (Stout)`);
  }
  
  if (bonuses.inventoryBonus > 0) {
    explanations.push(`+${bonuses.inventoryBonus} inventory slots from ${archetype} (Hauler)`);
  }
  
  if (bonuses.acBonus > 0) {
    explanations.push(`+${bonuses.acBonus} AC from ${archetype} (Insightful Defense)`);
  }
  
  if (bonuses.startsWithLuck) {
    explanations.push(`Start with Luck Token from ${archetype} (Never Tell Me the Odds)`);
  }
  
  return explanations;
}
