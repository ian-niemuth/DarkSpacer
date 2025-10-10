// Centralized Archetype Ability System
// Handles all passive bonuses and calculations for each archetype

/**
 * Calculate HP bonus from archetype AT CHARACTER CREATION
 * @param {string} archetype - Character archetype
 * @returns {number} - Bonus HP to add at level 1
 */
function calculateArchetypeStartingHPBonus(archetype) {
  switch (archetype) {
    case 'Tough':
      // Stout: Start with +2 HP (ONLY at character creation)
      return 2;
    default:
      return 0;
  }
}

/**
 * Calculate HP bonus from archetype for LEVEL UP
 * @param {string} archetype - Character archetype
 * @param {number} level - Character level
 * @returns {number} - Bonus HP to add (should be 0 for level ups)
 */
function calculateArchetypeHPBonus(archetype, level) {
  // No archetype gives bonus HP at level up
  // Tough's Stout ability only gives +2 at character creation
  return 0;
}

/**
 * Calculate inventory slot bonus from archetype
 * @param {string} archetype - Character archetype
 * @param {number} strength - Character strength score
 * @param {number} constitution - Character constitution score
 * @returns {number} - Additional inventory slots
 */
function calculateArchetypeInventoryBonus(archetype, strength, constitution) {
  const baseSlots = strength;
  
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
 * @param {string} archetype - Character archetype
 * @param {number} level - Character level
 * @returns {number} - Bonus AC to add
 */
function calculateArchetypeACBonus(archetype, level) {
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
 * @param {string} archetype - Character archetype
 * @returns {boolean} - True if starts with luck token
 */
function archetypeStartsWithLuck(archetype) {
  switch (archetype) {
    case 'Quick':
      // Never Tell Me the Odds: Start each game with Luck Token
      return true;
    default:
      return false;
  }
}

/**
 * Get all archetype bonuses for a character
 * @param {Object} character - Character object with archetype, level, stats
 * @returns {Object} - Object containing all bonuses
 */
function getAllArchetypeBonuses(character) {
  const { archetype, level, strength, constitution } = character;
  
  return {
    hpBonus: calculateArchetypeHPBonus(archetype, level),
    startingHPBonus: calculateArchetypeStartingHPBonus(archetype),
    inventoryBonus: calculateArchetypeInventoryBonus(archetype, strength, constitution),
    acBonus: calculateArchetypeACBonus(archetype, level),
    startsWithLuck: archetypeStartsWithLuck(archetype),
    // Future: Add more bonuses here
  };
}

/**
 * Get archetype ability descriptions for display
 * @param {string} archetype - Character archetype
 * @returns {Object} - Object with passive ability descriptions
 */
function getArchetypePassiveDescriptions(archetype) {
  const descriptions = {
    'Tough': {
      hp: 'Stout: +2 HP at creation',
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

module.exports = {
  calculateArchetypeHPBonus,
  calculateArchetypeStartingHPBonus,
  calculateArchetypeInventoryBonus,
  calculateArchetypeACBonus,
  archetypeStartsWithLuck,
  getAllArchetypeBonuses,
  getArchetypePassiveDescriptions
};
