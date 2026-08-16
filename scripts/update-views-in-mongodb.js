const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://ahmadkhanworkspace_db_user:ggePfHd34W5W0ODc@cluster0.cvlvtoa.mongodb.net/drsaleem?retryWrites=true&w=majority';

const viewUpdates = [
  { id: 1, title: 'Evil Web', views: 196432, comments: 224 },
  { id: 2, title: 'The Status of heart in Human Personality', views: 154918, comments: 187 },
  { id: 3, title: 'Different States of Heart', views: 99824, comments: 119 },
  { id: 4, title: 'Transformation of the Heart', views: 126743, comments: 151 },
  { id: 5, title: 'Some Aspects of Diseases', views: 37281, comments: 46 },
  { id: 6, title: 'Hypocrisy: The Most Serious Spiritual Diseases', views: 171285, comments: 163 },
  { id: 7, title: 'TAUGHT AS A COMPONENT OF EVIL WEB', views: 20300, comments: 43 },
  { id: 8, title: 'MODERATION: AN ANALYSIS', views: 85639, comments: 87 },
  { id: 9, title: 'JUSTICE: AN ISLAMIC PERSPECTIVE', views: 251847, comments: 289 },
  { id: 10, title: 'Hidayat', views: 73912, comments: 74 }
];

async function run() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected successfully to MongoDB Atlas!');

  const db = mongoose.connection.db;
  const collection = db.collection('articles');

  for (const item of viewUpdates) {
    const escaped = item.title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const query = {
      $or: [
        { id: item.id },
        { title: { $regex: new RegExp('^' + escaped + '$', 'i') } }
      ]
    };
    const update = {
      $set: {
        views: item.views,
        comments: item.comments
      }
    };
    const res = await collection.updateMany(query, update);
    console.log(`Updated Article ID ${item.id} ("${item.title}"): Matched ${res.matchedCount}, Modified ${res.modifiedCount}`);
  }

  // Check all articles in database
  const allArticles = await collection.find({}).toArray();
  console.log('\n--- MongoDB Verification Summary ---');
  console.log(`Total Articles in Database: ${allArticles.length}`);
  const totalViews = allArticles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalComments = allArticles.reduce((sum, a) => sum + (a.comments || 0), 0);
  console.log(`Total Views in Database: ${totalViews.toLocaleString()}`);
  console.log(`Total Comments in Database: ${totalComments.toLocaleString()}`);

  for (const a of allArticles) {
    console.log(`  • [ID ${a.id || a._id}] ${a.title} -> ${a.views?.toLocaleString()} views | ${a.comments} comments`);
  }

  await mongoose.disconnect();
  console.log('\nDatabase synchronization complete!');
}

run().catch(err => {
  console.error('Error updating DB:', err);
  process.exit(1);
});
