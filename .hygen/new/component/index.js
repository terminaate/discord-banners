const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { componentName } = answers;

        const path = `src/components/${capitalize(componentName)}`;
        return { componentName: capitalize(componentName), path };
      });
  },
};