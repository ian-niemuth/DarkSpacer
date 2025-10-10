    // Build update query dynamically with proper $ placeholders
    let updates = [];
    let values = [];
    let paramIndex = 1;
    
    // Always update talents
    updates.push(`talents = $${paramIndex}`);
    values.push(JSON.stringify(updatedTalents));
    paramIndex++;
    
    // Update triad_powers if changed
    updates.push(`triad_powers = $${paramIndex}`);
    values.push(JSON.stringify(updatedTriadPowers));
    paramIndex++;
    
    // Update enlightenment_uses if changed
    if (enlightenmentIncrease > 0) {
      const currentUses = parseInt(character.enlightenment_uses) || 1;
      updates.push(`enlightenment_uses = $${paramIndex}`);
      values.push(currentUses + enlightenmentIncrease);
      paramIndex++;
    }
    
    // Add stat updates
    for (const [stat, value] of Object.entries(statUpdates)) {
      updates.push(`${stat} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    const updateQuery = `UPDATE characters SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    values.push(characterId);
