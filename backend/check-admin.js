// Check and set admin status for user
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function checkAndSetAdmin() {
  try {
    console.log('Checking users table...\n');
    
    // Get all users
    const result = await pool.query('SELECT id, username, is_admin FROM users');
    
    console.log('Current users:');
    result.rows.forEach(user => {
      console.log(`  - ${user.username} (ID: ${user.id}) - Admin: ${user.is_admin || false}`);
    });
    
    if (result.rows.length === 0) {
      console.log('\n❌ No users found!');
      return;
    }
    
    // Get the username to make admin (you can change this)
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('\nEnter username to make admin (or press Enter to skip): ', async (username) => {
      if (!username) {
        console.log('Skipping admin update.');
        readline.close();
        pool.end();
        return;
      }
      
      try {
        const updateResult = await pool.query(
          'UPDATE users SET is_admin = true WHERE username = $1 RETURNING *',
          [username]
        );
        
        if (updateResult.rows.length > 0) {
          console.log(`\n✅ User '${username}' is now an admin!`);
        } else {
          console.log(`\n❌ User '${username}' not found.`);
        }
      } catch (error) {
        console.error('Error updating user:', error.message);
      }
      
      readline.close();
      pool.end();
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    pool.end();
  }
}

checkAndSetAdmin();
