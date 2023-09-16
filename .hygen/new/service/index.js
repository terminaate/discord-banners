module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'serviceName',
        message: 'What is the service name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { serviceName } = answers;
        return { path: 'src/utils', serviceName };
      });
  },
};