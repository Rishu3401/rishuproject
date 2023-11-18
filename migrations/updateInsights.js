const mongoose = require('mongoose');
const Insight = require('./models/insightModel');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const insightsToUpdate = await Insight.find({
      $or: [
        { start_year: { $type: 'string' } },
        { end_year: { $type: 'string' } }
      ]
    });

    const updatePromises = insightsToUpdate.map(async (insight) => {
      if (typeof insight.start_year === 'string') {
        insight.start_year = parseInt(insight.start_year, 10);
      }
      if (typeof insight.end_year === 'string') {
        insight.end_year = parseInt(insight.end_year, 10);
      }
      return insight.save();
    });

    await Promise.all(updatePromises);
    console.log('Migration completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Migration error:', error);
    mongoose.connection.close();
  }
})();
