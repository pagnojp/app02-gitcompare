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
        loading: false,
        repositories: JSON.parse(localStorage.getItem('repositories')),
      });
    }
  }

  componentDidUpdate() {
    const { repositories } = this.state;
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { repositoryInput, repositories } = this.state;
    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
      localStorage.setItem(
        'repositories',
        JSON.stringify(...repositories, repository),
      );
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;
    const updatedRepositories = repositories.filter(
      (repository) => repository.id !== id,
    );
    this.setState({ repositories: updatedRepositories });
    localStorage.setItem('repositories', JSON.stringify(repositories));
  };

  handleRefreshRepository = async (id) => {
    const { repositories } = this.state;
    const repository = repositories.find((repo) => repo.id === id);
    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map((repo) => (repo.id === data.id ? data : repo)),
      });
      await localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
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
            placeholder="user/repo | facebook/react"
            value={repositoryInput}
            onChange={(e) => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Add'}
          </button>
        </Form>
        <CompareList
          repositories={repositories}
          refreshRepository={this.handleRefreshRepository}
          removeRepository={this.handleRemoveRepository}
        />
      </Container>
    );
  }
}
