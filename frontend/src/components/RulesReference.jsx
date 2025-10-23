import { useState } from 'react';
import { Link } from 'react-router-dom';

function RulesReference() {
  const [activeTab, setActiveTab] = useState('starfaring');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">📖 Rules Reference</h1>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-bold"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('starfaring')}
              className={`px-6 py-3 font-bold transition ${
                activeTab === 'starfaring'
                  ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🚀 Starfaring
            </button>
            <button
              onClick={() => setActiveTab('triad')}
              className={`px-6 py-3 font-bold transition ${
                activeTab === 'triad'
                  ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ✨ The Triad
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          {activeTab === 'starfaring' && <StarfaringRules />}
          {activeTab === 'triad' && <TriadRules />}
        </div>
      </div>
    </div>
  );
}

function StarfaringRules() {
  return (
    <div className="space-y-6 text-gray-300">
      <h2 className="text-2xl font-bold text-white mb-4">Starfaring</h2>

      <p>There are two types of space travel: <span className="text-blue-400 font-semibold">SL (sublight)</span> and <span className="text-purple-400 font-semibold">FTL (Faster Than Light)</span>.</p>

      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong className="text-blue-400">SL</strong> uses high-powered thrusters to travel within a system</li>
        <li><strong className="text-purple-400">FTL</strong> allows for faster travel and further distances but requires an FTL drive that can bend spacetime</li>
      </ul>

      {/* Astrogation */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Astrogation</h3>
        <p className="mb-4">
          Astrogation, or navigation for spaceships, is plotting a safe direct course from point to point in space without colliding with stars, planets, and other hazardous regions of space.
        </p>
        <p className="mb-4">
          To plot a course, make an <span className="font-mono text-green-400">INT check</span>. On a success, you arrive at your destination as planned. If the astrogation check is a failure, you do not arrive at your intended destination and an astrogation mishap may occur.
        </p>

        {/* Astrogation Table */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-white mb-3">Astrogation Difficulty</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Destination</th>
                <th className="text-left py-2 text-gray-400">Difficulty</th>
                <th className="text-left py-2 text-gray-400">DC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Same System</td>
                <td className="py-2 text-green-400">Easy</td>
                <td className="py-2 font-mono">DC 9</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Same Sector</td>
                <td className="py-2 text-yellow-400">Moderate</td>
                <td className="py-2 font-mono">DC 12</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Same Region</td>
                <td className="py-2 text-orange-400">Hard</td>
                <td className="py-2 font-mono">DC 15</td>
              </tr>
              <tr>
                <td className="py-2">Same Galaxy</td>
                <td className="py-2 text-red-400">Extreme</td>
                <td className="py-2 font-mono">DC 18</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
          <p className="text-sm"><strong>Star Charts:</strong> Without star charts, Astrogation is performed at <span className="text-red-400">disadvantage</span>.</p>
          <p className="text-sm mt-2"><strong>Navicomputer:</strong> Reduces the difficulty class by one category.</p>
        </div>

        <div className="text-sm text-gray-400 italic">
          <p><strong>System:</strong> Collection of planets, usually revolving around a star within sublight distance</p>
          <p><strong>Sector:</strong> Collection of systems within short FTL distance</p>
          <p><strong>Region:</strong> Collection of sectors within moderate FTL distance</p>
          <p><strong>Galaxy:</strong> Divided into regions, revolves around a galactic core</p>
        </div>
      </div>

      {/* SL Travel */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">SL Travel</h3>
        <p className="mb-2">
          When in SL speed, it is assumed that unless you are flying in combat or hazardous conditions, you are piloting the ship properly.
        </p>
        <p className="mb-2">
          However, in combat and hazardous conditions, you may need to make a <span className="font-mono text-green-400">piloting check</span>.
        </p>
        <p className="bg-gray-900 rounded p-3 font-mono text-sm">
          Piloting Check = DEX check (Pilot's DEX mod + Ship's DEX mod) vs DC set by GM
        </p>
      </div>

      {/* FTL Travel */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">FTL Travel</h3>
        <p>
          FTL Travel is considered point-to-point and does not usually require piloting checks. However, because you are moving faster than light speed, Astrogation Mishaps are more certain.
        </p>
      </div>

      {/* Spaceship Stats */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Spaceship Stats Explained</h3>
        <div className="space-y-3">
          <div>
            <strong className="text-blue-400">AC:</strong> How tough it is to damage the ship (maneuverability or armor)
          </div>
          <div>
            <strong className="text-red-400">HP:</strong> Amount of damage a ship can sustain before being destroyed
          </div>
          <div>
            <strong className="text-yellow-400">ATK:</strong> Number and kind of weapons. A ship can make only one attack per weapon per turn
          </div>
          <div>
            <strong className="text-green-400">MV:</strong> Ship movement measured in range increments (combat/hazardous situations only)
          </div>
          <div>
            <strong className="text-purple-400">Stats:</strong> Six scores (STR/DEX/CON/INT/WIS/CHA) that determine ship characteristics
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-white mb-2">Common Stat Uses:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>STR:</strong> Pulling, Pushing, Ramming</li>
            <li><strong>DEX:</strong> Gunnery, Piloting</li>
            <li><strong>CON:</strong> Resist extreme conditions</li>
            <li><strong>INT:</strong> Astrogation</li>
            <li><strong>WIS:</strong> Sensor sweeps</li>
            <li><strong>CHA:</strong> Deception and intimidation</li>
          </ul>
        </div>
      </div>

      {/* Ship Classes */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Classes of Spaceships</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-blue-400">Fighters:</strong> Small ship, command crew of 1-2, small cargo hold at most
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-yellow-400">Freighters:</strong> Medium ship, command crew up to 10, cargo hold
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-red-400">Capital Ships:</strong> Large ship, command crew 10+, multiple cargo holds. Considered cities and fortresses - extremely dangerous to attack head-on
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-cyan-400">Explorers:</strong> Medium ship designed for long-range exploration and survey missions, command crew of 4-8, equipped with enhanced sensors and navicomputers
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-orange-400">Gunships:</strong> Small to medium combat ship, command crew of 2-6, heavily armed with multiple weapon systems, prioritizing firepower over cargo capacity
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-purple-400">Research Vessels:</strong> Medium to large ship equipped with scientific laboratories and advanced sensor arrays, command crew of 5-12, designed for scientific study and data collection
          </div>
          <div className="bg-gray-900 rounded p-3">
            <strong className="text-pink-400">Yachts:</strong> Small luxury ship designed for VIP transport, command crew of 2-4, emphasizes comfort, speed, and style over utility
          </div>
        </div>
      </div>

      {/* Ship Combat */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Ship Combat</h3>
        <p className="mb-4">Spaceship combat is almost identical to regular Shadowdark combat, with a few exceptions:</p>

        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Actions</h4>
            <p>Each command crew member may take an action for the ship rather than their own individual action.</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Movement</h4>
            <p>Only the pilot and co-pilot can move the ship. Their initiative includes the ship's DEX modifier. If maneuvering checks are required, they may not make another action this turn.</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Weapons</h4>
            <p className="mb-2">Each weapon can be used once per round by a different gunner (unless fire-linked).</p>
            <p className="mb-2">Gunners add ship's DEX modifier to attack rolls for cannons.</p>
            <p className="mb-2">Gunners use WIS modifier + ship's WIS for locking on missiles/torpedoes.</p>
            <div className="mt-3 p-2 bg-red-900/20 border border-red-700 rounded">
              <p className="text-sm"><strong>Important:</strong> Personal weapons do half damage to ships. Ship weapons do double damage to people.</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Targeting Ship Systems</h4>
            <p>Target systems (FTL drive, etc.) instead of hull. AC increases by +3. If successful, system is offline until repaired with DC 15 INT check.</p>
          </div>
        </div>
      </div>

      {/* Ship Destruction */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Ship Destruction</h3>
        <p className="mb-3">Works similar to a dying character. When ship reaches 0 HP:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Ship is disabled (unable to move/act), all systems offline</li>
          <li>Captain or pilot makes Death Timer roll using ship's CON modifier (minimum 1)</li>
          <li>Ship becomes uninhabitable/destroyed in that many rounds unless stabilized</li>
          <li>Each subsequent round: roll d20, on natural 20 ship stabilizes with 1 HP</li>
          <li>Crew can attempt repairs (DC 15 INT) or abandon ship</li>
          <li>Repairing a single system stabilizes the ship and stops Death Timer</li>
        </ol>
      </div>

      {/* Ship Modifications */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Ship Modifications</h3>
        <p className="mb-3">Each ship has System and Feature slots based on classification.</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Additional slots: 1000cr each (max 10 per category)</li>
          <li>Upgrade stats in +1 increments: 1000cr per point (max 18)</li>
          <li>Advanced Systems: Cost an additional slot, grant advantages</li>
        </ul>

        <div className="bg-gray-900 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-white mb-2">Advanced System Benefits:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Grant advantage on system use</li>
            <li>Sublight/FTL drives: Cut travel time in half</li>
            <li>Energy Shields: +4 AC vs Energy Weapons</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TriadRules() {
  return (
    <div className="space-y-6 text-gray-300">
      <h2 className="text-2xl font-bold text-white mb-4">The Triad</h2>

      <p className="text-lg">
        The Triad represents the metaphysical abilities sometimes found in science fiction. Whether through a mystical connection, scientific experimentation, or natural psionic abilities, you have the ability to manipulate aspects of reality.
      </p>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <p className="font-semibold">When you gain a Triad power, choose one that you do not know. Gaining all three shows mastery of the Triad.</p>
      </div>

      {/* The Three Powers */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold text-white mb-3">The Three Powers</h3>

        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <h4 className="text-lg font-bold text-red-400 mb-2">BODY (CON)</h4>
          <p className="mb-2">Affecting your physical body or the material world around you.</p>
          <p className="text-sm italic">Examples: Enhanced Strength, Increased Speed, Power Leaping, Telekinesis, Pyrokinesis, Levitation</p>
        </div>

        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
          <h4 className="text-lg font-bold text-blue-400 mb-2">MIND (INT)</h4>
          <p className="mb-2">Affecting your mind and the minds of others.</p>
          <p className="text-sm italic">Examples: Perfect Recall, Telepathy, Thought Reading, Mind Blasts, Enhancing Senses</p>
        </div>

        <div className="bg-purple-900/20 border border-purple-500 rounded-lg p-4">
          <h4 className="text-lg font-bold text-purple-400 mb-2">SOUL (WIS)</h4>
          <p className="mb-2">Affecting your connection to the metaphysical and transcendent universe.</p>
          <p className="text-sm italic">Examples: Precognition, Remote Viewing, Calming Emotions, Astral Projection, Life Sense, Empathic Perception</p>
        </div>
      </div>

      {/* Using Triad Powers */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Using Triad Powers</h3>
        <p className="mb-3">
          Triad powers unlock additional uses of checks to accomplish metaphysical feats. What you accomplish is only limited by your imagination, but it must make sense within the power's confines. The GM has the ultimate decision on whether it is possible.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 space-y-3">
          <h4 className="font-bold text-white">How It Works:</h4>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Make a check using the appropriate stat (CON/INT/WIS)</li>
            <li>Powers can be maintained beyond your turn with Focus (additional check each turn)</li>
            <li><strong className="text-green-400">Critical Success:</strong> Doubles a numerical component</li>
            <li><strong className="text-red-400">Critical Failure:</strong> Unable to use that power again until you rest</li>
            <li>Against another individual: Use contested skill check</li>
          </ol>
        </div>
      </div>

      {/* DC and Die Roll Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Triad Power Results</h3>
        <p className="mb-4">
          When a Triad power creates an effect with a die roll (damage, healing, etc.), the DC determines which die to roll.
        </p>

        <div className="bg-gray-900 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Difficulty</th>
                <th className="text-left py-2 text-gray-400">DC</th>
                <th className="text-left py-2 text-gray-400">Die Roll</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">Easy</td>
                <td className="py-2 font-mono">DC 9</td>
                <td className="py-2 font-mono text-green-400">d4</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-yellow-400">Normal</td>
                <td className="py-2 font-mono">DC 12</td>
                <td className="py-2 font-mono text-yellow-400">d6</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-orange-400">Hard</td>
                <td className="py-2 font-mono">DC 15</td>
                <td className="py-2 font-mono text-orange-400">d8</td>
              </tr>
              <tr>
                <td className="py-2 text-red-400">Extreme</td>
                <td className="py-2 font-mono">DC 18</td>
                <td className="py-2 font-mono text-red-400">d10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-4">
          <p className="text-sm"><strong>Critical Success:</strong> Doubles the die result!</p>
        </div>
      </div>

      {/* Combat Use */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-3">Triad Powers in Combat</h3>
        <p className="mb-3">
          Triad powers can be used to make attacks and deal damage:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Use the power's skill check to make the attack (vs AC or opposed check)</li>
          <li>The DC you beat determines the damage die (see table above)</li>
          <li>Critical Success doubles the damage</li>
        </ol>
      </div>
    </div>
  );
}

export default RulesReference;
