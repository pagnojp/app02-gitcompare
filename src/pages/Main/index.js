import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      repositoryError: false,
      repositoryInput: '',
      repositories: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('repositories')) {
      this.setState({
        repositories: JSON.parse(localStorage.getItem('repositories')),
        loading: false,
      });
    }
  }

  componentDidUpdate(nextProps, nextState) {
    localStorage.setItem(
      'repositories',
      JSON.stringify(nextState.repositories),
    );
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading,
      repositoryError,
      repositoryInput,
      repositories,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repo"
            value={repositoryInput}
            onChange={(e) => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : '+ Add'}
          </button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
