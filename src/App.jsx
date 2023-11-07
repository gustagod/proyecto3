import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hook/useFetch'
import InfoLocation from './components/InfoLocation'
import CardResident from './components/CardResident'


function App() {
  const [locationId, setlocationId] = useState(Math.ceil(Math.random() * 125) + 1)


  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [location, getLocation, hasError, isLoading] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [locationId])

  const inputLocation = useRef()
  const handleLocation = e => {
    e.preventDefault()
    setlocationId(inputLocation.current.value.trim())
  }

  return (
    <div className='app'>
      <img className='app__banner' src="../66133.jpg" alt="" />
      <form className='app__form' onSubmit={handleLocation}>
        <input className='app__input' ref={inputLocation} type="text" />
        <button className='app__btn'>Search</button>
      </form>
      {
        isLoading ?
          <h2 className='app__loading'>is Loaging...</h2>
          : (
            hasError||locationId==='0'
              ? <h2 className='app__error'>❌Hey! you must provide an id from 1 to 126</h2>
              : (
                <>
                  <InfoLocation
                    location={location}
                  />
                  <div className='app__card-container'>
                    {
                      location?.residents.map(url => (
                        <CardResident
                          key={url}
                          url={url}
                        />
                      ))
                    }
                  </div>
                </>
              )
          )
      }
    </div>
  )
}

export default App
