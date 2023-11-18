const Insight = require('../models/insightModel');

module.exports = {
  async getInsights(req, res) {
    try {
      const filters = {};

      if (req.query.end_year) filters.end_year = req.query.end_year;
      if (req.query.topic) filters.topic = req.query.topic;
      if (req.query.region) filters.region = req.query.region;
      // Add more filters as needed

      const insights = await Insight.find(filters);
      res.status(200).json(insights);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getInsightById(req, res) {
    try {
      const { id } = req.params;
      const insight = await Insight.findById(id);

      if (!insight) {
        return res.status(404).json({ message: 'Insight not found' });
      }

      res.status(200).json(insight);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
