import { JsonRepository } from '../repositories/jsonRepository.js';

const credentialsRepo = new JsonRepository('credentials');

/**
 * Handle authority login authentication against credentials.json
 * Validates username, password, AND selected role.
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { username, password, role } = req.body || {};

    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username, password, or role.'
      });
    }

    const credentials = await credentialsRepo.getAll();
    const userMatch = credentials.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (!userMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username, password, or role.'
      });
    }

    // Generate lightweight authentication token for server-side scope enforcement
    const tokenPayload = {
      username: userMatch.username,
      role: userMatch.role,
      mine_id: userMatch.mine_id
    };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    // Return safe user information without password
    return res.json({
      success: true,
      token,
      user: {
        name: userMatch.name,
        username: userMatch.username,
        mine_id: userMatch.mine_id,
        role: userMatch.role
      }
    });
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};
