import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "a0ca8045a334b19acdb0324e905e10af";   //openweathermap

// 1. create a react-app called App (class-based component)
class App extends React.Component {    //只有app.js的这个主文件会显示在browser中，其他的js文件都需要被import在app.js里
// 5. set the state
  state = {      
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }

  //  3. create a method called getWeather
  getWeather = async (e) => {   //fn里的所有方法都必须加this
    e.preventDefault();  //阻止默认事件发生，阻止整个页面刷新
    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;
  // 4. api_call convert the doc into JSON
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
  // 6. make sure the values display correctly on the page
    if(city && country){   //只有在页面里有值的情况下，才执行setState
    console.log(data);
    this.setState({   //console里data{}里面去找
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,   //weather is an array
      error: ""
    });
  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Note: Please enter the city and country"
    })

  }
  }
  
  //前部import其他文件，后部export本文件
  // <div>中间加入要渲染的 <文件的名字 />
  //  渲染state
  
  // 7. pass these three things as props to Weather/Form/Title components
  
  // 2. render App out
    render(){
      return(
      <div>
        <div className="wrapper">
          {/* <div className="main"> */}
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/> 
                  <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error} />
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
        
      </div>

      );
  }
};


                 
        

export default App;