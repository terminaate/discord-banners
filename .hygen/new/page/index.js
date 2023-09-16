const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'pageName',
        message: 'What is the page name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { pageName } = answers;

        const path = `src/pages/${capitalize(pageName)}`;
        return { ...answers, pageName: capitalize(pageName), path };
      });
  },
};