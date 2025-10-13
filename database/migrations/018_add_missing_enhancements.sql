-- Add missing component and enhancement templates that exist in dev but not in prod
-- Run this on production database

-- ============================================================================
-- MISSING COMPONENTS (IDs 12-15)
-- ============================================================================

INSERT INTO component_templates (name, component_type, initial_cost, maintenance_cost, slots_required, description, can_be_advanced, can_have_multiple, properties)
SELECT 'Cargo Frame', 'feature', 1000, 500, 1, 'An external frame capable of holding 10 m3 units of bulk cargo.', false, true, '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM component_templates WHERE name = 'Cargo Frame');

INSERT INTO component_templates (name, component_type, initial_cost, maintenance_cost, slots_required, description, can_be_advanced, can_have_multiple, properties)
SELECT 'Luxury Cabins', 'feature', 500, 500, 1,
'Advanced Crew Quarters used to take a Rest in while on the ship.
  Resting interruption checks are made with Advantage. Can install up to 4 bunks (500cr per bunk).',
false, true, '{"max_instances": 4, "cost_per_instance": 500}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM component_templates WHERE name = 'Luxury Cabins');

INSERT INTO component_templates (name, component_type, initial_cost, maintenance_cost, slots_required, description, can_be_advanced, can_have_multiple, properties)
SELECT 'Science Station', 'feature', 700, 300, 1,
'Used to perform scientific analysis and experimentation. The DC of
  any related check is reduced by 3.',
false, false, '{"dc_reduction": 3}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM component_templates WHERE name = 'Science Station');

INSERT INTO component_templates (name, component_type, initial_cost, maintenance_cost, slots_required, description, can_be_advanced, can_have_multiple, properties)
SELECT 'Troop Bay', 'feature', 250, 500, 1,
'A small cargo bay to carry personnel for rapid deployment. Can carry up to
  4 personnel (250cr per personnel slot).',
false, true, '{"max_instances": 4, "cost_per_instance": 250, "total_maintenance": 500}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM component_templates WHERE name = 'Troop Bay');

-- ============================================================================
-- MISSING ENHANCEMENTS (IDs 5-8)
-- ============================================================================

INSERT INTO enhancement_templates (name, enhancement_type, cost, slots_required, benefit, description, properties)
SELECT 'Entertainment Suite', 'feature', 1500, 1, '+1 to Carousing Rolls',
'Onboard ship entertainment. Increases morale
   and social bonuses.',
'{"carousing_bonus": 1, "maintenance_cost": 750}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM enhancement_templates WHERE name = 'Entertainment Suite');

INSERT INTO enhancement_templates (name, enhancement_type, cost, slots_required, benefit, description, properties)
SELECT 'Solar Sails', 'feature', 3000, 1, 'Cannot go offline, only be damaged or destroyed',
'This sublight propulsion
  system counts as a Feature and provides backup propulsion.',
'{"maintenance_cost": 1500, "cannot_go_offline": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM enhancement_templates WHERE name = 'Solar Sails');

INSERT INTO enhancement_templates (name, enhancement_type, cost, slots_required, benefit, description, properties)
SELECT 'Stealth Coating', 'feature', 2000, 1, 'Advantage to avoid being detected by sensors',
'This ship has an advanced
   stealth coating on its hull.',
'{"maintenance_cost": 1000, "detection_advantage": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM enhancement_templates WHERE name = 'Stealth Coating');

INSERT INTO enhancement_templates (name, enhancement_type, cost, slots_required, benefit, description, properties)
SELECT 'Targeting Jammer', 'system', 2000, 1, 'Missile target lock checks are at Disadvantage',
'Electronic
  countermeasures that interfere with missile targeting systems.',
'{"maintenance_cost": 1000, "missile_disadvantage": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM enhancement_templates WHERE name = 'Targeting Jammer');

-- ============================================================================
-- VERIFY THE ADDITIONS
-- ============================================================================

SELECT 'Components Added' as type, COUNT(*) as count
FROM component_templates
UNION ALL
SELECT 'Enhancements Added', COUNT(*)
FROM enhancement_templates;

SELECT '--- ALL COMPONENTS ---' as info;
SELECT id, name, component_type, initial_cost FROM component_templates ORDER BY id;

SELECT '--- ALL ENHANCEMENTS ---' as info;
SELECT id, name, enhancement_type, cost FROM enhancement_templates ORDER BY id;
