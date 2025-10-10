// Helper function to calculate ship AC based on armor
function calculateShipAC(ship, armor, armorTemplate) {
  if (!armor || !armorTemplate) {
    // No armor - use base AC (10)
    return 10;
  }

  // If armor has a fixed AC base
  if (armorTemplate.ac_base !== null) {
    return armorTemplate.ac_base;
  }

  // If armor has a formula (e.g., "11 + DEX" or "13 + DEX/2")
  if (armorTemplate.ac_formula) {
    const formula = armorTemplate.ac_formula.toLowerCase();
    const dexModifier = Math.floor((ship.dexterity - 10) / 2);
    
    if (formula.includes('dex/2')) {
      // Medium armor: halve DEX modifier
      const baseAC = parseInt(formula.match(/\d+/)[0]);
      return baseAC + Math.floor(dexModifier / 2);
    } else if (formula.includes('dex')) {
      // Light armor: full DEX modifier
      const baseAC = parseInt(formula.match(/\d+/)[0]);
      return baseAC + dexModifier;
    }
  }

  // If armor has AC bonus (like energy shields +2)
  if (armorTemplate.ac_bonus > 0) {
    return 10 + armorTemplate.ac_bonus;
  }

  // Fallback
  return 10;
}

module.exports = { calculateShipAC };
