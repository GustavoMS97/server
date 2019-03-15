const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
    .split(' ')
    .join('')
    .split(',')
    .filter(email => re.test(email) === false);

  if (invalidEmails && invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
