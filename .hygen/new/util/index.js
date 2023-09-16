module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'utilName',
        message: 'What is the util name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { utilName } = answers;
        return { utilName };
      });
  },
};