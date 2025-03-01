import { Scanner } from '@yudiel/react-qr-scanner'
import { useState, useRef, useEffect } from 'react'
import './QrScanner.css'
import './MenuStyles.css'
import { useScanner } from '../store/scanner'

export function QrScanner() {
  const {
    action,
    lastRecord,
    scenario,
    setLastRecord,
    setAction,
    setScenario,
  } = useScanner()

  const [message, setMessage] = useState('')
  const [styleMessage, setStyleMessage] = useState('')

  const actionRef = useRef(action)
  const scenarioRef = useRef(scenario)

  useEffect(() => {
    actionRef.current = action
  }, [action])

  useEffect(() => {
    scenarioRef.current = scenario
  }, [scenario])

  const handleScan = async (result) => {
    if (actionRef.current === '' || scenarioRef.current === '') {
      setMessage('Selecciona una acción primero')
      setStyleMessage('text-failure')
      setTimeout(() => {
        setMessage('')
        setStyleMessage('')
      }, 3000)
      return
    }
    console.log(scenarioRef.current)
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
          escenario: scenarioRef.current,
        }),
      })
      const data = await response.json()
      console.log(data)
      if (data.status) {
        setStyleMessage('text-success')
        setMessage(data.message)
        setLastRecord(data.user)
        setTimeout(() => {
          setMessage('')
          setStyleMessage('')
        }, 3000)
      } else {
        setStyleMessage('text-failure')
        setMessage(data.message)
        setTimeout(() => {
          setMessage('')
          setStyleMessage('')
        }, 3000)
      }
    } catch (error) {
      setStyleMessage('text-failure')
      setMessage('No se pudo conectar al servidor')
      setTimeout(() => {
        setMessage('')
        setStyleMessage('')
      }, 3000)
    }
  }

  return (
    <>
      <p className='actions'>Registro para: {scenario}</p>
      <div className='actions'>
        <select
          value={scenario}
          onChange={(e) => {
            setScenario(e.target.value)
          }}
        >
          <option value=''>SELECCIONE UN VALOR</option>
          <option value='General'>GENERAL</option>
          <option value='EnlightenmentArea'>ENLIGHTENMENT AREA</option>
          <option value='InnovationArea'>INSTALLERS & INNOVATION AREA</option>
          <option value='VIP'>PROGRAMA VIP</option>
          <option value='energyNight'>ENEGR NIGHT</option>
          <option value='EcoStage'>ECOSTAGE</option>
          <option value='EcoPitch'>ECOPITCH</option>
          <option value='AreaVip'>AREA VIP</option>
        </select>
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value=''>SELECCIONE UN VALOR</option>
          <option value='check-in'>CHECAR ENTRADAS</option>
          <option value='check-out'>CHECAR SALIDAS</option>
        </select>
      </div>

      {
        <Scanner
          onScan={(result) => handleScan(result)}
          allowMultiple
          paused={false}
          scanDelay={2000}
        />
      }

      {message && <div className={styleMessage}>{message}</div>}

      <div className='last-record'>
        ULTIMA LECTURA ECONTRADA:
        <div className='text-success'>
          <span>
            {lastRecord?.name} {lastRecord?.paternSurname}{' '}
            {lastRecord?.maternSurname}
          </span>
          <br />
          {lastRecord?.position}
          <br />
          {lastRecord?.company}
          <br />
          <br />
        </div>
      </div>
    </>
  )
}
