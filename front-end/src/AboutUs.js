import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that represents the About Us page of the app.
 * Page content (text and photo URL) is fetched as JSON from the back-end.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, []) // run only once when the component first loads

  return (
    <div className="AboutUs">
      <h1>About Us</h1>

      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}

      {loaded && aboutData && (
        <div className="AboutUs-content">
          <img
            className="AboutUs-photo"
            src={aboutData.photo}
            alt={aboutData.name}
          />
          <div className="AboutUs-text">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// make this component available to be imported into any other file
export default AboutUs
