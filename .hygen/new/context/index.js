const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'contextName',
        message: 'What is the context name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { contextName } = answers;

        const path = `src/contexts/${capitalize(contextName)}`;
        return { contextName: capitalize(contextName), path };
      });
  },
};