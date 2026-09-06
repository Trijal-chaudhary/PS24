import * as aiRiskService from '../services/aiRiskService.js';

export async function analyzeMineHandler(req, res) {
  try {
    const { mineId } = req.body || {};
    if (!mineId) {
      return res.status(400).json({
        success: false,
        error: { message: "Field 'mineId' is required in JSON request body" }
      });
    }

    const result = await aiRiskService.analyzeMineRisk(mineId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Error in analyzeMineHandler:", error);
    res.status(500).json({
      success: false,
      error: { message: error.message || "Failed to generate AI mine risk analysis" }
    });
  }
}
