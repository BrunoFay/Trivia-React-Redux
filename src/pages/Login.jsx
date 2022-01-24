import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToken, saveLogin } from '../redux/actions';

/* referencia imagem https://douglasabnovato.medium.com/o-que-construo-com-o-redux-5b53e7320078 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validate: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleConfig = this.handleConfig.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.validateInput();
    });
  }

  handleConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { history, tokenDispatch, loginDispatch } = this.props;
    const { name, email } = this.state;
    await tokenDispatch();
    loginDispatch(name, email);
    history.push('/trivia');
  }

  validateInput() {
    const { name, email } = this.state;
    const regex = /^\S+@\S+\.\S+$/;
    const emailValidate = regex.test(email);
    this.setState({ validate: !(name.length > 0 && emailValidate) });
  }

  render() {
    const { name, email, validate } = this.state;

    return (
      <main className="login">

        <div className="loginLogos">
          <span id="triviaLogo">
            <span>T</span>
            rivia
          </span>
          <img
            src="https://miro.medium.com/max/1400/0*zgIOQc9Aeo0DL6Dk.png"
            alt="imagem react-redux"
          />
        </div>

        <div className="loginForm">

          <img
            id="trybeImage"
            alt="imagem logo trybe"
            src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png"
          />
          <form>
            <label htmlFor="name">
              Nome
            </label>
            <input
              placeholder="NickName"
              id="name"
              name="name"
              value={ name }
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />

            <label htmlFor="email">
              Email
            </label>
            <input
              placeholder="email"
              id="email"
              name="email"
              value={ email }
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />

            <button
              type="submit"
              id="btn-play"
              data-testid="btn-play"
              disabled={ validate }
              onClick={ this.handleSubmit }
            >
              Play
            </button>

            <button
              type="button"
              id="btn-config"
              data-testid="btn-settings"
              onClick={ this.handleConfig }
            >
              Configuração
            </button>
          </form>
          <span id="rights">2022 Turma 16, Grupo 21</span>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: () => dispatch(addToken()),
  loginDispatch: (name, email) => dispatch(saveLogin(name, email)),
});

Login.propTypes = {
  history: PropTypes.shape([]),
  tokenDipatch: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
