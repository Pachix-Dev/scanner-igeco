import { Scanner } from '@yudiel/react-qr-scanner'
import { useEffect, useRef, useState } from 'react'
import './QrScanner.css'
import useScanner from '../store/scanner'

export function QrScanner() {
  const { lastRecord, setLastRecord } = useScanner()
  const [message, setMessage] = useState()
  const { action, setAction } = useScanner()
  const actionRef = useRef(action)

  const [placeRegister, setPlaceRegister] = useState('ecostage')

  useEffect(() => {
    actionRef.current = action
  }, [action])

  const handleScan = async (result) => {
    if (actionRef.current === '') {
      setMessage('Selecciona una acción primero')
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }
    const url = import.meta.env.DEV
      ? 'http://localhost:3011'
      : 'https://scanner.igeco.mx/server'
    try {
      const response = await fetch(url + '/accesos-aforo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid: result[0].rawValue,
          action: actionRef.current,
          escenario: placeRegister,
        }),
      })
      const data = await response.json()
      if (data.status) {
        setMessage(data)
        setLastRecord(data)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      } else {
        setMessage(data.message)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      setMessage('No se pudo conectar al servidor')
    }
  }

  return (
    <>
      <p>registro para: {placeRegister}</p>
      <br />
      <div className='actions'>
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value=''>Selecciona una acción</option>
          <option value='check-in'>Checar entradas</option>
          <option value='check-out'>Checar salidas</option>
        </select>
      </div>
      <Scanner
        onScan={(result) => handleScan(result)}
        allowMultiple
        paused={false}
        scanDelay={2000}
      />

      {message && (
        <div className='text-scanner'>
          {message?.status ? (
            <div className='text-success'>
              {message?.user?.name}
              <br />
              <span>{message?.user?.position}</span>
              <br />
              <span>{message?.user?.company}</span>
            </div>
          ) : (
            <div className='text-failure'>{message}</div>
          )}
        </div>
      )}

      <div className='last-record'>
        ULTIMA LECTURA: {lastRecord?.message}
        <div className='text-success'>
          <span>
            {lastRecord?.user?.name} {lastRecord?.user?.paternSurname}{' '}
            {lastRecord?.user?.maternSurname}
          </span>
          <br />
          {lastRecord?.user?.position}
          <br />
          {lastRecord?.user?.company}
          <br />
          <br />
        </div>
      </div>
    </>
  )
}
