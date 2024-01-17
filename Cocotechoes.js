/*Question No. 5*/

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTasks() {
  const numTasks = getRandomNumber(10, 20);
  const tasks = [];

  for (let i = 1; i <= numTasks; i++) {
    tasks.push({
      taskNumber: i,
      progress: getRandomNumber(0, 100),
    });
  }

  return tasks;
}

function generateRandomJobs() {
  const numJobs = 10;
  const jobs = [];

  for (let i = 1; i <= numJobs; i++) {
    const tasks = generateRandomTasks();
    const expectedEndDate = new Date(Date.now() + getRandomNumber(1, 30) * 24 * 60 * 60 * 1000);

    jobs.push({
      jobTitle: `Job${i}`,
      tasks,
      expectedEndDate,
    });
  }

  return jobs;
}

function calculateOverallProgress(job) {
  const totalProgress = job.tasks.reduce((sum, task) => sum + task.progress, 0);
  return totalProgress / job.tasks.length;
}

const randomJobs = generateRandomJobs();

const jobsWithProgress = randomJobs.map(job => ({
  jobTitle: job.jobTitle,
  expectedEndDate: job.expectedEndDate,
  overallProgress: calculateOverallProgress(job),
}));

jobsWithProgress.sort((a, b) => {
  if (a.expectedEndDate < b.expectedEndDate) return -1;
  if (a.expectedEndDate > b.expectedEndDate) return 1;
  return b.overallProgress - a.overallProgress;
});

console.log("Sorted List of Jobs:");
console.table(jobsWithProgress);
