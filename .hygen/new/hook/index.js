module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'hookName',
        message: 'What is the hook name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { hookName } = answers;
        return { hookName };
      });
  },
};