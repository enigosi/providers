import hydrate from './hydrate';

const runHydrate = async () => {
  console.log('Start data migration');
  await hydrate('data.csv');
  console.log('Success 🙌!');
  process.exit(0);
};

runHydrate();
