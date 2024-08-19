import { Scanner } from '@yudiel/react-qr-scanner'
import { useEffect, useRef, useState } from 'react'
import './QrScanner.css'
import useScanner from '../store/scanner'

export function QrScanner() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const { action, setAction } = useScanner()
  const actionRef = useRef(action)

  useEffect(() => {
    actionRef.current = action
  }, [action])

  const handleScan = async (result) => {
    if (actionRef.current === '') {
      setMessage('Selecciona una acción primero')
      setStatus(false)
      setTimeout(() => {
        setMessage('')
        setStatus(null)
      }, 3000)
      return
    }

    try {
      const response = await fetch(
        'https://scanner.igeco.mx/server/user-check',
        // 'http://localhost:3011/user-check',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uuid: result[0].rawValue,
            action: actionRef.current,
          }),
        }
      )
      const data = await response.json()
      if (data.status) {
        setMessage(`Usuario encontrado: ${data.user.name}`)
        setStatus(true)
        setTimeout(() => {
          setMessage('')
          setStatus(null)
        }, 3000)
      } else {
        setMessage(data.message)
        setStatus(false)
        setTimeout(() => {
          setMessage('')
          setStatus(null)
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      setMessage('No se pudo conectar al servidor')
    }
  }

  return (
    <>
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
      />
      <div
        className={`text-scanner ${
          status === true
            ? 'text-success'
            : status === false
            ? 'text-failure'
            : ''
        }`}
      >
        {message}
      </div>
    </>
  )
}
