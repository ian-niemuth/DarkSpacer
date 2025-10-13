import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { 
  calculateArchetypeHPBonus, 
  calculateArchetypeACBonus,
  getArchetypeBonusExplanation 
} from '../utils/archetypeAbilities';
const ARCHETYPE_DATA = {
  'Charming': {
    hp: 6,
    description: 'Scoundrels, performers, politicians, and captains',
    weapons: 'Pistols and Blasters',
    armor: 'Light Armor',
    abilities: [
      {
        name: 'Languages',
        description: 'You know four additional common languages and one rare language.'
      },
      {
        name: 'Know a Guy',
        description: 'Whenever you are in a populated area, you might "know someone who knows someone" who might be able to help you with supplies, information, repairs or whatever it is you need. Make a Charisma check DC 12 to locate a contact that might help you. You still have to compensate them for whatever services required but they are discreet and it is off the record.'
      },
      {
        name: 'Sway',
        description: 'Make a Charisma check to sway your audience with one of the following effects. If you fail, you can\'t use that effect again until you successfully rest.\n• Motivate. DC 12. One target in NEAR gains a luck token if they do not have one.\n• Beguile. DC 15. You transfix targets whose total levels are equal up to your level plus CHA modifier within near for 1d4 rounds.'
      },
      {
        name: 'Bon Vivant',
        description: 'Groups carousing with 1 or more Charming characters add 1d6 to their rolls.'
      }
    ],
    talentTable: [
      { roll: 2, result: "Scoundrel's Luck", description: "You start each session with a Luck Token. After you have finished a rest, gain a Luck Token if you do not already have one. If you already have this Talent, start your session with one additional Luck Token. You may have multiple Luck Tokens.", usesPerDay: 0 },
      { roll: [3,6], result: "Combat Training", description: "+1 to melee and ranged attacks OR +1 to your carousing rolls", choice: true, options: ['+1 melee and ranged attacks', '+1 carousing rolls'] },
      { roll: [7,9], result: "Ability Increase", description: "+2 to DEX, INT, or CHA stat", choice: true, options: ['DEX', 'INT', 'CHA'], statBonus: 2 },
      { roll: [10,11], result: "Improved Sway", description: "Reduce the DC of one of your Sway effects by 3", choice: true, options: ['Motivate (DC 9)', 'Beguile (DC 12)'] },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a Talent or +2 points to distribute to stats", choice: true, options: ['Choose any Charming talent', '+2 to any stats'] }
    ]
  },
  'Clever': {
    hp: 4,
    description: 'Scientists, hackers, strategists, and inventors',
    weapons: 'Light Ranged Weapons',
    armor: 'None',
    abilities: [
      {
        name: 'Languages',
        description: 'You know two additional common languages and two rare languages.'
      },
      {
        name: 'Expert Knowledge',
        description: 'Choose one non-combat Area of Expertise of your choosing. Try not to be too broad or too narrow (ex. Medicine is too broad, brain surgery is too narrow). Collaborate with your GM if needed. Add +1 to any rolls associated with that area of expertise. In addition, add half your level to these rolls (round down).'
      },
      {
        name: 'Keen Support',
        description: '3/day, when an ally is about to make a non-combat roll, make a DC 9 Intelligence check. If you succeed, they can add +1d4 to their roll.',
        usesPerDay: 3
      }
    ],
    talentTable: [
      { roll: 2, result: "Enhanced Support", description: "Gain one additional use of Keen Support", usesPerDay: 1 },
      { roll: [3,5], result: "Specialized Expertise", description: "Gain advantage on one area of expertise you know" },
      { roll: [6,8], result: "Brilliant Mind", description: "+2 to Intelligence stat OR +1 to Expert Knowledge checks", choice: true, options: ['+2 INT', '+1 Expert Knowledge'], statBonus: 2 },
      { roll: [9,11], result: "Polymath", description: "Learn one additional area of expertise" },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a talent or +2 points to distribute to stats", choice: true, options: ['Choose any Clever talent', '+2 to any stats'] }
    ]
  },
  'Quick': {
    hp: 6,
    description: 'Pilots, thieves, gunslingers, and assassins',
    weapons: 'Light Melee and Light Ranged Weapons',
    armor: 'Light Armor',
    abilities: [
      {
        name: 'Quick Shot',
        description: "If you're sneaky and the creature doesn't see you coming, you get to roll extra weapon dice for damage equal to half your level (rounded down)."
      },
      {
        name: 'Never Tell Me the Odds',
        description: 'Start each game with a Luck Token. After you have finished a rest you get a Luck Token if you don\'t already have one.'
      },
      {
        name: 'Reflexes',
        description: 'You have advantage on DEX checks to avoid a dangerous situation, such as avoiding a laser mine or flying through an asteroid field.'
      }
    ],
    talentTable: [
      { roll: 2, result: "Combat Reflexes", description: "Gain advantage on initiative rolls (re-roll if duplicate)" },
      { roll: [3,5], result: "Deadly Precision", description: "Your Quick Shot deals +1 dice of damage" },
      { roll: [6,9], result: "Ability Increase", description: "+2 to Dexterity, Wisdom or Charisma stat", choice: true, options: ['DEX', 'WIS', 'CHA'], statBonus: 2 },
      { roll: [10,11], result: "Sharpshooter", description: "+1 to ranged attacks" },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a talent or +2 points to distribute to stats", choice: true, options: ['Choose any Quick talent', '+2 to any stats'] }
    ]
  },
  'Strong': {
    hp: 8,
    description: 'Grunts, teamsters, gladiators, and bodyguards',
    weapons: 'All Melee weapons',
    armor: 'All Armor',
    abilities: [
      {
        name: 'Hauler',
        description: 'Add your CON modifier, if positive, to your gear slots.'
      },
      {
        name: 'Weapon Expertise',
        description: 'Pick a category of melee weapon, like blunt weapons. You get +1 to hit and do damage with that kind of weapon. On top of that, add half your level to those rolls (rounded down).'
      },
      {
        name: 'Grit',
        description: "You have advantage on STR checks to overcome an opposing force, such as kicking open a stuck cargo hatch or pulling a robot's arm off."
      }
    ],
    talentTable: [
      { roll: 2, result: "Additional Weapon Expertise", description: "Gain Weapon Expertise with one additional weapon category", choice: true, options: ['Blunt', 'Bladed', 'Polearms'] },
      { roll: [3,6], result: "Melee Specialist", description: "+1 to melee attacks" },
      { roll: [7,9], result: "Ability Increase", description: "+2 to Strength, Dexterity, or Constitution stat", choice: true, options: ['STR', 'DEX', 'CON'], statBonus: 2 },
      { roll: [10,11], result: "Armor Mastery", description: "Choose one category of armor. You get +1 AC from that armor", choice: true, options: ['Light', 'Medium', 'Heavy'], acBonus: 1 },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a Strong Talent or +2 points to assign to stats", choice: true, options: ['Choose any Strong talent', '+2 to any stats'] }
    ]
  },
  'Tough': {
    hp: 8,
    description: 'Soldiers, bounty hunters, scrappers, and bruisers',
    weapons: 'Heavy Melee and Heavy Ranged Weapons',
    armor: 'All Armor',
    bonusHP: 2, // Stout talent
    abilities: [
      {
        name: 'Stout',
        description: 'Start with +2 HP. Roll hit points per level with advantage.'
      },
      {
        name: 'Resilient',
        description: 'You have advantage on CON checks to resist permanent injury, disease, poison, or endure extreme environments.'
      },
      {
        name: 'Unyielding',
        description: '3/day, when you drop to 0 HP, make a DC 18 CON check (the Resilient talent applies). If you succeed, you tough it out and stay at 1 HP instead of going down.',
        usesPerDay: 3
      }
    ],
    talentTable: [
      { roll: 2, result: "Critical Strike", description: "Deal an additional +1d4 damage when scoring a critical hit" },
      { roll: 3, result: "Shake it Off", description: "1/day, ignore all damage and effects from one attack. If you already have Shake it Off, you gain an additional use per day", usesPerDay: 1 },
      { roll: [4,6], result: "Combat Training", description: "+1 to melee or ranged attacks", choice: true, options: ['+1 melee attacks', '+1 ranged attacks'] },
      { roll: [7,9], result: "Ability Increase", description: "+2 to either Str, Dex, Con", choice: true, options: ['STR', 'DEX', 'CON'], statBonus: 2 },
      { roll: [10,11], result: "Armor Mastery", description: "Choose one category of armor. You get +1 AC from that armor", choice: true, options: ['Light', 'Medium', 'Heavy'], acBonus: 1 },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a talent or +2 points to distribute to stats", choice: true, options: ['Choose any Tough talent', '+2 to any stats'] }
    ]
  },
  'Wise': {
    hp: 4,
    description: 'Mystics, sages, counselors, and monks',
    weapons: 'Light Melee Weapons',
    armor: 'None',
    abilities: [
      {
        name: 'Optimization',
        description: 'If you use a luck token, add 1d6 to the new roll.'
      },
      {
        name: 'Enlightenment',
        description: '3/day, you can make a DC 9 WIS check. On a success, gain a luck token (you can\'t have more than one luck token at a time).',
        usesPerDay: 3
      },
      {
        name: 'Insightful Defense',
        description: 'Add half your level (round down, minimum 1) to your AC.'
      }
    ],
    talentTable: [
      { roll: 2, result: "Riposte", description: "1/day (or +1 use) Deflect a successful attack. Damage attacker or other target instead. You may gain this multiple times.", usesPerDay: 1 },
      { roll: [3,6], result: "Enlightenment or Triad", description: "Gain +1 Enlightenment use per day OR gain a new Triad Power (if you don't have all 3)", choice: true, options: ['Gain +1 Enlightenment use', 'Gain Triad Power'], triadChoice: true, usesPerDay: 1 },
      { roll: [7,9], result: "Ability Increase", description: "+2 to INT, WIS, or CON stat", choice: true, options: ['INT', 'WIS', 'CON'], statBonus: 2 },
      { roll: [10,11], result: "Improved Optimization", description: "Increase the die category of your Optimization talent by one (1d6 → 1d8 → 1d10 → 1d12)" },
      { roll: 12, result: "Choose Talent or Stats", description: "Choose a Talent or +2 points to distribute to stats", choice: true, options: ['Choose any Wise talent', '+2 to any stats'] }
    ]
  }
};



function Dashboard({ user }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await api.get('/characters');
      console.log('Characters response:', response.data);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
      console.error('Error response:', error.response); // See full error details
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCharacter = async (characterId, characterName) => {
  const confirmDelete = window.confirm(
    `Delete "${characterName}"?\n\nThis CANNOT be undone!`
  );
  
  if (!confirmDelete) return;

  try {
    await api.delete(`/characters/${characterId}`);
    
    fetchCharacters(); // Refresh the list
    alert(`"${characterName}" deleted.`);
  } catch (error) {
    console.error('Error deleting character:', error);
    alert('Failed to delete character.');
  }
};

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading characters...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Spacers</h1>
        
        {/* Mobile: Stack buttons vertically, Desktop: Wrap horizontally */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
          {/* Catalog Buttons */}
          <Link
            to="/catalog/ships"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded font-bold text-center text-base sm:text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center"
          >
            🚀 Ship Catalog
          </Link>
          <Link
            to="/catalog/gear"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-2 rounded font-bold text-center text-base sm:text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center"
          >
            ⚔️ Gear Catalog
          </Link>
          
          {/* Other Navigation */}
          <Link
            to="/ships"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 sm:py-2 rounded font-bold text-center text-base sm:text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center"
          >
            🚀 My Ships
          </Link>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 sm:py-2 rounded font-bold text-base sm:text-sm min-h-[44px] sm:min-h-0"
          >
            + Create Character
          </button>
        </div>
      </div>
{/* Character Cards - Mobile optimized */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {characters.map((character) => (
    <div
      key={character.id}
      className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 relative"
    >
      {/* Delete button in top-right corner - larger on mobile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteCharacter(character.id, character.name);
        }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 sm:w-8 sm:h-8 rounded-full text-base sm:text-sm font-bold"
        title="Delete Character"
      >
        ✕
      </button>

      {/* Character info - clickable area */}
      <Link to={`/character/${character.id}`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 hover:text-blue-400 transition pr-12 sm:pr-10">
          {character.name}
        </h3>
        <div className="text-gray-400 text-sm sm:text-base space-y-1">
          <p>Level {character.level} {character.species} {character.archetype}</p>
          <p className="text-sm">{character.background}</p>
          <div className="flex justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-600 text-sm sm:text-base">
            <span>HP: {character.hp_current}/{character.hp_max}</span>
            <span>💰 {character.credits}cr</span>
          </div>
        </div>
      </Link>

      {/* View button at bottom - larger on mobile */}
      <Link
        to={`/character/${character.id}`}
        className="mt-4 block bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded text-center text-base sm:text-sm font-medium min-h-[44px] sm:min-h-0 flex items-center justify-center"
      >
        View Character
      </Link>
    </div>
  ))}
</div>

      {showCreateModal && (
        <CreateCharacterModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchCharacters();
          }}
        />
      )}
    </div>
  );
}


function CreateCharacterModal({ onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Human',
    archetype: 'Charming',
    background: 'Street Rat',
    motivation: 'The Survivor',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  });
  const [talents, setTalents] = useState([]);
  const [talentChoices, setTalentChoices] = useState({});
  const [nestedChoices, setNestedChoices] = useState({}); // For "choose talent or stats" options
  const [error, setError] = useState('');
  const [selectedArchetypeDetails, setSelectedArchetypeDetails] = useState(null);
  const [statRollsRemaining, setStatRollsRemaining] = useState(5);
  const [talentsRolled, setTalentsRolled] = useState(false);
  
  // Triad system state (for Wise archetype)
  const [useTriadAtStart, setUseTriadAtStart] = useState(false);
  const [startingTriadPower, setStartingTriadPower] = useState('');
  const [enlightenmentUses, setEnlightenmentUses] = useState(3); // Base 3/day

  const backgrounds = [
    'Street Rat', 'Outlaw', 'Hacker', 'Operative', 'Roughneck',
    'Mechanic', 'Politician', 'Fence', 'Gambler', 'Corpo',
    'Mercenary', 'Pilot', 'Acolyte', 'Soldier', 'Ranger',
    'Scientist', 'Celebrity', 'Academic', 'Noble', 'Medic'
  ];

  const motivations = {
    'The Survivor': 'Roll on Citizen Starting Equipment for extra gear',
    'The Vile': 'Start with extra 2d10 credits',
    'The Virtuous': 'Start with 1d3 trusted contacts'
  };

  // Roll 3d6 for stats
  const roll3d6 = () => {
    return Math.floor(Math.random() * 6) + 1 +
           Math.floor(Math.random() * 6) + 1 +
           Math.floor(Math.random() * 6) + 1;
  };

  const handleRollStats = () => {
    if (statRollsRemaining <= 0) return;
    
    // Roll all stats
    const newStats = {
      strength: roll3d6(),
      dexterity: roll3d6(),
      constitution: roll3d6(),
      intelligence: roll3d6(),
      wisdom: roll3d6(),
      charisma: roll3d6()
    };
    
    // BUG FIX #1: Only count roll if at least one stat is 14+
    const hasHighStat = Object.values(newStats).some(stat => stat >= 14);
    
    setFormData({
      ...formData,
      ...newStats
    });
    
    // Only decrement if at least one stat is 14 or greater
    if (hasHighStat) {
      setStatRollsRemaining(statRollsRemaining - 1);
    }
  };

  const getModifier = (stat) => {
    return Math.floor((stat - 10) / 2);
  };

  // Roll 2d6 for talent table
  const roll2d6 = () => {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
  };

  // Find talent result from roll
  const getTalentFromRoll = (roll, talentTable) => {
    for (const talent of talentTable) {
      if (Array.isArray(talent.roll)) {
        if (roll >= talent.roll[0] && roll <= talent.roll[1]) {
          return talent;
        }
      } else if (talent.roll === roll) {
        return talent;
      }
    }
    return null;
  };

  // Roll talents (2 for Human with Ambitious trait)
  const handleRollTalents = () => {
    const archetypeData = ARCHETYPE_DATA[formData.archetype];
    const numRolls = formData.species === 'Human' ? 2 : 1;
    const rolledTalents = [];
    
    for (let i = 0; i < numRolls; i++) {
      const roll = roll2d6();
      const talent = getTalentFromRoll(roll, archetypeData.talentTable);
      if (talent) {
        rolledTalents.push({
          ...talent,
          rollResult: roll,
          talentIndex: i
        });
      }
    }
    
    setTalents(rolledTalents);
    setTalentsRolled(true);
  };

  // Handle talent choice selection
  const handleTalentChoice = (talentIndex, choice) => {
    setTalentChoices({
      ...talentChoices,
      [talentIndex]: choice
    });
  };

  // Handle nested choice (for "Choose talent or stats" options)
  const handleNestedChoice = (talentIndex, field, value) => {
    setNestedChoices({
      ...nestedChoices,
      [talentIndex]: {
        ...nestedChoices[talentIndex],
        [field]: value
      }
    });
  };

  // Check if talent needs nested choices
  const needsNestedChoice = (talent) => {
    // Check if the talent result includes "Choose" and has the nested choice structure
    return talent.result && (
      talent.result.includes('Choose a talent') || 
      talent.result.includes('Choose a Talent') ||
      talent.result.includes('Choose Talent or Stats') ||
      talent.result.includes('choose talent')
    );
  };

  // Get available talents for "choose a talent" option
  const getAvailableTalents = (archetype) => {
    const archetypeData = ARCHETYPE_DATA[archetype];
    return archetypeData.talentTable
      .filter(t => t.roll !== 12) // Exclude the "choose talent or stats" option itself
      .map(t => t.result);
  };

  // 🔧 FIXED: Get available Triad powers excluding starting power and powers from OTHER talents (not current)
  const getAvailableTriadPowers = (currentTalentIndex) => {
    const allPowers = ['Body', 'Mind', 'Soul'];
    const usedPowers = [];
    
    // Add starting power if selected
    if (startingTriadPower) {
      usedPowers.push(startingTriadPower);
    }
    
    // Add powers from OTHER talents (not the current one)
    talents.forEach((talent, index) => {
      if (index !== currentTalentIndex && 
          talentChoices[index] === 'Gain Triad Power' && 
          nestedChoices[index]?.triadPower) {
        usedPowers.push(nestedChoices[index].triadPower);
      }
    });
    
    // Filter out used powers
    return allPowers.filter(power => !usedPowers.includes(power));
  };

  // 🔧 FIXED: Just store the selection, don't modify any other state
  const handleTriadPowerChoice = (talentIndex, power) => {
    setNestedChoices({
      ...nestedChoices,
      [talentIndex]: {
        ...nestedChoices[talentIndex],
        triadPower: power
      }
    });
  };

  // Track Triad vs Enlightenment choices for talents
  const handleTriadOrEnlightenmentChoice = (talentIndex, choice) => {
    const previousChoice = talentChoices[talentIndex];
    
    // Handle incrementing/decrementing Enlightenment uses
    if (choice === 'Gain +1 Enlightenment use' && previousChoice !== 'Gain +1 Enlightenment use') {
      setEnlightenmentUses(enlightenmentUses + 1);
    } else if (previousChoice === 'Gain +1 Enlightenment use' && choice !== 'Gain +1 Enlightenment use') {
      setEnlightenmentUses(Math.max(3, enlightenmentUses - 1)); // Don't go below starting 3
    }
    
    // If switching away from Triad Power, clear the nested choice
    if (choice !== 'Gain Triad Power' && nestedChoices[talentIndex]?.triadPower) {
      const newNestedChoices = { ...nestedChoices };
      delete newNestedChoices[talentIndex];
      setNestedChoices(newNestedChoices);
    }
    
    setTalentChoices({
      ...talentChoices,
      [talentIndex]: choice
    });
  };

  // Calculate starting HP
  const calculateStartingHP = () => {
    const archetypeData = ARCHETYPE_DATA[formData.archetype];
    const maxDie = archetypeData.hp; // Always use max die value at creation
    const conMod = getModifier(formData.constitution);
    
    // BUG FIX #2: Base HP = max die + CON modifier (only if positive)
    // Never go below 1 HP total
    let totalHP = Math.max(1, maxDie + Math.max(0, conMod));
    
    // Add archetype bonus (e.g., Tough +2)
    const archetypeBonus = calculateArchetypeHPBonus(formData.archetype, 1);
    totalHP += archetypeBonus;
    
    return totalHP;
  };

  // Apply talent stat bonuses to base stats
  const applyTalentBonuses = () => {
    const statsWithBonuses = { ...formData };
    
    talents.forEach((talent, index) => {
      // Handle regular stat bonuses
      if (talent.statBonus && talentChoices[index]) {
        const stat = talentChoices[index].toLowerCase();
        if (['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(stat)) {
          const fullStatName = {
            'str': 'strength',
            'dex': 'dexterity',
            'con': 'constitution',
            'int': 'intelligence',
            'wis': 'wisdom',
            'cha': 'charisma'
          }[stat];
          
          statsWithBonuses[fullStatName] += talent.statBonus;
        }
      }

      // Handle nested choices (choose talent or +2 stats)
      if (needsNestedChoice(talent) && nestedChoices[index]) {
        const primaryChoice = nestedChoices[index].primaryChoice;
        
        if (primaryChoice && primaryChoice.includes('+2')) {
          // They chose stats - apply the bonus
          const statChoice = nestedChoices[index].statChoice;
          if (statChoice) {
            const stat = statChoice.toLowerCase();
            if (['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(stat)) {
              const fullStatName = {
                'str': 'strength',
                'dex': 'dexterity',
                'con': 'constitution',
                'int': 'intelligence',
                'wis': 'wisdom',
                'cha': 'charisma'
              }[stat];
              
              statsWithBonuses[fullStatName] += 2;
            }
          }
        }
      }
    });
    
    return statsWithBonuses;
  };

  // Calculate starting AC (Base 10 + DEX + Insightful Defense for Wise + Talent bonuses)
  const calculateStartingAC = () => {
    const dexMod = getModifier(formData.dexterity);
    let baseAC = 10;
    
    // Add DEX modifier (positive or negative)
    baseAC += dexMod;
    
    // Add archetype AC bonus (e.g., Wise Insightful Defense)
    const archetypeBonus = calculateArchetypeACBonus(formData.archetype, 1);
    baseAC += archetypeBonus;
    
    // Add talent AC bonuses
    let talentACBonus = 0;
    talents.forEach((talent, index) => {
      if (talent.acBonus && talentChoices[index]) {
        talentACBonus += talent.acBonus;
      }
    });
    
    return baseAC + talentACBonus;
  };

  // Roll starting credits
  const rollStartingCredits = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    let credits = (d1 + d2) * 10;
    
    if (formData.motivation === 'The Vile') {
      const extraD1 = Math.floor(Math.random() * 10) + 1;
      const extraD2 = Math.floor(Math.random() * 10) + 1;
      credits += (extraD1 + extraD2);
    }
    
    return credits;
  };

  // 🔧 FIXED: Build final Triad powers array only when submitting
  const buildFinalTriadPowers = () => {
    const powers = [];
    
    // Add starting power if selected
    if (startingTriadPower) {
      powers.push(startingTriadPower);
    }
    
    // Add powers from talents
    talents.forEach((talent, index) => {
      if (talentChoices[index] === 'Gain Triad Power' && nestedChoices[index]?.triadPower) {
        const power = nestedChoices[index].triadPower;
        if (!powers.includes(power)) {
          powers.push(power);
        }
      }
    });
    
    return powers;
  };

  // 🔧 FIXED: Get count of total selected Triad powers for validation
  const getTotalTriadPowersCount = () => {
    return buildFinalTriadPowers().length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate talent choices
    for (let i = 0; i < talents.length; i++) {
      const talent = talents[i];
      
      if (needsNestedChoice(talent)) {
        if (!nestedChoices[i] || !nestedChoices[i].primaryChoice) {
          setError('Please make all talent choices before creating character');
          return;
        }
        
        const primaryChoice = nestedChoices[i].primaryChoice;
        if (primaryChoice.includes('talent') && !nestedChoices[i].talentChoice) {
          setError('Please select which talent you want');
          return;
        }
        if (primaryChoice.includes('+2') && !nestedChoices[i].statChoice) {
          setError('Please select which stat to increase');
          return;
        }
      } else if (talent.triadChoice && formData.archetype === 'Wise') {
        // Validate Triad choices
        if (!talentChoices[i]) {
          setError('Please choose between Enlightenment or Triad Power');
          return;
        }
        if (talentChoices[i] === 'Gain Triad Power') {
          if (!nestedChoices[i] || !nestedChoices[i].triadPower) {
            setError('Please select which Triad Power to gain');
            return;
          }
        }
      } else if (talent.choice && !talentChoices[i]) {
        setError('Please make all talent choices before creating character');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const statsWithBonuses = applyTalentBonuses();
      const startingHP = calculateStartingHP();
      const startingCredits = rollStartingCredits();
      const startingAC = calculateStartingAC();
      
      // 🔧 FIXED: Build final Triad powers array
      const finalTriadPowers = buildFinalTriadPowers();
      
      // Build talents array for storage
      const talentsForStorage = talents.map((talent, index) => {
        const baseTalent = {
          name: talent.result,
          description: talent.description,
          roll: talent.rollResult,
          usesPerDay: talent.usesPerDay || 0,
          acBonus: talent.acBonus || 0,
          statBonus: talent.statBonus || 0
        };

        // Handle nested choices
        if (needsNestedChoice(talent) && nestedChoices[index]) {
          baseTalent.choice = nestedChoices[index].primaryChoice;
          baseTalent.nestedChoice = nestedChoices[index].talentChoice || nestedChoices[index].statChoice;
        } else {
          baseTalent.choice = talentChoices[index] || null;
        }

        return baseTalent;
      });

      const characterData = {
        ...statsWithBonuses,
        name: formData.name,
        species: formData.species,
        archetype: formData.archetype,
        background: formData.background,
        motivation: formData.motivation,
        hp_current: startingHP,
        hp_max: startingHP,
        ac: startingAC,
        credits: startingCredits,
        level: 1,
        xp: 0,
        talents: JSON.stringify(talentsForStorage),
        triad_powers: JSON.stringify(finalTriadPowers)
      };

      await api.post('/characters', characterData);
      
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create character');
    }
  };

  useEffect(() => {
    setSelectedArchetypeDetails(ARCHETYPE_DATA[formData.archetype]);
    
    // Reset Triad state if switching away from Wise
    if (formData.archetype !== 'Wise') {
      setUseTriadAtStart(false);
      setStartingTriadPower('');
      setEnlightenmentUses(3);
    }
  }, [formData.archetype]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-5xl w-full my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Create New Spacer {step === 2 && '- Roll Talents'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Character Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Species
                    </label>
                    <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                      Human
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Trait: Ambitious (2 talent rolls at 1st level)
                    </p>
                  </div>
                </div>

                {/* Archetype Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Archetype (Class) *
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(ARCHETYPE_DATA).map(([name, data]) => (
                      <label
                        key={name}
                        className={`p-4 border rounded cursor-pointer transition ${
                          formData.archetype === name
                            ? 'bg-blue-600 border-blue-500'
                            : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="archetype"
                          value={name}
                          checked={formData.archetype === name}
                          onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-white font-bold text-lg">{name}</div>
                            <div className="text-sm text-gray-300">{data.description}</div>
                          </div>
                          <div className="text-xs text-gray-400">HP: 1d{data.hp}/level</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                          <div>
                            <span className="text-gray-400">Weapons:</span>
                            <span className="text-white ml-1">{data.weapons}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Armor:</span>
                            <span className="text-white ml-1">{data.armor}</span>
                          </div>
                        </div>

                        {formData.archetype === name && (
                          <div className="mt-3 pt-3 border-t border-gray-600">
                            <div className="text-sm font-bold text-white mb-2">Abilities:</div>
                            {data.abilities.map((ability, idx) => (
                              <div key={idx} className="mb-2">
                                <div className="text-sm font-semibold text-blue-300">{ability.name}</div>
                                <div className="text-xs text-gray-300 whitespace-pre-line">{ability.description}</div>
                              </div>
                            ))}

                            {/* Talent Table */}
                            <div className="mt-4 pt-3 border-t border-gray-600">
                              <div className="text-sm font-bold text-white mb-2">📋 Talent Table (2d6):</div>
                              <div className="space-y-1">
                                {data.talentTable.map((talent, idx) => {
                                  const rollDisplay = Array.isArray(talent.roll)
                                    ? `${talent.roll[0]}-${talent.roll[1]}`
                                    : talent.roll;
                                  return (
                                    <div key={idx} className="text-xs bg-gray-800 rounded p-2">
                                      <div className="flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold min-w-[32px]">{rollDisplay}</span>
                                        <div className="flex-1">
                                          <span className="text-blue-300 font-semibold">{talent.result}</span>
                                          <div className="text-gray-400 mt-0.5">{talent.description}</div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Triad Choice for Wise */}
                            {name === 'Wise' && (
                              <div className="mt-4 p-3 bg-purple-900 bg-opacity-30 border border-purple-600 rounded">
                                <div className="text-sm font-bold text-purple-300 mb-2">⚡ Optional: The Triad</div>
                                <div className="text-xs text-gray-300 mb-3">
                                  You may swap Enlightenment for a Triad Power. Choose one:
                                </div>
                                <div className="space-y-2">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="triadChoice"
                                      checked={!useTriadAtStart}
                                      onChange={() => {
                                        setUseTriadAtStart(false);
                                        setStartingTriadPower('');
                                      }}
                                      className="form-radio text-blue-600"
                                    />
                                    <span className="text-sm text-white">Standard: Enlightenment (3/day)</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="triadChoice"
                                      checked={useTriadAtStart}
                                      onChange={() => setUseTriadAtStart(true)}
                                      className="form-radio text-purple-600"
                                    />
                                    <span className="text-sm text-white">The Triad: Choose one power</span>
                                  </label>
                                </div>
                                
                                {useTriadAtStart && (
                                  <div className="mt-3">
                                    <label className="block text-xs text-gray-300 mb-1">Select starting Triad Power:</label>
                                    <select
                                      className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white text-sm"
                                      value={startingTriadPower}
                                      onChange={(e) => setStartingTriadPower(e.target.value)}
                                      required={useTriadAtStart}
                                    >
                                      <option value="">-- Select Power --</option>
                                      <option value="Body">Body (CON) - Physical manipulation</option>
                                      <option value="Mind">Mind (INT) - Mental powers</option>
                                      <option value="Soul">Soul (WIS) - Metaphysical abilities</option>
                                    </select>
                                    <div className="mt-2 text-xs text-gray-400">
                                      You can gain additional powers through talents.
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Background & Motivation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Background *
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    >
                      {backgrounds.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Motivation *
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    >
                      {Object.keys(motivations).map(mot => (
                        <option key={mot} value={mot}>{mot}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {motivations[formData.motivation]}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Ability Scores *
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm text-gray-400">
                        Rolls remaining: {statRollsRemaining}/5
                      </span>
                      <button
                        type="button"
                        onClick={handleRollStats}
                        disabled={statRollsRemaining <= 0}
                        className={`px-4 py-2 sm:py-1 rounded text-sm font-bold min-h-[44px] sm:min-h-0 ${
                          statRollsRemaining > 0
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Roll All Stats (3d6)
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(stat => (
                      <div key={stat}>
                        <label className="block text-xs text-gray-400 mb-1 uppercase">
                          {stat.substring(0, 3)}
                        </label>
                        <div className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white text-center font-bold text-lg">
                          {formData[stat]}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-center">
                          Mod: {getModifier(formData[stat]) >= 0 ? '+' : ''}{getModifier(formData[stat])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h3 className="text-white font-bold mb-2">Starting Values</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    <div>
                      HP: {calculateStartingHP()}
                      {calculateArchetypeHPBonus(formData.archetype, 1) > 0 && (
                        <span className="text-xs text-green-400 ml-1">
                          (+{calculateArchetypeHPBonus(formData.archetype, 1)} from {formData.archetype})
                        </span>
                      )}
                    </div>
                    <div>
                      AC: {calculateStartingAC()}
                      {calculateArchetypeACBonus(formData.archetype, 1) > 0 && (
                        <span className="text-xs text-blue-400 ml-1">
                          (+{calculateArchetypeACBonus(formData.archetype, 1)} Insightful Defense)
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">Credits: 2d6 × 10{formData.motivation === 'The Vile' ? ' + 2d10' : ''}</div>
                  </div>
                  
                  {/* Show archetype bonuses */}
                  {getArchetypeBonusExplanation(formData.archetype, { 
                    archetype: formData.archetype, 
                    level: 1,
                    strength: formData.strength,
                    constitution: formData.constitution 
                  }).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-1">Archetype Bonuses:</div>
                      {getArchetypeBonusExplanation(formData.archetype, { 
                        archetype: formData.archetype, 
                        level: 1,
                        strength: formData.strength,
                        constitution: formData.constitution 
                      }).map((explanation, idx) => (
                        <div key={idx} className="text-xs text-green-400">✓ {explanation}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-2 rounded font-bold min-h-[44px] sm:min-h-0 order-1"
                >
                  Next: Roll Talents
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 sm:py-2 rounded min-h-[44px] sm:min-h-0 order-2"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-6">
                <div className="bg-blue-900 bg-opacity-30 p-4 rounded border border-blue-600">
                  <p className="text-white">
                    As a <strong>Human {formData.archetype}</strong>, you get <strong>2 talent rolls</strong> due to the Ambitious trait!
                  </p>
                </div>

                {!talentsRolled ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">Ready to discover your talents?</p>
                    <button
                      type="button"
                      onClick={handleRollTalents}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg sm:text-xl shadow-lg transform hover:scale-105 transition min-h-[56px]"
                    >
                      Roll Talents (2d6 × 2)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {talents.map((talent, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded border border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-white font-bold">Talent {index + 1}: {talent.result}</div>
                            <div className="text-sm text-gray-400">Rolled: {talent.rollResult} (2d6)</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300 mb-3">{talent.description}</div>
                        
                        {needsNestedChoice(talent) ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Choose one: *
                              </label>
                              <select
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                value={nestedChoices[index]?.primaryChoice || ''}
                                onChange={(e) => handleNestedChoice(index, 'primaryChoice', e.target.value)}
                                required
                              >
                                <option value="">-- Select --</option>
                                {talent.options.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </div>

                            {nestedChoices[index]?.primaryChoice?.includes('talent') && (
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Which talent? *
                                </label>
                                <select
                                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                  value={nestedChoices[index]?.talentChoice || ''}
                                  onChange={(e) => handleNestedChoice(index, 'talentChoice', e.target.value)}
                                  required
                                >
                                  <option value="">-- Select Talent --</option>
                                  {getAvailableTalents(formData.archetype).map((talentName) => (
                                    <option key={talentName} value={talentName}>{talentName}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {nestedChoices[index]?.primaryChoice?.includes('+2') && (
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Which stat? *
                                </label>
                                <select
                                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                  value={nestedChoices[index]?.statChoice || ''}
                                  onChange={(e) => handleNestedChoice(index, 'statChoice', e.target.value)}
                                  required
                                >
                                  <option value="">-- Select Stat --</option>
                                  <option value="STR">Strength (+2)</option>
                                  <option value="DEX">Dexterity (+2)</option>
                                  <option value="CON">Constitution (+2)</option>
                                  <option value="INT">Intelligence (+2)</option>
                                  <option value="WIS">Wisdom (+2)</option>
                                  <option value="CHA">Charisma (+2)</option>
                                </select>
                              </div>
                            )}
                          </div>
                        ) : talent.triadChoice && formData.archetype === 'Wise' ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Choose one: *
                              </label>
                              <select
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                value={talentChoices[index] || ''}
                                onChange={(e) => handleTriadOrEnlightenmentChoice(index, e.target.value)}
                                required
                              >
                                <option value="">-- Select --</option>
                                {talent.options.map((option) => {
                                  const isTriadOption = option === 'Gain Triad Power';
                                  const totalPowers = getTotalTriadPowersCount();
                                  const hasAllPowers = totalPowers >= 3;
                                  const isDisabled = isTriadOption && hasAllPowers;
                                  
                                  return (
                                    <option 
                                      key={option} 
                                      value={option}
                                      disabled={isDisabled}
                                    >
                                      {option}{isDisabled ? ' (You have all 3 powers!)' : ''}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            {talentChoices[index] === 'Gain Triad Power' && (() => {
                              // 🔧 FIXED: Pass current talent index to exclude it from the filter
                              const availablePowers = getAvailableTriadPowers(index);
                              
                              return (
                              <div>
                                {availablePowers.length === 0 ? (
                                  <div className="p-3 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded">
                                    <div className="text-yellow-400 font-bold mb-1">⚠️ All Powers Acquired!</div>
                                    <div className="text-sm text-gray-300">
                                      You already have all 3 Triad powers (Body, Mind, Soul). Please choose "Gain +1 Enlightenment use" instead.
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Which Triad Power? *
                                    </label>
                                    <select
                                      className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white"
                                      value={nestedChoices[index]?.triadPower || ''}
                                      onChange={(e) => {
                                        const selectedPower = e.target.value;
                                        handleTriadPowerChoice(index, selectedPower);
                                      }}
                                      required
                                    >
                                      <option value="">-- Select Power --</option>
                                      {availablePowers.map((power) => (
                                        <option key={power} value={power}>
                                          {power} ({power === 'Body' ? 'CON' : power === 'Mind' ? 'INT' : 'WIS'})
                                        </option>
                                      ))}
                                    </select>
                                    <div className="mt-2 p-2 bg-purple-900 bg-opacity-20 rounded text-xs text-gray-300">
                                      <div className="font-semibold text-purple-300 mb-1">Triad Power Examples:</div>
                                      <div><strong>Body (CON):</strong> Enhanced Strength, Telekinesis, Pyrokinesis, Levitation</div>
                                      <div><strong>Mind (INT):</strong> Telepathy, Mind Blasts, Perfect Recall</div>
                                      <div><strong>Soul (WIS):</strong> Precognition, Astral Projection, Empathic Perception</div>
                                      <div className="mt-2 text-gray-400">
                                        Current powers: {buildFinalTriadPowers().length > 0 ? buildFinalTriadPowers().join(', ') : 'None yet'}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        Available: {availablePowers.join(', ') || 'None'}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              );
                            })()}
                          </div>
                        ) : talent.choice && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Make your choice: *
                            </label>
                            <select
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                              value={talentChoices[index] || ''}
                              onChange={(e) => handleTalentChoice(index, e.target.value)}
                              required
                            >
                              <option value="">-- Select --</option>
                              {talent.options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <div className="text-red-400 text-sm mt-4">{error}</div>}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 sm:py-2 rounded min-h-[44px] sm:min-h-0 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!talentsRolled}
                  className={`flex-1 py-3 sm:py-2 rounded font-bold min-h-[44px] sm:min-h-0 order-1 sm:order-2 ${
                    talentsRolled
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Create Spacer
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
export default Dashboard;
