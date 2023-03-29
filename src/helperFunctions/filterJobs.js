const filterJobs = ([...jobs]) => {
  for (let index = 0; index < jobs.length; index++) {
    const job = jobs[index];
    const { date, jobNumber, patientName, price, works } = job;

    const filteredJob = {
      date,
      jobNumber,
      patientName,
      price,
      works,
    };

    jobs[index] = filteredJob;
  }

  return jobs;
};

export default filterJobs;
