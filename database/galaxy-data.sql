-- ============================================
-- GALAXY DATA IMPORT - AUTO-GENERATED
-- ============================================
-- Generated from galaxy.json
-- Stars: 500
-- Planets: 796
-- ============================================

BEGIN;

-- ============================================
-- 1. REGIONS
-- ============================================

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-0', 'Unknown Regions', 'outer-rim', -13.988445947793721, -1446.8249122466743, -11.883272920338555, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-1', 'Stella Nova', 'outer-rim', -1420.3354085336425, 69.10344378187729, -8.117564863278236, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-2', 'Inner Sphere', 'outer-core', 520.6225674945067, 414.5990306976446, 4.041056011894909, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-3', 'Core Worlds', 'inner-core', -171.7302279122643, -25.076777346061697, -1.0528292453635073, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-9', 'Unknown Regions', 'outer-rim', 886.7756603912719, -1155.0284471310042, -18.164815413350873, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-10', 'Uncharted Space', 'outer-rim', 776.3931082171183, 1179.6705523033856, -3.048424518440709, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-12', 'The Expanse', 'outer-rim', -867.5582935827457, -1043.0681115104912, -17.29622348065987, 800, 'civ-1760476209109-957490')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-13', 'Dark Reach', 'outer-rim', 1493.1598621048279, 22.02808720051269, 6.300872593260564, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
VALUES ('region-1760476209254-18', 'Border Regions', 'mid-rim', -209.13627921794478, 1099.4730038743676, -22.354079271597644, 800, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  updated_at = NOW();

-- ============================================
-- 2. SECTORS
-- ============================================

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-0', 'Alpha Zone', 'region-1760476209254-0', -13.988445947793721, -1446.8249122466743, -11.883272920338555, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-1', 'Beta Domain', 'region-1760476209254-1', -1420.3354085336425, 69.10344378187729, -8.117564863278236, 300, 'civ-1760476209109-893759', false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-2', 'Gamma Expanse', 'region-1760476209254-2', 520.6225674945067, 414.5990306976446, 4.041056011894909, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-3', 'Delta Sector', 'region-1760476209254-3', -171.7302279122643, -25.076777346061697, -1.0528292453635073, 300, 'civ-1760476209109-259756', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-4', 'Epsilon Domain', 'region-1760476209254-1', -920.7281901245233, 380.2834457759568, 0.702058886349473, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-5', 'Zeta Zone', 'region-1760476209254-0', 407.907596686622, -892.8499722959446, -6.8829337165220235, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-6', 'Eta Zone', 'region-1760476209254-2', 190.31831477548127, 791.5847996870061, -31.385689054358018, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-7', 'Theta Sector', 'region-1760476209254-0', 244.06522363416767, -1179.882401329849, -10.43071440760362, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-8', 'Iota Sector', 'region-1760476209254-0', -103.42177533461881, -692.5326310099467, 16.90062370285676, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-9', 'Kappa Sector', 'region-1760476209254-9', 886.7756603912719, -1155.0284471310042, -18.164815413350873, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-10', 'Lambda Quadrant', 'region-1760476209254-10', 776.3931082171183, 1179.6705523033856, -3.048424518440709, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209253-11', 'Mu Expanse', 'region-1760476209254-1', -1127.4544220645375, 631.2440272333907, 0.605505093435406, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-12', 'Nu Sector', 'region-1760476209254-12', -867.5582935827457, -1043.0681115104912, -17.29622348065987, 300, 'civ-1760476209109-957490', false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-13', 'Xi Reach', 'region-1760476209254-13', 1493.1598621048279, 22.02808720051269, 6.300872593260564, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-14', 'Omicron Quadrant', 'region-1760476209254-2', 1066.0057841360594, 863.4753653385776, -0.12425223969842758, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-15', 'Pi Quadrant', 'region-1760476209254-9', 750.6626612664737, -688.6580772755609, 37.50388994115859, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-16', 'Rho Expanse', 'region-1760476209254-2', 719.022008948072, 745.5722645012207, 6.93302634360057, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-17', 'Sigma Domain', 'region-1760476209254-3', -583.3496437091404, -631.311422556508, -6.357331379096589, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-18', 'Tau Expanse', 'region-1760476209254-18', -209.13627921794478, 1099.4730038743676, -22.354079271597644, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-19', 'Upsilon Reach', 'region-1760476209254-2', 639.8446914382575, -230.25926145268028, 32.074113970615784, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-20', 'Alpha Domain', 'region-1760476209254-2', -105.49663398439256, 626.4384995897825, 4.522592294204241, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-21', 'Beta Quadrant', 'region-1760476209254-10', 58.26179018034676, 1385.517448977866, 3.2842908826997714, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-22', 'Gamma Domain', 'region-1760476209254-2', 130.90620656848182, 22.808413115602708, -42.56001066399809, 300, 'civ-1760476209109-818208', false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-23', 'Delta Domain', 'region-1760476209254-18', -593.7427340880247, 1157.9354202059437, 7.530266529346486, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-24', 'Epsilon Domain', 'region-1760476209254-1', -645.9804191236926, -30.881493346739006, 43.01132747635169, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-25', 'Zeta Zone', 'region-1760476209254-2', 1031.5109463782949, 137.42458344869033, 27.163464390118968, 300, 'civ-1760476209109-192594', false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-26', 'Sector 27', 'region-1760476209254-0', -450.0190149323697, -1279.4211872672481, 0.2588754012163541, 300, 'civ-1760476209109-427867', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-27', 'Sector 28', 'region-1760476209254-2', 1011.2152407762611, -202.72723861124786, -18.331008125385964, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-28', 'Sector 29', 'region-1760476209254-1', -1078.1926930203988, -344.8465451800507, -13.787762081266113, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-29', 'Sector 30', 'region-1760476209254-2', 1034.9976673168253, 517.4733162395612, 8.509276714328, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-30', 'Sector 31', 'region-1760476209254-9', 1150.1149178934807, -602.8194710484976, -22.54878112254076, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-31', 'Sector 32', 'region-1760476209254-2', 253.8068161074387, 1100.3748613906068, -24.032965523027123, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-32', 'Sector 33', 'region-1760476209254-3', -512.7865001258082, 328.6765050441817, -27.892117677932344, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-33', 'Sector 34', 'region-1760476209254-1', -1230.006536791644, -610.6030307690694, -5.030266937437846, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-34', 'Sector 35', 'region-1760476209254-18', -850.7026956753073, 860.4347609848218, 18.38718217561646, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-35', 'Sector 36', 'region-1760476209254-0', 557.3247336827294, -1282.6572016055495, 6.034694120903165, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-36', 'Sector 37', 'region-1760476209254-1', -1020.5462033686257, -43.0200411907505, -14.901083629841349, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-37', 'Sector 38', 'region-1760476209254-1', -1415.59338433733, -334.10742689968646, 7.413196066793809, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-38', 'Sector 39', 'region-1760476209254-10', 421.35394821942964, 1368.1288681096037, 11.935555263126496, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-39', 'Sector 40', 'region-1760476209254-13', 1346.3065105914231, 422.6639741485153, 4.030199380487999, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-40', 'Sector 41', 'region-1760476209254-3', -723.0821168264315, -324.2517963776064, 9.88510343141284, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-41', 'Sector 42', 'region-1760476209254-18', -526.1808929861007, 728.1374283569762, 0.036933609847681126, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-42', 'Sector 43', 'region-1760476209254-18', -904.0296975601299, 1170.200670184087, -10.181429729295543, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
VALUES ('sector-1760476209254-43', 'Sector 44', 'region-1760476209254-18', -356.5023714607321, 1418.9574321014886, 4.185247925797967, 300, NULL, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  controlled_by = EXCLUDED.controlled_by,
  contested = EXCLUDED.contested,
  updated_at = NOW();

-- ============================================
-- 3. SYSTEMS
-- ============================================

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209248-0', 'Zenith Gemini Peripheria System', 'sector-1760476209253-0', -13.988445947793721, -1446.8249122466743, -11.883272920338555, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-1', 'Ursae System', 'sector-1760476209253-1', -1420.3354085336425, 69.10344378187729, -8.117564863278236, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-2', 'Galactic Scorpii System', 'sector-1760476209253-2', 520.6225674945067, 414.5990306976446, 4.041056011894909, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-3', 'Hyperion System', 'sector-1760476209253-3', -171.7302279122643, -25.076777346061697, -1.0528292453635073, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-4', 'Phoebe System', 'sector-1760476209253-4', -920.7281901245233, 380.2834457759568, 0.702058886349473, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-5', 'Dusk Scorpii Obscura System', 'sector-1760476209253-5', 407.907596686622, -892.8499722959446, -6.8829337165220235, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-6', 'Khaos Serpentis System', 'sector-1760476209253-4', -835.7218350711355, 468.2714823993196, 23.083622338293942, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-7', 'Lacerta System', 'sector-1760476209253-5', 251.30535958844604, -783.3457296310114, -4.283408796761216, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-8', 'Nu Perseus System', 'sector-1760476209253-6', 190.31831477548127, 791.5847996870061, -31.385689054358018, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-9', 'Lacerta System', 'sector-1760476209253-3', 39.01031119679474, -16.03981335383706, 10.151212820652628, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-11', 'Lacerta System', 'sector-1760476209253-3', 68.73789227186035, 20.929038554618923, -32.36538643988027, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-12', 'Vela System', 'sector-1760476209253-3', -121.40832827094331, -37.07805861885712, 109.92936046121062, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-13', 'Tau Centauri System', 'sector-1760476209253-2', 396.1766611062395, 660.2775659744918, -2.36922115298362, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-14', 'Stellar Hydra Gruis System', 'sector-1760476209253-4', -726.2559568383705, 163.78878324732278, 31.326263186421308, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-15', 'Eos System', 'sector-1760476209253-7', 244.06522363416767, -1179.882401329849, -10.43071440760362, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-16', 'Phoenix System', 'sector-1760476209253-2', 729.4743644573566, 609.4534994730673, -6.429622799987012, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-17', 'Ultima Chronos Major System', 'sector-1760476209253-8', -103.42177533461881, -692.5326310099467, 16.90062370285676, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-18', 'Draconis System', 'sector-1760476209253-9', 886.7756603912719, -1155.0284471310042, -18.164815413350873, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-19', 'Oranos System', 'sector-1760476209253-10', 776.3931082171183, 1179.6705523033856, -3.048424518440709, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-20', 'Astro Pictor System', 'sector-1760476209253-6', 206.6521862096509, 716.5170137614413, -18.811389580304517, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-21', 'Tau Andromeda System', 'sector-1760476209253-10', 702.822373560005, 1225.838815392219, 14.829617207325121, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-22', 'Aether System', 'sector-1760476209253-11', -1127.4544220645375, 631.2440272333907, 0.605505093435406, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-23', 'Pegasi System', 'sector-1760476209253-11', -1302.5524232551904, 424.0165564877491, 5.931904669008383, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-24', 'Helix Andromeda System', 'sector-1760476209254-12', -867.5582935827457, -1043.0681115104912, -17.29622348065987, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-25', 'Andromeda System', 'sector-1760476209253-2', 708.9187557670018, 508.6226849227446, 13.866702254671761, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-26', 'Tartarus Vortexa System', 'sector-1760476209253-3', -1.3209943725577595, 15.744541670720634, 116.96996477792987, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-27', 'Boötes System', 'sector-1760476209253-10', 786.6998499620753, 990.3354267074393, -18.567500878564115, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-28', 'Kappa Astraeus Phoenicis System', 'sector-1760476209254-13', 1493.1598621048279, 22.02808720051269, 6.300872593260564, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-29', 'Selene System', 'sector-1760476209254-14', 1066.0057841360594, 863.4753653385776, -0.12425223969842758, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-30', 'Mu Rhea System', 'sector-1760476209253-11', -1325.4102782710913, 729.4626082132291, -6.907554473378386, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-31', 'Theia Peripheria System', 'sector-1760476209254-15', 750.6626612664737, -688.6580772755609, 37.50388994115859, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-32', 'Boötes Minima System', 'sector-1760476209253-3', -109.41240479752629, 31.17203814739707, -22.45757989210584, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-33', 'Core Boötes System', 'sector-1760476209253-4', -992.4570051065059, 432.5484075205685, 26.70705360089892, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-34', 'Cygni System', 'sector-1760476209254-16', 719.022008948072, 745.5722645012207, 6.93302634360057, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-35', 'Xephyr Prime System', 'sector-1760476209253-3', -13.370894273378516, -2.4861693968729845, -84.29942608276679, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-36', 'Psi Lacerta Obscura System', 'sector-1760476209253-1', -1219.1355032946003, 38.97250964089399, 20.623094869425444, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-37', 'Hercules System', 'sector-1760476209254-17', -583.3496437091404, -631.311422556508, -6.357331379096589, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-38', 'Proxima Khaos Superba System', 'sector-1760476209253-11', -1263.2079403310804, 729.7820217563341, -4.479465765995368, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-39', 'Khaos System', 'sector-1760476209254-18', -209.13627921794478, 1099.4730038743676, -22.354079271597644, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-40', 'Volans Prime System', 'sector-1760476209253-5', 583.2145440360972, -782.8554386982934, -13.900174435859492, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-41', 'Vulpecula Anterior System', 'sector-1760476209254-19', 639.8446914382575, -230.25926145268028, 32.074113970615784, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-42', 'Pegasi Posterior System', 'sector-1760476209254-20', -105.49663398439256, 626.4384995897825, 4.522592294204241, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-43', 'Nu Orionis System', 'sector-1760476209254-21', 58.26179018034676, 1385.517448977866, 3.2842908826997714, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-44', 'Epsilon Ystera Anterior System', 'sector-1760476209253-4', -934.3925781619799, 151.70974916975973, -27.35655134486163, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209249-45', 'Xephyr Superba System', 'sector-1760476209254-22', 130.90620656848182, 22.808413115602708, -42.56001066399809, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-46', 'Phoenix System', 'sector-1760476209253-10', 641.1232954812633, 1070.6737439456047, -13.483371772503, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-47', 'Lambda Tartarus System', 'sector-1760476209254-23', -593.7427340880247, 1157.9354202059437, 7.530266529346486, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-48', 'Lumen Rhea System', 'sector-1760476209254-15', 733.7542198815845, -860.5087503937548, 13.253451916402962, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-49', 'Helios System', 'sector-1760476209254-24', -645.9804191236926, -30.881493346739006, 43.01132747635169, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-50', 'Proxima Aquarii Inferior System', 'sector-1760476209254-23', -601.8330825098541, 1249.6979104102654, -3.865335916146298, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-51', 'Hydra System', 'sector-1760476209254-12', -894.2916165207567, -1180.6121503404784, -8.577735550742572, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-52', 'Nadir Hydra System', 'sector-1760476209253-9', 817.5505568964954, -1137.018306445003, 0.5998192214259461, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-54', 'Mu Phoebe System', 'sector-1760476209254-14', 1101.561581601729, 939.3699619668796, -4.55629458990887, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-55', 'Delta Vulpecula System', 'sector-1760476209254-17', -647.1404777989221, -698.5924018264594, -19.522248786228367, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-56', 'Omega Ophiuchus System', 'sector-1760476209254-25', 1031.5109463782949, 137.42458344869033, 27.163464390118968, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-57', 'Quantum Tartarus Australis System', 'sector-1760476209253-10', 524.1282621745139, 1080.477928602637, -10.618231257961966, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-58', 'Mnemosyne System', 'sector-1760476209253-3', 11.994919758142498, 201.30649122770998, 33.118429085603594, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-59', 'Xi Phoenix System', 'sector-1760476209254-26', -450.0190149323697, -1279.4211872672481, 0.2588754012163541, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-60', 'Hercules Inferior System', 'sector-1760476209253-3', -71.30256016810947, -146.29485798808597, -71.44731691885495, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-61', 'Sagittarius System', 'sector-1760476209253-3', -2.894148021865025, -73.97051865040822, 102.12733952764063, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-62', 'Astraeus System', 'sector-1760476209254-19', 648.2107392276469, -159.4248573031882, 4.995054523240686, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-63', 'Volans System', 'sector-1760476209253-11', -1288.5702037187295, 568.865047013682, -1.6858482882604502, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-64', 'Chi Sagittarius System', 'sector-1760476209253-4', -1188.7157201528335, 293.89841363172775, -15.504302711987801, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-65', 'Styx System', 'sector-1760476209254-27', 1011.2152407762611, -202.72723861124786, -18.331008125385964, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-67', 'Epsilon Selene System', 'sector-1760476209254-28', -1078.1926930203988, -344.8465451800507, -13.787762081266113, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-68', 'Gamma Orionis System', 'sector-1760476209253-0', 152.6007466658585, -1384.9520216401618, -5.308995180239822, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-69', 'Sigma Vela Lupi System', 'sector-1760476209254-20', -321.39160441355415, 807.476201335263, -12.021137821883352, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-70', 'Corvus System', 'sector-1760476209253-3', 59.98541205795958, 149.75564832859402, 57.61834363993877, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-71', 'Boötes Draconis System', 'sector-1760476209253-8', 114.41574993858285, -674.9769392723352, 10.729331868363587, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-72', 'Eos System', 'sector-1760476209253-6', -79.51044458298335, 719.0546245734264, -35.338305927918974, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-73', 'Nyx System', 'sector-1760476209253-1', -1360.2347877511331, -54.05360641527357, 17.975712875380083, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-74', 'Sigma Thalassa Superior System', 'sector-1760476209254-24', -672.269247926375, -64.64710938321721, -6.0218745305023695, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-75', 'Hydra Superior System', 'sector-1760476209254-18', -350.263761165857, 1322.0653129271782, 2.684967426552717, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-76', 'Core Vela System', 'sector-1760476209253-11', -1239.0229628058632, 796.6756051887385, -4.166740082952488, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-77', 'Aether Erebus System', 'sector-1760476209254-12', -800.8256022620409, -821.7223954038385, 12.190543521975753, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-78', 'Pulsar Lynx System', 'sector-1760476209253-9', 624.1796174124614, -1175.463968701118, -11.330139928673455, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-80', 'Ultima Ystera Carinae System', 'sector-1760476209254-12', -751.7902361607328, -944.4258979992363, 6.598686684787758, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-81', 'Aether Perseus System', 'sector-1760476209253-3', -35.48363646588646, 73.05283725112673, 12.507109742350398, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-82', 'Chronos Proxima System', 'sector-1760476209254-29', 1034.9976673168253, 517.4733162395612, 8.509276714328, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-83', 'Lupus System', 'sector-1760476209254-15', 698.3808413216144, -751.836462951896, 16.55758448398712, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-84', 'Leonis System', 'sector-1760476209254-19', 823.9367762120374, -397.36695719639454, -15.515952783106318, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-85', 'Khaos System', 'sector-1760476209254-15', 745.8529452174524, -403.55232953197503, 23.578089398551946, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-86', 'Ophiuchus System', 'sector-1760476209254-24', -612.7520464802856, 30.717362621193036, -11.890323113134652, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-87', 'Fringe Hyperion System', 'sector-1760476209253-3', 8.020162156274568, 32.29842083562674, -17.072151306702104, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-88', 'Volans Inferior System', 'sector-1760476209253-6', 77.43437256151076, 673.3777691399026, 10.788197529723416, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-90', 'Carina Ultima System', 'sector-1760476209254-30', 1150.1149178934807, -602.8194710484976, -22.54878112254076, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-91', 'Oranos System', 'sector-1760476209253-3', 11.645248700581543, 57.391622054284525, 30.2551323139253, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-92', 'Fringe Hydra Inferior System', 'sector-1760476209254-18', -261.9605410312409, 1151.4431071798515, 12.111950561076405, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-93', 'Umbra Cosmos System', 'sector-1760476209253-6', 248.3816213500416, 1035.8636899940068, 20.018977291508264, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-94', 'Cosmic Boötes System', 'sector-1760476209254-21', 288.41788032777055, 1466.260790737068, -11.380351953953664, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-95', 'Zephyrus System', 'sector-1760476209254-14', 996.3020015545715, 809.1506618209992, 8.925991266692028, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-96', 'Alpha Crius System', 'sector-1760476209254-25', 883.0443653206161, 33.97363319444773, 11.391366496995136, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-97', 'Themis System', 'sector-1760476209254-26', -562.6292592361389, -1310.806659942438, 10.698818944751126, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-98', 'Pulsar Rhea Ursae System', 'sector-1760476209254-14', 1248.3069309439613, 783.3786758386857, -1.2246557275499512, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-100', 'Vulpecula System', 'sector-1760476209253-5', 313.8992954662894, -956.9912388556143, 5.9777985075900055, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-101', 'Hyperion Proxima System', 'sector-1760476209254-31', 253.8068161074387, 1100.3748613906068, -24.032965523027123, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-102', 'Nadir Cosmos Obscura System', 'sector-1760476209253-1', -1198.278817457749, -99.007948477534, 10.482630428077403, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-103', 'Mu Mnemosyne System', 'sector-1760476209253-1', -1475.1976609193553, 331.792030695617, 4.03864781619167, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-104', 'Aquarii System', 'sector-1760476209253-6', 156.54069372295837, 716.5539898927532, 30.43710370330158, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-105', 'Spiral Cygni System', 'sector-1760476209254-17', -371.0272260190475, -532.863033197511, -8.13872529094698, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-106', 'Prometheus Pavonis System', 'sector-1760476209254-25', 1192.5560413814599, -106.68258515458724, 10.192622870536695, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-107', 'Erebus Magna System', 'sector-1760476209254-12', -815.1122935050404, -1039.2288190465351, -5.621643355892342, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-108', 'Aether Sagittarius System', 'sector-1760476209254-29', 1285.0009162998335, 554.4485880513138, -14.534708699043769, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-109', 'Styx System', 'sector-1760476209253-0', -64.10122210537249, -1204.2910115320435, 25.678675226913, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-110', 'Hyperion System', 'sector-1760476209254-12', -1097.605289978297, -970.3247454857286, 8.122287637655804, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-111', 'Styx Gruis System', 'sector-1760476209254-30', 1100.075507682479, -715.2043684408676, -0.9620938868119993, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-112', 'Eos Luminosa System', 'sector-1760476209254-23', -524.5835696140917, 1380.037126741921, -8.504649177583914, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-113', 'Core Prometheus Pavonis System', 'sector-1760476209253-5', 339.070154444992, -1105.0479279113874, -4.848142057306591, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-114', 'Helios Velorum System', 'sector-1760476209254-18', -121.83110252177619, 1226.4997612362329, 23.156426642377717, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-115', 'Cygni System', 'sector-1760476209253-3', -34.32931647830243, 5.931447684144123, 12.023150935033467, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-116', 'Cygni System', 'sector-1760476209254-19', 895.0619303663437, -151.63603036998836, -0.6629205579260677, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-117', 'Aether Eos System', 'sector-1760476209253-11', -1147.3930066404528, 700.3485226137093, -2.7830186947863176, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-118', 'Proxima Crux Leonis System', 'sector-1760476209254-27', 1149.7346699182006, -409.6503135308868, 2.067240552362314, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-119', 'Corvus System', 'sector-1760476209253-6', 120.03412026870849, 694.0672335944204, -33.58596436255038, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-120', 'Chi Vela Quasara System', 'sector-1760476209253-4', -997.2316434878396, 134.3915893011412, 31.325984058951974, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-121', 'Lynx Gruis System', 'sector-1760476209254-27', 1114.5072995446587, -194.55485800980932, 21.73660045500732, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-123', 'Orionis Peripheria System', 'sector-1760476209253-3', 92.39442995963682, 11.164655535566254, -118.06426129095338, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209250-126', 'Pegasi System', 'sector-1760476209254-32', -512.7865001258082, 328.6765050441817, -27.892117677932344, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-127', 'Ourania System', 'sector-1760476209254-26', -371.3928287239898, -1002.4143477376504, 4.133384853955462, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-128', 'Radiant Vulpecula System', 'sector-1760476209254-18', -291.87788273415424, 856.0294229236648, 2.747980772086775, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-129', 'Eridani Nova System', 'sector-1760476209254-28', -988.3624397061042, -298.55719568386144, -22.069332854093062, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-130', 'Scorpii Obscura System', 'sector-1760476209254-30', 1188.8423244874718, -756.1817174091809, -17.455345015115114, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-131', 'Epsilon Eos System', 'sector-1760476209253-4', -992.2752383346843, 318.7135628148632, -21.56667651210428, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-133', 'Psi Perseus Serpentis System', 'sector-1760476209254-25', 988.4479233839841, -131.62632003590616, -38.235271758830635, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-134', 'Hyper Khaos System', 'sector-1760476209254-25', 1288.0230483553685, 260.6965048443492, -8.4604772761162, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-136', 'Tartarus System', 'sector-1760476209253-8', 29.60023777248142, -833.3601675142052, 0.3822554596361538, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-137', 'Phi Mnemosyne System', 'sector-1760476209254-26', -488.00911785452547, -1140.9683207835587, 7.709862394433568, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-138', 'Eta Ophiuchus System', 'sector-1760476209253-6', 279.71512077228215, 842.7587691534131, 15.79395927439496, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-140', 'Sigma Cepheus System', 'sector-1760476209254-13', 1307.9463367475432, -69.13025598075919, 9.392255522922836, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-141', 'Vertex Hercules Superior System', 'sector-1760476209253-8', -105.69240382442476, -876.0973626881386, 1.124874584688623, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-143', 'Radiant Crius System', 'sector-1760476209253-1', -1299.6941081595671, -188.08179371025705, -2.092447327932188, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-144', 'Xi Gemini System', 'sector-1760476209253-1', -1270.5841041062415, 208.1629426780067, 12.089446005200962, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-145', 'Selene System', 'sector-1760476209253-6', 458.75355803392955, 796.1158193994033, 11.93226895158708, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-146', 'Chronos System', 'sector-1760476209254-33', -1230.006536791644, -610.6030307690694, -5.030266937437846, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-147', 'Styx System', 'sector-1760476209253-3', 40.67176414649595, -41.39289028960904, -48.94436989618718, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-148', 'Delta Ursae Inferior System', 'sector-1760476209253-2', 377.45000729833487, 496.4898006722061, -9.361692832066623, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-149', 'Lynx System', 'sector-1760476209253-11', -960.506080167393, 820.0087543439325, 7.805375310930538, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-150', 'Perseus System', 'sector-1760476209254-20', -238.21742360747515, 614.2592819935954, 5.302128568661949, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-151', 'Cassiopeia System', 'sector-1760476209253-8', -179.58212970411532, -637.6577908574554, 6.677196120166052, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-152', 'Quasar Gemini System', 'sector-1760476209254-21', -0.09468962184193908, 1417.8293604283442, 13.486351926272661, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-153', 'Rhea Occidentalis System', 'sector-1760476209254-33', -1425.6928610909933, -386.6707682048422, 9.30351656744706, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-154', 'Vortex Boötes Peripheria System', 'sector-1760476209253-1', -1283.3682365655966, -41.07946275631795, -9.535640030480646, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-155', 'Spiral Helios Ultima System', 'sector-1760476209253-9', 908.022668684071, -918.2590040025788, -7.6213503920723085, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-157', 'Fringe Leonis System', 'sector-1760476209254-34', -850.7026956753073, 860.4347609848218, 18.38718217561646, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-158', 'Carina Ursae System', 'sector-1760476209254-17', -415.45331664369854, -567.1639762911083, -16.286630778604113, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-160', 'Ursae Proxima System', 'sector-1760476209253-6', 210.9593708785073, 640.1244636580591, -13.502498731734843, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-161', 'Theta Crux System', 'sector-1760476209254-21', 222.62316702132415, 1310.1856767029697, 10.009543114517182, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-164', 'Aquarii System', 'sector-1760476209253-3', 18.246872065238495, -9.240557362610868, 32.51646791625458, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-165', 'Aquarii System', 'sector-1760476209254-17', -824.7616336867477, -499.7384900700191, -33.5029794615504, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-166', 'Boötes System', 'sector-1760476209254-29', 1193.8128040882475, 530.4029531414907, 9.493871249242162, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-167', 'Lupus System', 'sector-1760476209253-3', -67.58990251241065, 177.53083491707594, 57.7225938138679, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-168', 'Mu Gemini System', 'sector-1760476209254-18', -386.4517953949108, 924.319993217987, -32.70128933688354, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-169', 'Void Hercules Pavonis System', 'sector-1760476209254-27', 962.0082058505398, -185.1709807283475, -26.191935052546583, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-170', 'Apex Andromeda System', 'sector-1760476209253-5', 274.7231552635608, -643.6111523164384, -19.890063202929824, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-171', 'Lyra Occidentalis System', 'sector-1760476209254-27', 1225.0851130008427, -332.0021250244861, -12.315304447632439, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-172', 'Cygni System', 'sector-1760476209254-25', 1179.7714853569935, 302.3914150906612, 13.158213149381247, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-173', 'Epsilon Phoebe System', 'sector-1760476209254-23', -815.2030771576896, 1230.116758130931, -2.1509599482728277, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-174', 'Pegasi System', 'sector-1760476209253-10', 995.800500450145, 1024.2128139496065, -2.2583895915936774, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-175', 'Zenith Andromeda Superba System', 'sector-1760476209254-25', 778.3474417937447, 36.29584222062234, -4.959777576427552, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-176', 'Nebula Auriga System', 'sector-1760476209254-30', 1321.322500480331, -399.68096919175434, 13.214726369473013, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-177', 'Gemini Superba System', 'sector-1760476209253-7', 441.1724965101016, -1344.7962894402458, 2.1590298047693866, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-178', 'Themis System', 'sector-1760476209254-19', 850.8651924659637, -53.36490147986934, -30.90100734746148, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-180', 'Styx Gruis System', 'sector-1760476209254-18', -217.57569455141763, 991.5444704558442, 33.793644786536305, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-182', 'Nadir Phoenix System', 'sector-1760476209254-30', 1145.2649345627399, -892.5701562832552, -7.461409161258316, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-183', 'Flux Eridani System', 'sector-1760476209254-13', 1269.023108527876, 186.48953638201488, 22.79315340611941, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-184', 'Frontier Lupus System', 'sector-1760476209253-7', 504.6170530438877, -1181.2215064372162, 3.2541145685449786, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-187', 'Eridani System', 'sector-1760476209254-25', 1180.939635718557, 89.55910445362225, -16.551589529099708, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-188', 'Pictor System', 'sector-1760476209253-5', 561.5271856014037, -690.2475452895092, 2.423395318233048, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-189', 'Xephyr System', 'sector-1760476209254-30', 1152.6561121978268, -676.1565570507112, 3.9679565008774915, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-190', 'Astro Andromeda System', 'sector-1760476209253-6', 331.5079375134513, 803.5839309512603, -27.36645325102995, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-191', 'Zephyrus System', 'sector-1760476209253-2', 389.0946072936281, 603.7082358610082, 30.157774746506725, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-192', 'Galactic Khaos System', 'sector-1760476209254-35', 557.3247336827294, -1282.6572016055495, 6.034694120903165, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-193', 'Aquarii System', 'sector-1760476209254-36', -1020.5462033686257, -43.0200411907505, -14.901083629841349, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-194', 'Delta Auriga Anterior System', 'sector-1760476209254-12', -730.2470468055056, -861.8916407298886, -11.299305724324109, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-195', 'Helios System', 'sector-1760476209254-23', -610.6911688878131, 937.4606941178378, 6.2414335216586885, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-196', 'Lynx Superba System', 'sector-1760476209253-4', -953.0096436273891, 662.7791017888055, 1.1686072218446117, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-198', 'Hyper Tartarus Telescopii System', 'sector-1760476209254-34', -797.780913014252, 918.6709346516875, -17.766246163961902, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-199', 'Thalassa System', 'sector-1760476209254-34', -913.1671908639823, 1064.8753332301374, 10.507877802463078, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-200', 'Pi Thalassa System', 'sector-1760476209253-5', 552.5051332605901, -880.0215576259694, 18.58753056372578, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-201', 'Upsilon Tartarus System', 'sector-1760476209253-3', 85.43091315736854, -97.58310386948219, -66.47220929746842, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-202', 'Frontier Oranos Major System', 'sector-1760476209254-27', 965.6193874814782, -337.40397777852013, 9.46168333945112, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-203', 'Nadir Aether System', 'sector-1760476209253-3', 28.590937003070984, 39.85860879951667, -87.81521508635007, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-204', 'Hercules System', 'sector-1760476209254-12', -687.2898727034759, -996.3913378394868, -5.49188531277726, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-205', 'Gemini Ultima System', 'sector-1760476209254-12', -797.3304687485879, -1139.2945575705223, -18.518905536838002, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-206', 'Eridani Aquilae System', 'sector-1760476209254-19', 921.7010825548685, -299.73411095336473, -24.211654391547604, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-207', 'Perseus Ursae System', 'sector-1760476209253-1', -1462.7414393144188, -34.77098803600677, 11.222277754519046, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-208', 'Quasar Theia Hydrae System', 'sector-1760476209254-19', 685.5830306482197, -15.474910534592745, 7.750288530511279, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-210', 'Hyper Lynx Magna System', 'sector-1760476209254-24', -616.0545173997493, -263.07185354496283, 7.299229123158206, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-212', 'Helios Aquilae System', 'sector-1760476209254-15', 876.72135353452, -678.1127925966397, 16.574653967342197, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-213', 'Lambda Nyx Gruis System', 'sector-1760476209253-6', 367.26849072247524, 682.378275598847, 33.953672610591155, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-214', 'Volans System', 'sector-1760476209254-28', -1119.1708473652395, -91.06827722492136, 3.553309491846292, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-215', 'Vortex Cassiopeia System', 'sector-1760476209254-33', -1198.612993207116, -745.1065068198242, 9.028030500359623, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-216', 'Carina System', 'sector-1760476209254-26', -511.33928973902124, -1206.370744824859, -5.029505054539298, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-217', 'Vortex Tartarus System', 'sector-1760476209253-2', 745.2529978117586, 224.40347659974083, -6.901067635304349, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-218', 'Lynx System', 'sector-1760476209253-3', 88.67308985703646, -5.857628650716931, 19.248966273293917, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-221', 'Rho Volans System', 'sector-1760476209253-3', -162.57052232501786, -163.81679157662737, 39.887009780696445, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-223', 'Ourania System', 'sector-1760476209254-25', 906.2673087842738, 227.2658987197331, 6.205198107615544, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-224', 'Cassiopeia Gruis System', 'sector-1760476209254-34', -755.8583607190518, 777.9797481863715, 4.734737018787957, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-226', 'Lupus System', 'sector-1760476209254-17', -399.54218566658847, -759.7117237198813, 43.89580247322809, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-229', 'Scorpii System', 'sector-1760476209253-2', 800.6362241533059, 356.93172003766034, -6.307589512393889, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-230', 'Cygni System', 'sector-1760476209253-6', 460.74458930332315, 854.4393062009677, 6.038170161738449, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-231', 'Delta Themis Prime System', 'sector-1760476209254-18', -483.11245977319203, 1055.3669133626734, -25.073642810041754, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-232', 'Nyx System', 'sector-1760476209254-14', 933.9322761879394, 853.1981964105192, -17.458870779109663, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-233', 'Galactic Themis System', 'sector-1760476209253-3', 21.73358327610504, -116.01583790739674, -18.01655546339804, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-234', 'Andromeda System', 'sector-1760476209253-1', -1255.7277726328568, -125.7617210339502, 7.08531410119074, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209251-235', 'Gamma Lupus System', 'sector-1760476209253-5', 538.0679664530421, -985.816280457963, 18.37741767764148, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-238', 'Theia System', 'sector-1760476209254-17', -780.8996916795048, -497.2073165792884, 19.5537454847843, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-239', 'Hydra Serpentis System', 'sector-1760476209253-6', 30.522807178460642, 719.0433175956471, -37.75604805691191, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-240', 'Tartarus System', 'sector-1760476209254-18', -166.5782065828739, 1270.524479286401, 8.848088650187444, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-241', 'Aether System', 'sector-1760476209254-24', -687.6022063448684, 59.993892726701084, -38.32520105697359, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-242', 'Taurus System', 'sector-1760476209254-30', 1252.6435964233258, -451.79063000007955, 11.3780986687921, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-243', 'Nadir Xephyr Pulsara System', 'sector-1760476209253-4', -898.978428763488, 100.77719867104364, 22.020308319790196, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-245', 'Ursae System', 'sector-1760476209253-6', -6.6094596593330195, 919.520046983093, 6.07306703182017, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-246', 'Void Leonis System', 'sector-1760476209253-6', 144.36083163086357, 940.3039350301559, -18.462648370678142, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-247', 'Draconis System', 'sector-1760476209254-13', 1384.5983252953183, 112.13879585291929, 6.384700668100447, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-249', 'Prometheus System', 'sector-1760476209253-3', -177.92751373631847, 74.46581761121436, -3.652646075852746, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-250', 'Hyperion Phoenicis System', 'sector-1760476209254-26', -376.73247820233104, -1273.1558368426643, 9.822081904793306, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-251', 'Rho Crux System', 'sector-1760476209253-5', 601.1649447748333, -745.6202230757872, 32.828228818873534, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-252', 'Corvus System', 'sector-1760476209254-23', -763.2165162658433, 1230.8414236924555, -5.611346929293309, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-253', 'Tartarus System', 'sector-1760476209253-8', -119.6243436995138, -629.1244109105387, -13.515691994203637, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-254', 'Ystera System', 'sector-1760476209254-18', -238.69560582553055, 1271.4536887485292, 0.5155417291987039, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-255', 'Lumen Pegasi System', 'sector-1760476209254-13', 1341.0800379214315, 274.69030091895445, 5.383983928265282, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-256', 'Rho Cassiopeia System', 'sector-1760476209253-1', -1388.2027657109118, 162.18389236962932, 5.109386283441663, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-257', 'Astraeus Aquilae System', 'sector-1760476209254-15', 932.7178529610676, -709.2858323382557, 24.976033643692595, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-259', 'Galactic Prometheus System', 'sector-1760476209254-16', 718.8728909569527, 863.5174217365225, -6.934366745450998, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-260', 'Vertex Oranos Minor System', 'sector-1760476209253-1', -1237.2905271023485, 84.32008189457514, 9.73344674812293, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-261', 'Hyperion System', 'sector-1760476209253-8', -222.30625385933388, -767.1454921457868, -18.026742719757294, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-262', 'Carina System', 'sector-1760476209254-27', 1196.7828376564178, -286.16191502129357, 8.59600453992572, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-264', 'Eos System', 'sector-1760476209254-26', -424.1317035411143, -1228.316083707678, 8.7673850161604, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-265', 'Perseus System', 'sector-1760476209253-7', 117.84261359407192, -1067.0028347022414, 10.919221227161255, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-266', 'Gemini System', 'sector-1760476209254-15', 751.9008054282355, -750.5867100731392, 8.100300688226728, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-267', 'Phoenix Gruis System', 'sector-1760476209254-28', -997.3081181876878, -614.7387918006139, -25.311535941940278, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-268', 'Mnemosyne Aquilae System', 'sector-1760476209254-19', 732.2768504301629, -340.3650589866912, -10.93952144897791, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-270', 'Cepheus System', 'sector-1760476209254-32', -499.19209930423426, 467.9536269573382, -19.855574379768203, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-272', 'Nadir Ophiuchus System', 'sector-1760476209254-17', -630.2139989844566, -648.8488583257553, -8.891787059687708, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-273', 'Nebula Orionis System', 'sector-1760476209254-28', -1142.9959214531711, -576.6410404787458, -9.079029607593082, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-274', 'Core Cosmos System', 'sector-1760476209254-26', -529.8771158999306, -1055.6307708502954, -18.13359326606603, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-277', 'Boötes Quasara System', 'sector-1760476209254-37', -1415.59338433733, -334.10742689968646, 7.413196066793809, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-278', 'Orionis System', 'sector-1760476209254-22', 100.28808076614808, 84.72654427885998, -69.10319555553905, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-279', 'Helios System', 'sector-1760476209254-14', 875.1967720345547, 815.7368620425821, -0.04600999450146581, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-280', 'Ophiuchus System', 'sector-1760476209254-12', -871.0127456090383, -1238.4925554835468, 4.715339506484625, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-281', 'Xephyr System', 'sector-1760476209254-21', 87.84353982168629, 1271.272046261692, 13.52312051091836, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-283', 'Theta Xephyr System', 'sector-1760476209254-38', 421.35394821942964, 1368.1288681096037, 11.935555263126496, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-284', 'Hydra System', 'sector-1760476209253-5', 257.96436293804186, -890.1293154777704, -5.231235722848226, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-286', 'Ourania System', 'sector-1760476209254-15', 628.1191261559624, -563.0349598798867, -3.857701236115812, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-287', 'Styx System', 'sector-1760476209254-39', 1346.3065105914231, 422.6639741485153, 4.030199380487999, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-288', 'Aether Phoenicis System', 'sector-1760476209254-24', -650.2371414317972, -123.157583742187, 23.01940708657869, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-290', 'Cassiopeia System', 'sector-1760476209254-22', 118.42119260919095, 53.20245582305508, 23.123299998453295, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-291', 'Vela Prime System', 'sector-1760476209253-3', -85.78230087285426, -39.0308016777853, 30.530758140857365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-293', 'Astraeus System', 'sector-1760476209254-33', -1164.1685232188981, -861.9566329608799, 2.9546021227214467, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-294', 'Epsilon Hyperion Proxima System', 'sector-1760476209253-3', -139.25426940425362, 37.05300159360222, -81.10646311489053, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-295', 'Centauri Carinae System', 'sector-1760476209253-4', -1062.5729896989028, 176.5236041978809, 15.075973210615828, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-296', 'Chronos System', 'sector-1760476209253-2', 607.3010785973053, 377.5187780739492, 22.745297668521697, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-297', 'Rhea System', 'sector-1760476209253-6', 325.3665634779792, 873.3733777033964, 18.063996711038335, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-298', 'Aether Hydrae System', 'sector-1760476209254-32', -576.4072433859761, 324.8790251816105, 30.798893181587445, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-299', 'Gamma Lyra Carinae System', 'sector-1760476209253-1', -1347.2501342048201, 120.14804884042664, -9.143460910406898, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-300', 'Andromeda System', 'sector-1760476209254-25', 902.2984607250878, 92.03082436074814, 21.35068413724779, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-301', 'Aquarii System', 'sector-1760476209253-5', 205.95117500996344, -949.8324666453454, 22.775055548490034, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-305', 'Radiant Gemini System', 'sector-1760476209253-5', 446.3901553322934, -1032.283291259957, 25.1239042024731, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-308', 'Lyra System', 'sector-1760476209253-4', -814.3466675271408, 252.69253751518463, -34.74442528519661, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-309', 'Corvus System', 'sector-1760476209254-15', 834.0406284738978, -605.9322439864226, -8.360609228536147, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-311', 'Ophiuchus System', 'sector-1760476209253-3', -49.98693989546355, -19.478804199011222, -29.0595347082568, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-312', 'Upsilon Vela Maxima System', 'sector-1760476209254-26', -248.39000609165168, -1103.4405412345723, -6.344259250564363, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-313', 'Cygni Major System', 'sector-1760476209254-18', 3.077563497291198, 1049.4811102778538, 6.728331283941586, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-314', 'Helios Leonis System', 'sector-1760476209253-6', -47.03023913072347, 654.0660419717452, 20.2761243189709, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-315', 'Rhea System', 'sector-1760476209253-3', 17.449361934107916, 29.330396121669715, -29.62989508312991, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-317', 'Ultima Aether Minima System', 'sector-1760476209254-16', 595.5249591717519, 812.854201777204, 22.506543457406977, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-318', 'Theia System', 'sector-1760476209253-9', 831.8675563884901, -1222.7055092218686, -0.4659668164279479, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-319', 'Astro Crux System', 'sector-1760476209254-22', 109.63528926361393, -128.80312235647241, -34.67319320668883, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-322', 'Ursae System', 'sector-1760476209254-17', -586.507471391312, -853.8357638128847, 15.655389660617143, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-323', 'Zeta Eridani System', 'sector-1760476209254-25', 1102.594441113511, 292.6393412573353, 25.230783373204503, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-325', 'Spiral Theia System', 'sector-1760476209254-14', 967.8459857258678, 686.9385517647755, 20.48840441815415, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-328', 'Centauri System', 'sector-1760476209253-9', 662.7669592192843, -1313.444456197479, 1.7004544893183184, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-330', 'Leonis System', 'sector-1760476209254-19', 806.0461772674021, -264.4888878081499, 13.605037824931326, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-332', 'Phoenix System', 'sector-1760476209254-25', 1196.6087594453518, 154.64886104878806, -6.693073133021892, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-334', 'Upsilon Taurus System', 'sector-1760476209253-4', -1039.5972534606835, 443.0027099597318, -4.98420528189995, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-335', 'Hydra Tauri System', 'sector-1760476209254-40', -723.0821168264315, -324.2517963776064, 9.88510343141284, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-336', 'Ourania System', 'sector-1760476209253-3', -121.60065146857866, -75.24248020283, -128.35904208916656, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-337', 'Helios System', 'sector-1760476209253-5', 417.5180668582934, -1083.4353489134267, 0.22245698158359595, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-338', 'Nyx System', 'sector-1760476209254-17', -458.41321773930883, -680.9768359406418, 1.4627743974351848, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-339', 'Hyperion System', 'sector-1760476209253-8', -158.07176353799917, -762.933369757929, 6.95829114487179, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-340', 'Rhea System', 'sector-1760476209254-25', 964.0740456245393, 349.3654777765692, -36.05447126543386, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-341', 'Pegasi System', 'sector-1760476209253-8', 26.744856006306073, -755.5788537245787, -27.071868851413534, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-342', 'Styx System', 'sector-1760476209253-0', -58.862022088567144, -1388.0487420019967, 0.42271559909313083, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-343', 'Cosmos System', 'sector-1760476209253-10', 933.4820011256202, 970.2062880456783, 0.008325045761997885, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-345', 'Galactic Phoebe System', 'sector-1760476209254-34', -797.8923402911948, 833.8354471104273, 7.605734656582538, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-347', 'Theia Superba System', 'sector-1760476209253-10', 637.233979898597, 1245.7716057636553, -4.7132788768779506, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-348', 'Khaos Prime System', 'sector-1760476209253-3', -90.88584975588155, -172.61217378574707, 26.127280563178143, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-349', 'Dawn Thalassa System', 'sector-1760476209254-20', -122.04202431117893, 768.1500576687707, -28.072872313572365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-350', 'Nu Mnemosyne System', 'sector-1760476209254-14', 1208.4479447075405, 621.5091704849466, -9.232027638855032, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-351', 'Eridani System', 'sector-1760476209253-0', 172.77188141345204, -1477.5611201081774, 8.194543635106239, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-352', 'Khaos System', 'sector-1760476209254-28', -1126.2646521937604, -252.11372438612594, 6.537398772631862, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-353', 'Hydra System', 'sector-1760476209254-30', 1332.5911461752028, -628.0872159251796, -0.5993629906369548, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-354', 'Ystera System', 'sector-1760476209254-15', 683.2074943185766, -709.1018054985375, -20.070317444522036, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-355', 'Sagittarius System', 'sector-1760476209254-14', 1005.6593502610573, 873.0228786699876, -1.9511047203793304, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-356', 'Carina System', 'sector-1760476209254-28', -1352.1407586165642, -364.7357666321918, -9.967044569719985, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-358', 'Perseus System', 'sector-1760476209253-10', 704.0783143288937, 931.1593865517626, 14.036447987132256, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-362', 'Perseus System', 'sector-1760476209254-15', 1029.2924540253484, -705.0080979936574, 9.734089031701574, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-363', 'Erebus System', 'sector-1760476209253-8', 80.63198595885392, -619.9595162044735, -11.480927059006802, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-365', 'Mu Crius System', 'sector-1760476209254-22', 194.50824415864992, -8.122108530896952, 67.57044989774138, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-366', 'Lacerta System', 'sector-1760476209254-28', -1147.3693334390555, -141.822159176667, 0.6673972101834824, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-368', 'Cepheus System', 'sector-1760476209254-25', 1216.6532085229805, 342.0172328862202, -14.950889563267399, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-369', 'Ourania System', 'sector-1760476209254-41', -526.1808929861007, 728.1374283569762, 0.036933609847681126, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-370', 'Themis System', 'sector-1760476209254-28', -820.7466558358145, -298.21394275266425, -4.790864387667327, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-371', 'Pi Styx Occidentalis System', 'sector-1760476209253-3', 112.29975733819694, -75.68947305866152, -18.114871175486645, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-373', 'Nyx System', 'sector-1760476209254-12', -585.799152880679, -951.4906427566951, -12.03661194324911, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-376', 'Vela Gruis System', 'sector-1760476209253-4', -736.5721147675509, 347.22217858403195, -15.64500630165633, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-378', 'Lynx System', 'sector-1760476209254-12', -935.8620697728502, -763.2413964584696, 9.376730987260192, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-380', 'Cygni System', 'sector-1760476209254-25', 1127.243290587611, -46.16576351761942, 24.148666809170326, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-381', 'Zeta Lynx System', 'sector-1760476209254-24', -755.0225723674, 51.21586855312883, 21.198467472028042, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-382', 'Lumen Eos System', 'sector-1760476209254-14', 824.4948156944625, 802.5684366694989, 3.69261442808231, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-383', 'Carina System', 'sector-1760476209253-4', -916.3975492331259, 619.534232641811, -12.00656107773748, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-384', 'Eridani Radianta System', 'sector-1760476209254-41', -496.6954349062874, 683.6841732434375, -45.13312503563402, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-385', 'Crius System', 'sector-1760476209254-33', -1081.5034717604947, -778.7545429978521, -16.409340059258863, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-386', 'Gemini Quasara System', 'sector-1760476209254-33', -1326.616702321307, -588.8009708825673, 2.221398476861764, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-388', 'Ourania Occidentalis System', 'sector-1760476209254-32', -540.8625756993515, 587.5421192530692, -22.188539520370888, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-390', 'Scorpii Occidentalis System', 'sector-1760476209254-26', -582.7801538069438, -1217.0354468233134, -10.225429271249173, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-392', 'Prometheus System', 'sector-1760476209254-42', -904.0296975601299, 1170.200670184087, -10.181429729295543, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-393', 'Rho Aquarii Proxima System', 'sector-1760476209254-18', -285.58053818975657, 1004.9184912695339, -11.41595832757059, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-394', 'Nebula Lynx System', 'sector-1760476209254-39', 1300.484184131207, 663.0452053300428, -10.264323006485702, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-395', 'Phoenix System', 'sector-1760476209254-25', 1021.5596185592251, -15.88320617880739, 24.844561524198777, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-397', 'Radiant Tartarus System', 'sector-1760476209254-24', -630.0314984200679, 243.0896527306597, -25.295417520420074, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-398', 'Psi Phoebe System', 'sector-1760476209253-5', 132.41205266792295, -936.6493855518322, -7.097937743996736, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-400', 'Hyperion System', 'sector-1760476209253-3', -114.8740343137205, 156.11759731254637, -26.137615257401283, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-402', 'Ophiuchus System', 'sector-1760476209253-9', 835.3232109737138, -985.7233655869702, -15.554852924775403, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209252-405', 'Theia System', 'sector-1760476209253-9', 856.5872430561283, -1051.2522561283567, -6.972741275018885, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-406', 'Oranos System', 'sector-1760476209254-24', -901.8200893620087, -106.8996200139094, 2.233264463905094, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-407', 'Aether Erebus System', 'sector-1760476209253-4', -1176.4399249246655, 417.07932708945464, -13.43408462219904, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-410', 'Tartarus Virginis System', 'sector-1760476209253-1', -1464.8398225951735, -194.87387425312005, 1.5209029142145143, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-412', 'Thalassa System', 'sector-1760476209254-18', -251.7094897792891, 1390.1337499656074, -0.8538795452221493, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-414', 'Eta Helios Peripheria System', 'sector-1760476209254-28', -1080.4067810624224, -614.3379724949831, -3.9453610537582, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-415', 'Chi Ophiuchus Minima System', 'sector-1760476209253-4', -1167.2923524727682, 467.36532955715643, -22.450034634514967, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-417', 'Nova Xephyr Nova System', 'sector-1760476209254-30', 1099.8578035188405, -765.3198457548749, 9.974113258547165, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-418', 'Ultima Cepheus Minor System', 'sector-1760476209254-30', 1272.0999409490596, -506.9007176691659, -7.467495592560806, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-419', 'Tartarus System', 'sector-1760476209253-3', 10.76431892462932, -53.47895398327998, -60.03777629513636, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-420', 'Lupus System', 'sector-1760476209253-10', 797.1805380312973, 927.8672963354172, -7.315796349232365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-421', 'Astro Hyperion System', 'sector-1760476209254-24', -658.3169689163072, 73.26508717697361, 27.53191706192189, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-424', 'Xephyr System', 'sector-1760476209254-15', 670.1268398172151, -460.7149159185108, 4.031576670695525, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-426', 'Lacerta System', 'sector-1760476209254-13', 1231.918548809125, -57.0517163482659, 13.49638358889728, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-427', 'Cassiopeia System', 'sector-1760476209253-8', -61.39533361637841, -932.7422465389726, -15.06494190075506, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-429', 'Volans System', 'sector-1760476209253-4', -741.3922003325342, 542.3758775679362, -7.0871662841705145, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-430', 'Void Aether System', 'sector-1760476209254-13', 1277.6907887924915, -143.34831526699094, 14.372188711044476, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-432', 'Stellar Pictor Centralis System', 'sector-1760476209254-16', 700.1587433478107, 696.2603148717071, 4.068260673523682, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-433', 'Tartarus Proxima System', 'sector-1760476209253-2', 637.5654009828484, 620.375992423318, -8.004203341896769, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-435', 'Cassiopeia System', 'sector-1760476209254-33', -1130.337637201581, -658.6033673683753, 4.371992599705892, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-437', 'Helix Pegasi System', 'sector-1760476209253-11', -1366.0688208622628, 515.3361088413799, 8.087591358308732, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-441', 'Core Lacerta System', 'sector-1760476209254-19', 584.3225942029421, -181.80069526292255, -10.549665677509243, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-442', 'Carina System', 'sector-1760476209253-11', -1042.0874340216278, 907.1244240552202, -9.388485673113584, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-443', 'Helios System', 'sector-1760476209253-7', 173.23705631048438, -1160.185191105187, 1.8193575235183967, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-444', 'Themis System', 'sector-1760476209253-3', -33.50136826330485, 68.17898669185777, -47.37829022323875, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-445', 'Themis Posterior System', 'sector-1760476209254-16', 780.0256509121224, 746.960219670383, -29.83618285246374, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-446', 'Phoenix System', 'sector-1760476209254-25', 927.6354675523977, 14.428098805917225, -1.7660033388919771, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-448', 'Scorpii Delphini System', 'sector-1760476209254-12', -1133.2315973710888, -910.1051442892201, 3.6787537786307367, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-449', 'Frontier Eos System', 'sector-1760476209253-5', 248.67012298576353, -1122.689309963406, 0.7080437232596832, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-450', 'Hercules System', 'sector-1760476209254-34', -876.7896089366028, 948.7867227794056, -20.824626940944867, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-451', 'Cepheus System', 'sector-1760476209253-1', -1407.1806865939222, 258.090837569961, 11.21404499659776, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-452', 'Themis System', 'sector-1760476209254-31', 351.1934150166466, 1215.1302791376822, 22.599184300009274, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-453', 'Eos System', 'sector-1760476209254-31', 369.0720721858403, 1151.8429672289094, -16.133118867132954, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-454', 'Khaos Telescopii System', 'sector-1760476209254-18', -341.48248556356685, 1209.2958740573401, -2.5820971831835546, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-455', 'Ultima Ystera System', 'sector-1760476209254-22', 134.43123526014665, 11.41328210775957, 79.89445639144009, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-457', 'Selene System', 'sector-1760476209253-10', 575.0783633463196, 1057.7128204242658, 3.1029123705862993, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-458', 'Corvus System', 'sector-1760476209254-28', -1276.6938175295982, -547.6985781799003, -3.5702424630859717, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-461', 'Mnemosyne System', 'sector-1760476209253-3', -19.825617597143044, 126.80399005078662, -4.677019066677769, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-462', 'Phoenix System', 'sector-1760476209254-17', -531.1764685231783, -502.390547606101, 0.8491674266989531, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-463', 'Hyperion System', 'sector-1760476209254-18', -390.29866373421146, 1032.6074263581986, 18.7872636173783, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-468', 'Lumen Nyx System', 'sector-1760476209254-33', -1317.6559906278587, -687.1227389555994, -4.908663523752395, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-469', 'Chronos Proxima System', 'sector-1760476209253-1', -1159.3146060112883, 14.93986413326001, 24.336550096301213, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-472', 'Umbra Lynx Australis System', 'sector-1760476209253-3', 13.237154522693872, 2.379290550072674, -43.87364649085277, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-474', 'Zeta Ourania System', 'sector-1760476209253-8', -226.77442836763137, -657.5929269514868, -7.139931201929787, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-475', 'Erebus System', 'sector-1760476209254-18', -133.66010379258614, 1310.8840023245166, 10.038800837005128, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-476', 'Aquarii System', 'sector-1760476209254-12', -857.6919071087219, -767.4249443737383, 4.134013625275765, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-478', 'Ourania System', 'sector-1760476209254-15', 677.1247791330949, -529.3871630210426, 6.808268951622498, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-479', 'Zenith Crux System', 'sector-1760476209253-3', 33.500561111324785, 132.89365007810207, -90.1677752644754, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-480', 'Core Gemini Borealis System', 'sector-1760476209253-0', -264.39260766206877, -1340.381199739047, 7.619259866126652, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-481', 'Boötes System', 'sector-1760476209254-43', -356.5023714607321, 1418.9574321014886, 4.185247925797967, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-483', 'Zeta Sagittarius System', 'sector-1760476209254-41', -413.0993366167799, 684.0236847943124, 18.40863118563734, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-484', 'Pi Erebus System', 'sector-1760476209253-3', -19.315670610130162, -32.11449108283341, 139.2411311970108, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-485', 'Auriga Minor System', 'sector-1760476209254-17', -608.8298227997905, -761.612344239446, 34.00111095419329, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-486', 'Twilight Ursae System', 'sector-1760476209253-11', -1277.334341233188, 663.6038908745832, -7.711926095851217, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-487', 'Styx System', 'sector-1760476209253-3', -23.096267978346894, -83.1717862860506, 7.393755199929342, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-488', 'Gemini Carinae System', 'sector-1760476209254-22', -63.43546520537697, -27.145946277251774, -114.28842501321444, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-489', 'Eta Cassiopeia Radianta System', 'sector-1760476209254-15', 828.7032867649542, -745.2155034442646, 7.310275438361085, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-490', 'Phi Rhea System', 'sector-1760476209254-15', 951.203152096625, -591.2072389354691, 4.641280784517674, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-493', 'Nebula Centauri Centralis System', 'sector-1760476209253-7', 357.8202138960777, -1316.143442014754, -6.289876550226423, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-494', 'Cepheus Magna System', 'sector-1760476209254-14', 794.5957457628625, 863.7948596765648, -5.288364159311582, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-496', 'Orionis System', 'sector-1760476209254-15', 821.2122634471416, -498.2092169245502, 14.93599619806771, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
VALUES ('system-1760476209253-498', 'Pi Ursae System', 'sector-1760476209254-24', -710.3390583252221, -264.55452994359393, 3.1831167911462597, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  system_type = EXCLUDED.system_type,
  updated_at = NOW();

-- ============================================
-- 4. STARS
-- ============================================

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-407716', 'Zenith Gemini Peripheria', 'system-1760476209248-0', -13.988445947793721, -1446.8249122466743, -11.883272920338555, 'K', 0.37, 3.89)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-40675', 'Ursae', 'system-1760476209249-1', -1420.3354085336425, 69.10344378187729, -8.117564863278236, 'A', 1.12, 7.51)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-406969', 'Galactic Scorpii', 'system-1760476209249-2', 520.6225674945067, 414.5990306976446, 4.041056011894909, 'K', 0.35, 3.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-792456', 'Hyperion', 'system-1760476209249-3', -171.7302279122643, -25.076777346061697, -1.0528292453635073, 'M', 0.26, 4.55)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-921109', 'Phoebe', 'system-1760476209249-4', -920.7281901245233, 380.2834457759568, 0.702058886349473, 'M', 0.16, 9.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-179659', 'Dusk Scorpii Obscura', 'system-1760476209249-5', 407.907596686622, -892.8499722959446, -6.8829337165220235, 'K', 0.37, 9.97)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-383192', 'Khaos Serpentis', 'system-1760476209249-6', -835.7218350711355, 468.2714823993196, 23.083622338293942, 'A', 1.18, 0.33)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-86561', 'Lacerta', 'system-1760476209249-7', 251.30535958844604, -783.3457296310114, -4.283408796761216, 'M', 0.2, 8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-483356', 'Nu Perseus', 'system-1760476209249-8', 190.31831477548127, 791.5847996870061, -31.385689054358018, 'K', 0.47, 0.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207067-305870', 'Lacerta', 'system-1760476209249-9', 39.01031119679474, -16.03981335383706, 10.151212820652628, 'K', 0.49, 11.86)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-728940', 'Nu Vela', 'system-1760476209249-1', -1407.266611907169, 29.702064458940725, 6.674054160185346, 'K', 0.5, 12.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-275883', 'Lacerta', 'system-1760476209249-11', 68.73789227186035, 20.929038554618923, -32.36538643988027, 'K', 0.33, 9.27)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-801504', 'Vela', 'system-1760476209249-12', -121.40832827094331, -37.07805861885712, 109.92936046121062, 'M', 0.27, 3.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-549960', 'Tau Centauri', 'system-1760476209249-13', 396.1766611062395, 660.2775659744918, -2.36922115298362, 'M', 0.18, 1.32)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-385414', 'Stellar Hydra Gruis', 'system-1760476209249-14', -726.2559568383705, 163.78878324732278, 31.326263186421308, 'K', 0.47, 13.52)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-32912', 'Eos', 'system-1760476209249-15', 244.06522363416767, -1179.882401329849, -10.43071440760362, 'F', 0.93, 5.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-279570', 'Phoenix', 'system-1760476209249-16', 729.4743644573566, 609.4534994730673, -6.429622799987012, 'K', 0.43, 8.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-553338', 'Ultima Chronos Major', 'system-1760476209249-17', -103.42177533461881, -692.5326310099467, 16.90062370285676, 'M', 0.16, 7.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-327009', 'Draconis', 'system-1760476209249-18', 886.7756603912719, -1155.0284471310042, -18.164815413350873, 'M', 0.22, 11.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207085-401287', 'Oranos', 'system-1760476209249-19', 776.3931082171183, 1179.6705523033856, -3.048424518440709, 'M', 0.29, 8.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-350364', 'Astro Pictor', 'system-1760476209249-20', 206.6521862096509, 716.5170137614413, -18.811389580304517, 'M', 0.18, 8.23)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-740526', 'Tau Andromeda', 'system-1760476209249-21', 702.822373560005, 1225.838815392219, 14.829617207325121, 'F', 1.06, 4.52)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-239717', 'Aether', 'system-1760476209249-22', -1127.4544220645375, 631.2440272333907, 0.605505093435406, 'K', 0.45, 10.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-409822', 'Pegasi', 'system-1760476209249-23', -1302.5524232551904, 424.0165564877491, 5.931904669008383, 'F', 1.06, 4.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-197031', 'Helix Andromeda', 'system-1760476209249-24', -867.5582935827457, -1043.0681115104912, -17.29622348065987, 'F', 0.98, 1.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-730790', 'Andromeda', 'system-1760476209249-25', 708.9187557670018, 508.6226849227446, 13.866702254671761, 'K', 0.32, 1.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-509286', 'Tartarus Vortexa', 'system-1760476209249-26', -1.3209943725577595, 15.744541670720634, 116.96996477792987, 'K', 0.44, 0.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-925548', 'Boötes', 'system-1760476209249-27', 786.6998499620753, 990.3354267074393, -18.567500878564115, 'M', 0.26, 5.25)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-648703', 'Kappa Astraeus Phoenicis', 'system-1760476209249-28', 1493.1598621048279, 22.02808720051269, 6.300872593260564, 'K', 0.39, 2.89)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207102-805228', 'Selene', 'system-1760476209249-29', 1066.0057841360594, 863.4753653385776, -0.12425223969842758, 'G', 0.63, 2.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-40806', 'Mu Rhea', 'system-1760476209249-30', -1325.4102782710913, 729.4626082132291, -6.907554473378386, 'K', 0.41, 6.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-644650', 'Theia Peripheria', 'system-1760476209249-31', 750.6626612664737, -688.6580772755609, 37.50388994115859, 'F', 1.08, 3.44)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-141548', 'Boötes Minima', 'system-1760476209249-32', -109.41240479752629, 31.17203814739707, -22.45757989210584, 'O', 9.7, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-524851', 'Core Boötes', 'system-1760476209249-33', -992.4570051065059, 432.5484075205685, 26.70705360089892, 'G', 0.73, 10.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-944166', 'Cygni', 'system-1760476209249-34', 719.022008948072, 745.5722645012207, 6.93302634360057, 'M', 0.19, 0.49)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-997027', 'Xephyr Prime', 'system-1760476209249-35', -13.370894273378516, -2.4861693968729845, -84.29942608276679, 'M', 0.3, 10.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-429567', 'Psi Lacerta Obscura', 'system-1760476209249-36', -1219.1355032946003, 38.97250964089399, 20.623094869425444, 'M', 0.12, 12.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-854110', 'Hercules', 'system-1760476209249-37', -583.3496437091404, -631.311422556508, -6.357331379096589, 'M', 0.26, 9.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-723414', 'Proxima Khaos Superba', 'system-1760476209249-38', -1263.2079403310804, 729.7820217563341, -4.479465765995368, 'M', 0.13, 4.93)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207120-5979', 'Khaos', 'system-1760476209249-39', -209.13627921794478, 1099.4730038743676, -22.354079271597644, 'A', 1.23, 4.55)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-418132', 'Volans Prime', 'system-1760476209249-40', 583.2145440360972, -782.8554386982934, -13.900174435859492, 'M', 0.2, 8.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-794911', 'Vulpecula Anterior', 'system-1760476209249-41', 639.8446914382575, -230.25926145268028, 32.074113970615784, 'O', 7.8, 0.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-468854', 'Pegasi Posterior', 'system-1760476209249-42', -105.49663398439256, 626.4384995897825, 4.522592294204241, 'K', 0.33, 12.46)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-690275', 'Nu Orionis', 'system-1760476209249-43', 58.26179018034676, 1385.517448977866, 3.2842908826997714, 'K', 0.33, 8.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-77804', 'Epsilon Ystera Anterior', 'system-1760476209249-44', -934.3925781619799, 151.70974916975973, -27.35655134486163, 'A', 1.15, 2.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-587044', 'Xephyr Superba', 'system-1760476209249-45', 130.90620656848182, 22.808413115602708, -42.56001066399809, 'M', 0.13, 9.12)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-696759', 'Phoenix', 'system-1760476209250-46', 641.1232954812633, 1070.6737439456047, -13.483371772503, 'A', 1.11, 3.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-469317', 'Lambda Tartarus', 'system-1760476209250-47', -593.7427340880247, 1157.9354202059437, 7.530266529346486, 'M', 0.23, 11.94)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-45310', 'Lumen Rhea', 'system-1760476209250-48', 733.7542198815845, -860.5087503937548, 13.253451916402962, 'G', 0.61, 4.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207140-515925', 'Helios', 'system-1760476209250-49', -645.9804191236926, -30.881493346739006, 43.01132747635169, 'K', 0.49, 1.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-671422', 'Proxima Aquarii Inferior', 'system-1760476209250-50', -601.8330825098541, 1249.6979104102654, -3.865335916146298, 'O', 9.1, 0.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-98782', 'Hydra', 'system-1760476209250-51', -894.2916165207567, -1180.6121503404784, -8.577735550742572, 'M', 0.3, 8.08)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-72787', 'Nadir Hydra', 'system-1760476209250-52', 817.5505568964954, -1137.018306445003, 0.5998192214259461, 'M', 0.25, 3.42)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-431498', 'Lyra', 'system-1760476209249-22', -1147.991129562897, 636.8336422586486, -6.815591912541159, 'O', 7.24, 0.07)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-159581', 'Mu Phoebe', 'system-1760476209250-54', 1101.561581601729, 939.3699619668796, -4.55629458990887, 'M', 0.24, 1.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-427086', 'Delta Vulpecula', 'system-1760476209250-55', -647.1404777989221, -698.5924018264594, -19.522248786228367, 'M', 0.26, 0.45)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-473404', 'Omega Ophiuchus', 'system-1760476209250-56', 1031.5109463782949, 137.42458344869033, 27.163464390118968, 'K', 0.59, 5.88)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-241578', 'Quantum Tartarus Australis', 'system-1760476209250-57', 524.1282621745139, 1080.477928602637, -10.618231257961966, 'M', 0.18, 9.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-949826', 'Mnemosyne', 'system-1760476209250-58', 11.994919758142498, 201.30649122770998, 33.118429085603594, 'K', 0.32, 8.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207167-447139', 'Xi Phoenix', 'system-1760476209250-59', -450.0190149323697, -1279.4211872672481, 0.2588754012163541, 'K', 0.47, 4.68)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-856339', 'Hercules Inferior', 'system-1760476209250-60', -71.30256016810947, -146.29485798808597, -71.44731691885495, 'M', 0.2, 2.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-284466', 'Sagittarius', 'system-1760476209250-61', -2.894148021865025, -73.97051865040822, 102.12733952764063, 'M', 0.27, 9.68)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-937738', 'Astraeus', 'system-1760476209250-62', 648.2107392276469, -159.4248573031882, 4.995054523240686, 'M', 0.18, 4.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-844369', 'Volans', 'system-1760476209250-63', -1288.5702037187295, 568.865047013682, -1.6858482882604502, 'M', 0.23, 13.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-120632', 'Chi Sagittarius', 'system-1760476209250-64', -1188.7157201528335, 293.89841363172775, -15.504302711987801, 'K', 0.37, 7.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-840709', 'Styx', 'system-1760476209250-65', 1011.2152407762611, -202.72723861124786, -18.331008125385964, 'M', 0.26, 12.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-782599', 'Mu Auriga', 'system-1760476209249-11', 32.22401442933898, 8.17246372557042, -42.48504686437332, 'K', 0.46, 9.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-37209', 'Epsilon Selene', 'system-1760476209250-67', -1078.1926930203988, -344.8465451800507, -13.787762081266113, 'F', 1.07, 6.18)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-453177', 'Gamma Orionis', 'system-1760476209250-68', 152.6007466658585, -1384.9520216401618, -5.308995180239822, 'M', 0.15, 3.82)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207187-425989', 'Sigma Vela Lupi', 'system-1760476209250-69', -321.39160441355415, 807.476201335263, -12.021137821883352, 'G', 0.78, 10.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-767398', 'Corvus', 'system-1760476209250-70', 59.98541205795958, 149.75564832859402, 57.61834363993877, 'M', 0.08, 10.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-220941', 'Boötes Draconis', 'system-1760476209250-71', 114.41574993858285, -674.9769392723352, 10.729331868363587, 'M', 0.27, 6.13)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-95411', 'Eos', 'system-1760476209250-72', -79.51044458298335, 719.0546245734264, -35.338305927918974, 'K', 0.45, 6.11)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-604675', 'Nyx', 'system-1760476209250-73', -1360.2347877511331, -54.05360641527357, 17.975712875380083, 'K', 0.49, 5.53)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-387729', 'Sigma Thalassa Superior', 'system-1760476209250-74', -672.269247926375, -64.64710938321721, -6.0218745305023695, 'M', 0.27, 12.68)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-700987', 'Hydra Superior', 'system-1760476209250-75', -350.263761165857, 1322.0653129271782, 2.684967426552717, 'M', 0.18, 1.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-13292', 'Core Vela', 'system-1760476209250-76', -1239.0229628058632, 796.6756051887385, -4.166740082952488, 'M', 0.25, 13.47)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-1271', 'Aether Erebus', 'system-1760476209250-77', -800.8256022620409, -821.7223954038385, 12.190543521975753, 'K', 0.48, 8.12)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-821772', 'Pulsar Lynx', 'system-1760476209250-78', 624.1796174124614, -1175.463968701118, -11.330139928673455, 'B', 4.42, 0.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207205-728456', 'Ursae Obscura', 'system-1760476209249-9', 37.43416346460313, 14.206075554048034, -2.3028649657601488, 'K', 0.47, 6.64)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-296952', 'Ultima Ystera Carinae', 'system-1760476209250-80', -751.7902361607328, -944.4258979992363, 6.598686684787758, 'K', 0.35, 5.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-666026', 'Aether Perseus', 'system-1760476209250-81', -35.48363646588646, 73.05283725112673, 12.507109742350398, 'K', 0.39, 3.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-660494', 'Chronos Proxima', 'system-1760476209250-82', 1034.9976673168253, 517.4733162395612, 8.509276714328, 'K', 0.43, 5.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-689330', 'Lupus', 'system-1760476209250-83', 698.3808413216144, -751.836462951896, 16.55758448398712, 'O', 8.28, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-180365', 'Leonis', 'system-1760476209250-84', 823.9367762120374, -397.36695719639454, -15.515952783106318, 'A', 1.36, 3.37)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-910040', 'Khaos', 'system-1760476209250-85', 745.8529452174524, -403.55232953197503, 23.578089398551946, 'A', 1.27, 0.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-516665', 'Ophiuchus', 'system-1760476209250-86', -612.7520464802856, 30.717362621193036, -11.890323113134652, 'K', 0.48, 0.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-976062', 'Fringe Hyperion', 'system-1760476209250-87', 8.020162156274568, 32.29842083562674, -17.072151306702104, 'K', 0.44, 4.43)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-397994', 'Volans Inferior', 'system-1760476209250-88', 77.43437256151076, 673.3777691399026, 10.788197529723416, 'K', 0.32, 0.13)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207222-730118', 'Xi Ourania', 'system-1760476209249-11', 57.137172999076626, -9.459226687084666, -51.16597839477419, 'M', 0.19, 7.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-751959', 'Carina Ultima', 'system-1760476209250-90', 1150.1149178934807, -602.8194710484976, -22.54878112254076, 'G', 0.75, 3.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-880774', 'Oranos', 'system-1760476209250-91', 11.645248700581543, 57.391622054284525, 30.2551323139253, 'K', 0.4, 3.36)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-321776', 'Fringe Hydra Inferior', 'system-1760476209250-92', -261.9605410312409, 1151.4431071798515, 12.111950561076405, 'K', 0.46, 4.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-167355', 'Umbra Cosmos', 'system-1760476209250-93', 248.3816213500416, 1035.8636899940068, 20.018977291508264, 'A', 1.31, 2.91)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-627610', 'Cosmic Boötes', 'system-1760476209250-94', 288.41788032777055, 1466.260790737068, -11.380351953953664, 'G', 0.73, 4.83)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-39750', 'Zephyrus', 'system-1760476209250-95', 996.3020015545715, 809.1506618209992, 8.925991266692028, 'M', 0.26, 5.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-323254', 'Alpha Crius', 'system-1760476209250-96', 883.0443653206161, 33.97363319444773, 11.391366496995136, 'M', 0.22, 9.65)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-940042', 'Themis', 'system-1760476209250-97', -562.6292592361389, -1310.806659942438, 10.698818944751126, 'K', 0.48, 5.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-546698', 'Pulsar Rhea Ursae', 'system-1760476209250-98', 1248.3069309439613, 783.3786758386857, -1.2246557275499512, 'M', 0.28, 5.51)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207238-894709', 'Pegasi', 'system-1760476209250-87', -10.774474767620676, 8.379341304524676, -6.867205716077462, 'A', 1.22, 6.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-55637', 'Vulpecula', 'system-1760476209250-100', 313.8992954662894, -956.9912388556143, 5.9777985075900055, 'K', 0.57, 12.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-831644', 'Hyperion Proxima', 'system-1760476209250-101', 253.8068161074387, 1100.3748613906068, -24.032965523027123, 'K', 0.4, 11.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-178151', 'Nadir Cosmos Obscura', 'system-1760476209250-102', -1198.278817457749, -99.007948477534, 10.482630428077403, 'M', 0.11, 0.07)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-297010', 'Mu Mnemosyne', 'system-1760476209250-103', -1475.1976609193553, 331.792030695617, 4.03864781619167, 'M', 0.15, 3.97)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-145411', 'Aquarii', 'system-1760476209250-104', 156.54069372295837, 716.5539898927532, 30.43710370330158, 'K', 0.48, 13.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-181105', 'Spiral Cygni', 'system-1760476209250-105', -371.0272260190475, -532.863033197511, -8.13872529094698, 'G', 0.71, 9.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-976553', 'Prometheus Pavonis', 'system-1760476209250-106', 1192.5560413814599, -106.68258515458724, 10.192622870536695, 'F', 0.91, 10)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-790120', 'Erebus Magna', 'system-1760476209250-107', -815.1122935050404, -1039.2288190465351, -5.621643355892342, 'M', 0.3, 1.85)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-281333', 'Aether Sagittarius', 'system-1760476209250-108', 1285.0009162998335, 554.4485880513138, -14.534708699043769, 'A', 1.34, 1.27)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207255-567680', 'Styx', 'system-1760476209250-109', -64.10122210537249, -1204.2910115320435, 25.678675226913, 'M', 0.2, 10.09)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-282306', 'Hyperion', 'system-1760476209250-110', -1097.605289978297, -970.3247454857286, 8.122287637655804, 'B', 2.78, 0.23)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-596419', 'Styx Gruis', 'system-1760476209250-111', 1100.075507682479, -715.2043684408676, -0.9620938868119993, 'G', 0.72, 4.45)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-847493', 'Eos Luminosa', 'system-1760476209250-112', -524.5835696140917, 1380.037126741921, -8.504649177583914, 'O', 5.79, 0.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-890541', 'Core Prometheus Pavonis', 'system-1760476209250-113', 339.070154444992, -1105.0479279113874, -4.848142057306591, 'K', 0.38, 2.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-289675', 'Helios Velorum', 'system-1760476209250-114', -121.83110252177619, 1226.4997612362329, 23.156426642377717, 'A', 1.15, 0.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-510060', 'Cygni', 'system-1760476209250-115', -34.32931647830243, 5.931447684144123, 12.023150935033467, 'M', 0.29, 9.37)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-987795', 'Cygni', 'system-1760476209250-116', 895.0619303663437, -151.63603036998836, -0.6629205579260677, 'G', 0.7, 0.42)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-159903', 'Aether Eos', 'system-1760476209250-117', -1147.3930066404528, 700.3485226137093, -2.7830186947863176, 'K', 0.42, 3.53)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-489651', 'Proxima Crux Leonis', 'system-1760476209250-118', 1149.7346699182006, -409.6503135308868, 2.067240552362314, 'K', 0.47, 7.23)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207273-695732', 'Corvus', 'system-1760476209250-119', 120.03412026870849, 694.0672335944204, -33.58596436255038, 'M', 0.16, 8.85)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-136118', 'Chi Vela Quasara', 'system-1760476209250-120', -997.2316434878396, 134.3915893011412, 31.325984058951974, 'K', 0.35, 11.78)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-714963', 'Lynx Gruis', 'system-1760476209250-121', 1114.5072995446587, -194.55485800980932, 21.73660045500732, 'G', 0.69, 10.7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-269642', 'Tau Pegasi Luminosa', 'system-1760476209250-93', 231.8979236382371, 1061.681301672166, -17.18494199280194, 'K', 0.44, 13.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-90705', 'Orionis Peripheria', 'system-1760476209250-123', 92.39442995963682, 11.164655535566254, -118.06426129095338, 'K', 0.49, 10.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-244451', 'Iota Volans', 'system-1760476209250-115', -50.59138112388168, -13.500389874282263, -8.034146482918425, 'K', 0.35, 0.93)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-944150', 'Ourania', 'system-1760476209249-25', 714.5271772018193, 537.7961344993793, -21.598970979667122, 'K', 0.47, 10.7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-290153', 'Pegasi', 'system-1760476209250-126', -512.7865001258082, 328.6765050441817, -27.892117677932344, 'K', 0.34, 13.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-551139', 'Ourania', 'system-1760476209251-127', -371.3928287239898, -1002.4143477376504, 4.133384853955462, 'M', 0.18, 0.34)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-208210', 'Radiant Vulpecula', 'system-1760476209251-128', -291.87788273415424, 856.0294229236648, 2.747980772086775, 'M', 0.24, 4.78)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207289-527215', 'Eridani Nova', 'system-1760476209251-129', -988.3624397061042, -298.55719568386144, -22.069332854093062, 'B', 5.11, 0.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-642901', 'Scorpii Obscura', 'system-1760476209251-130', 1188.8423244874718, -756.1817174091809, -17.455345015115114, 'M', 0.22, 2.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-430559', 'Epsilon Eos', 'system-1760476209251-131', -992.2752383346843, 318.7135628148632, -21.56667651210428, 'M', 0.16, 11.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-741600', 'Orionis Tauri', 'system-1760476209250-91', 24.8084320122827, 83.0233807748824, -1.1525458645499143, 'B', 3.86, 0.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-208731', 'Psi Perseus Serpentis', 'system-1760476209251-133', 988.4479233839841, -131.62632003590616, -38.235271758830635, 'A', 1.32, 4.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-15802', 'Hyper Khaos', 'system-1760476209251-134', 1288.0230483553685, 260.6965048443492, -8.4604772761162, 'K', 0.32, 5.25)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-335363', 'Upsilon Ophiuchus', 'system-1760476209249-9', 15.377772723544243, 6.138342658693318, -13.106022391793502, 'K', 0.38, 5.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-485092', 'Tartarus', 'system-1760476209251-136', 29.60023777248142, -833.3601675142052, 0.3822554596361538, 'K', 0.41, 0.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-772886', 'Phi Mnemosyne', 'system-1760476209251-137', -488.00911785452547, -1140.9683207835587, 7.709862394433568, 'M', 0.1, 9.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-691415', 'Eta Ophiuchus', 'system-1760476209251-138', 279.71512077228215, 842.7587691534131, 15.79395927439496, 'K', 0.38, 1.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207308-941308', 'Mu Aquarii', 'system-1760476209250-81', 2.729099042611981, 81.98363484881368, 16.890634975160182, 'K', 0.54, 9.08)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-605782', 'Sigma Cepheus', 'system-1760476209251-140', 1307.9463367475432, -69.13025598075919, 9.392255522922836, 'M', 0.13, 5.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-620980', 'Vertex Hercules Superior', 'system-1760476209251-141', -105.69240382442476, -876.0973626881386, 1.124874584688623, 'K', 0.46, 5.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-648574', 'Andromeda Quasara', 'system-1760476209249-9', 32.74312115572373, -18.85604658550324, 15.634153575729831, 'M', 0.13, 11.46)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-754276', 'Radiant Crius', 'system-1760476209251-143', -1299.6941081595671, -188.08179371025705, -2.092447327932188, 'K', 0.33, 1.61)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-356549', 'Xi Gemini', 'system-1760476209251-144', -1270.5841041062415, 208.1629426780067, 12.089446005200962, 'K', 0.43, 3.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-228260', 'Selene', 'system-1760476209251-145', 458.75355803392955, 796.1158193994033, 11.93226895158708, 'M', 0.23, 5.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-19821', 'Chronos', 'system-1760476209251-146', -1230.006536791644, -610.6030307690694, -5.030266937437846, 'K', 0.31, 2.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-99815', 'Styx', 'system-1760476209251-147', 40.67176414649595, -41.39289028960904, -48.94436989618718, 'M', 0.17, 0.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-1818', 'Delta Ursae Inferior', 'system-1760476209251-148', 377.45000729833487, 496.4898006722061, -9.361692832066623, 'M', 0.18, 1.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207326-49531', 'Lynx', 'system-1760476209251-149', -960.506080167393, 820.0087543439325, 7.805375310930538, 'M', 0.2, 3.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-65371', 'Perseus', 'system-1760476209251-150', -238.21742360747515, 614.2592819935954, 5.302128568661949, 'M', 0.09, 1.99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-837395', 'Cassiopeia', 'system-1760476209251-151', -179.58212970411532, -637.6577908574554, 6.677196120166052, 'F', 1.02, 3.12)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-115777', 'Quasar Gemini', 'system-1760476209251-152', -0.09468962184193908, 1417.8293604283442, 13.486351926272661, 'A', 1.26, 1.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-232632', 'Rhea Occidentalis', 'system-1760476209251-153', -1425.6928610909933, -386.6707682048422, 9.30351656744706, 'B', 3.15, 0.09)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-121262', 'Vortex Boötes Peripheria', 'system-1760476209251-154', -1283.3682365655966, -41.07946275631795, -9.535640030480646, 'G', 0.62, 5.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-568877', 'Spiral Helios Ultima', 'system-1760476209251-155', 908.022668684071, -918.2590040025788, -7.6213503920723085, 'M', 0.15, 11.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-62048', 'Prometheus', 'system-1760476209250-82', 1000.1412592536221, 532.0684860311139, -0.896457243365175, 'B', 2.23, 1.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-677100', 'Fringe Leonis', 'system-1760476209251-157', -850.7026956753073, 860.4347609848218, 18.38718217561646, 'A', 1.27, 0.82)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-514225', 'Carina Ursae', 'system-1760476209251-158', -415.45331664369854, -567.1639762911083, -16.286630778604113, 'B', 1.85, 0.18)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207344-259997', 'Helios', 'system-1760476209249-9', 78.99747629777484, 8.516328946682144, 13.465824531997999, 'M', 0.3, 6.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-95489', 'Ursae Proxima', 'system-1760476209251-160', 210.9593708785073, 640.1244636580591, -13.502498731734843, 'K', 0.43, 12.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-416370', 'Theta Crux', 'system-1760476209251-161', 222.62316702132415, 1310.1856767029697, 10.009543114517182, 'A', 1.26, 5.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-50107', 'Core Cygni', 'system-1760476209251-147', 48.450621804724776, -48.11504415391074, -11.116314100063413, 'M', 0.1, 4.49)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-526803', 'Aether Andromeda', 'system-1760476209250-87', 25.72534279030473, -13.349880763684357, -9.499260882508738, 'K', 0.46, 6.17)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-568660', 'Aquarii', 'system-1760476209251-164', 18.246872065238495, -9.240557362610868, 32.51646791625458, 'F', 0.88, 11.59)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-391940', 'Aquarii', 'system-1760476209251-165', -824.7616336867477, -499.7384900700191, -33.5029794615504, 'M', 0.2, 2.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-497702', 'Boötes', 'system-1760476209251-166', 1193.8128040882475, 530.4029531414907, 9.493871249242162, 'K', 0.45, 10.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-720176', 'Lupus', 'system-1760476209251-167', -67.58990251241065, 177.53083491707594, 57.7225938138679, 'G', 0.61, 0.08)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-239244', 'Mu Gemini', 'system-1760476209251-168', -386.4517953949108, 924.319993217987, -32.70128933688354, 'F', 0.89, 11.51)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207362-922167', 'Void Hercules Pavonis', 'system-1760476209251-169', 962.0082058505398, -185.1709807283475, -26.191935052546583, 'M', 0.23, 5.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-86789', 'Apex Andromeda', 'system-1760476209251-170', 274.7231552635608, -643.6111523164384, -19.890063202929824, 'A', 1.2, 3.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-268877', 'Lyra Occidentalis', 'system-1760476209251-171', 1225.0851130008427, -332.0021250244861, -12.315304447632439, 'M', 0.27, 5.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-89097', 'Cygni', 'system-1760476209251-172', 1179.7714853569935, 302.3914150906612, 13.158213149381247, 'M', 0.21, 9.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-854390', 'Epsilon Phoebe', 'system-1760476209251-173', -815.2030771576896, 1230.116758130931, -2.1509599482728277, 'B', 1.88, 0.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-823691', 'Pegasi', 'system-1760476209251-174', 995.800500450145, 1024.2128139496065, -2.2583895915936774, 'A', 1.38, 1.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-660407', 'Zenith Andromeda Superba', 'system-1760476209251-175', 778.3474417937447, 36.29584222062234, -4.959777576427552, 'A', 1.14, 1.46)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-258353', 'Nebula Auriga', 'system-1760476209251-176', 1321.322500480331, -399.68096919175434, 13.214726369473013, 'K', 0.41, 1.98)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-862050', 'Gemini Superba', 'system-1760476209251-177', 441.1724965101016, -1344.7962894402458, 2.1590298047693866, 'M', 0.29, 9.13)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-953807', 'Themis', 'system-1760476209251-178', 850.8651924659637, -53.36490147986934, -30.90100734746148, 'M', 0.09, 11.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207380-315006', 'Pi Orionis', 'system-1760476209250-87', 23.88810657278776, 2.6006681086662726, 16.113584296592524, 'K', 0.41, 3.68)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-4222', 'Styx Gruis', 'system-1760476209251-180', -217.57569455141763, 991.5444704558442, 33.793644786536305, 'K', 0.31, 10.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-644617', 'Perseus', 'system-1760476209251-164', 65.94027555639273, -16.091250094559044, 25.12173801361774, 'B', 1.72, 0.52)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-260963', 'Nadir Phoenix', 'system-1760476209251-182', 1145.2649345627399, -892.5701562832552, -7.461409161258316, 'M', 0.23, 11.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-231005', 'Flux Eridani', 'system-1760476209251-183', 1269.023108527876, 186.48953638201488, 22.79315340611941, 'M', 0.13, 6.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-211970', 'Frontier Lupus', 'system-1760476209251-184', 504.6170530438877, -1181.2215064372162, 3.2541145685449786, 'K', 0.47, 3.93)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-942552', 'Oranos', 'system-1760476209251-149', -952.3915325963457, 842.8634481429109, 2.8120964635566406, 'K', 0.49, 8.89)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-764591', 'Pegasi', 'system-1760476209249-26', 3.674593912392531, 49.323979416031705, 138.98901659146748, 'M', 0.24, 6.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-776441', 'Eridani', 'system-1760476209251-187', 1180.939635718557, 89.55910445362225, -16.551589529099708, 'A', 1.16, 4.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-43745', 'Pictor', 'system-1760476209251-188', 561.5271856014037, -690.2475452895092, 2.423395318233048, 'A', 1.41, 1.37)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207397-343145', 'Xephyr', 'system-1760476209251-189', 1152.6561121978268, -676.1565570507112, 3.9679565008774915, 'M', 0.2, 11.93)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-870047', 'Astro Andromeda', 'system-1760476209251-190', 331.5079375134513, 803.5839309512603, -27.36645325102995, 'M', 0.3, 10.07)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-75372', 'Zephyrus', 'system-1760476209251-191', 389.0946072936281, 603.7082358610082, 30.157774746506725, 'M', 0.14, 10.86)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-830218', 'Galactic Khaos', 'system-1760476209251-192', 557.3247336827294, -1282.6572016055495, 6.034694120903165, 'M', 0.18, 6.53)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-447760', 'Aquarii', 'system-1760476209251-193', -1020.5462033686257, -43.0200411907505, -14.901083629841349, 'B', 4.03, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-236473', 'Delta Auriga Anterior', 'system-1760476209251-194', -730.2470468055056, -861.8916407298886, -11.299305724324109, 'K', 0.46, 3.43)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-150949', 'Helios', 'system-1760476209251-195', -610.6911688878131, 937.4606941178378, 6.2414335216586885, 'G', 0.67, 12.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-890273', 'Lynx Superba', 'system-1760476209251-196', -953.0096436273891, 662.7791017888055, 1.1686072218446117, 'K', 0.48, 7.5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-599918', 'Auriga Magna', 'system-1760476209251-150', -217.58244197762033, 631.9198931015324, -5.790207803118243, 'A', 1.46, 3.7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-243660', 'Hyper Tartarus Telescopii', 'system-1760476209251-198', -797.780913014252, 918.6709346516875, -17.766246163961902, 'K', 0.35, 11.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207416-398864', 'Thalassa', 'system-1760476209251-199', -913.1671908639823, 1064.8753332301374, 10.507877802463078, 'B', 1.73, 0.74)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-562461', 'Pi Thalassa', 'system-1760476209251-200', 552.5051332605901, -880.0215576259694, 18.58753056372578, 'M', 0.26, 9.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-613310', 'Upsilon Tartarus', 'system-1760476209251-201', 85.43091315736854, -97.58310386948219, -66.47220929746842, 'M', 0.26, 12.5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-628520', 'Frontier Oranos Major', 'system-1760476209251-202', 965.6193874814782, -337.40397777852013, 9.46168333945112, 'M', 0.14, 11.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-610030', 'Nadir Aether', 'system-1760476209251-203', 28.590937003070984, 39.85860879951667, -87.81521508635007, 'K', 0.36, 4.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-466906', 'Hercules', 'system-1760476209251-204', -687.2898727034759, -996.3913378394868, -5.49188531277726, 'K', 0.44, 11.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-126414', 'Gemini Ultima', 'system-1760476209251-205', -797.3304687485879, -1139.2945575705223, -18.518905536838002, 'B', 2.65, 0.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-380835', 'Eridani Aquilae', 'system-1760476209251-206', 921.7010825548685, -299.73411095336473, -24.211654391547604, 'M', 0.27, 8.89)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-477679', 'Perseus Ursae', 'system-1760476209251-207', -1462.7414393144188, -34.77098803600677, 11.222277754519046, 'M', 0.2, 6.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-300814', 'Quasar Theia Hydrae', 'system-1760476209251-208', 685.5830306482197, -15.474910534592745, 7.750288530511279, 'B', 2.74, 0.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207434-309889', 'Mnemosyne', 'system-1760476209250-115', -21.224241910187686, -4.619010828505319, 3.9297207475720093, 'K', 0.47, 1.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-809898', 'Hyper Lynx Magna', 'system-1760476209251-210', -616.0545173997493, -263.07185354496283, 7.299229123158206, 'B', 2.5, 0.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-416102', 'Hyperion', 'system-1760476209251-199', -924.8389319834477, 1092.6676577998485, -10.713908928658274, 'M', 0.22, 4.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-416345', 'Helios Aquilae', 'system-1760476209251-212', 876.72135353452, -678.1127925966397, 16.574653967342197, 'M', 0.14, 8.32)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-171797', 'Lambda Nyx Gruis', 'system-1760476209251-213', 367.26849072247524, 682.378275598847, 33.953672610591155, 'F', 0.93, 7.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-429214', 'Volans', 'system-1760476209251-214', -1119.1708473652395, -91.06827722492136, 3.553309491846292, 'K', 0.35, 13.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-702287', 'Vortex Cassiopeia', 'system-1760476209251-215', -1198.612993207116, -745.1065068198242, 9.028030500359623, 'K', 0.4, 5.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-615775', 'Carina', 'system-1760476209251-216', -511.33928973902124, -1206.370744824859, -5.029505054539298, 'K', 0.57, 8.48)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-872460', 'Vortex Tartarus', 'system-1760476209251-217', 745.2529978117586, 224.40347659974083, -6.901067635304349, 'K', 0.38, 10.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-659880', 'Lynx', 'system-1760476209251-218', 88.67308985703646, -5.857628650716931, 19.248966273293917, 'K', 0.32, 13.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207472-739601', 'Sagittarius Ultima', 'system-1760476209249-35', -57.20572888982299, -14.114235701780787, -78.49322537991151, 'M', 0.3, 0.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-938608', 'Volans', 'system-1760476209249-26', 7.268117791678796, -27.980348621786348, 127.52789194310557, 'K', 0.44, 1.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-516133', 'Rho Volans', 'system-1760476209251-221', -162.57052232501786, -163.81679157662737, 39.887009780696445, 'K', 0.47, 1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-592580', 'Perseus', 'system-1760476209250-87', -0.2985911125299241, 33.68058382276266, -0.5897488009064311, 'K', 0.48, 4.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-888153', 'Ourania', 'system-1760476209251-223', 906.2673087842738, 227.2658987197331, 6.205198107615544, 'K', 0.5, 13.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-914548', 'Cassiopeia Gruis', 'system-1760476209251-224', -755.8583607190518, 777.9797481863715, 4.734737018787957, 'M', 0.25, 3.32)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-455478', 'Centauri Aquilae', 'system-1760476209251-161', 194.83646550429057, 1323.7136533232936, 8.2858580922769, 'M', 0.2, 11.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-826445', 'Lupus', 'system-1760476209251-226', -399.54218566658847, -759.7117237198813, 43.89580247322809, 'O', 8.87, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-321769', 'Eta Thalassa', 'system-1760476209249-11', 80.57646409301242, 57.49128012623694, -7.444177101339058, 'M', 0.25, 8.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-515192', 'Ursae', 'system-1760476209251-192', 551.4783390710257, -1245.966613516205, 4.663948065641477, 'K', 0.36, 4.55)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207510-884774', 'Scorpii', 'system-1760476209251-229', 800.6362241533059, 356.93172003766034, -6.307589512393889, 'K', 0.42, 9.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-774251', 'Cygni', 'system-1760476209251-230', 460.74458930332315, 854.4393062009677, 6.038170161738449, 'G', 0.67, 13.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-283485', 'Delta Themis Prime', 'system-1760476209251-231', -483.11245977319203, 1055.3669133626734, -25.073642810041754, 'K', 0.5, 4.7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-616990', 'Nyx', 'system-1760476209251-232', 933.9322761879394, 853.1981964105192, -17.458870779109663, 'K', 0.55, 8.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-326174', 'Galactic Themis', 'system-1760476209251-233', 21.73358327610504, -116.01583790739674, -18.01655546339804, 'B', 1.7, 2.33)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-581438', 'Andromeda', 'system-1760476209251-234', -1255.7277726328568, -125.7617210339502, 7.08531410119074, 'K', 0.39, 10.48)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-867790', 'Gamma Lupus', 'system-1760476209251-235', 538.0679664530421, -985.816280457963, 18.37741767764148, 'O', 35.51, 0.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-930657', 'Erebus', 'system-1760476209250-78', 641.730085597468, -1186.9198431791385, 14.915030722498434, 'M', 0.1, 6.2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-620103', 'Lupus', 'system-1760476209250-81', -1.3454137400459985, 40.33742166923232, 28.360743570933515, 'M', 0.11, 12.82)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-544703', 'Theia', 'system-1760476209252-238', -780.8996916795048, -497.2073165792884, 19.5537454847843, 'M', 0.12, 11.27)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207547-589668', 'Hydra Serpentis', 'system-1760476209252-239', 30.522807178460642, 719.0433175956471, -37.75604805691191, 'M', 0.14, 9.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-761649', 'Tartarus', 'system-1760476209252-240', -166.5782065828739, 1270.524479286401, 8.848088650187444, 'F', 0.87, 11.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-595661', 'Aether', 'system-1760476209252-241', -687.6022063448684, 59.993892726701084, -38.32520105697359, 'K', 0.31, 4.11)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-297353', 'Taurus', 'system-1760476209252-242', 1252.6435964233258, -451.79063000007955, 11.3780986687921, 'K', 0.41, 7.68)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-45756', 'Nadir Xephyr Pulsara', 'system-1760476209252-243', -898.978428763488, 100.77719867104364, 22.020308319790196, 'K', 0.4, 1.83)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-811450', 'Hercules', 'system-1760476209249-15', 251.56186191823463, -1210.6016786431367, -15.793810497823088, 'K', 0.53, 4.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-202609', 'Ursae', 'system-1760476209252-245', -6.6094596593330195, 919.520046983093, 6.07306703182017, 'O', 9.71, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-311003', 'Void Leonis', 'system-1760476209252-246', 144.36083163086357, 940.3039350301559, -18.462648370678142, 'M', 0.29, 9.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-197716', 'Draconis', 'system-1760476209252-247', 1384.5983252953183, 112.13879585291929, 6.384700668100447, 'K', 0.38, 7.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-923534', 'Draconis Australis', 'system-1760476209251-149', -946.9886584049252, 811.7285752783956, -2.8474345515199495, 'K', 0.4, 11.99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207584-621677', 'Prometheus', 'system-1760476209252-249', -177.92751373631847, 74.46581761121436, -3.652646075852746, 'K', 0.47, 2.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-668178', 'Hyperion Phoenicis', 'system-1760476209252-250', -376.73247820233104, -1273.1558368426643, 9.822081904793306, 'F', 0.91, 10.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-971293', 'Rho Crux', 'system-1760476209252-251', 601.1649447748333, -745.6202230757872, 32.828228818873534, 'A', 1.27, 2.31)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-500800', 'Corvus', 'system-1760476209252-252', -763.2165162658433, 1230.8414236924555, -5.611346929293309, 'F', 1.06, 5.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-557135', 'Tartarus', 'system-1760476209252-253', -119.6243436995138, -629.1244109105387, -13.515691994203637, 'F', 1.02, 0.56)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-595141', 'Ystera', 'system-1760476209252-254', -238.69560582553055, 1271.4536887485292, 0.5155417291987039, 'M', 0.13, 12.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-278747', 'Lumen Pegasi', 'system-1760476209252-255', 1341.0800379214315, 274.69030091895445, 5.383983928265282, 'A', 1.23, 2.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-538872', 'Rho Cassiopeia', 'system-1760476209252-256', -1388.2027657109118, 162.18389236962932, 5.109386283441663, 'A', 1.37, 3.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-305727', 'Astraeus Aquilae', 'system-1760476209252-257', 932.7178529610676, -709.2858323382557, 24.976033643692595, 'M', 0.23, 3.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-338567', 'Helix Cosmos', 'system-1760476209250-91', 20.939478087028007, 16.376646905848254, 34.71402156323377, 'M', 0.21, 2.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207623-8190', 'Galactic Prometheus', 'system-1760476209252-259', 718.8728909569527, 863.5174217365225, -6.934366745450998, 'A', 1.17, 5.32)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-530766', 'Vertex Oranos Minor', 'system-1760476209252-260', -1237.2905271023485, 84.32008189457514, 9.73344674812293, 'F', 1.02, 0.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-773973', 'Hyperion', 'system-1760476209252-261', -222.30625385933388, -767.1454921457868, -18.026742719757294, 'A', 1.43, 1.34)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-982465', 'Carina', 'system-1760476209252-262', 1196.7828376564178, -286.16191502129357, 8.59600453992572, 'O', 6.08, 0.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-79217', 'Theia', 'system-1760476209250-92', -268.9574284062827, 1170.6248594339397, 3.7230685024858126, 'K', 0.42, 0.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-360894', 'Eos', 'system-1760476209252-264', -424.1317035411143, -1228.316083707678, 8.7673850161604, 'O', 6.4, 0.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-437255', 'Perseus', 'system-1760476209252-265', 117.84261359407192, -1067.0028347022414, 10.919221227161255, 'M', 0.2, 8.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-793554', 'Gemini', 'system-1760476209252-266', 751.9008054282355, -750.5867100731392, 8.100300688226728, 'M', 0.12, 5.13)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-77465', 'Phoenix Gruis', 'system-1760476209252-267', -997.3081181876878, -614.7387918006139, -25.311535941940278, 'M', 0.2, 0.97)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-121548', 'Mnemosyne Aquilae', 'system-1760476209252-268', 732.2768504301629, -340.3650589866912, -10.93952144897791, 'K', 0.34, 3.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207666-293428', 'Mu Thalassa Occidentalis', 'system-1760476209252-243', -892.2181466701413, 109.09601770294563, 11.372195202612755, 'G', 0.63, 9.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-627299', 'Cepheus', 'system-1760476209252-270', -499.19209930423426, 467.9536269573382, -19.855574379768203, 'M', 0.3, 7.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-824228', 'Proxima Leonis', 'system-1760476209251-207', -1484.6309320775015, -56.473507071017465, -4.586370727051447, 'A', 1.44, 3.17)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-513721', 'Nadir Ophiuchus', 'system-1760476209252-272', -630.2139989844566, -648.8488583257553, -8.891787059687708, 'O', 5.9, 0.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-287939', 'Nebula Orionis', 'system-1760476209252-273', -1142.9959214531711, -576.6410404787458, -9.079029607593082, 'M', 0.11, 11.47)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-166523', 'Core Cosmos', 'system-1760476209252-274', -529.8771158999306, -1055.6307708502954, -18.13359326606603, 'M', 0.19, 4.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-431795', 'Cepheus Quasara', 'system-1760476209249-26', 9.415754324945365, 33.21780843163476, 106.52131218368848, 'M', 0.25, 3.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-696945', 'Auriga Gruis', 'system-1760476209251-187', 1152.8683184400502, 100.61113006365221, 0.7748542304867048, 'A', 1.36, 3.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-730016', 'Boötes Quasara', 'system-1760476209252-277', -1415.59338433733, -334.10742689968646, 7.413196066793809, 'M', 0.3, 9.35)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-295', 'Orionis', 'system-1760476209252-278', 100.28808076614808, 84.72654427885998, -69.10319555553905, 'M', 0.14, 8.5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207686-351511', 'Helios', 'system-1760476209252-279', 875.1967720345547, 815.7368620425821, -0.04600999450146581, 'K', 0.49, 5.4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-449387', 'Ophiuchus', 'system-1760476209252-280', -871.0127456090383, -1238.4925554835468, 4.715339506484625, 'F', 0.86, 12.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-906651', 'Xephyr', 'system-1760476209252-281', 87.84353982168629, 1271.272046261692, 13.52312051091836, 'K', 0.49, 8.77)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-570614', 'Xephyr', 'system-1760476209249-11', 52.213093736011615, 26.904811025394416, -29.179126883261347, 'K', 0.31, 11.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-409543', 'Theta Xephyr', 'system-1760476209252-283', 421.35394821942964, 1368.1288681096037, 11.935555263126496, 'M', 0.29, 1.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-141463', 'Hydra', 'system-1760476209252-284', 257.96436293804186, -890.1293154777704, -5.231235722848226, 'M', 0.26, 1.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-698959', 'Phi Helios', 'system-1760476209250-92', -288.66749407015453, 1139.3182067053694, -11.454389667622841, 'M', 0.15, 4.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-131859', 'Ourania', 'system-1760476209252-286', 628.1191261559624, -563.0349598798867, -3.857701236115812, 'M', 0.08, 9.78)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-955076', 'Styx', 'system-1760476209252-287', 1346.3065105914231, 422.6639741485153, 4.030199380487999, 'M', 0.27, 6.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-391639', 'Aether Phoenicis', 'system-1760476209252-288', -650.2371414317972, -123.157583742187, 23.01940708657869, 'M', 0.21, 12.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207712-262168', 'Cepheus', 'system-1760476209250-46', 631.2958847540565, 1054.7640150589784, 1.62338841126744, 'M', 0.14, 3.93)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-770924', 'Cassiopeia', 'system-1760476209252-290', 118.42119260919095, 53.20245582305508, 23.123299998453295, 'K', 0.37, 6.62)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-697194', 'Vela Prime', 'system-1760476209252-291', -85.78230087285426, -39.0308016777853, 30.530758140857365, 'F', 1.01, 5.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-226042', 'Lynx Anterior', 'system-1760476209251-160', 242.5790062606874, 608.9161988344192, -5.96499237612662, 'M', 0.17, 7.47)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-595645', 'Astraeus', 'system-1760476209252-293', -1164.1685232188981, -861.9566329608799, 2.9546021227214467, 'K', 0.4, 4.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-576556', 'Epsilon Hyperion Proxima', 'system-1760476209252-294', -139.25426940425362, 37.05300159360222, -81.10646311489053, 'A', 1.2, 6.11)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-566883', 'Centauri Carinae', 'system-1760476209252-295', -1062.5729896989028, 176.5236041978809, 15.075973210615828, 'K', 0.32, 9.36)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-548939', 'Chronos', 'system-1760476209252-296', 607.3010785973053, 377.5187780739492, 22.745297668521697, 'G', 0.77, 6.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-445487', 'Rhea', 'system-1760476209252-297', 325.3665634779792, 873.3733777033964, 18.063996711038335, 'O', 6.25, 0.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-663403', 'Aether Hydrae', 'system-1760476209252-298', -576.4072433859761, 324.8790251816105, 30.798893181587445, 'M', 0.15, 6.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207734-907811', 'Gamma Lyra Carinae', 'system-1760476209252-299', -1347.2501342048201, 120.14804884042664, -9.143460910406898, 'M', 0.1, 5.54)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-656302', 'Andromeda', 'system-1760476209252-300', 902.2984607250878, 92.03082436074814, 21.35068413724779, 'M', 0.24, 2.56)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-779083', 'Aquarii', 'system-1760476209252-301', 205.95117500996344, -949.8324666453454, 22.775055548490034, 'M', 0.18, 13.38)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-511996', 'Zeta Themis', 'system-1760476209251-232', 958.8349828936682, 842.6120240897519, 4.952572618703234, 'K', 0.46, 4.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-860426', 'Zephyrus', 'system-1760476209251-176', 1323.4411313856328, -415.5522751194759, -0.5932014278275055, 'M', 0.28, 6.77)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-589234', 'Vertex Vulpecula Carinae', 'system-1760476209250-54', 1084.8363340522956, 942.7706869402359, -15.48423977563258, 'K', 0.49, 1.85)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-389482', 'Radiant Gemini', 'system-1760476209252-305', 446.3901553322934, -1032.283291259957, 25.1239042024731, 'K', 0.37, 4.2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-253002', 'Alpha Aether Hydrae', 'system-1760476209251-147', 52.533074471526035, -20.183543510187675, -35.399351555248046, 'K', 0.45, 10.07)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-866272', 'Pictor Gruis', 'system-1760476209249-25', 727.2291574861096, 501.0616293895488, 16.809892570641782, 'K', 0.42, 2.88)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-971003', 'Lyra', 'system-1760476209252-308', -814.3466675271408, 252.69253751518463, -34.74442528519661, 'K', 0.56, 5.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207753-86986', 'Corvus', 'system-1760476209252-309', 834.0406284738978, -605.9322439864226, -8.360609228536147, 'A', 1.2, 5.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-873072', 'Phoenix Telescopii', 'system-1760476209249-20', 174.23973737614313, 696.6752397333265, 7.119458409832449, 'K', 0.48, 5.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-255113', 'Ophiuchus', 'system-1760476209252-311', -49.98693989546355, -19.478804199011222, -29.0595347082568, 'M', 0.3, 6.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-251571', 'Upsilon Vela Maxima', 'system-1760476209252-312', -248.39000609165168, -1103.4405412345723, -6.344259250564363, 'K', 0.44, 4.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-697623', 'Cygni Major', 'system-1760476209252-313', 3.077563497291198, 1049.4811102778538, 6.728331283941586, 'M', 0.15, 12.44)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-481999', 'Helios Leonis', 'system-1760476209252-314', -47.03023913072347, 654.0660419717452, 20.2761243189709, 'K', 0.39, 10.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-972972', 'Rhea', 'system-1760476209252-315', 17.449361934107916, 29.330396121669715, -29.62989508312991, 'M', 0.3, 1.51)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-271810', 'Dusk Thalassa', 'system-1760476209252-315', 10.194191596368684, 18.96756513956532, -21.555248159883305, 'K', 0.34, 0.34)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-807559', 'Ultima Aether Minima', 'system-1760476209252-317', 595.5249591717519, 812.854201777204, 22.506543457406977, 'K', 0.35, 12.4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-462940', 'Theia', 'system-1760476209252-318', 831.8675563884901, -1222.7055092218686, -0.4659668164279479, 'K', 0.48, 6.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207770-689529', 'Astro Crux', 'system-1760476209252-319', 109.63528926361393, -128.80312235647241, -34.67319320668883, 'M', 0.19, 3.94)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-670914', 'Omicron Boötes', 'system-1760476209251-232', 937.3471811501743, 879.5044235618954, -6.813449598649173, 'A', 1.29, 2.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-643053', 'Phoenix', 'system-1760476209251-192', 546.8300621608496, -1269.2458493448262, -1.964377768292176, 'A', 1.24, 1.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-74074', 'Ursae', 'system-1760476209252-322', -586.507471391312, -853.8357638128847, 15.655389660617143, 'M', 0.17, 0.62)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-825268', 'Zeta Eridani', 'system-1760476209252-323', 1102.594441113511, 292.6393412573353, 25.230783373204503, 'K', 0.38, 10.77)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-52418', 'Nu Scorpii', 'system-1760476209251-233', -16.998107049333385, -142.3457192749104, -16.607383322179345, 'K', 0.38, 9.56)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-480106', 'Spiral Theia', 'system-1760476209252-325', 967.8459857258678, 686.9385517647755, 20.48840441815415, 'G', 0.68, 4.55)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-174399', 'Ystera', 'system-1760476209252-284', 291.440018963001, -897.2806132073731, 20.40388123978907, 'M', 0.2, 10.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-930017', 'Themis', 'system-1760476209250-115', -15.934373312641009, 7.31705401196579, 37.10426557464724, 'M', 0.21, 2.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-283263', 'Centauri', 'system-1760476209252-328', 662.7669592192843, -1313.444456197479, 1.7004544893183184, 'M', 0.23, 0.33)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207787-833407', 'Ultima Helios Anterior', 'system-1760476209250-92', -227.60189560112144, 1158.2573275384905, 12.06555085478177, 'M', 0.16, 2.49)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-620237', 'Leonis', 'system-1760476209252-330', 806.0461772674021, -264.4888878081499, 13.605037824931326, 'M', 0.13, 3.99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-280753', 'Lumen Rhea', 'system-1760476209251-147', -5.49409898187454, -41.076426176963615, -44.60920332526392, 'M', 0.09, 3.62)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-527595', 'Phoenix', 'system-1760476209252-332', 1196.6087594453518, 154.64886104878806, -6.693073133021892, 'M', 0.09, 8.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-694218', 'Khaos Centralis', 'system-1760476209251-218', 81.39465659434363, -22.673318460670878, -12.19874352589551, 'K', 0.33, 4.82)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-42007', 'Upsilon Taurus', 'system-1760476209252-334', -1039.5972534606835, 443.0027099597318, -4.98420528189995, 'K', 0.35, 7.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-683741', 'Hydra Tauri', 'system-1760476209252-335', -723.0821168264315, -324.2517963776064, 9.88510343141284, 'M', 0.3, 1.14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-499938', 'Ourania', 'system-1760476209252-336', -121.60065146857866, -75.24248020283, -128.35904208916656, 'M', 0.28, 6.45)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-529521', 'Helios', 'system-1760476209252-337', 417.5180668582934, -1083.4353489134267, 0.22245698158359595, 'M', 0.11, 4.09)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-47370', 'Nyx', 'system-1760476209252-338', -458.41321773930883, -680.9768359406418, 1.4627743974351848, 'A', 1.18, 6.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207804-436790', 'Hyperion', 'system-1760476209252-339', -158.07176353799917, -762.933369757929, 6.95829114487179, 'M', 0.18, 9.44)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-391684', 'Rhea', 'system-1760476209252-340', 964.0740456245393, 349.3654777765692, -36.05447126543386, 'M', 0.24, 9.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-621666', 'Pegasi', 'system-1760476209252-341', 26.744856006306073, -755.5788537245787, -27.071868851413534, 'M', 0.27, 1.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-764464', 'Styx', 'system-1760476209252-342', -58.862022088567144, -1388.0487420019967, 0.42271559909313083, 'K', 0.42, 4.16)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-121453', 'Cosmos', 'system-1760476209252-343', 933.4820011256202, 970.2062880456783, 0.008325045761997885, 'A', 1.58, 2.96)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-578042', 'Volans', 'system-1760476209249-35', 6.478195487203722, -4.090297123749014, -92.66400111384114, 'M', 0.14, 13.09)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-570235', 'Galactic Phoebe', 'system-1760476209252-345', -797.8923402911948, 833.8354471104273, 7.605734656582538, 'M', 0.26, 8.66)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-799468', 'Cepheus Coronae', 'system-1760476209251-207', -1475.954903198827, -17.048031828023866, 2.030374628435642, 'M', 0.16, 1.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-391944', 'Theia Superba', 'system-1760476209252-347', 637.233979898597, 1245.7716057636553, -4.7132788768779506, 'K', 0.46, 7.74)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-259990', 'Khaos Prime', 'system-1760476209252-348', -90.88584975588155, -172.61217378574707, 26.127280563178143, 'K', 0.51, 11.96)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207829-960495', 'Dawn Thalassa', 'system-1760476209252-349', -122.04202431117893, 768.1500576687707, -28.072872313572365, 'M', 0.24, 7.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-878223', 'Nu Mnemosyne', 'system-1760476209252-350', 1208.4479447075405, 621.5091704849466, -9.232027638855032, 'F', 1.03, 3.53)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-494107', 'Eridani', 'system-1760476209252-351', 172.77188141345204, -1477.5611201081774, 8.194543635106239, 'K', 0.44, 1.33)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-257055', 'Khaos', 'system-1760476209252-352', -1126.2646521937604, -252.11372438612594, 6.537398772631862, 'M', 0.26, 6.61)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-606753', 'Hydra', 'system-1760476209252-353', 1332.5911461752028, -628.0872159251796, -0.5993629906369548, 'M', 0.27, 9.37)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-815916', 'Ystera', 'system-1760476209252-354', 683.2074943185766, -709.1018054985375, -20.070317444522036, 'O', 7.52, 0.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-598093', 'Sagittarius', 'system-1760476209252-355', 1005.6593502610573, 873.0228786699876, -1.9511047203793304, 'O', 9.47, 0.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-76435', 'Carina', 'system-1760476209252-356', -1352.1407586165642, -364.7357666321918, -9.967044569719985, 'M', 0.23, 7.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-704938', 'Draconis', 'system-1760476209251-147', 34.7068822959432, -19.801644565168736, -9.750925314869718, 'K', 0.5, 9.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-793882', 'Perseus', 'system-1760476209252-358', 704.0783143288937, 931.1593865517626, 14.036447987132256, 'M', 0.13, 3.48)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207847-298690', 'Crius', 'system-1760476209250-84', 861.0015602074648, -396.28860634035277, -27.287613635480838, 'M', 0.24, 3.09)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-971629', 'Crius', 'system-1760476209252-315', 6.932281433560195, -0.24498590994384895, -16.64371957691067, 'M', 0.25, 1.73)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-892694', 'Volans', 'system-1760476209250-115', -36.47339928153499, 27.494092137944556, -15.463131877326532, 'M', 0.24, 0.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-889127', 'Perseus', 'system-1760476209252-362', 1029.2924540253484, -705.0080979936574, 9.734089031701574, 'F', 0.85, 3.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-670944', 'Erebus', 'system-1760476209252-363', 80.63198595885392, -619.9595162044735, -11.480927059006802, 'M', 0.23, 13.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-118232', 'Thalassa', 'system-1760476209251-166', 1170.8069108887385, 537.0734729273815, 1.0265689040247157, 'M', 0.29, 4.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-642753', 'Mu Crius', 'system-1760476209252-365', 194.50824415864992, -8.122108530896952, 67.57044989774138, 'M', 0.16, 0.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-460426', 'Lacerta', 'system-1760476209252-366', -1147.3693334390555, -141.822159176667, 0.6673972101834824, 'M', 0.27, 6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-663845', 'Nova Vulpecula', 'system-1760476209249-24', -890.2521851002914, -1052.2305226048486, -8.912191876629016, 'O', 40.33, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-760031', 'Cepheus', 'system-1760476209252-368', 1216.6532085229805, 342.0172328862202, -14.950889563267399, 'M', 0.08, 12.61)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207865-554816', 'Ourania', 'system-1760476209252-369', -526.1808929861007, 728.1374283569762, 0.036933609847681126, 'F', 0.86, 2.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-746293', 'Themis', 'system-1760476209252-370', -820.7466558358145, -298.21394275266425, -4.790864387667327, 'K', 0.4, 13.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-844383', 'Pi Styx Occidentalis', 'system-1760476209252-371', 112.29975733819694, -75.68947305866152, -18.114871175486645, 'M', 0.16, 6.44)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-894391', 'Gemini Telescopii', 'system-1760476209250-96', 847.6342757898083, 17.463852953035257, -12.358709146359825, 'K', 0.47, 0.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-935592', 'Nyx', 'system-1760476209252-373', -585.799152880679, -951.4906427566951, -12.03661194324911, 'M', 0.2, 3.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-592081', 'Mnemosyne Leonis', 'system-1760476209252-373', -590.3108137368118, -926.5280869846425, 1.148223851137848, 'K', 0.31, 12.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-566344', 'Crius', 'system-1760476209249-35', -13.178404281339954, -30.902665225934143, -61.969976193368424, 'A', 1.48, 0.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-113307', 'Vela Gruis', 'system-1760476209252-376', -736.5721147675509, 347.22217858403195, -15.64500630165633, 'M', 0.3, 0.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-965279', 'Dawn Pictor', 'system-1760476209252-315', -10.357099219632062, 27.36468885190339, -42.19253701036436, 'K', 0.38, 10.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-36903', 'Lynx', 'system-1760476209252-378', -935.8620697728502, -763.2413964584696, 9.376730987260192, 'M', 0.27, 1.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207901-624323', 'Kappa Nyx Aquilae', 'system-1760476209251-196', -943.5448955216714, 709.1541413768962, 10.860021337413858, 'K', 0.35, 0.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-23236', 'Cygni', 'system-1760476209252-380', 1127.243290587611, -46.16576351761942, 24.148666809170326, 'O', 42.52, 0.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-152878', 'Zeta Lynx', 'system-1760476209252-381', -755.0225723674, 51.21586855312883, 21.198467472028042, 'A', 1.24, 0.94)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-794913', 'Lumen Eos', 'system-1760476209252-382', 824.4948156944625, 802.5684366694989, 3.69261442808231, 'G', 0.78, 4.69)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-955138', 'Carina', 'system-1760476209252-383', -916.3975492331259, 619.534232641811, -12.00656107773748, 'K', 0.48, 0.22)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-597093', 'Eridani Radianta', 'system-1760476209252-384', -496.6954349062874, 683.6841732434375, -45.13312503563402, 'M', 0.19, 7.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-184285', 'Crius', 'system-1760476209252-385', -1081.5034717604947, -778.7545429978521, -16.409340059258863, 'K', 0.39, 2.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-6710', 'Gemini Quasara', 'system-1760476209252-386', -1326.616702321307, -588.8009708825673, 2.221398476861764, 'M', 0.22, 8.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-917391', 'Aquarii', 'system-1760476209252-281', 64.58063057467228, 1281.8217144428336, 13.987170443080075, 'K', 0.47, 3.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-851514', 'Ourania Occidentalis', 'system-1760476209252-388', -540.8625756993515, 587.5421192530692, -22.188539520370888, 'M', 0.18, 4.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207937-816971', 'Theta Ourania', 'system-1760476209251-164', 3.096974484844527, 18.564166093589424, -2.1162312886567207, 'F', 0.82, 1.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-732481', 'Scorpii Occidentalis', 'system-1760476209252-390', -582.7801538069438, -1217.0354468233134, -10.225429271249173, 'M', 0.27, 9.63)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-667816', 'Andromeda Nova', 'system-1760476209251-229', 780.0256985163851, 376.81616583462943, -10.78667967081465, 'M', 0.21, 9.29)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-905674', 'Prometheus', 'system-1760476209252-392', -904.0296975601299, 1170.200670184087, -10.181429729295543, 'K', 0.37, 2.54)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-743282', 'Rho Aquarii Proxima', 'system-1760476209252-393', -285.58053818975657, 1004.9184912695339, -11.41595832757059, 'M', 0.29, 8.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-467776', 'Nebula Lynx', 'system-1760476209252-394', 1300.484184131207, 663.0452053300428, -10.264323006485702, 'K', 0.4, 12.35)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-132494', 'Phoenix', 'system-1760476209252-395', 1021.5596185592251, -15.88320617880739, 24.844561524198777, 'M', 0.2, 5.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-485904', 'Eridani', 'system-1760476209251-164', -1.6158281564946781, 16.57953530105335, 4.579601797187766, 'M', 0.14, 9.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-266184', 'Radiant Tartarus', 'system-1760476209252-397', -630.0314984200679, 243.0896527306597, -25.295417520420074, 'M', 0.13, 8.74)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-680864', 'Psi Phoebe', 'system-1760476209252-398', 132.41205266792295, -936.6493855518322, -7.097937743996736, 'A', 1.44, 3.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207955-102498', 'Delta Hydra', 'system-1760476209252-330', 806.4435181924995, -298.6423451308199, -15.590761405478702, 'G', 0.68, 3.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-962651', 'Hyperion', 'system-1760476209252-400', -114.8740343137205, 156.11759731254637, -26.137615257401283, 'A', 1.36, 3.11)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-713018', 'Cosmic Tartarus Nova', 'system-1760476209252-281', 101.70888209611968, 1282.9752311988213, 24.46536626220145, 'M', 0.11, 12.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-335103', 'Ophiuchus', 'system-1760476209252-402', 835.3232109737138, -985.7233655869702, -15.554852924775403, 'M', 0.28, 5.2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-579643', 'Apex Pegasi', 'system-1760476209250-49', -663.7162029663863, -57.96305135466144, 29.46548626052794, 'G', 0.7, 0.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-678890', 'Ultima Ourania', 'system-1760476209250-91', 40.80041745267508, 93.32197791846484, 38.70482855534429, 'K', 0.31, 7.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-350401', 'Theia', 'system-1760476209252-405', 856.5872430561283, -1051.2522561283567, -6.972741275018885, 'A', 1.11, 7.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-644029', 'Oranos', 'system-1760476209253-406', -901.8200893620087, -106.8996200139094, 2.233264463905094, 'O', 9.65, 0.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-683332', 'Aether Erebus', 'system-1760476209253-407', -1176.4399249246655, 417.07932708945464, -13.43408462219904, 'M', 0.25, 11.26)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-229715', 'Carina', 'system-1760476209250-107', -810.0103985146073, -1039.0672608374123, -3.6980777077918976, 'K', 0.33, 11.08)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207972-222521', 'Carina', 'system-1760476209252-312', -283.0960553181943, -1109.1722509151907, -13.733851676267372, 'K', 0.37, 8.2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-937169', 'Tartarus Virginis', 'system-1760476209253-410', -1464.8398225951735, -194.87387425312005, 1.5209029142145143, 'K', 0.33, 11.83)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-780026', 'Rhea Magna', 'system-1760476209251-218', 55.46621746450339, 15.625210646023502, -8.74138057589128, 'K', 0.32, 5.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-833768', 'Thalassa', 'system-1760476209253-412', -251.7094897792891, 1390.1337499656074, -0.8538795452221493, 'K', 0.36, 0.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-849848', 'Hercules', 'system-1760476209249-45', 124.89517714465936, 17.55412252397541, -89.46150194047853, 'M', 0.21, 6.52)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-613071', 'Eta Helios Peripheria', 'system-1760476209253-414', -1080.4067810624224, -614.3379724949831, -3.9453610537582, 'O', 6.78, 0.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-803350', 'Chi Ophiuchus Minima', 'system-1760476209253-415', -1167.2923524727682, 467.36532955715643, -22.450034634514967, 'M', 0.23, 0.86)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-78615', 'Crux Superior', 'system-1760476209250-75', -326.2142048033692, 1297.4284858113692, 20.88816263501871, 'M', 0.24, 8.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-620583', 'Nova Xephyr Nova', 'system-1760476209253-417', 1099.8578035188405, -765.3198457548749, 9.974113258547165, 'K', 0.49, 3.61)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-381761', 'Ultima Cepheus Minor', 'system-1760476209253-418', 1272.0999409490596, -506.9007176691659, -7.467495592560806, 'K', 0.46, 5.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476207989-852007', 'Tartarus', 'system-1760476209253-419', 10.76431892462932, -53.47895398327998, -60.03777629513636, 'M', 0.22, 2.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-50826', 'Lupus', 'system-1760476209253-420', 797.1805380312973, 927.8672963354172, -7.315796349232365, 'K', 0.36, 6.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-394544', 'Astro Hyperion', 'system-1760476209253-421', -658.3169689163072, 73.26508717697361, 27.53191706192189, 'A', 1.18, 0.61)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-594894', 'Dusk Hercules', 'system-1760476209250-85', 745.1880907499377, -392.1210829796972, -21.098615812576092, 'M', 0.14, 7.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-887164', 'Quantum Scorpii', 'system-1760476209249-36', -1237.4592445134015, 38.099775400324205, -5.269718221315292, 'M', 0.26, 7.34)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-200966', 'Xephyr', 'system-1760476209253-424', 670.1268398172151, -460.7149159185108, 4.031576670695525, 'M', 0.24, 3.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-748076', 'Zephyrus', 'system-1760476209250-68', 161.88939357242742, -1361.2498585743592, -19.38310397688896, 'M', 0.24, 12.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-31723', 'Lacerta', 'system-1760476209253-426', 1231.918548809125, -57.0517163482659, 13.49638358889728, 'G', 0.72, 12.8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-93015', 'Cassiopeia', 'system-1760476209253-427', -61.39533361637841, -932.7422465389726, -15.06494190075506, 'M', 0.08, 8.06)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-543490', 'Pi Auriga', 'system-1760476209252-405', 859.8205762488147, -1031.6058314205015, 0.19102831264311249, 'M', 0.12, 1.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208019-36822', 'Volans', 'system-1760476209253-429', -741.3922003325342, 542.3758775679362, -7.0871662841705145, 'M', 0.16, 9.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-571089', 'Void Aether', 'system-1760476209253-430', 1277.6907887924915, -143.34831526699094, 14.372188711044476, 'A', 1.31, 2.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-886686', 'Khaos Prime', 'system-1760476209249-15', 229.11489420090277, -1152.1376835251763, -29.548182464800178, 'K', 0.49, 2.15)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-430271', 'Stellar Pictor Centralis', 'system-1760476209253-432', 700.1587433478107, 696.2603148717071, 4.068260673523682, 'K', 0.46, 1.46)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-417465', 'Tartarus Proxima', 'system-1760476209253-433', 637.5654009828484, 620.375992423318, -8.004203341896769, 'M', 0.27, 3.2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-981958', 'Hyper Lacerta Proxima', 'system-1760476209251-145', 494.16504318497164, 803.6374166774631, 21.524645422257187, 'M', 0.09, 7.99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-231909', 'Cassiopeia', 'system-1760476209253-435', -1130.337637201581, -658.6033673683753, 4.371992599705892, 'K', 0.37, 1.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-431023', 'Lyra', 'system-1760476209252-386', -1318.0316350375047, -565.4101955732244, -0.5581199587471319, 'K', 0.37, 9.07)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-420783', 'Helix Pegasi', 'system-1760476209253-437', -1366.0688208622628, 515.3361088413799, 8.087591358308732, 'M', 0.22, 1.49)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-116244', 'Iota Chronos', 'system-1760476209250-118', 1188.384402522649, -407.7222289541465, -20.900723071476126, 'M', 0.1, 10.1)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208037-790404', 'Upsilon Lyra Maxima', 'system-1760476209249-35', 23.57638384859435, 10.111048090372435, -100.07426384158799, 'A', 1.28, 3.48)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-498021', 'Vertex Themis Minor', 'system-1760476209252-369', -564.8414002400225, 732.5389068307302, 19.220809805251882, 'O', 8.02, 0.03)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-128657', 'Core Lacerta', 'system-1760476209253-441', 584.3225942029421, -181.80069526292255, -10.549665677509243, 'K', 0.46, 2.75)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-710296', 'Carina', 'system-1760476209253-442', -1042.0874340216278, 907.1244240552202, -9.388485673113584, 'K', 0.34, 2.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-970536', 'Helios', 'system-1760476209253-443', 173.23705631048438, -1160.185191105187, 1.8193575235183967, 'K', 0.39, 10.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-919634', 'Themis', 'system-1760476209253-444', -33.50136826330485, 68.17898669185777, -47.37829022323875, 'O', 8.27, 0.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-788971', 'Themis Posterior', 'system-1760476209253-445', 780.0256509121224, 746.960219670383, -29.83618285246374, 'B', 1.76, 1.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-984166', 'Phoenix', 'system-1760476209253-446', 927.6354675523977, 14.428098805917225, -1.7660033388919771, 'M', 0.14, 6.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-420264', 'Styx', 'system-1760476209251-164', 15.266609591557122, -13.26720517641819, -15.499913523681789, 'K', 0.32, 9.72)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-49394', 'Scorpii Delphini', 'system-1760476209253-448', -1133.2315973710888, -910.1051442892201, 3.6787537786307367, 'F', 0.96, 2.5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208056-727687', 'Frontier Eos', 'system-1760476209253-449', 248.67012298576353, -1122.689309963406, 0.7080437232596832, 'M', 0.18, 4.17)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-928021', 'Hercules', 'system-1760476209253-450', -876.7896089366028, 948.7867227794056, -20.824626940944867, 'K', 0.36, 10.65)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-164564', 'Cepheus', 'system-1760476209253-451', -1407.1806865939222, 258.090837569961, 11.21404499659776, 'M', 0.12, 5.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-23732', 'Themis', 'system-1760476209253-452', 351.1934150166466, 1215.1302791376822, 22.599184300009274, 'M', 0.15, 4.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-515905', 'Eos', 'system-1760476209253-453', 369.0720721858403, 1151.8429672289094, -16.133118867132954, 'O', 9.49, 0.04)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-166791', 'Khaos Telescopii', 'system-1760476209253-454', -341.48248556356685, 1209.2958740573401, -2.5820971831835546, 'M', 0.3, 12.28)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-717531', 'Ultima Ystera', 'system-1760476209253-455', 134.43123526014665, 11.41328210775957, 79.89445639144009, 'M', 0.1, 2.97)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-883027', 'Crius Ultima', 'system-1760476209249-44', -946.0785060175529, 142.91393634363965, -16.933804126437217, 'G', 0.61, 9.79)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-205716', 'Selene', 'system-1760476209253-457', 575.0783633463196, 1057.7128204242658, 3.1029123705862993, 'K', 0.46, 3.83)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-263636', 'Corvus', 'system-1760476209253-458', -1276.6938175295982, -547.6985781799003, -3.5702424630859717, 'K', 0.36, 2.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208073-768738', 'Themis', 'system-1760476209249-27', 804.5804560123156, 1004.0766018915272, -8.16697001693925, 'K', 0.49, 1.24)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-320610', 'Eta Perseus', 'system-1760476209250-70', 53.55756412381653, 123.1161345182976, 94.34996671563499, 'M', 0.1, 12.58)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-740066', 'Mnemosyne', 'system-1760476209253-461', -19.825617597143044, 126.80399005078662, -4.677019066677769, 'M', 0.12, 8.92)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-558954', 'Phoenix', 'system-1760476209253-462', -531.1764685231783, -502.390547606101, 0.8491674266989531, 'K', 0.37, 11.42)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-252984', 'Hyperion', 'system-1760476209253-463', -390.29866373421146, 1032.6074263581986, 18.7872636173783, 'M', 0.23, 13.01)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-812333', 'Eos', 'system-1760476209252-405', 851.8190248316071, -1057.202181355447, 11.443531704958646, 'K', 0.47, 6.87)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-805948', 'Taurus', 'system-1760476209251-166', 1165.9231025802594, 522.1621033843078, 19.920847272800003, 'M', 0.11, 12.9)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-396215', 'Xi Nyx', 'system-1760476209252-315', 10.424301086646587, 1.1702115015872865, -37.65587027682289, 'M', 0.13, 8.18)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-292158', 'Omicron Lacerta', 'system-1760476209252-247', 1401.9037254105065, 97.58864642366602, 4.559883779705633, 'M', 0.17, 7.45)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-204839', 'Lumen Nyx', 'system-1760476209253-468', -1317.6559906278587, -687.1227389555994, -4.908663523752395, 'M', 0.25, 4.52)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208090-374336', 'Chronos Proxima', 'system-1760476209253-469', -1159.3146060112883, 14.93986413326001, 24.336550096301213, 'M', 0.3, 8.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-148269', 'Theia Luminosa', 'system-1760476209251-167', -59.677540686503725, 201.60352145346508, 73.42809823727248, 'K', 0.44, 13.5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-523205', 'Gemini Velorum', 'system-1760476209249-26', -3.901500438589254, -9.993935433314414, 92.8471020710423, 'K', 0.39, 12.32)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-146874', 'Umbra Lynx Australis', 'system-1760476209253-472', 13.237154522693872, 2.379290550072674, -43.87364649085277, 'M', 0.23, 6.57)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-657992', 'Cassiopeia', 'system-1760476209253-461', -12.888158992432338, 144.1135588085351, 21.65292203276473, 'M', 0.19, 4.21)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-751155', 'Zeta Ourania', 'system-1760476209253-474', -226.77442836763137, -657.5929269514868, -7.139931201929787, 'O', 8.21, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-45791', 'Erebus', 'system-1760476209253-475', -133.66010379258614, 1310.8840023245166, 10.038800837005128, 'K', 0.38, 12.94)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-776087', 'Aquarii', 'system-1760476209253-476', -857.6919071087219, -767.4249443737383, 4.134013625275765, 'K', 0.41, 10.3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-128727', 'Andromeda', 'system-1760476209251-145', 472.3835828323197, 842.2856295674499, 17.037229528465932, 'B', 2.45, 0.53)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-884741', 'Ourania', 'system-1760476209253-478', 677.1247791330949, -529.3871630210426, 6.808268951622498, 'B', 1.86, 1.54)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208116-706733', 'Zenith Crux', 'system-1760476209253-479', 33.500561111324785, 132.89365007810207, -90.1677752644754, 'M', 0.09, 6.41)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-180074', 'Core Gemini Borealis', 'system-1760476209253-480', -264.39260766206877, -1340.381199739047, 7.619259866126652, 'M', 0.24, 7.13)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-197719', 'Boötes', 'system-1760476209253-481', -356.5023714607321, 1418.9574321014886, 4.185247925797967, 'M', 0.27, 12.44)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-133019', 'Phoebe', 'system-1760476209253-446', 935.6390826138829, -32.87002004435401, 7.9865632169732885, 'M', 0.16, 5.45)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-669686', 'Zeta Sagittarius', 'system-1760476209253-483', -413.0993366167799, 684.0236847943124, 18.40863118563734, 'K', 0.42, 7.49)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-370316', 'Pi Erebus', 'system-1760476209253-484', -19.315670610130162, -32.11449108283341, 139.2411311970108, 'M', 0.14, 3.39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-713295', 'Auriga Minor', 'system-1760476209253-485', -608.8298227997905, -761.612344239446, 34.00111095419329, 'G', 0.63, 4.18)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-28734', 'Twilight Ursae', 'system-1760476209253-486', -1277.334341233188, 663.6038908745832, -7.711926095851217, 'O', 9.43, 0.02)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-940754', 'Styx', 'system-1760476209253-487', -23.096267978346894, -83.1717862860506, 7.393755199929342, 'F', 0.98, 2.19)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-155691', 'Gemini Carinae', 'system-1760476209253-488', -63.43546520537697, -27.145946277251774, -114.28842501321444, 'M', 0.28, 0.74)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208135-879748', 'Eta Cassiopeia Radianta', 'system-1760476209253-489', 828.7032867649542, -745.2155034442646, 7.310275438361085, 'M', 0.11, 1.84)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-942698', 'Phi Rhea', 'system-1760476209253-490', 951.203152096625, -591.2072389354691, 4.641280784517674, 'M', 0.09, 4.56)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-877974', 'Rhea', 'system-1760476209253-455', 123.32600607779145, 15.75675411860869, 58.64556516494271, 'M', 0.15, 4.67)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-768', 'Hyperion Nebulosa', 'system-1760476209249-37', -537.685460346141, -614.5484745078609, -13.331334334676104, 'A', 1.41, 2.91)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-351587', 'Nebula Centauri Centralis', 'system-1760476209253-493', 357.8202138960777, -1316.143442014754, -6.289876550226423, 'M', 0.21, 9.77)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-88650', 'Cepheus Magna', 'system-1760476209253-494', 794.5957457628625, 863.7948596765648, -5.288364159311582, 'M', 0.1, 11.05)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-339529', 'Hydra', 'system-1760476209250-47', -588.1968728157134, 1145.2827408320848, -17.170754247487295, 'F', 0.87, 4.89)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-651971', 'Orionis', 'system-1760476209253-496', 821.2122634471416, -498.2092169245502, 14.93599619806771, 'M', 0.29, 13.71)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-729407', 'Sagittarius', 'system-1760476209249-4', -933.9736713669017, 342.71837992157907, -12.356991455923058, 'M', 0.27, 0.25)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-766316', 'Pi Ursae', 'system-1760476209253-498', -710.3390583252221, -264.55452994359393, 3.1831167911462597, 'K', 0.48, 13.66)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
VALUES ('star-1760476208154-724222', 'Pictor', 'system-1760476209253-486', -1321.2325245099482, 669.2865638454514, 14.029213986743388, 'K', 0.4, 10.81)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  system_id = EXCLUDED.system_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  spectral_type = EXCLUDED.spectral_type,
  mass = EXCLUDED.mass,
  age = EXCLUDED.age,
  updated_at = NOW();

-- ============================================
-- 5. PLANETS
-- ============================================

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-946476', 'Themis Prime', 'star-1760476207067-407716', 'frozen', 0.73, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-592132', 'Hades Obscurus', 'star-1760476207067-406969', 'frozen', 0.73, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-351266', 'Hemi Pontus Saxeus', 'star-1760476207067-406969', 'frozen', 1.04, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-59748', 'Poseidon', 'star-1760476207067-406969', 'frozen', 1.64, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-248033', 'Neo Erebus', 'star-1760476207067-792456', 'frozen', 0.63, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-39761', 'Demeter Nonus', 'star-1760476207067-792456', 'ice-giant', 0.98, 0, 53, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-531441', 'Aphrodite', 'star-1760476207067-921109', 'rocky', 0.66, 0, 393, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-747876', 'Proto Artemis', 'star-1760476207067-179659', 'frozen', 0.67, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-608551', 'Erebus', 'star-1760476207067-383192', 'terrestrial', 0.7, 30, 484, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-953715', 'Helios Ferreus', 'star-1760476207067-86561', 'rocky', 0.7, 0, 371, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-382555', 'Geras Major', 'star-1760476207067-86561', 'rocky', 0.92, 0, 289, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-762970', 'Exa Poseidon', 'star-1760476207067-305870', 'ice-giant', 0.6, 0, 113, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-116726', 'Pseudo Epimetheus Zeta', 'star-1760476207067-305870', 'frozen', 0.99, 0, 92, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-268123', 'Neo Poseidon Obscurus', 'star-1760476207067-305870', 'frozen', 1.81, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-222780', 'Macro Coeus', 'star-1760476207067-305870', 'ice-giant', 2.49, 0, 70, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208171-295824', 'Eros', 'star-1760476207067-305870', 'frozen', 5.37, 0, 42, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-597733', 'Apollo', 'star-1760476207085-728940', 'rocky', 0.72, 0, 94, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-701096', 'Pico Thanatos Calidus', 'star-1760476207085-728940', 'frozen', 0.99, 0, 94, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-833228', 'Crypto Phoebe', 'star-1760476207085-728940', 'frozen', 1.41, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-853498', 'Artemis', 'star-1760476207085-728940', 'frozen', 2.68, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-977665', 'Themis', 'star-1760476207085-275883', 'frozen', 0.61, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-90736', 'Meta Luna Frigidus', 'star-1760476207085-275883', 'frozen', 0.91, 0, 38, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-233068', 'Archaeo Tartarus Primus', 'star-1760476207085-801504', 'frozen', 0.72, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-842838', 'Supra Rhea Septimus', 'star-1760476207085-549960', 'terrestrial', 0.8, 45, 373, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-897369', 'Mnemosyne Ultimus', 'star-1760476207085-385414', 'frozen', 0.76, 0, 73, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-959668', 'Hypo Ananke', 'star-1760476207085-32912', 'rocky', 0.72, 0, 278, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-790870', 'Archaeo Epimetheus', 'star-1760476207085-32912', 'rocky', 1.12, 0, 239, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-327167', 'Neo Crius Major', 'star-1760476207085-279570', 'frozen', 0.8, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-688367', 'Thanatos Epsilon', 'star-1760476207085-279570', 'frozen', 0.87, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-998925', 'Artemis', 'star-1760476207085-279570', 'frozen', 1.6, 0, 62, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-17430', 'Ares Crystallus', 'star-1760476207085-553338', 'terrestrial', 0.77, 30, 377, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-948592', 'Chronos', 'star-1760476207085-553338', 'rocky', 1.14, 0, 313, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208188-799305', 'Nemesis Frigidus', 'star-1760476207085-327009', 'terrestrial', 0.68, 30, 400, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-91499', 'Atto Iapetus Luminosus', 'star-1760476207102-350364', 'rocky', 0.79, 0, 327, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-647611', 'Giga Nyx', 'star-1760476207102-350364', 'terrestrial', 1.03, 75, 301, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-227067', 'Meso Hemera', 'star-1760476207102-350364', 'ice-giant', 1.38, 0, 261, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-244417', 'Tele Sol Orientalis', 'star-1760476207102-740526', 'rocky', 0.68, 0, 374, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-390791', 'Zephyrus Tertius', 'star-1760476207102-239717', 'rocky', 0.61, 0, 90, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-968751', 'Proto Artemis Australis', 'star-1760476207102-239717', 'frozen', 1.06, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-174508', 'Geras', 'star-1760476207102-409822', 'rocky', 0.63, 0, 389, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-571137', 'Endo Uranus Saxeus', 'star-1760476207102-409822', 'rocky', 0.86, 0, 333, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-399880', 'Supra Oneiroi', 'star-1760476207102-197031', 'terrestrial', 0.78, 65, 293, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-287229', 'Mono Mnemosyne Frigidus', 'star-1760476207102-730790', 'frozen', 0.66, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-617067', 'Exo Phoebe', 'star-1760476207102-730790', 'ice-giant', 0.96, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-869984', 'Tethys', 'star-1760476207102-509286', 'frozen', 0.8, 0, 86, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-712185', 'Hemera Nonus', 'star-1760476207102-805228', 'gas-giant', 0.69, 0, 180, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208205-421015', 'Supra Tartarus', 'star-1760476207102-805228', 'rocky', 1, 0, 113, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-423838', 'New Artemis Primus', 'star-1760476207120-40806', 'frozen', 0.73, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-813847', 'Atlas Parvus', 'star-1760476207120-644650', 'rocky', 0.71, 0, 365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-72365', 'Poseidon', 'star-1760476207120-644650', 'terrestrial', 0.93, 70, 369, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-967879', 'Boreas', 'star-1760476207120-644650', 'rocky', 1.44, 0, 267, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-821827', 'Ares Tertius', 'star-1760476207120-141548', 'rocky', 0.62, 0, 18836, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-247381', 'Erebus', 'star-1760476207120-141548', 'rocky', 1.08, 0, 14302, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-66788', 'Mnemosyne', 'star-1760476207120-524851', 'rocky', 0.74, 0, 180, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-521195', 'Boreas Quartus', 'star-1760476207120-524851', 'rocky', 0.92, 0, 203, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-113473', 'Hades', 'star-1760476207120-524851', 'frozen', 1.54, 0, 117, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-69390', 'Atto Pontus', 'star-1760476207120-944166', 'rocky', 0.78, 0, 328, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-496230', 'Supra Thanatos', 'star-1760476207120-429567', 'rocky', 0.72, 0, 334, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-369818', 'Ananke', 'star-1760476207120-429567', 'terrestrial', 1.02, 90, 287, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-341918', 'Quasi Tethys Quintus', 'star-1760476207120-854110', 'frozen', 0.63, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-271791', 'Old Nemesis Frigidus', 'star-1760476207120-5979', 'rocky', 0.66, 0, 502, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208224-492316', 'Pseudo Rhea Exterior', 'star-1760476207120-5979', 'rocky', 0.91, 0, 460, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-223585', 'Eros', 'star-1760476207140-418132', 'terrestrial', 0.64, 20, 410, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-653666', 'Infra Aether', 'star-1760476207140-418132', 'terrestrial', 1.15, 85, 305, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-840930', 'Hermes Ultimus', 'star-1760476207140-418132', 'rocky', 1.73, 0, 258, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-918529', 'Zeus Alpha', 'star-1760476207140-794911', 'molten', 0.6, 0, 13101, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-36427', 'Proto Zeus Antiquus', 'star-1760476207140-794911', 'molten', 1.01, 0, 10068, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-319926', 'Hyperion', 'star-1760476207140-468854', 'frozen', 0.78, 0, 49, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-32048', 'Zetta Apollo Epsilon', 'star-1760476207140-690275', 'frozen', 0.76, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-306408', 'Chronos Quartus', 'star-1760476207140-690275', 'frozen', 1.02, 0, 53, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-625017', 'Trans Crius', 'star-1760476207140-77804', 'rocky', 0.79, 0, 402, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-684845', 'Cronus', 'star-1760476207140-77804', 'rocky', 0.94, 0, 355, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-215985', 'Nano Artemis Centralis', 'star-1760476207140-77804', 'ice-giant', 1.66, 0, 308, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-360085', 'Apollo Interior', 'star-1760476207140-77804', 'ice-giant', 2.85, 0, 237, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-82369', 'Theia Australis', 'star-1760476207140-696759', 'rocky', 0.77, 0, 392, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-853549', 'Poly Hypnos Epsilon', 'star-1760476207140-469317', 'ice-giant', 0.66, 0, 53, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-81970', 'Artemis Calidus', 'star-1760476207140-45310', 'ice-giant', 0.75, 0, 147, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-996805', 'Crypto Hermes Inferior', 'star-1760476207140-515925', 'frozen', 0.74, 0, 91, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-62492', 'Oneiroi', 'star-1760476207140-515925', 'ice-giant', 1.04, 0, 100, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208241-37822', 'Phoebe Quartus', 'star-1760476207140-515925', 'frozen', 1.42, 0, 67, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-442429', 'Hyper Erebus Septimus', 'star-1760476207167-98782', 'frozen', 0.66, 0, 45, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-416040', 'Omni Persephone Interior', 'star-1760476207167-431498', 'molten', 0.6, 0, 11479, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-610423', 'Poly Atlas Parvus', 'star-1760476207167-159581', 'ice-giant', 0.79, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-855976', 'Nemesis Beta', 'star-1760476207167-427086', 'frozen', 0.76, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-580282', 'Aether Prime', 'star-1760476207167-473404', 'gas-giant', 0.61, 0, 162, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-662017', 'Hephaestus Secundus', 'star-1760476207167-473404', 'frozen', 1.12, 0, 91, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-30764', 'Mega Aphrodite', 'star-1760476207167-473404', 'frozen', 1.46, 0, 81, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-313396', 'Tethys Calidus', 'star-1760476207167-241578', 'terrestrial', 0.79, 45, 361, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-168253', 'Paleo Phoebe', 'star-1760476207167-949826', 'frozen', 0.71, 0, 42, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208266-229033', 'Dionysus', 'star-1760476207167-447139', 'ice-giant', 0.75, 0, 92, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-280111', 'Boreas', 'star-1760476207187-856339', 'terrestrial', 0.66, 30, 402, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-351096', 'Nyx', 'star-1760476207187-284466', 'ice-giant', 0.77, 0, 42, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-929434', 'Persephone Quartus', 'star-1760476207187-284466', 'ice-giant', 0.95, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-147127', 'Selene Orientalis', 'star-1760476207187-284466', 'frozen', 1.51, 0, 27, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-967668', 'Pico Hera Ultimus', 'star-1760476207187-844369', 'ice-giant', 0.78, 0, 66, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-819871', 'Neo Pontus Primus', 'star-1760476207187-844369', 'ice-giant', 1.06, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-360917', 'Hypo Themis', 'star-1760476207187-840709', 'ice-giant', 0.65, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-865960', 'Gaia Alpha', 'star-1760476207187-782599', 'frozen', 0.75, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-895480', 'Hephaestus Centralis', 'star-1760476207187-782599', 'frozen', 1.04, 0, 85, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-467109', 'Nyx', 'star-1760476207187-782599', 'frozen', 1.63, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-225647', 'Artemis', 'star-1760476207187-782599', 'frozen', 3.09, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-705706', 'Palaeo Oceanus', 'star-1760476207187-782599', 'frozen', 5.76, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-161103', 'Terra Secundus', 'star-1760476207187-782599', 'frozen', 9.81, 0, 27, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-773880', 'Geras Orientalis', 'star-1760476207187-37209', 'terrestrial', 0.64, 30, 427, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-91651', 'Atto Atlas Interior', 'star-1760476207187-37209', 'rocky', 0.91, 0, 335, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-759122', 'Luna', 'star-1760476207187-37209', 'rocky', 1.75, 0, 235, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-670838', 'Hyper Zeus', 'star-1760476207187-425989', 'terrestrial', 0.74, 35, 266, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-273569', 'Pseudo Hera Tertius', 'star-1760476207187-425989', 'rocky', 1.01, 0, 183, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-653131', 'Oceanus Sextus', 'star-1760476207187-425989', 'frozen', 1.77, 0, 125, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208282-854549', 'Hemera', 'star-1760476207187-425989', 'frozen', 3.05, 0, 116, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-121257', 'Macro Demeter Octavus', 'star-1760476207205-767398', 'terrestrial', 0.7, 85, 363, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-141965', 'Hypo Hypnos Decimus', 'star-1760476207205-220941', 'frozen', 0.73, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-486432', 'Palaeo Cronus', 'star-1760476207205-220941', 'frozen', 0.89, 0, 22, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-580935', 'Demeter Novus', 'star-1760476207205-220941', 'ice-giant', 1.64, 0, 27, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-701819', 'Mono Tethys Prime', 'star-1760476207205-95411', 'frozen', 0.78, 0, 80, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-277753', 'Omni Erebus Maximus', 'star-1760476207205-604675', 'ice-giant', 0.61, 0, 105, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-373141', 'Theia Alpha', 'star-1760476207205-387729', 'frozen', 0.67, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-424914', 'Sol Novus', 'star-1760476207205-700987', 'terrestrial', 0.73, 60, 339, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-650100', 'Erebus Iota', 'star-1760476207205-700987', 'terrestrial', 0.95, 55, 295, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-649916', 'Zephyrus Sextus', 'star-1760476207205-13292', 'frozen', 0.72, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-825416', 'Crius', 'star-1760476207205-1271', 'frozen', 0.76, 0, 86, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-376353', 'Aegaeon Prime', 'star-1760476207205-1271', 'frozen', 0.99, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-541931', 'Nyx', 'star-1760476207205-1271', 'ice-giant', 1.38, 0, 81, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-653766', 'Eros Inferior', 'star-1760476207205-821772', 'molten', 0.66, 0, 4606, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-145490', 'Nemesis', 'star-1760476207205-821772', 'molten', 1.06, 0, 3690, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208299-256573', 'Neo Terra Antiquus', 'star-1760476207205-728456', 'rocky', 0.63, 0, 92, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-629943', 'Crius Alpha', 'star-1760476207222-296952', 'frozen', 0.69, 0, 44, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-551658', 'Nano Zeus', 'star-1760476207222-296952', 'frozen', 1.1, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-828362', 'Zepto Geras Australis', 'star-1760476207222-666026', 'frozen', 0.8, 0, 69, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-756573', 'Prometheus Proxima', 'star-1760476207222-660494', 'frozen', 0.63, 0, 80, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-263551', 'Giga Persephone', 'star-1760476207222-660494', 'frozen', 1.03, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-462663', 'Hyper Chronos Gamma', 'star-1760476207222-660494', 'frozen', 1.43, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-632707', 'Hephaestus Ferreus', 'star-1760476207222-180365', 'rocky', 0.73, 0, 610, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-306789', 'Epimetheus', 'star-1760476207222-180365', 'rocky', 1.03, 0, 525, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208317-243844', 'Iso Erebus Beta', 'star-1760476207222-180365', 'rocky', 1.4, 0, 393, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-898265', 'Poseidon Proxima', 'star-1760476207222-180365', 'rocky', 3.06, 0, 330, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-895478', 'Macro Athena Novus', 'star-1760476207222-910040', 'rocky', 0.73, 0, 497, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-888360', 'Gaia Beta', 'star-1760476207222-516665', 'frozen', 0.73, 0, 91, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-489288', 'Chronos Epsilon', 'star-1760476207222-976062', 'frozen', 0.73, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-726638', 'Hemi Hyperion Alpha', 'star-1760476207222-397994', 'frozen', 0.68, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208318-766430', 'Trans Hades Luminosus', 'star-1760476207222-730118', 'terrestrial', 0.61, 20, 397, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-132763', 'Ananke Iota', 'star-1760476207238-751959', 'gas-giant', 0.8, 0, 197, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-71285', 'Hephaestus', 'star-1760476207238-751959', 'ice-giant', 1.12, 0, 181, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-69990', 'Endo Hades', 'star-1760476207238-751959', 'frozen', 1.64, 0, 124, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-501599', 'Cronus', 'star-1760476207238-880774', 'frozen', 0.65, 0, 67, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-26111', 'Crius Ferreus', 'star-1760476207238-880774', 'frozen', 0.95, 0, 49, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-488294', 'Chronos', 'star-1760476207238-321776', 'frozen', 0.67, 0, 87, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-684716', 'Hyper Epimetheus Primus', 'star-1760476207238-627610', 'ice-giant', 0.74, 0, 196, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-337749', 'Atto Sol Epsilon', 'star-1760476207238-940042', 'frozen', 0.76, 0, 79, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208335-738750', 'Chronos Kappa', 'star-1760476207238-894709', 'terrestrial', 0.6, 45, 531, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-690945', 'Sol', 'star-1760476207255-55637', 'ice-giant', 0.69, 0, 152, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-891944', 'Hyper Hera', 'star-1760476207255-55637', 'frozen', 0.97, 0, 96, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-1089', 'Hemi Rhea Iota', 'star-1760476207255-55637', 'frozen', 1.45, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-741739', 'Mnemosyne Inferior', 'star-1760476207255-831644', 'frozen', 0.63, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-318787', 'Erebus', 'star-1760476207255-831644', 'frozen', 0.94, 0, 57, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-827386', 'Trans Eros', 'star-1760476207255-831644', 'frozen', 1.74, 0, 50, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-984937', 'Exo Rhea Crystallus', 'star-1760476207255-831644', 'frozen', 2.93, 0, 24, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-363725', 'Luna', 'star-1760476207255-831644', 'frozen', 4.81, 0, 15, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-305058', 'Geras', 'star-1760476207255-297010', 'rocky', 0.61, 0, 412, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-84779', 'Meso Aegaeon', 'star-1760476207255-297010', 'terrestrial', 1.13, 75, 309, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-505434', 'Micro Ares Frigidus', 'star-1760476207255-297010', 'ice-giant', 1.61, 0, 227, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-224910', 'Hades', 'star-1760476207255-145411', 'rocky', 0.7, 0, 99, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-557987', 'Iso Epimetheus Quartus', 'star-1760476207255-145411', 'frozen', 1.14, 0, 83, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-533932', 'Tethys Theta', 'star-1760476207255-145411', 'frozen', 1.61, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-191691', 'Pontus Quintus', 'star-1760476207255-145411', 'frozen', 3.07, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-246459', 'Cronus', 'star-1760476207255-145411', 'frozen', 5.23, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-933903', 'Super Demeter', 'star-1760476207255-181105', 'terrestrial', 0.6, 45, 258, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-875761', 'Para Boreas Epsilon', 'star-1760476207255-181105', 'rocky', 0.88, 0, 148, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-802429', 'Epimetheus Secundus', 'star-1760476207255-181105', 'frozen', 1.39, 0, 125, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-199453', 'Pico Thanatos Gamma', 'star-1760476207255-181105', 'frozen', 2.87, 0, 90, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-787642', 'Hypnos Theta', 'star-1760476207255-181105', 'frozen', 5.68, 0, 62, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-842805', 'Peta Atlas Epsilon', 'star-1760476207255-976553', 'rocky', 0.62, 0, 290, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-814368', 'Palaeo Luna', 'star-1760476207255-976553', 'terrestrial', 0.96, 15, 225, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-106040', 'Ultra Gaia', 'star-1760476207255-976553', 'rocky', 1.37, 0, 206, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-853001', 'Nyx', 'star-1760476207255-790120', 'frozen', 0.73, 0, 21, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-438644', 'New Notus Delta', 'star-1760476207255-790120', 'frozen', 1.11, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-244468', 'Pseudo Phanes Secundus', 'star-1760476207255-281333', 'rocky', 0.64, 0, 618, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208352-219928', 'Cronus', 'star-1760476207255-567680', 'rocky', 0.69, 0, 323, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-338961', 'Tera Athena Major', 'star-1760476207273-282306', 'molten', 0.72, 0, 2025, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-696909', 'Hypo Hermes', 'star-1760476207273-282306', 'molten', 0.9, 0, 1743, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-533874', 'Ultra Rhea', 'star-1760476207273-596419', 'ice-giant', 0.72, 0, 207, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-818135', 'Zepto Tethys Prime', 'star-1760476207273-596419', 'rocky', 0.9, 0, 151, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-321063', 'Exa Hephaestus Octavus', 'star-1760476207273-847493', 'molten', 0.77, 0, 6894, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-96520', 'Uranus Epsilon', 'star-1760476207273-289675', 'rocky', 0.7, 0, 421, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-827907', 'Para Boreas', 'star-1760476207273-289675', 'rocky', 0.87, 0, 382, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-408480', 'Hades Epsilon', 'star-1760476207273-289675', 'ice-giant', 1.67, 0, 284, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-113119', 'Boreas Novus', 'star-1760476207273-510060', 'frozen', 0.7, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-8409', 'Zephyrus Parvus', 'star-1760476207273-987795', 'rocky', 0.62, 0, 192, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-510754', 'Ultra Aether', 'star-1760476207273-159903', 'frozen', 0.62, 0, 80, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-49522', 'Archaeo Aether Quartus', 'star-1760476207273-159903', 'frozen', 0.86, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-39649', 'Persephone Calidus', 'star-1760476207273-159903', 'frozen', 1.73, 0, 46, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-997615', 'Quasi Hyperion Obscurus', 'star-1760476207273-489651', 'ice-giant', 0.7, 0, 120, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208369-465305', 'Yotta Pontus', 'star-1760476207273-695732', 'terrestrial', 0.77, 75, 345, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-199307', 'Exo Thalassa Nonus', 'star-1760476207289-136118', 'frozen', 0.68, 0, 59, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-429445', 'Neo Hyperion', 'star-1760476207289-714963', 'ice-giant', 0.73, 0, 187, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-596835', 'Old Demeter', 'star-1760476207289-714963', 'ice-giant', 1.05, 0, 175, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-741678', 'Omni Boreas', 'star-1760476207289-269642', 'ice-giant', 0.76, 0, 102, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-264405', 'Nyx', 'star-1760476207289-90705', 'ice-giant', 0.7, 0, 115, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-911860', 'Pontus Occidentalis', 'star-1760476207289-90705', 'frozen', 0.93, 0, 76, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-317189', 'Yocto Hermes Occidentalis', 'star-1760476207289-90705', 'frozen', 1.36, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-680528', 'Themis', 'star-1760476207289-90705', 'frozen', 2.75, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-960794', 'Cronus Magnus', 'star-1760476207289-90705', 'frozen', 5.24, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-810333', 'Persephone Nonus', 'star-1760476207289-90705', 'frozen', 11.09, 0, 21, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-380935', 'Epimetheus', 'star-1760476207289-90705', 'frozen', 18.32, 0, 16, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-773413', 'Para Boreas', 'star-1760476207289-244451', 'frozen', 0.61, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-465202', 'Rhea', 'star-1760476207289-944150', 'frozen', 0.71, 0, 79, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-4055', 'Aegaeon Frigidus', 'star-1760476207289-944150', 'ice-giant', 0.88, 0, 107, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-231336', 'Palaeo Thanatos Inferior', 'star-1760476207289-290153', 'frozen', 0.75, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-999781', 'Selene', 'star-1760476207289-290153', 'frozen', 0.93, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-46559', 'Helios Antiquus', 'star-1760476207289-290153', 'frozen', 1.84, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-994203', 'Aphrodite Crystallus', 'star-1760476207289-551139', 'terrestrial', 0.79, 35, 356, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-863946', 'Hermes', 'star-1760476207289-208210', 'frozen', 0.79, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-786893', 'Geras Septimus', 'star-1760476207289-208210', 'frozen', 0.91, 0, 17, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-219582', 'Prometheus Crystallus', 'star-1760476207289-208210', 'frozen', 1.49, 0, 34, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-355389', 'Archaeo Oneiroi', 'star-1760476207289-527215', 'molten', 0.64, 0, 6039, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-152907', 'Holo Athena Eta', 'star-1760476207289-527215', 'molten', 0.88, 0, 5197, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-179859', 'New Oceanus Proxima', 'star-1760476207289-527215', 'rocky', 1.6, 0, 3829, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208386-323678', 'Hyper Hemera', 'star-1760476207289-527215', 'molten', 2.4, 0, 3177, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-654449', 'Meta Epimetheus', 'star-1760476207308-642901', 'terrestrial', 0.8, 55, 320, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-587876', 'Femto Demeter Quintus', 'star-1760476207308-430559', 'terrestrial', 0.7, 50, 368, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-202887', 'Quasi Hypnos Eta', 'star-1760476207308-741600', 'molten', 0.77, 0, 3421, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-67890', 'Zephyrus Interior', 'star-1760476207308-208731', 'rocky', 0.67, 0, 614, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-779417', 'Hyperion Beta', 'star-1760476207308-208731', 'rocky', 1.01, 0, 449, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-268329', 'Neo Hera Obscurus', 'star-1760476207308-15802', 'frozen', 0.62, 0, 42, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-195517', 'Tera Poseidon Iota', 'star-1760476207308-335363', 'frozen', 0.74, 0, 63, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-371685', 'Infra Hemera', 'star-1760476207308-485092', 'frozen', 0.73, 0, 59, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-923109', 'Exo Theia', 'star-1760476207308-485092', 'ice-giant', 0.94, 0, 86, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-991327', 'Aether', 'star-1760476207308-772886', 'rocky', 0.76, 0, 326, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-88106', 'Artemis Magnus', 'star-1760476207308-772886', 'terrestrial', 1.06, 75, 301, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-120701', 'Demeter', 'star-1760476207308-772886', 'gas-giant', 1.45, 0, 236, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-624909', 'Ananke', 'star-1760476207308-691415', 'frozen', 0.71, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-645486', 'Coeus Remota', 'star-1760476207308-941308', 'ice-giant', 0.69, 0, 148, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-386416', 'Prometheus', 'star-1760476207308-941308', 'rocky', 0.85, 0, 90, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-148667', 'Super Erebus Luminosus', 'star-1760476207308-941308', 'frozen', 1.63, 0, 70, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-534441', 'Atlas', 'star-1760476207308-941308', 'frozen', 2.63, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-316256', 'Artemis', 'star-1760476207308-941308', 'frozen', 5.48, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208404-254259', 'Luna Centralis', 'star-1760476207308-941308', 'frozen', 9.09, 0, 25, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-301723', 'Mono Gaia', 'star-1760476207326-605782', 'terrestrial', 0.69, 0, 391, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-384186', 'Hera Obscurus', 'star-1760476207326-605782', 'terrestrial', 1.14, 25, 262, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-930168', 'Macro Gaia', 'star-1760476207326-620980', 'frozen', 0.71, 0, 97, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-225163', 'Exa Zeus', 'star-1760476207326-620980', 'frozen', 1.08, 0, 77, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-216153', 'Trans Helios Tertius', 'star-1760476207326-620980', 'frozen', 1.39, 0, 69, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-522205', 'Pan Helios', 'star-1760476207326-648574', 'rocky', 0.64, 0, 332, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-982040', 'Thanatos', 'star-1760476207326-356549', 'frozen', 0.68, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-852282', 'Hyperion', 'star-1760476207326-228260', 'ice-giant', 0.65, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-708154', 'Trans Erebus Septimus', 'star-1760476207326-228260', 'frozen', 0.87, 0, 29, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-876096', 'Erebus', 'star-1760476207326-228260', 'frozen', 1.4, 0, 11, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-878378', 'Tera Aether', 'star-1760476207326-99815', 'rocky', 0.6, 0, 355, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-359096', 'Bronto Ares', 'star-1760476207326-99815', 'terrestrial', 0.96, 55, 296, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-651225', 'Exo Coeus Borealis', 'star-1760476207326-99815', 'ice-giant', 1.55, 0, 234, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-197687', 'Hera', 'star-1760476207326-1818', 'rocky', 0.61, 0, 350, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208420-658782', 'Poseidon Inferior', 'star-1760476207326-49531', 'rocky', 0.68, 0, 348, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-288705', 'Ares', 'star-1760476207344-837395', 'rocky', 0.66, 0, 397, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-725745', 'Athena', 'star-1760476207344-115777', 'rocky', 0.71, 0, 499, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-385711', 'Supra Demeter', 'star-1760476207344-121262', 'ice-giant', 0.67, 0, 174, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-453311', 'Archaeo Hermes', 'star-1760476207344-121262', 'gas-giant', 0.96, 0, 130, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-299322', 'Gaia Remota', 'star-1760476207344-121262', 'frozen', 1.47, 0, 90, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-650734', 'Terra Minimus', 'star-1760476207344-121262', 'frozen', 2.86, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-843952', 'Terra', 'star-1760476207344-121262', 'frozen', 4.92, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-438545', 'Selene', 'star-1760476207344-121262', 'frozen', 9.17, 0, 29, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-940086', 'Holo Ares', 'star-1760476207344-568877', 'rocky', 0.74, 0, 333, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-449676', 'Poly Ares Remota', 'star-1760476207344-62048', 'molten', 0.69, 0, 1356, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-898839', 'Hyper Aphrodite Kappa', 'star-1760476207344-677100', 'rocky', 0.6, 0, 556, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-447024', 'Neo Epimetheus Borealis', 'star-1760476207344-514225', 'molten', 0.69, 0, 1021, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-92175', 'Super Hades', 'star-1760476207344-259997', 'frozen', 0.71, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208437-859867', 'Macro Rhea', 'star-1760476207344-259997', 'frozen', 0.9, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-717078', 'Erebus Theta', 'star-1760476207362-95489', 'ice-giant', 0.64, 0, 98, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-196605', 'Atlas Obscurus', 'star-1760476207362-95489', 'frozen', 0.99, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-337992', 'Crius Iota', 'star-1760476207362-95489', 'frozen', 1.63, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-448547', 'Uranus Calidus', 'star-1760476207362-50107', 'rocky', 0.67, 0, 353, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-78352', 'Zephyrus Luminosus', 'star-1760476207362-526803', 'frozen', 0.8, 0, 89, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-705812', 'Quasi Atlas Sextus', 'star-1760476207362-391940', 'terrestrial', 0.79, 35, 357, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-153309', 'Zephyrus Orientalis', 'star-1760476207362-497702', 'ice-giant', 0.79, 0, 102, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-721978', 'Holo Prometheus Delta', 'star-1760476207362-497702', 'frozen', 1.12, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-456034', 'Tartarus', 'star-1760476207362-239244', 'terrestrial', 0.77, 85, 321, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-780056', 'Hephaestus Primus', 'star-1760476207362-239244', 'terrestrial', 1.01, 60, 239, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-64537', 'Hemera Crystallus', 'star-1760476207362-922167', 'frozen', 0.6, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208454-479720', 'Meso Athena Nonus', 'star-1760476207362-922167', 'frozen', 0.97, 0, 42, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-560150', 'Pseudo Artemis Gamma', 'star-1760476207380-86789', 'terrestrial', 0.78, 20, 489, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-381892', 'Thalassa Antiquus', 'star-1760476207380-89097', 'rocky', 0.72, 0, 328, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-47968', 'Super Hypnos', 'star-1760476207380-854390', 'molten', 0.79, 0, 980, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-803566', 'Quasi Mnemosyne Borealis', 'star-1760476207380-823691', 'rocky', 0.78, 0, 556, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-199816', 'Prometheus Eta', 'star-1760476207380-823691', 'rocky', 1.14, 0, 493, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-60023', 'Yotta Erebus Aquaticus', 'star-1760476207380-823691', 'terrestrial', 1.5, 30, 452, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-213016', 'Oceanus', 'star-1760476207380-823691', 'ice-giant', 2.85, 0, 298, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-469208', 'Para Nemesis', 'star-1760476207380-660407', 'rocky', 0.8, 0, 385, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-766838', 'Paleo Tethys', 'star-1760476207380-660407', 'terrestrial', 0.98, 20, 412, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-236334', 'Selene', 'star-1760476207380-258353', 'frozen', 0.78, 0, 69, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-38328', 'Dionysus', 'star-1760476207380-862050', 'frozen', 0.62, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208471-975987', 'Micro Mnemosyne Zeta', 'star-1760476207380-953807', 'rocky', 0.69, 0, 344, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-640142', 'Mega Helios Aquaticus', 'star-1760476207397-231005', 'rocky', 0.62, 0, 392, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-220509', 'Quasi Ares', 'star-1760476207397-231005', 'rocky', 0.85, 0, 293, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-961521', 'Yotta Hypnos', 'star-1760476207397-211970', 'gas-giant', 0.64, 0, 110, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-528195', 'Pontus Ferreus', 'star-1760476207397-211970', 'frozen', 1.12, 0, 77, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-804628', 'Atlas Maximus', 'star-1760476207397-211970', 'frozen', 1.54, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-489368', 'Femto Zephyrus', 'star-1760476207397-942552', 'frozen', 0.76, 0, 99, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-999394', 'Super Aether Borealis', 'star-1760476207397-942552', 'frozen', 1.09, 0, 76, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-597594', 'Quasi Aphrodite', 'star-1760476207397-942552', 'frozen', 1.63, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-982933', 'Notus', 'star-1760476207397-942552', 'ice-giant', 2.5, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-642747', 'Geras', 'star-1760476207397-942552', 'frozen', 5.38, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-754322', 'Crypto Aphrodite Occidentalis', 'star-1760476207397-942552', 'frozen', 10.45, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-365331', 'Exa Hephaestus', 'star-1760476207397-776441', 'rocky', 0.74, 0, 428, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-619675', 'Holo Rhea Superior', 'star-1760476207397-776441', 'rocky', 0.89, 0, 444, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-794476', 'Mnemosyne Novus', 'star-1760476207397-43745', 'rocky', 0.77, 0, 586, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-575848', 'New Aether Iota', 'star-1760476207397-43745', 'terrestrial', 1.04, 45, 518, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-263262', 'Hemi Chronos Maximus', 'star-1760476207397-43745', 'terrestrial', 1.61, 10, 456, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208490-996679', 'Omni Aether Kappa', 'star-1760476207397-343145', 'rocky', 0.61, 0, 397, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208507-928859', 'Ares Aquaticus', 'star-1760476207416-870047', 'frozen', 0.62, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208507-97140', 'Hypnos', 'star-1760476207416-870047', 'frozen', 1.14, 0, 27, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208507-610791', 'Crius', 'star-1760476207416-870047', 'ice-giant', 1.63, 0, 38, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208507-960551', 'Hemi Dionysus Aquaticus', 'star-1760476207416-75372', 'rocky', 0.78, 0, 357, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208507-559347', 'Giga Nyx Tertius', 'star-1760476207416-830218', 'rocky', 0.67, 0, 353, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-580716', 'Aether Maximus', 'star-1760476207416-447760', 'molten', 0.61, 0, 4087, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-273367', 'Notus Kappa', 'star-1760476207416-150949', 'ice-giant', 0.77, 0, 172, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-579786', 'Notus Remota', 'star-1760476207416-150949', 'rocky', 1.03, 0, 139, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-387145', 'Hypo Mnemosyne Quintus', 'star-1760476207416-890273', 'rocky', 0.65, 0, 95, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-33476', 'Endo Nemesis', 'star-1760476207416-890273', 'frozen', 1, 0, 87, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-45597', 'Luna', 'star-1760476207416-243660', 'ice-giant', 0.76, 0, 64, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-391241', 'Pan Luna Minor', 'star-1760476207416-398864', 'molten', 0.8, 0, 867, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208508-633371', 'Iapetus Aquaticus', 'star-1760476207416-398864', 'rocky', 0.86, 0, 780, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-362962', 'Multi Tethys', 'star-1760476207434-613310', 'frozen', 0.7, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-24010', 'Super Phoebe', 'star-1760476207434-613310', 'frozen', 0.93, 0, 25, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-278161', 'Endo Oceanus Novus', 'star-1760476207434-613310', 'frozen', 1.6, 0, 22, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-201004', 'Selene Iota', 'star-1760476207434-628520', 'rocky', 0.64, 0, 360, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-960726', 'Xeno Pontus', 'star-1760476207434-610030', 'frozen', 0.62, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-94414', 'Pontus Kappa', 'star-1760476207434-466906', 'frozen', 0.75, 0, 78, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-481273', 'Artemis Beta', 'star-1760476207434-466906', 'frozen', 0.94, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-456687', 'Athena', 'star-1760476207434-466906', 'frozen', 1.8, 0, 50, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-699803', 'Aether', 'star-1760476207434-380835', 'frozen', 0.8, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-277376', 'Atlas', 'star-1760476207434-380835', 'frozen', 0.85, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-508943', 'Uranus', 'star-1760476207434-477679', 'terrestrial', 0.73, 15, 334, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-773842', 'Aether', 'star-1760476207434-477679', 'rocky', 1.14, 0, 258, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-662238', 'Supra Phoebe Ferreus', 'star-1760476207434-477679', 'ice-giant', 1.73, 0, 229, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-917205', 'Poseidon Australis', 'star-1760476207434-300814', 'molten', 0.62, 0, 2059, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-290922', 'Ares Exterior', 'star-1760476207434-309889', 'frozen', 0.76, 0, 69, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-956941', 'Persephone Magnus', 'star-1760476207434-309889', 'ice-giant', 1.03, 0, 105, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208527-2223', 'Helios Secundus', 'star-1760476207434-309889', 'frozen', 1.7, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-108557', 'Atlas Antiquus', 'star-1760476207472-809898', 'molten', 0.62, 0, 1756, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-405546', 'Tethys', 'star-1760476207472-809898', 'molten', 1.07, 0, 1331, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-116039', 'Hyper Eros', 'star-1760476207472-809898', 'molten', 1.82, 0, 1031, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-354128', 'Sol', 'star-1760476207472-416102', 'rocky', 0.71, 0, 344, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-241008', 'Aether Nonus', 'star-1760476207472-416345', 'rocky', 0.8, 0, 356, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-126818', 'Coeus', 'star-1760476207472-416345', 'rocky', 0.89, 0, 356, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-738870', 'Aegaeon', 'star-1760476207472-416345', 'rocky', 1.51, 0, 220, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-482530', 'Para Demeter', 'star-1760476207472-171797', 'rocky', 0.68, 0, 308, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-695870', 'Dionysus', 'star-1760476207472-429214', 'frozen', 0.62, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208544-438546', 'Supra Rhea Theta', 'star-1760476207472-615775', 'rocky', 0.64, 0, 122, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-686612', 'Paleo Geras Delta', 'star-1760476207472-615775', 'ice-giant', 1.1, 0, 118, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-347548', 'Archaeo Nyx Septimus', 'star-1760476207472-615775', 'frozen', 1.48, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-579037', 'Hypnos Minimus', 'star-1760476207472-615775', 'frozen', 2.57, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-61196', 'Theia Primus', 'star-1760476207472-872460', 'frozen', 0.64, 0, 64, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-208102', 'Sol Magnus', 'star-1760476207472-872460', 'frozen', 1.13, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-559200', 'Persephone Antiquus', 'star-1760476207472-872460', 'frozen', 1.59, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-498316', 'Poseidon', 'star-1760476207472-659880', 'frozen', 0.6, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208545-636249', 'Zetta Cronus', 'star-1760476207472-739601', 'frozen', 0.64, 0, 24, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-564658', 'Notus Inferior', 'star-1760476207510-938608', 'frozen', 0.71, 0, 94, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-20014', 'Hypnos', 'star-1760476207510-516133', 'ice-giant', 0.65, 0, 100, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-679392', 'Mono Hypnos Major', 'star-1760476207510-592580', 'rocky', 0.63, 0, 89, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-128741', 'Palaeo Geras', 'star-1760476207510-592580', 'frozen', 1.03, 0, 81, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-809535', 'Trans Erebus Antiquus', 'star-1760476207510-888153', 'frozen', 0.77, 0, 80, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-409864', 'Femto Zephyrus', 'star-1760476207510-914548', 'frozen', 0.75, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-538318', 'Atlas Decimus', 'star-1760476207510-455478', 'rocky', 0.73, 0, 321, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-858120', 'Giga Hemera', 'star-1760476207510-826445', 'molten', 0.62, 0, 16134, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-170825', 'Aegaeon Antiquus', 'star-1760476207510-321769', 'frozen', 0.7, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-763798', 'Neo Hyperion', 'star-1760476207510-515192', 'frozen', 0.77, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-967858', 'Hemera Occidentalis', 'star-1760476207510-884774', 'frozen', 0.63, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-126126', 'Boreas Borealis', 'star-1760476207510-884774', 'frozen', 0.91, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-868861', 'Macro Helios Remota', 'star-1760476207510-884774', 'frozen', 1.8, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208568-285128', 'Nano Hemera', 'star-1760476207510-884774', 'frozen', 3, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-328849', 'Zephyrus Minimus', 'star-1760476207547-774251', 'ice-giant', 0.75, 0, 191, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-498787', 'Endo Uranus Beta', 'star-1760476207547-774251', 'ice-giant', 1.01, 0, 161, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-35767', 'Old Dionysus', 'star-1760476207547-774251', 'ice-giant', 1.41, 0, 127, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-698309', 'Phoebe', 'star-1760476207547-774251', 'frozen', 2.83, 0, 94, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-362633', 'Theia Zeta', 'star-1760476207547-616990', 'ice-giant', 0.74, 0, 118, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-234388', 'Super Hera', 'star-1760476207547-616990', 'frozen', 1, 0, 81, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-494228', 'Yotta Geras Aquaticus', 'star-1760476207547-616990', 'frozen', 1.48, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-634330', 'Macro Rhea Aquaticus', 'star-1760476207547-326174', 'molten', 0.71, 0, 823, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-378172', 'Hyper Coeus Alpha', 'star-1760476207547-581438', 'frozen', 0.63, 0, 73, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-257262', 'Archaeo Atlas Calidus', 'star-1760476207547-930657', 'rocky', 0.72, 0, 314, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-300156', 'Hades', 'star-1760476207547-930657', 'terrestrial', 0.88, 100, 304, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-669810', 'Persephone', 'star-1760476207547-620103', 'rocky', 0.74, 0, 336, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-799624', 'Zetta Geras Occidentalis', 'star-1760476207547-544703', 'rocky', 0.66, 0, 354, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208596-585242', 'Hyper Theia', 'star-1760476207547-589668', 'rocky', 0.65, 0, 390, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-81144', 'Hemera', 'star-1760476207584-761649', 'terrestrial', 0.66, 55, 279, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-401491', 'Geras Prime', 'star-1760476207584-595661', 'frozen', 0.63, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-301004', 'Holo Demeter', 'star-1760476207584-297353', 'frozen', 0.73, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-72926', 'Infra Aegaeon Ultimus', 'star-1760476207584-297353', 'frozen', 1.15, 0, 50, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-449249', 'Mega Hyperion', 'star-1760476207584-45756', 'frozen', 0.69, 0, 59, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-827993', 'Phanes', 'star-1760476207584-811450', 'ice-giant', 0.62, 0, 147, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-215712', 'Yotta Ananke', 'star-1760476207584-202609', 'molten', 0.68, 0, 18014, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-823755', 'Zetta Uranus', 'star-1760476207584-311003', 'frozen', 0.61, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-181246', 'Aphrodite', 'star-1760476207584-311003', 'frozen', 1.07, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-632739', 'Micro Cronus Aquaticus', 'star-1760476207584-311003', 'frozen', 1.38, 0, 19, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-318825', 'Iapetus Secundus', 'star-1760476207584-197716', 'frozen', 0.74, 0, 45, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-708222', 'New Hephaestus Beta', 'star-1760476207584-923534', 'frozen', 0.72, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-705239', 'Themis', 'star-1760476207584-621677', 'frozen', 0.78, 0, 96, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208614-999620', 'Ananke', 'star-1760476207584-621677', 'ice-giant', 1.03, 0, 104, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-737557', 'Exo Sol Inferior', 'star-1760476207623-668178', 'rocky', 0.77, 0, 271, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-727907', 'Exa Epimetheus Aquaticus', 'star-1760476207623-668178', 'rocky', 0.96, 0, 296, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-718530', 'Bronto Ananke Aquaticus', 'star-1760476207623-668178', 'ice-giant', 1.76, 0, 182, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-931192', 'Hephaestus Frigidus', 'star-1760476207623-668178', 'ice-giant', 3.21, 0, 145, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-996604', 'Archaeo Aegaeon', 'star-1760476207623-971293', 'rocky', 0.78, 0, 471, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-213702', 'Ares', 'star-1760476207623-971293', 'terrestrial', 0.9, 35, 451, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-326073', 'Pico Terra Antiquus', 'star-1760476207623-971293', 'terrestrial', 1.4, 45, 385, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-955291', 'Hyper Helios Australis', 'star-1760476207623-971293', 'rocky', 2.59, 0, 301, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-602957', 'Epimetheus', 'star-1760476207623-500800', 'rocky', 0.67, 0, 440, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-500962', 'Yocto Epimetheus', 'star-1760476207623-500800', 'terrestrial', 1.05, 65, 303, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-944275', 'Prometheus', 'star-1760476207623-500800', 'ice-giant', 1.63, 0, 267, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-812927', 'Atlas', 'star-1760476207623-500800', 'rocky', 2.56, 0, 249, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-281078', 'Aphrodite Quintus', 'star-1760476207623-557135', 'rocky', 0.62, 0, 365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-950296', 'Hyper Chronos', 'star-1760476207623-557135', 'terrestrial', 1.08, 35, 328, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-511328', 'Crius', 'star-1760476207623-278747', 'rocky', 0.61, 0, 559, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-92981', 'Sol Epsilon', 'star-1760476207623-278747', 'rocky', 1.04, 0, 435, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-90750', 'Nyx', 'star-1760476207623-538872', 'terrestrial', 0.68, 0, 626, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-312388', 'Hemera Remota', 'star-1760476207623-338567', 'rocky', 0.67, 0, 353, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208631-940685', 'Crypto Helios Centralis', 'star-1760476207623-8190', 'rocky', 0.7, 0, 437, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-977130', 'Meso Hera Minor', 'star-1760476207666-530766', 'terrestrial', 0.73, 30, 391, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-663915', 'Boreas Obscurus', 'star-1760476207666-530766', 'terrestrial', 1.08, 85, 314, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-613699', 'Apollo Proxima', 'star-1760476207666-773973', 'molten', 0.69, 0, 669, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-334203', 'Uranus', 'star-1760476207666-773973', 'terrestrial', 1.13, 10, 550, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-555220', 'Hypnos Centralis', 'star-1760476207666-773973', 'terrestrial', 1.64, 30, 444, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-18564', 'Yotta Phoebe Ultimus', 'star-1760476207666-773973', 'gas-giant', 2.47, 0, 336, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-983136', 'Pseudo Hera', 'star-1760476207666-982465', 'rocky', 0.77, 0, 7473, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-684816', 'Poseidon Saxeus', 'star-1760476207666-982465', 'molten', 1, 0, 6552, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-237171', 'Sol Iota', 'star-1760476207666-982465', 'molten', 1.56, 0, 5289, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-666592', 'Thanatos', 'star-1760476207666-982465', 'rocky', 2.93, 0, 3833, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-263578', 'Omni Eros Octavus', 'star-1760476207666-79217', 'frozen', 0.75, 0, 73, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-92269', 'Terra', 'star-1760476207666-79217', 'frozen', 1.12, 0, 72, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-571723', 'Hyperion', 'star-1760476207666-360894', 'molten', 0.68, 0, 8731, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-335056', 'Xeno Hera Epsilon', 'star-1760476207666-360894', 'molten', 1.12, 0, 6818, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-825688', 'Atto Phoebe', 'star-1760476207666-437255', 'rocky', 0.76, 0, 314, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-554279', 'Tethys', 'star-1760476207666-437255', 'terrestrial', 0.99, 45, 324, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-419986', 'Thanatos Exterior', 'star-1760476207666-437255', 'rocky', 1.36, 0, 292, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-108695', 'Ananke Remota', 'star-1760476207666-793554', 'rocky', 0.62, 0, 363, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-161634', 'Atlas', 'star-1760476207666-77465', 'rocky', 0.69, 0, 395, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208648-651980', 'Hyper Thalassa Aquaticus', 'star-1760476207666-293428', 'gas-giant', 0.77, 0, 167, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-835494', 'Themis Quintus', 'star-1760476207686-627299', 'frozen', 0.67, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-186096', 'Macro Ananke Eta', 'star-1760476207686-627299', 'frozen', 1.14, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-854063', 'Nemesis', 'star-1760476207686-627299', 'frozen', 1.6, 0, 18, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-749990', 'Uranus Theta', 'star-1760476207686-824228', 'terrestrial', 0.72, 0, 629, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-492801', 'Nemesis Tertius', 'star-1760476207686-824228', 'rocky', 1.13, 0, 504, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-858689', 'Nano Tartarus Proxima', 'star-1760476207686-513721', 'molten', 0.71, 0, 7374, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-613853', 'Pico Pontus Maximus', 'star-1760476207686-513721', 'molten', 0.88, 0, 6615, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-962799', 'Coeus Ultimus', 'star-1760476207686-513721', 'rocky', 1.37, 0, 5307, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-679601', 'Hades Nonus', 'star-1760476207686-166523', 'terrestrial', 0.77, 85, 333, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-618585', 'Oneiroi Saxeus', 'star-1760476207686-696945', 'molten', 0.61, 0, 650, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-655725', 'Xeno Athena Decimus', 'star-1760476207686-730016', 'frozen', 0.75, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-60854', 'Uranus Luminosus', 'star-1760476207686-295', 'rocky', 0.72, 0, 312, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-100359', 'Mono Notus Maximus', 'star-1760476207686-295', 'rocky', 0.94, 0, 350, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208683-698013', 'Supra Themis Frigidus', 'star-1760476207686-295', 'rocky', 1.37, 0, 282, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-396428', 'Sol Luminosus', 'star-1760476207712-906651', 'rocky', 0.66, 0, 93, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-515076', 'Hyper Artemis', 'star-1760476207712-906651', 'frozen', 0.85, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-645458', 'Theia Sextus', 'star-1760476207712-906651', 'frozen', 1.68, 0, 66, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-405059', 'Iapetus Novus', 'star-1760476207712-906651', 'ice-giant', 2.69, 0, 77, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-635326', 'Apollo', 'star-1760476207712-906651', 'frozen', 5.14, 0, 44, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-176531', 'Chronos', 'star-1760476207712-906651', 'ice-giant', 9.72, 0, 49, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-562342', 'Gaia Ferreus', 'star-1760476207712-409543', 'frozen', 0.61, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-582552', 'Pan Tartarus Orientalis', 'star-1760476207712-409543', 'ice-giant', 1.04, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-138558', 'Tele Zeus', 'star-1760476207712-409543', 'frozen', 1.58, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-710966', 'Bronto Phoebe', 'star-1760476207712-141463', 'frozen', 0.76, 0, 29, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-784161', 'Sol', 'star-1760476207712-698959', 'terrestrial', 0.69, 75, 358, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-46677', 'Thalassa', 'star-1760476207712-131859', 'rocky', 0.61, 0, 344, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-281049', 'Trans Zephyrus Luminosus', 'star-1760476207712-131859', 'rocky', 1.08, 0, 262, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-826665', 'Hephaestus', 'star-1760476207712-391639', 'rocky', 0.63, 0, 392, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208700-781404', 'Supra Helios Ferreus', 'star-1760476207712-262168', 'terrestrial', 0.74, 60, 371, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-281974', 'Themis', 'star-1760476207734-770924', 'frozen', 0.62, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-238481', 'Artemis Primus', 'star-1760476207734-770924', 'frozen', 1.1, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-880626', 'Oneiroi Exterior', 'star-1760476207734-770924', 'frozen', 1.68, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-68904', 'Hyper Epimetheus Gamma', 'star-1760476207734-697194', 'rocky', 0.64, 0, 355, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-365984', 'Ananke Septimus', 'star-1760476207734-226042', 'rocky', 0.71, 0, 390, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-127696', 'Dionysus', 'star-1760476207734-595645', 'frozen', 0.7, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-242757', 'Peta Hades Australis', 'star-1760476207734-566883', 'ice-giant', 0.63, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-862014', 'Old Nemesis Novus', 'star-1760476207734-548939', 'rocky', 0.8, 0, 190, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-492435', 'Super Boreas', 'star-1760476207734-548939', 'ice-giant', 0.92, 0, 201, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-249215', 'Mono Rhea Alpha', 'star-1760476207734-548939', 'frozen', 1.66, 0, 142, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-622211', 'Pico Phoebe', 'star-1760476207734-445487', 'molten', 0.75, 0, 7966, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-666594', 'Boreas', 'star-1760476207734-663403', 'rocky', 0.71, 0, 389, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208734-438664', 'Notus', 'star-1760476207734-663403', 'rocky', 1.06, 0, 324, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-445730', 'Uranus', 'star-1760476207753-656302', 'frozen', 0.65, 0, 19, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-534118', 'Prometheus', 'star-1760476207753-779083', 'rocky', 0.65, 0, 333, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-220406', 'Athena Tertius', 'star-1760476207753-511996', 'frozen', 0.68, 0, 93, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-758125', 'Omni Zeus', 'star-1760476207753-511996', 'frozen', 1.04, 0, 85, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-769778', 'Palaeo Uranus Borealis', 'star-1760476207753-389482', 'frozen', 0.7, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-37066', 'Hades Tertius', 'star-1760476207753-253002', 'frozen', 0.62, 0, 78, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-490138', 'Giga Tartarus', 'star-1760476207753-253002', 'frozen', 0.88, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-613870', 'Oceanus Interior', 'star-1760476207753-253002', 'frozen', 1.7, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-258335', 'Hyperion Crystallus', 'star-1760476207753-866272', 'ice-giant', 0.7, 0, 92, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-595932', 'Proto Chronos Aquaticus', 'star-1760476207753-971003', 'rocky', 0.73, 0, 109, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-251202', 'Palaeo Notus', 'star-1760476207753-971003', 'frozen', 1.13, 0, 108, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-551279', 'Omni Ananke', 'star-1760476207753-971003', 'frozen', 1.81, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-405120', 'Holo Phanes', 'star-1760476207753-971003', 'frozen', 2.83, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208760-924502', 'Meso Erebus', 'star-1760476207753-971003', 'frozen', 5.69, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-498932', 'Persephone Zeta', 'star-1760476207770-873072', 'frozen', 0.78, 0, 98, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-424846', 'Zepto Artemis', 'star-1760476207770-255113', 'frozen', 0.69, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-170065', 'Sol Major', 'star-1760476207770-255113', 'frozen', 1.11, 0, 16, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-410100', 'Hemi Thalassa Novus', 'star-1760476207770-251571', 'ice-giant', 0.77, 0, 84, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-896086', 'Hypnos Exterior', 'star-1760476207770-251571', 'frozen', 1.11, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-94861', 'Theia', 'star-1760476207770-697623', 'terrestrial', 0.76, 35, 371, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-96961', 'Hypnos Eta', 'star-1760476207770-271810', 'frozen', 0.77, 0, 38, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-57510', 'Notus', 'star-1760476207770-807559', 'frozen', 0.63, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-254337', 'Uranus Nonus', 'star-1760476207770-462940', 'frozen', 0.8, 0, 91, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-291515', 'Aegaeon', 'star-1760476207770-462940', 'frozen', 1.1, 0, 82, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-900728', 'Cronus Sextus', 'star-1760476207770-462940', 'frozen', 1.46, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-855847', 'Prometheus', 'star-1760476207770-689529', 'terrestrial', 0.75, 60, 355, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-776927', 'Hyperion Ferreus', 'star-1760476207770-689529', 'terrestrial', 0.97, 90, 307, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208779-51331', 'Aphrodite Magnus', 'star-1760476207770-689529', 'ice-giant', 1.45, 0, 246, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-676853', 'Old Ananke Beta', 'star-1760476207787-670914', 'rocky', 0.68, 0, 512, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-53390', 'Hephaestus', 'star-1760476207787-643053', 'rocky', 0.62, 0, 518, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-715399', 'Old Zephyrus', 'star-1760476207787-643053', 'rocky', 1.14, 0, 379, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-287197', 'Paleo Aphrodite', 'star-1760476207787-643053', 'terrestrial', 1.58, 85, 334, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-492939', 'Luna Secundus', 'star-1760476207787-643053', 'ice-giant', 3.04, 0, 241, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-753970', 'Athena Orientalis', 'star-1760476207787-74074', 'terrestrial', 0.7, 10, 383, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-154002', 'Para Persephone Aquaticus', 'star-1760476207787-74074', 'terrestrial', 0.97, 65, 289, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-325600', 'Hephaestus Epsilon', 'star-1760476207787-74074', 'rocky', 1.74, 0, 216, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-178948', 'Paleo Zeus Crystallus', 'star-1760476207787-825268', 'frozen', 0.64, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-155973', 'Archaeo Aegaeon Exterior', 'star-1760476207787-825268', 'frozen', 0.92, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-417457', 'Peta Aphrodite Epsilon', 'star-1760476207787-52418', 'frozen', 0.79, 0, 62, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-912873', 'Ultra Nyx', 'star-1760476207787-52418', 'frozen', 1.03, 0, 41, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-923485', 'Tera Tartarus Alpha', 'star-1760476207787-480106', 'rocky', 0.61, 0, 183, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-635183', 'Atlas Eta', 'star-1760476207787-480106', 'rocky', 0.97, 0, 208, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-705644', 'Atto Hephaestus Luminosus', 'star-1760476207787-480106', 'frozen', 1.81, 0, 109, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-882103', 'Holo Helios Obscurus', 'star-1760476207787-174399', 'terrestrial', 0.77, 100, 322, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-412395', 'Zepto Terra Delta', 'star-1760476207787-174399', 'rocky', 1.04, 0, 320, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-245013', 'Multi Hemera', 'star-1760476207787-174399', 'ice-giant', 1.61, 0, 233, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-4681', 'Neo Epimetheus Borealis', 'star-1760476207787-930017', 'terrestrial', 0.77, 70, 352, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-624980', 'Meta Mnemosyne Quintus', 'star-1760476207787-930017', 'terrestrial', 1.07, 75, 300, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-788457', 'Hyper Thalassa', 'star-1760476207787-930017', 'rocky', 1.65, 0, 257, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-756106', 'Infra Poseidon', 'star-1760476207787-283263', 'frozen', 0.7, 0, 26, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208797-647619', 'Erebus', 'star-1760476207787-833407', 'terrestrial', 0.71, 70, 371, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-471068', 'Micro Boreas', 'star-1760476207804-620237', 'terrestrial', 0.79, 45, 350, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-558721', 'Pontus', 'star-1760476207804-620237', 'rocky', 0.96, 0, 327, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-779202', 'Phoebe Saxeus', 'star-1760476207804-280753', 'rocky', 0.62, 0, 390, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-743854', 'Giga Sol Zeta', 'star-1760476207804-527595', 'terrestrial', 0.63, 75, 370, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-292885', 'Ananke Gamma', 'star-1760476207804-694218', 'frozen', 0.6, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-743638', 'Multi Thanatos', 'star-1760476207804-694218', 'frozen', 1.04, 0, 34, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-221657', 'Tartarus Secundus', 'star-1760476207804-694218', 'ice-giant', 1.67, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-777603', 'Thalassa', 'star-1760476207804-42007', 'ice-giant', 0.78, 0, 74, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-32271', 'Palaeo Nyx Decimus', 'star-1760476207804-42007', 'frozen', 1.07, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-482499', 'Athena Aquaticus', 'star-1760476207804-499938', 'frozen', 0.79, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-981729', 'Aegaeon', 'star-1760476207804-529521', 'rocky', 0.74, 0, 378, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208814-741281', 'Thanatos Saxeus', 'star-1760476207804-436790', 'terrestrial', 0.75, 10, 373, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-18671', 'Dionysus Exterior', 'star-1760476207829-621666', 'frozen', 0.69, 0, 33, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-442632', 'Pan Thanatos', 'star-1760476207829-764464', 'frozen', 0.75, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-510340', 'Meta Ananke Primus', 'star-1760476207829-764464', 'frozen', 1.15, 0, 55, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-510021', 'Epimetheus Interior', 'star-1760476207829-578042', 'rocky', 0.73, 0, 313, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-448259', 'Gaia Maximus', 'star-1760476207829-578042', 'terrestrial', 1.14, 65, 302, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-360248', 'Multi Phanes Borealis', 'star-1760476207829-391944', 'frozen', 0.7, 0, 90, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-282786', 'Hyperion', 'star-1760476207829-391944', 'frozen', 0.89, 0, 88, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-480358', 'New Eros Superior', 'star-1760476207829-391944', 'frozen', 1.42, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-270450', 'Cronus Maximus', 'star-1760476207829-391944', 'ice-giant', 3.18, 0, 64, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-698262', 'Crius', 'star-1760476207829-259990', 'rocky', 0.69, 0, 106, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-450489', 'Sol', 'star-1760476207829-259990', 'frozen', 1.14, 0, 71, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-94344', 'Oceanus', 'star-1760476207829-259990', 'frozen', 1.71, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-859434', 'Artemis Gamma', 'star-1760476207829-259990', 'frozen', 2.5, 0, 63, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-604130', 'Thanatos Beta', 'star-1760476207829-259990', 'frozen', 5.92, 0, 40, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208831-786861', 'Hyper Ares Zeta', 'star-1760476207829-960495', 'frozen', 0.72, 0, 22, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-246416', 'Hades Interior', 'star-1760476207847-878223', 'rocky', 0.61, 0, 368, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-616232', 'Peta Notus Interior', 'star-1760476207847-257055', 'frozen', 0.74, 0, 22, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-548907', 'Apollo Theta', 'star-1760476207847-606753', 'frozen', 0.62, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-266004', 'Old Iapetus Theta', 'star-1760476207847-606753', 'frozen', 1.02, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-709547', 'Helios', 'star-1760476207847-606753', 'frozen', 1.44, 0, 36, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-104216', 'Coeus Minimus', 'star-1760476207847-598093', 'molten', 0.74, 0, 16578, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-770125', 'Terra', 'star-1760476207847-76435', 'frozen', 0.65, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-898672', 'Macro Zephyrus Parvus', 'star-1760476207847-76435', 'frozen', 0.95, 0, 14, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-419609', 'Geras', 'star-1760476207847-704938', 'gas-giant', 0.72, 0, 109, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-767369', 'Infra Hephaestus Iota', 'star-1760476207847-704938', 'frozen', 0.92, 0, 82, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-222521', 'Persephone Sextus', 'star-1760476207847-704938', 'frozen', 1.7, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-30365', 'Tethys Primus', 'star-1760476207847-704938', 'frozen', 2.74, 0, 38, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-907843', 'Multi Nyx', 'star-1760476207847-704938', 'frozen', 5.64, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-65670', 'Cronus', 'star-1760476207847-704938', 'frozen', 10.94, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-148549', 'Demeter', 'star-1760476207847-704938', 'frozen', 17.97, 0, 19, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-338997', 'Pico Helios Kappa', 'star-1760476207847-793882', 'terrestrial', 0.77, 25, 364, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-999309', 'Mnemosyne Centralis', 'star-1760476207847-793882', 'terrestrial', 0.98, 40, 336, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-630008', 'Mono Dionysus Septimus', 'star-1760476207847-793882', 'ice-giant', 1.44, 0, 244, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-504299', 'Mnemosyne', 'star-1760476207847-298690', 'frozen', 0.63, 0, 49, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-936596', 'Proto Aegaeon', 'star-1760476207847-298690', 'frozen', 1.02, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208848-34506', 'Hermes Quintus', 'star-1760476207847-298690', 'frozen', 1.69, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-151403', 'New Aegaeon Borealis', 'star-1760476207865-971629', 'ice-giant', 0.73, 0, 65, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-845817', 'Pseudo Apollo', 'star-1760476207865-892694', 'frozen', 0.64, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-477823', 'Mono Phoebe', 'star-1760476207865-892694', 'frozen', 1.07, 0, 25, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-240017', 'Thanatos Delta', 'star-1760476207865-889127', 'rocky', 0.74, 0, 297, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-479217', 'Themis Australis', 'star-1760476207865-670944', 'frozen', 0.68, 0, 24, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-560570', 'Iso Zephyrus', 'star-1760476207865-670944', 'ice-giant', 1.06, 0, 46, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-868589', 'Zepto Hephaestus Aquaticus', 'star-1760476207865-642753', 'rocky', 0.7, 0, 320, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-404140', 'Peta Luna', 'star-1760476207865-460426', 'frozen', 0.69, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-426275', 'Iso Gaia', 'star-1760476207865-460426', 'frozen', 0.92, 0, 16, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-986720', 'Yocto Demeter', 'star-1760476207865-663845', 'molten', 0.76, 0, 205882, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-531094', 'Hades Inferior', 'star-1760476207865-663845', 'molten', 1, 0, 179432, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-648138', 'Notus Minor', 'star-1760476207865-760031', 'rocky', 0.68, 0, 349, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208865-644641', 'Erebus', 'star-1760476207865-554816', 'terrestrial', 0.72, 55, 296, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-6600', 'Artemis', 'star-1760476207901-746293', 'frozen', 0.77, 0, 67, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-803055', 'Artemis Parvus', 'star-1760476207901-746293', 'frozen', 1, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-326801', 'Sol Crystallus', 'star-1760476207901-746293', 'ice-giant', 1.38, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-803823', 'Femto Poseidon Tertius', 'star-1760476207901-844383', 'terrestrial', 0.64, 30, 396, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-219037', 'Hypo Iapetus', 'star-1760476207901-894391', 'gas-giant', 0.63, 0, 126, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-607093', 'Themis Aquaticus', 'star-1760476207901-894391', 'frozen', 0.88, 0, 72, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-596235', 'Persephone Luminosus', 'star-1760476207901-935592', 'rocky', 0.66, 0, 406, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-937292', 'Eros Centralis', 'star-1760476207901-935592', 'terrestrial', 1.11, 65, 275, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-722886', 'Boreas Iota', 'star-1760476207901-592081', 'frozen', 0.67, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-370676', 'Trans Thanatos Interior', 'star-1760476207901-592081', 'frozen', 0.98, 0, 53, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-344367', 'Hermes', 'star-1760476207901-592081', 'ice-giant', 1.7, 0, 56, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-482918', 'Neo Phanes Ultimus', 'star-1760476207901-566344', 'molten', 0.66, 0, 685, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-96707', 'Demeter', 'star-1760476207901-965279', 'frozen', 0.72, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-93931', 'Prometheus Major', 'star-1760476207901-36903', 'frozen', 0.77, 0, 36, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208882-200500', 'Eros', 'star-1760476207901-624323', 'frozen', 0.61, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-613957', 'Yotta Hades', 'star-1760476207937-152878', 'rocky', 0.72, 0, 517, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-151060', 'Atlas', 'star-1760476207937-152878', 'rocky', 0.94, 0, 431, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-418788', 'Multi Hypnos', 'star-1760476207937-794913', 'rocky', 0.67, 0, 227, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-72176', 'Tethys', 'star-1760476207937-794913', 'rocky', 0.97, 0, 194, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-438197', 'Endo Eros', 'star-1760476207937-794913', 'rocky', 1.48, 0, 139, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-226010', 'Hyperion', 'star-1760476207937-955138', 'ice-giant', 0.77, 0, 121, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-669437', 'Demeter Minor', 'star-1760476207937-597093', 'rocky', 0.76, 0, 321, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-932225', 'Persephone', 'star-1760476207937-597093', 'terrestrial', 1.15, 75, 274, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-740353', 'Cronus Inferior', 'star-1760476207937-184285', 'frozen', 0.66, 0, 62, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-836035', 'Iapetus', 'star-1760476207937-184285', 'frozen', 0.88, 0, 70, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-216816', 'Notus', 'star-1760476207937-184285', 'frozen', 1.82, 0, 33, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-421753', 'Boreas', 'star-1760476207937-6710', 'rocky', 0.66, 0, 331, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208899-274113', 'Zetta Crius', 'star-1760476207937-917391', 'rocky', 0.6, 0, 85, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-299463', 'Athena', 'star-1760476207955-732481', 'frozen', 0.66, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-438841', 'Epimetheus Theta', 'star-1760476207955-732481', 'frozen', 1.01, 0, 36, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-905237', 'Aphrodite', 'star-1760476207955-732481', 'frozen', 1.66, 0, 6, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-926172', 'Omni Mnemosyne', 'star-1760476207955-667816', 'rocky', 0.6, 0, 353, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-587322', 'Meta Gaia Remota', 'star-1760476207955-667816', 'terrestrial', 1.01, 35, 330, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-289592', 'Super Crius', 'star-1760476207955-667816', 'ice-giant', 1.49, 0, 259, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-935772', 'Mega Dionysus', 'star-1760476207955-905674', 'frozen', 0.6, 0, 55, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-434475', 'Neo Uranus', 'star-1760476207955-467776', 'frozen', 0.7, 0, 67, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-93614', 'Tera Hyperion Novus', 'star-1760476207955-467776', 'frozen', 0.98, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-691029', 'Tethys Eta', 'star-1760476207955-467776', 'frozen', 1.42, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-304741', 'Hephaestus', 'star-1760476207955-132494', 'rocky', 0.64, 0, 343, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-251008', 'Ananke', 'star-1760476207955-485904', 'terrestrial', 0.8, 25, 372, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-975640', 'Hera', 'star-1760476207955-485904', 'terrestrial', 0.87, 40, 359, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-461558', 'Exa Sol', 'star-1760476207955-485904', 'ice-giant', 1.74, 0, 245, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-709768', 'Holo Zephyrus', 'star-1760476207955-266184', 'rocky', 0.66, 0, 343, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-639509', 'Hyper Epimetheus', 'star-1760476207955-266184', 'terrestrial', 1.02, 75, 303, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-350250', 'Omni Apollo Antiquus', 'star-1760476207955-680864', 'rocky', 0.71, 0, 627, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-409785', 'Themis Antiquus', 'star-1760476207955-102498', 'terrestrial', 0.61, 25, 235, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-529212', 'Micro Luna', 'star-1760476207955-102498', 'rocky', 1.08, 0, 132, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208917-329707', 'Zeus', 'star-1760476207955-102498', 'frozen', 1.65, 0, 118, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-734174', 'Pseudo Hypnos Antiquus', 'star-1760476207972-962651', 'rocky', 0.8, 0, 537, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-772529', 'Holo Aegaeon Parvus', 'star-1760476207972-962651', 'rocky', 1.1, 0, 468, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-9411', 'Femto Coeus Saxeus', 'star-1760476207972-713018', 'rocky', 0.61, 0, 368, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-206236', 'Hypo Athena', 'star-1760476207972-713018', 'terrestrial', 1.02, 100, 299, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-220962', 'Tera Geras Maximus', 'star-1760476207972-713018', 'ice-giant', 1.56, 0, 233, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-587429', 'Bronto Persephone Kappa', 'star-1760476207972-335103', 'frozen', 0.65, 0, 22, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-594531', 'Cronus Delta', 'star-1760476207972-335103', 'frozen', 1, 0, 20, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-568316', 'Luna Saxeus', 'star-1760476207972-335103', 'frozen', 1.77, 0, 21, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-27243', 'Tethys Prime', 'star-1760476207972-678890', 'frozen', 0.69, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-98284', 'Hemera', 'star-1760476207972-350401', 'rocky', 0.69, 0, 407, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-892765', 'Pseudo Zephyrus Magnus', 'star-1760476207972-644029', 'molten', 0.78, 0, 16674, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-475061', 'Neo Luna', 'star-1760476207972-683332', 'ice-giant', 0.67, 0, 55, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-939014', 'Macro Epimetheus Quintus', 'star-1760476207972-683332', 'ice-giant', 1.14, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-790063', 'Oceanus Occidentalis', 'star-1760476207972-683332', 'frozen', 1.77, 0, 29, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-961371', 'Iso Artemis Antiquus', 'star-1760476207972-229715', 'frozen', 0.62, 0, 63, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-804748', 'Mnemosyne Remota', 'star-1760476207972-222521', 'frozen', 0.69, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-932549', 'Gaia', 'star-1760476207972-222521', 'ice-giant', 0.99, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208934-272528', 'Proto Chronos', 'star-1760476207972-222521', 'frozen', 1.38, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-462258', 'Coeus Primus', 'star-1760476207989-780026', 'frozen', 0.73, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-507389', 'Hades Alpha', 'star-1760476207989-833768', 'frozen', 0.61, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-6149', 'Meso Phoebe', 'star-1760476207989-833768', 'frozen', 0.92, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-367635', 'Zeus Ultimus', 'star-1760476207989-833768', 'frozen', 1.67, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-500802', 'Old Oceanus Eta', 'star-1760476207989-849848', 'rocky', 0.68, 0, 326, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-842131', 'Giga Phoebe', 'star-1760476207989-613071', 'molten', 0.69, 0, 9527, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-473791', 'Themis Saxeus', 'star-1760476207989-613071', 'molten', 0.95, 0, 8128, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-777940', 'Persephone Tertius', 'star-1760476207989-803350', 'ice-giant', 0.7, 0, 66, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-589622', 'Trans Notus Delta', 'star-1760476207989-78615', 'frozen', 0.64, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-451131', 'Trans Themis Delta', 'star-1760476207989-78615', 'frozen', 1.12, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-98747', 'Atto Aegaeon Aquaticus', 'star-1760476207989-620583', 'frozen', 0.78, 0, 78, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-803307', 'Hermes Octavus', 'star-1760476207989-620583', 'frozen', 1.11, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208966-840325', 'Exa Ananke', 'star-1760476207989-381761', 'gas-giant', 0.65, 0, 101, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-892603', 'Paleo Erebus', 'star-1760476208019-394544', 'rocky', 0.72, 0, 442, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-233137', 'Zepto Hemera', 'star-1760476208019-594894', 'terrestrial', 0.78, 45, 357, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-788803', 'Nemesis', 'star-1760476208019-887164', 'frozen', 0.62, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-449781', 'Para Coeus Secundus', 'star-1760476208019-200966', 'frozen', 0.65, 0, 35, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-645522', 'Old Athena Delta', 'star-1760476208019-748076', 'ice-giant', 0.65, 0, 54, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-21652', 'Paleo Demeter Secundus', 'star-1760476208019-748076', 'frozen', 1.14, 0, 33, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-322739', 'Crypto Erebus Luminosus', 'star-1760476208019-31723', 'terrestrial', 0.7, 45, 230, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-633143', 'Demeter', 'star-1760476208019-31723', 'rocky', 0.86, 0, 168, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-139462', 'Themis Nonus', 'star-1760476208019-31723', 'ice-giant', 1.8, 0, 149, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-990650', 'Proto Hypnos Luminosus', 'star-1760476208019-31723', 'frozen', 2.4, 0, 104, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-722187', 'Pontus Luminosus', 'star-1760476208019-31723', 'frozen', 5.93, 0, 51, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-989269', 'Iso Prometheus', 'star-1760476208019-31723', 'frozen', 8.59, 0, 44, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-484887', 'Artemis', 'star-1760476208019-31723', 'frozen', 21.3, 0, 39, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-205731', 'New Hyperion Kappa', 'star-1760476208019-93015', 'rocky', 0.64, 0, 411, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476208989-559062', 'Endo Coeus', 'star-1760476208019-543490', 'rocky', 0.65, 0, 338, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-182617', 'Notus Saxeus', 'star-1760476208037-571089', 'rocky', 0.66, 0, 609, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-217241', 'Epimetheus', 'star-1760476208037-886686', 'frozen', 0.78, 0, 103, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-283060', 'Zeus', 'star-1760476208037-417465', 'frozen', 0.62, 0, 43, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-404180', 'Ultra Chronos', 'star-1760476208037-417465', 'frozen', 1.05, 0, 18, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-607259', 'Palaeo Thalassa', 'star-1760476208037-417465', 'frozen', 1.59, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-302368', 'Neo Nemesis', 'star-1760476208037-431023', 'frozen', 0.72, 0, 70, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-986851', 'Omni Cronus Tertius', 'star-1760476208037-420783', 'rocky', 0.77, 0, 380, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-907819', 'Demeter', 'star-1760476208037-420783', 'rocky', 0.99, 0, 282, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-801064', 'Uranus Saxeus', 'star-1760476208037-420783', 'gas-giant', 1.41, 0, 263, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209005-784507', 'Crypto Themis', 'star-1760476208037-790404', 'rocky', 0.62, 0, 541, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209022-678670', 'Nano Oceanus Delta', 'star-1760476208056-498021', 'molten', 0.8, 0, 11940, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209022-758063', 'Mono Thanatos Borealis', 'star-1760476208056-128657', 'rocky', 0.61, 0, 139, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209022-273904', 'Bronto Hades Ultimus', 'star-1760476208056-710296', 'frozen', 0.68, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209022-676094', 'Epimetheus', 'star-1760476208056-970536', 'frozen', 0.73, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209022-931121', 'Hades', 'star-1760476208056-970536', 'frozen', 1.13, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-499578', 'Notus Major', 'star-1760476208056-970536', 'frozen', 1.83, 0, 45, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-777259', 'Hermes Novus', 'star-1760476208056-919634', 'molten', 0.75, 0, 13007, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-155342', 'Artemis', 'star-1760476208056-788971', 'rocky', 0.66, 0, 916, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-649418', 'Macro Poseidon Remota', 'star-1760476208056-788971', 'rocky', 1.09, 0, 725, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-596690', 'Pan Eros', 'star-1760476208056-984166', 'rocky', 0.63, 0, 361, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-438319', 'Quasi Crius', 'star-1760476208056-984166', 'terrestrial', 1.1, 75, 289, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-400832', 'Zetta Hypnos Prime', 'star-1760476208056-49394', 'terrestrial', 0.78, 100, 307, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209023-710415', 'Supra Themis Prime', 'star-1760476208056-727687', 'terrestrial', 0.6, 20, 404, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-385035', 'Mega Hades', 'star-1760476208073-928021', 'frozen', 0.8, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-430212', 'Luna', 'star-1760476208073-164564', 'rocky', 0.8, 0, 309, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-939105', 'Phanes', 'star-1760476208073-23732', 'terrestrial', 0.72, 20, 374, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-199981', 'Thanatos Quintus', 'star-1760476208073-166791', 'frozen', 0.63, 0, 41, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-758927', 'Zepto Rhea Zeta', 'star-1760476208073-166791', 'ice-giant', 1.02, 0, 36, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-93322', 'Ares Aquaticus', 'star-1760476208073-166791', 'frozen', 1.55, 0, 23, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-932352', 'Mega Artemis', 'star-1760476208073-717531', 'terrestrial', 0.61, 60, 362, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-944859', 'Exa Thalassa', 'star-1760476208073-883027', 'ice-giant', 0.67, 0, 149, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-383080', 'Tera Apollo', 'star-1760476208073-883027', 'rocky', 0.92, 0, 112, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-197297', 'Omni Ananke Alpha', 'star-1760476208073-205716', 'frozen', 0.76, 0, 85, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-291865', 'Crius Decimus', 'star-1760476208073-205716', 'ice-giant', 0.92, 0, 105, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-519362', 'Chronos', 'star-1760476208073-263636', 'frozen', 0.62, 0, 67, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209040-186030', 'Peta Mnemosyne Prime', 'star-1760476208073-768738', 'frozen', 0.78, 0, 81, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-5810', 'New Oneiroi Centralis', 'star-1760476208090-320610', 'rocky', 0.68, 0, 349, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-343607', 'Zephyrus', 'star-1760476208090-740066', 'rocky', 0.75, 0, 321, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-959890', 'Meso Terra', 'star-1760476208090-558954', 'frozen', 0.68, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-541651', 'Dionysus', 'star-1760476208090-558954', 'ice-giant', 0.95, 0, 60, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-74359', 'Apollo', 'star-1760476208090-558954', 'frozen', 1.79, 0, 46, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209058-402018', 'Mono Athena Kappa', 'star-1760476208090-252984', 'frozen', 0.72, 0, 30, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-220577', 'Poseidon', 'star-1760476208090-812333', 'frozen', 0.75, 0, 89, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-501221', 'Tartarus', 'star-1760476208090-812333', 'frozen', 0.88, 0, 79, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-482853', 'Hyper Notus Orientalis', 'star-1760476208090-812333', 'frozen', 1.67, 0, 59, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-855803', 'Hypnos', 'star-1760476208090-805948', 'rocky', 0.68, 0, 398, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-941757', 'Tartarus', 'star-1760476208090-805948', 'terrestrial', 1.13, 75, 314, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-152567', 'Neo Notus', 'star-1760476208090-396215', 'rocky', 0.73, 0, 377, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-368746', 'Infra Atlas Sextus', 'star-1760476208090-292158', 'terrestrial', 0.79, 25, 358, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-973355', 'Hyper Ananke', 'star-1760476208090-292158', 'rocky', 0.92, 0, 280, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-328925', 'Crypto Nemesis Superior', 'star-1760476208090-204839', 'frozen', 0.74, 0, 41, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209059-151419', 'Notus', 'star-1760476208090-374336', 'ice-giant', 0.65, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-259730', 'Endo Mnemosyne Kappa', 'star-1760476208116-148269', 'frozen', 0.67, 0, 69, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-698155', 'Luna Antiquus', 'star-1760476208116-148269', 'frozen', 0.95, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-818550', 'Epimetheus Sextus', 'star-1760476208116-148269', 'frozen', 1.42, 0, 52, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-491200', 'Chronos Saxeus', 'star-1760476208116-523205', 'frozen', 0.62, 0, 66, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-964031', 'Ares Saxeus', 'star-1760476208116-523205', 'frozen', 0.96, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-966050', 'Theia Prime', 'star-1760476208116-523205', 'frozen', 1.51, 0, 48, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-189438', 'Tele Uranus Theta', 'star-1760476208116-146874', 'frozen', 0.74, 0, 32, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-335869', 'Mono Boreas', 'star-1760476208116-146874', 'frozen', 1.11, 0, 37, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-167533', 'Pontus Epsilon', 'star-1760476208116-657992', 'rocky', 0.65, 0, 351, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-237636', 'Cronus', 'star-1760476208116-657992', 'rocky', 1.14, 0, 249, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-605614', 'Femto Aegaeon', 'star-1760476208116-751155', 'molten', 0.79, 0, 12460, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-213052', 'Multi Artemis', 'star-1760476208116-751155', 'molten', 0.94, 0, 11468, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-208150', 'Omni Uranus Sextus', 'star-1760476208116-45791', 'frozen', 0.6, 0, 61, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-870236', 'Persephone Novus', 'star-1760476208116-45791', 'frozen', 0.91, 0, 55, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-173626', 'Exo Demeter', 'star-1760476208116-776087', 'frozen', 0.65, 0, 55, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-32288', 'Hypo Luna', 'star-1760476208116-128727', 'rocky', 0.79, 0, 1542, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-510372', 'Para Apollo Minor', 'star-1760476208116-128727', 'molten', 0.96, 0, 1363, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-826180', 'Exo Chronos', 'star-1760476208116-884741', 'rocky', 0.65, 0, 1029, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-222638', 'Femto Persephone Superior', 'star-1760476208116-884741', 'molten', 0.92, 0, 858, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-222400', 'Hephaestus', 'star-1760476208116-884741', 'rocky', 1.78, 0, 623, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-617808', 'Pseudo Ares', 'star-1760476208116-884741', 'terrestrial', 2.62, 35, 518, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209076-29211', 'Xeno Crius Calidus', 'star-1760476208116-706733', 'terrestrial', 0.72, 70, 371, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-88772', 'Hyper Themis Calidus', 'star-1760476208135-180074', 'frozen', 0.64, 0, 47, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-611361', 'Hypnos', 'star-1760476208135-133019', 'rocky', 0.7, 0, 317, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-283737', 'Sol Frigidus', 'star-1760476208135-133019', 'terrestrial', 1.07, 100, 283, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-808984', 'Multi Nemesis', 'star-1760476208135-669686', 'frozen', 0.8, 0, 78, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-497103', 'Phanes Occidentalis', 'star-1760476208135-669686', 'frozen', 1.08, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-451528', 'Macro Prometheus Beta', 'star-1760476208135-370316', 'rocky', 0.72, 0, 365, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-863087', 'Ares Parvus', 'star-1760476208135-370316', 'terrestrial', 1.09, 75, 289, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-825474', 'Zephyrus Interior', 'star-1760476208135-370316', 'rocky', 1.49, 0, 242, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-616347', 'Palaeo Hera Maximus', 'star-1760476208135-713295', 'rocky', 0.79, 0, 137, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-347418', 'Multi Demeter Secundus', 'star-1760476208135-713295', 'rocky', 0.88, 0, 168, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-479068', 'Artemis', 'star-1760476208135-713295', 'frozen', 1.66, 0, 106, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-277040', 'Helios', 'star-1760476208135-713295', 'frozen', 2.48, 0, 68, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-459416', 'Mono Uranus', 'star-1760476208135-713295', 'frozen', 5.98, 0, 58, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-689301', 'Super Aphrodite Epsilon', 'star-1760476208135-713295', 'frozen', 8.8, 0, 53, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-673876', 'Tartarus', 'star-1760476208135-713295', 'ice-giant', 21.01, 0, 44, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-173359', 'Giga Apollo', 'star-1760476208135-28734', 'rocky', 0.66, 0, 17410, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-224463', 'Mnemosyne', 'star-1760476208135-28734', 'molten', 1.15, 0, 13210, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-85389', 'Tethys', 'star-1760476208135-940754', 'rocky', 0.79, 0, 309, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-397301', 'Supra Epimetheus Nonus', 'star-1760476208135-940754', 'rocky', 1.08, 0, 302, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-137051', 'Terra Proxima', 'star-1760476208135-940754', 'ice-giant', 1.66, 0, 219, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-17192', 'Meso Oneiroi', 'star-1760476208135-940754', 'frozen', 2.83, 0, 160, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-248852', 'Tera Helios', 'star-1760476208135-155691', 'frozen', 0.79, 0, 17, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-366484', 'Erebus', 'star-1760476208135-155691', 'frozen', 1, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-259992', 'Yotta Aether', 'star-1760476208135-155691', 'frozen', 1.43, 0, 10, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-214875', 'Notus', 'star-1760476208135-879748', 'rocky', 0.6, 0, 354, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209092-823136', 'Nano Theia', 'star-1760476208135-879748', 'terrestrial', 1, 60, 318, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-64162', 'Super Oneiroi', 'star-1760476208154-877974', 'rocky', 0.73, 0, 332, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-730102', 'Tele Nyx', 'star-1760476208154-768', 'terrestrial', 0.77, 30, 632, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-148503', 'Gaia Calidus', 'star-1760476208154-351587', 'rocky', 0.67, 0, 342, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-631009', 'Ares', 'star-1760476208154-88650', 'rocky', 0.62, 0, 343, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-763366', 'Paleo Aphrodite Primus', 'star-1760476208154-339529', 'terrestrial', 0.68, 100, 280, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-668324', 'Iso Selene', 'star-1760476208154-339529', 'terrestrial', 0.88, 60, 244, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-920346', 'Pseudo Geras Ultimus', 'star-1760476208154-339529', 'ice-giant', 1.77, 0, 194, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-200042', 'Phoebe', 'star-1760476208154-651971', 'frozen', 0.71, 0, 31, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-164722', 'Iso Hermes Sextus', 'star-1760476208154-729407', 'frozen', 0.71, 0, 28, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-456845', 'Oceanus Prime', 'star-1760476208154-766316', 'frozen', 0.71, 0, 107, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-772630', 'Aphrodite Superior', 'star-1760476208154-724222', 'frozen', 0.61, 0, 75, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
VALUES ('planet-1760476209109-501870', 'Geras Centralis', 'star-1760476208154-724222', 'frozen', 0.96, 0, 62, NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  star_id = EXCLUDED.star_id,
  planet_type = EXCLUDED.planet_type,
  orbit = EXCLUDED.orbit,
  habitability = EXCLUDED.habitability,
  temperature = EXCLUDED.temperature,
  atmosphere = EXCLUDED.atmosphere,
  updated_at = NOW();

-- ============================================
-- 6. HAZARDS
-- ============================================

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209253-5-0', 'Ghost Maelstrom', 'sector-1760476209253-5', 'ion-storm', 364.51029281019635, -975.7012385831358, -40.99179730439157, 66.12957967685705, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209253-7-1', 'Tempest Veil', 'sector-1760476209253-7', 'asteroid-field', 122.0181249051553, -1106.6614290849059, -54.041387372738654, 33.13847469160722, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209253-8-2', 'Crimson Veil', 'sector-1760476209253-8', 'nebula', -200.18890983192645, -717.76528630775, 46.943988642772126, 55.97074052275704, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-14-3', 'Phantom Veil', 'sector-1760476209254-14', 'nebula', 986.6608096425124, 998.2441226519052, -0.36106245777870205, 65.78947920892476, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-19-4', 'Phantom Cloud', 'sector-1760476209254-19', 'radiation-zone', 687.4538429175423, -94.62419240230486, 62.26921669466086, 37.92586241823756, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-26-5', 'Tempest Nebula', 'sector-1760476209254-26', 'radiation-zone', -300.9123212474223, -1211.3051569560682, 44.91892930038047, 34.120619971991594, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-30-6', 'Shadow Veil', 'sector-1760476209254-30', 'ion-storm', 1016.1776713067432, -590.4317118242501, 21.495273984632085, 33.88794774753278, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-40-7', 'Shadow Expanse', 'sector-1760476209254-40', 'asteroid-field', -679.0060808012835, -418.39125044190985, 25.232436600592266, 47.14599625598862, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
VALUES ('hazard-sector-1760476209254-41-8', 'Ghost Maelstrom', 'sector-1760476209254-41', 'radiation-zone', -603.3723649661366, 742.8930626433437, -22.40794219129141, 79.59973807676234, 'medium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sector_id = EXCLUDED.sector_id,
  hazard_type = EXCLUDED.hazard_type,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  radius = EXCLUDED.radius,
  severity = EXCLUDED.severity,
  updated_at = NOW();

COMMIT;
