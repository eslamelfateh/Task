import React  from 'react';
import Chart from 'chart.js';
import './task3.scss'

class Charts extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      users: [],
      error: null,
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }


  fetchUsers() {
    fetch(`https://randomuser.me/api/?results=100`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users:[...data.results],
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error}));
  }
  
  componentDidMount() {
    this.fetchUsers();
  }

  drawChart(idname , labels , data){
    let ctx = document.getElementById(`${idname}`).getContext('2d');
    let chart= new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });
  }  

  componentDidUpdate() {
    const {users} = this.state

    //Gender
    const genderFind = users.map((user)=> {
      return user.gender 
    })

    let objGender ={}

    genderFind.forEach((i) => {
      if (objGender[i]) {
        objGender[i] += 1;
      } else {
        objGender[i] = 1;
      }
    })

    let genderV = []
    let genderT =[]

    Object.keys(objGender).forEach((key) => {
      genderV.push(objGender[key])
      genderT.push(key)
    })

    this.drawChart("genders", genderT , genderV)

     //Location

     const locationFind = users.map((user)=> {
      return(
        user.location.country
      )
    })

    let objLocation ={}

    locationFind.forEach((i) => {
      if (objLocation[i]) {
        objLocation[i] += 1;
      } else {
        objLocation[i] = 1;
      }
    })
    let locationV = []
    let locationT =[]

    Object.keys(objLocation).forEach((key) => {
      locationV.push(objLocation[key])
      locationT.push(key)
    })
    this.drawChart("location", locationT , locationV)


    //Age

    const ageFind = users.map((user)=> {
    return(
      user.dob.age
      )
    })

    let objAge ={}

    ageFind.forEach((i) => {
      if (objAge[i]) {
        objAge[i] += 1;
      } else {
        objAge[i] = 1;
      }
    })
    let ageV = []
    let ageT =[]

    Object.keys(objAge).forEach((key) => {
      ageV.push(objAge[key])
      ageT.push(key)
    })
    this.drawChart("age", ageT , ageV)

    //Registration date 

    const registrationDateFind = users.map((user)=> {
      return(
        user.registered.date
        )
      })
  
      let objRegistrationDate ={}
  
      registrationDateFind.forEach((i) => {
        if (objRegistrationDate[i]) {
          objRegistrationDate[i] += 1;
        } else {
          objRegistrationDate[i] = 1;
        }
      })
      let registrationDateV = []
      let registrationDateT =[]
  
      Object.keys(objRegistrationDate).forEach((key) => {
        registrationDateV.push(objRegistrationDate[key])
        registrationDateT.push(key)
      })
      this.drawChart("registrationDate", registrationDateT , registrationDateV)

  }

  render() {
    return (
      <div className='container' >
        <div className="gender">
          <h1>Genders</h1>
          <canvas id="genders" width="400" height="400">Genders</canvas>
        </div>
        <div className="location">
          <h2>Locations</h2>
          <canvas id="location" width="400" height="400">Locations</canvas>
        </div>
        <div className="age">
          <h2>Age</h2>
          <canvas id="age" width="400" height="400">Locations</canvas>
        </div>
        <div className="registrationDate">
          <h2>Registration date </h2>
          <canvas id="registrationDate" width="400" height="400">Locations</canvas>
        </div>
      </div>
    ) 
  }
}

export default Charts