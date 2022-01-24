const getTokenApi = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);

const getQuestionsApi = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = request.json();
  return response;
};

export {
  getTokenApi,
  getQuestionsApi,
};
