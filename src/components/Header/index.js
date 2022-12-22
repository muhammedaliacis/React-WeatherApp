import { useFormik } from "formik";
import axios from "axios";
import { useVars } from "../ThemeContext";
import "./Header.css";
import Content from "../Content";

function Header() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();

  const { weather, setWeather, city, setCity } = useVars();

  const api = async (values) => {
    await axios(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${values.city},TR&key=1a1bc53161204b74b7571856302454f8`
    )
      .then(async (res) => {
        if (!res.data) {
          setWeather([]);
          setCity("");
        } else {
          setWeather(res.data.data);
          setCity(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      city: "",
    },
    onSubmit: async (values, bag) => {
      await new Promise((res) => {
        setTimeout(() => {
          bag.resetForm();
          api(values);
        }, 500);
      });
    },
  });
  return (
    <div className="header">
      <div className="name">
        <p className="city">
          City: <span> {city && city.city_name.toUpperCase()}</span>
        </p>
      </div>
      <div className="form-field">
        {
          <h1 className="date">
            {date}.{month}.{year} {hour}:{minute}
          </h1>
        }
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="input-div">
            <input
              className="input"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
              required={true}
              disabled={formik.isSubmitting}
            />
            <label className="label" htmlFor="email">
              City
            </label>
          </div>
          <button
            type="submit"
            className="submit"
            disabled={formik.isSubmitting}
          >
            Weather
          </button>
        </form>
        <div className="infos">
          <p>UV: {weather.length > 0 ? weather[0].uv : null}</p>
          <p>
            Wind Speed(m/s): {weather.length > 0 ? weather[0].wind_spd : null}
          </p>
          <p>Pressure(mb): {weather.length > 0 ? weather[0].pres : null}</p>
          <p>Humidity(%): {weather.length > 0 ? weather[0].rh : null}</p>
        </div>
      </div>
      <Content />
    </div>
  );
}

export default Header;
