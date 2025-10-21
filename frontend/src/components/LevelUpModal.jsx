// frontend/src/components/LevelUpModal.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function LevelUpModal({ character, onClose, onLevelUp }) {
  const [loading, setLoading] = useState(false);
  const [levelUpResult, setLevelUpResult] = useState(null);
  const [error, setError] = useState('');
  
  // Talent choice state
  const [talentChoice, setTalentChoice] = useState('');
  const [customInput, setCustomInput] = useState(''); // For text inputs like expertise
  const [triadPower, setTriadPower] = useState('');

  // Ultimate Choice (Roll 12) talent selection
  const [selectedUltimateTalent, setSelectedUltimateTalent] = useState(null); // Full talent object
  const [ultimateTalentChoice, setUltimateTalentChoice] = useState(''); // Sub-choice for the selected talent

  const handleInitialLevelUp = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/advancement/level-up/${character.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const result = response.data.levelUp;
      setLevelUpResult(result);

    } catch (error) {
      console.error('Error leveling up:', error);
      setError(error.response?.data?.error || 'Failed to level up');
    } finally {
      setLoading(false);
    }
  };

  const needsChoice = (talent) => {
    return talent && talent.choice === true;
  };

  const getAvailableTriadPowers = () => {
    try {
      const triadPowers = JSON.parse(character.triad_powers || '[]');
      const allPowers = ['Body', 'Mind', 'Soul'];
      return allPowers.filter(p => !triadPowers.includes(p));
    } catch {
      return ['Body', 'Mind', 'Soul'];
    }
  };

  const validateChoice = (talent) => {
    if (!talent || !needsChoice(talent)) return true;

    // Stat Increase - must select a stat
    if (talent.name === 'Stat Increase') {
      return !!talentChoice;
    }

    // Combat Training - must select melee or ranged
    if (talent.name === 'Combat Training') {
      return !!talentChoice;
    }

    // Enlightenment or Triad - must select option
    if (talent.name === 'Enlightenment or Triad') {
      if (!talentChoice) return false;
      // If chose Triad, must select which power
      if (talentChoice === 'Gain Triad Power' && !triadPower) return false;
      return true;
    }

    // Armor Specialization - must select armor type
    if (talent.name === 'Armor Specialization') {
      return !!talentChoice;
    }

    // Expanded Weapon Expertise - must select weapon category
    if (talent.name === 'Expanded Weapon Expertise') {
      return !!talentChoice;
    }

    // Improved Sway - must select sway effect
    if (talent.name === 'Improved Sway') {
      return !!talentChoice;
    }

    // Expertise talents - must provide text input
    if (talent.name === 'Expertise Advantage' || talent.name === 'Additional Expertise') {
      return customInput.trim().length > 0;
    }

    // Ultimate Choice - must select something
    if (talent.name === 'Ultimate Choice') {
      if (!talentChoice) return false;
      // If they chose a talent, must select which talent and any sub-choices
      if (talentChoice.includes('Talent')) {
        if (!selectedUltimateTalent) return false;
        // If selected talent has choices, must make sub-choice
        if (selectedUltimateTalent.choice && selectedUltimateTalent.options && !ultimateTalentChoice) {
          return false;
        }
      }
      return true;
    }

    // Default - if choice is true, require talentChoice
    return !!talentChoice;
  };

  const handleCompleteLevelUp = async () => {
    const talent = levelUpResult.talent;

    // If no talent (even level), just close and refresh
    if (!talent) {
      onLevelUp();
      onClose();
      return;
    }

    // Validate choices
    if (!validateChoice(talent)) {
      setError('Please complete your talent choice');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      // Build the complete talent data
      let completeTalent;

      // Special handling for Ultimate Choice + Talent selection
      if (talent.name === 'Ultimate Choice' && talentChoice.includes('Talent') && selectedUltimateTalent) {
        // Use the selected talent's data instead of Ultimate Choice
        completeTalent = {
          ...selectedUltimateTalent,
          roll: talent.roll, // Keep original roll (12)
          choice: ultimateTalentChoice || null,
          fromUltimateChoice: true // Mark that this came from Ultimate Choice
        };
      } else {
        // Normal talent or Ultimate Choice + Stats
        completeTalent = {
          ...talent,
          choice: talentChoice || null,
          customInput: customInput || null,
          triadPower: triadPower || null
        };
      }

      await axios.post(
        `${API_URL}/advancement/complete-level-up/${character.id}`,
        { 
          talent: completeTalent,
          levelUpData: levelUpResult
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Success - close modal and refresh
      onLevelUp();
      onClose();

    } catch (error) {
      console.error('Error completing level up:', error);
      setError(error.response?.data?.error || 'Failed to complete level up');
    } finally {
      setLoading(false);
    }
  };

  const getXPRequired = (level) => level * 10;
  const xpRequired = getXPRequired(character.level);

  // Results screen (after rolling, before finalizing)
  if (levelUpResult) {
    const talent = levelUpResult.talent;
    const requiresChoice = needsChoice(talent);
    const isValidChoice = validateChoice(talent);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full border-4 border-yellow-500 max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">LEVEL UP!</h2>
            <p className="text-2xl text-white mb-6">
              {character.name} is now Level {levelUpResult.newLevel}!
            </p>

            {/* HP Increase */}
            <div className="bg-gray-700 rounded-lg p-6 mb-4">
              <div className="text-xl font-bold text-red-400 mb-2">Hit Points Increased</div>
              <div className="text-gray-300 mb-2">
                {levelUpResult.hpRoll.advantage ? (
                  <span>
                    Rolled with advantage: {levelUpResult.hpRoll.rolls.join(' & ')} 
                    → Took {Math.max(...levelUpResult.hpRoll.rolls)}
                  </span>
                ) : (
                  <span>Rolled: {levelUpResult.hpRoll.roll}</span>
                )}
              </div>
              <div className="text-3xl font-bold text-white">
                +{levelUpResult.hpIncrease} HP
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Max HP: {character.hp_max} → {levelUpResult.newMaxHP}
              </div>
            </div>

            {/* AC Update (Wise only) */}
            {levelUpResult.newAC !== character.ac && (
              <div className="bg-gray-700 rounded-lg p-6 mb-4">
                <div className="text-xl font-bold text-blue-400 mb-2">Armor Class Updated</div>
                <div className="text-sm text-gray-400 mb-2">Insightful Defense improved</div>
                <div className="text-3xl font-bold text-white">
                  {character.ac} → {levelUpResult.newAC}
                </div>
              </div>
            )}

            {/* New Talent or No Talent message */}
            {!talent && (
              <div className="bg-gray-700 rounded-lg p-6 mb-4 border-2 border-gray-600">
                <div className="text-xl font-bold text-gray-400 mb-2">
                  No New Talent
                </div>
                <div className="text-gray-400">
                  Talents are gained at odd levels (1, 3, 5, 7, 9)
                </div>
              </div>
            )}
            
            {talent && (
              <div className="bg-gray-700 rounded-lg p-6 mb-4 border-2 border-purple-500">
                <div className="text-xl font-bold text-purple-400 mb-2">
                  ✨ New Talent Gained!
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  Rolled: {talent.roll} (2d6)
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {talent.name}
                </div>
                <div className="text-gray-300 mb-3">
                  {talent.description}
                </div>

                {/* Show choice UI if needed */}
                {requiresChoice && talent.options && (
                  <div className="mt-4 text-left space-y-4">
                    
                    {/* Stat Increase */}
                    {talent.name === 'Stat Increase' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Choose which stat to increase by +2: *
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          value={talentChoice}
                          onChange={(e) => setTalentChoice(e.target.value)}
                          required
                        >
                          <option value="">-- Select Stat --</option>
                          {talent.options.map((option) => (
                            <option key={option} value={option}>
                              {option === 'STR' ? 'Strength' : 
                               option === 'DEX' ? 'Dexterity' :
                               option === 'CON' ? 'Constitution' :
                               option === 'INT' ? 'Intelligence' :
                               option === 'WIS' ? 'Wisdom' :
                               option === 'CHA' ? 'Charisma' : option} (+2)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Combat Training */}
                    {talent.name === 'Combat Training' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Choose your combat training: *
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          value={talentChoice}
                          onChange={(e) => setTalentChoice(e.target.value)}
                          required
                        >
                          <option value="">-- Select --</option>
                          {talent.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Enlightenment or Triad (Wise) */}
                    {talent.name === 'Enlightenment or Triad' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-purple-300 mb-2">
                            Choose one: *
                          </label>
                          <select
                            className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                            value={talentChoice}
                            onChange={(e) => {
                              setTalentChoice(e.target.value);
                              if (e.target.value !== 'Gain Triad Power') {
                                setTriadPower('');
                              }
                            }}
                            required
                          >
                            <option value="">-- Select --</option>
                            {talent.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        {talentChoice === 'Gain Triad Power' && (
                          <div>
                            <label className="block text-sm font-medium text-purple-300 mb-2">
                              Which Triad Power? *
                            </label>
                            <select
                              className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                              value={triadPower}
                              onChange={(e) => setTriadPower(e.target.value)}
                              required
                            >
                              <option value="">-- Select Power --</option>
                              {getAvailableTriadPowers().map((power) => (
                                <option key={power} value={power}>
                                  {power} ({power === 'Body' ? 'CON' : power === 'Mind' ? 'INT' : 'WIS'})
                                </option>
                              ))}
                            </select>
                            <div className="mt-2 p-2 bg-purple-900 bg-opacity-20 rounded text-xs text-gray-300">
                              <div><strong>Body (CON):</strong> Physical manipulation & resilience</div>
                              <div><strong>Mind (INT):</strong> Mental powers & telepathy</div>
                              <div><strong>Soul (WIS):</strong> Metaphysical abilities & sensing</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Armor Specialization */}
                    {talent.name === 'Armor Specialization' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Choose armor type: *
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          value={talentChoice}
                          onChange={(e) => setTalentChoice(e.target.value)}
                          required
                        >
                          <option value="">-- Select --</option>
                          {talent.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Expanded Weapon Expertise */}
                    {talent.name === 'Expanded Weapon Expertise' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Choose weapon category: *
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          value={talentChoice}
                          onChange={(e) => setTalentChoice(e.target.value)}
                          required
                        >
                          <option value="">-- Select --</option>
                          {talent.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Improved Sway */}
                    {talent.name === 'Improved Sway' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Choose which Sway effect to improve: *
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          value={talentChoice}
                          onChange={(e) => setTalentChoice(e.target.value)}
                          required
                        >
                          <option value="">-- Select --</option>
                          {talent.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Expertise-based talents (text input) */}
                    {(talent.name === 'Expertise Advantage' || talent.name === 'Additional Expertise') && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          {talent.name === 'Expertise Advantage' 
                            ? 'Which expertise area gets advantage?'
                            : 'What new expertise do you gain?'} *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., Engineering, Medicine, Piloting"
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    {/* Ultimate Choice - Enhanced */}
                    {talent.name === 'Ultimate Choice' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-purple-300 mb-2">
                            Make your choice: *
                          </label>
                          <select
                            className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                            value={talentChoice}
                            onChange={(e) => {
                              setTalentChoice(e.target.value);
                              // Reset talent selection when changing primary choice
                              setSelectedUltimateTalent(null);
                              setUltimateTalentChoice('');
                            }}
                            required
                          >
                            <option value="">-- Select --</option>
                            {talent.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        {/* Talent Selection */}
                        {talentChoice && talentChoice.includes('Talent') && levelUpResult.availableTalents && (
                          <div>
                            <label className="block text-sm font-medium text-purple-300 mb-2">
                              Which talent? *
                            </label>
                            <select
                              className="w-full px-3 py-2 bg-gray-700 border border-purple-500 rounded text-white focus:ring-2 focus:ring-purple-400"
                              value={selectedUltimateTalent?.name || ''}
                              onChange={(e) => {
                                const talent = levelUpResult.availableTalents.find(t => t.name === e.target.value);
                                setSelectedUltimateTalent(talent);
                                setUltimateTalentChoice('');
                              }}
                              required
                            >
                              <option value="">-- Select Talent --</option>
                              {levelUpResult.availableTalents.map((t) => (
                                <option key={t.name + t.roll} value={t.name}>{t.name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Sub-choice for selected talent */}
                        {selectedUltimateTalent?.choice && selectedUltimateTalent?.options && (
                          <div>
                            <label className="block text-sm font-medium text-purple-300 mb-2">
                              {selectedUltimateTalent.name} choice: *
                            </label>
                            <select
                              className="w-full px-3 py-2 bg-gray-600 border border-purple-400 rounded text-white focus:ring-2 focus:ring-purple-300"
                              value={ultimateTalentChoice}
                              onChange={(e) => setUltimateTalentChoice(e.target.value)}
                              required
                            >
                              <option value="">-- Select --</option>
                              {selectedUltimateTalent.options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* +2 Stats message */}
                        {talentChoice && talentChoice.includes('stat') && (
                          <div className="mt-2 p-2 bg-yellow-900 bg-opacity-20 rounded text-xs text-gray-300">
                            Note: Work with your DM to distribute +2 points to your stats
                          </div>
                        )}
                      </div>
                    )}

                    {/* Generic other choices */}
                    {talent.choice && 
                     talent.name !== 'Stat Increase' && 
                     talent.name !== 'Combat Training' &&
                     talent.name !== 'Enlightenment or Triad' &&
                     talent.name !== 'Armor Specialization' &&
                     talent.name !== 'Expanded Weapon Expertise' &&
                     talent.name !== 'Improved Sway' &&
                     talent.name !== 'Expertise Advantage' &&
                     talent.name !== 'Additional Expertise' &&
                     talent.name !== 'Ultimate Choice' && (
                      <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                          Make your choice: *
                        </label>
                        {talent.options && talent.options.length > 0 ? (
                          <select
                            className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                            value={talentChoice}
                            onChange={(e) => setTalentChoice(e.target.value)}
                            required
                          >
                            <option value="">-- Select --</option>
                            {talent.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800 border border-purple-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your choice"
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            required
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* XP Reset Notice */}
            <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4 mb-6">
              <div className="text-blue-300 text-sm">
                📊 Your XP has been reset to 0. You need {getXPRequired(levelUpResult.newLevel)} XP to reach Level {levelUpResult.newLevel + 1}.
              </div>
            </div>

            {error && (
              <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCompleteLevelUp}
              disabled={loading || (requiresChoice && !isValidChoice)}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition"
            >
              {loading ? 'Finalizing...' : 
               !talent ? 'Awesome! Continue Playing' :
               (requiresChoice && !isValidChoice) ? 'Make Your Choice First' :
               'Awesome! Continue Playing'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Initial screen (before rolling)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-full border border-gray-700">
        <div className="text-center">
          <div className="text-5xl mb-4">⬆️</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">Level Up Available!</h2>
          <p className="text-xl text-white mb-4">
            {character.name} can advance to Level {character.level + 1}
          </p>

          <div className="bg-gray-700 rounded-lg p-6 mb-6 text-left">
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Current Level:</span>
                <span className="font-bold text-white">{character.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Level:</span>
                <span className="font-bold text-green-400">{character.level + 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Current XP:</span>
                <span className="font-bold text-white">{character.xp} / {xpRequired}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-3">
                <span>Hit Die:</span>
                <span className="font-bold text-red-400">
                  1d{character.archetype === 'Strong' || character.archetype === 'Tough' ? 8 : 
                     character.archetype === 'Clever' || character.archetype === 'Wise' ? 4 : 6}
                  {character.archetype === 'Tough' && <span className="text-green-400"> (with advantage)</span>}
                </span>
              </div>
              {((character.level + 1) % 2 === 1) && (character.level + 1) <= 9 && (
                <div className="flex justify-between border-t border-gray-600 pt-3">
                  <span>Talent Roll:</span>
                  <span className="font-bold text-purple-400">Yes! (2d6)</span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Not Yet
            </button>
            <button
              onClick={handleInitialLevelUp}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {loading ? 'Rolling...' : 'Level Up!'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelUpModal;
