import React from 'react';
import './task2.scss'


class Users extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      isLoading: true,
      users: [],
      error: null,
      page:1
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.pagination = this.pagination.bind(this)
  }


  fetchUsers() {
    fetch(`https://randomuser.me/api/?page=${this.state.page}&results=5`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users:[...this.state.users , ...data.results],
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
      
  }
  
  componentDidMount() {
    this.fetchUsers();
  }
  
  pagination() {
    this.setState({
      page : this.state.page +1
    })
    this.fetchUsers();
  }
    
  render() {
    const {users} = this.state
    return (
      <div className="table-users">
        <div className="header">Users</div>
        <table cellspacing="0">
          <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
          </tr>
          {
            users.map((user,index) => {
              const {name,email,picture} =user
              return(
                <tr key={index}>
                  <td><img src={picture.medium} alt="" /></td>
                  <td>{name.title}:{name.frist} {name.last}</td>
                  <td>{email}</td>
                </tr>
              )
            })
          }
        </table>  
        <button className='btn-pagination' onClick={this.pagination}>Add Page</button>
      </div>
    ) 
  }
}

export default Users