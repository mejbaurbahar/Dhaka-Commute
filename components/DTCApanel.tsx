import React, { useEffect, useState } from 'react'
import {
  getDtcaTrackerSnapshot,
  getDtcaStoppageList,
  getDtcaAllVehicleLocation,
  DtcaTrackerSnapshot,
  DtcaStoppage,
  DtcaVehicleLocation,
} from '../services/dtcaTrackerService'
import './styles/DTCApanel.css'

const OFFICIAL_URL = 'https://buskothay.com/dtca-bus-tracking/';

export default function DTCApanel(): React.ReactElement {
  const [snapshot, setSnapshot] = useState<DtcaTrackerSnapshot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [liveResults, setLiveResults] = useState<Record<string, any>>({})
  const [stoppages, setStoppages] = useState<DtcaStoppage[] | null>(null)
  const [vehicles, setVehicles] = useState<ReadonlyArray<DtcaVehicleLocation> | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)
  const [dataLoading, setDataLoading] = useState<'stoppages' | 'vehicles' | null>(null)

  useEffect(() => { void refresh(false) }, [])

  async function refresh(force = false) {
    setError(null)
    setLoading(true)
    try {
      const s = await getDtcaTrackerSnapshot(force)
      setSnapshot(s)
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  async function lookupIdentifier(id: string) {
    if (!id) return
    setLiveResults(prev => ({ ...prev, [id]: { loading: true } }))
    try {
      const proxyBase = (import.meta.env.VITE_API_PROXY as string | undefined)?.replace(/\/$/, '') || 'https://koyjabo-auth-proxy.fagun115946.workers.dev';
      const url = `${proxyBase}/bus/live-location?id=${encodeURIComponent(id)}`
      const resp = await fetch(url, { cache: 'no-store' })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const payload = await resp.json().catch(() => null)
      setLiveResults(prev => ({ ...prev, [id]: payload || {}}))
    } catch (err: any) {
      setLiveResults(prev => ({ ...prev, [id]: { error: err?.message || String(err) } }))
    }
  }

  async function refreshStoppages() {
    setDataError(null)
    setDataLoading('stoppages')
    try {
      const response = await getDtcaStoppageList()
      setStoppages(response.stoppages)
    } catch (err: any) {
      setDataError(err?.message || String(err))
    } finally {
      setDataLoading(null)
    }
  }

  async function refreshVehicles() {
    setDataError(null)
    setDataLoading('vehicles')
    try {
      const response = await getDtcaAllVehicleLocation()
      setVehicles(response.vehicles)
    } catch (err: any) {
      setDataError(err?.message || String(err))
    } finally {
      setDataLoading(null)
    }
  }

  return (
    <div className="dtca-panel">
      <div className="dtca-header">
        <h3>Live Bus Tracker</h3>
        <div className="dtca-actions">
          <button onClick={() => void refresh(true)} disabled={loading}>Refresh snapshot</button>
          <button onClick={() => void refreshStoppages()} disabled={dataLoading === 'stoppages'}>Load stoppages</button>
          <button onClick={() => void refreshVehicles()} disabled={dataLoading === 'vehicles'}>Load vehicles</button>
          <a className="dtca-official" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Open official tracker</a>
        </div>
      </div>

      {loading && <div className="dtca-loading">Refreshing snapshot…</div>}
      {error && <div className="dtca-error">{error}</div>}
      {dataError && <div className="dtca-error">{dataError}</div>}
      {dataLoading === 'stoppages' && <div className="dtca-loading">Loading stoppage list…</div>}
      {dataLoading === 'vehicles' && <div className="dtca-loading">Loading vehicle locations…</div>}

      {snapshot ? (
        <div className="dtca-body">
          <div className="dtca-meta">
            <div className="dtca-title">{snapshot.title}</div>
            <div className="dtca-fetched">{snapshot.fetchedAtLabel} — {snapshot.status}</div>
            <div className="dtca-summary">{snapshot.summary}</div>
          </div>

          {snapshot.snippet ? (
            <div className="dtca-snippet" dangerouslySetInnerHTML={{ __html: snapshot.snippet }} />
          ) : null}

          {snapshot.busHints && snapshot.busHints.length > 0 ? (
            <div className="dtca-hints">
              <div className="dtca-hints-title">Detected identifiers</div>
              <ul>
                {snapshot.busHints.map((h) => (
                  <li key={h}>
                    <span className="hint-text">{h}</span>
                    <button className="hint-lookup" onClick={() => void lookupIdentifier(h)}>Lookup</button>
                    <pre className="hint-result">{JSON.stringify(liveResults[h] ?? '', null, 2)}</pre>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(stoppages && stoppages.length > 0) ? (
            <div className="dtca-list">
              <div className="dtca-list-title">Bus stoppages</div>
              <ul>
                {stoppages.slice(0, 12).map((stop) => (
                  <li key={stop.id}>
                    <strong>{stop.name}</strong>
                    {stop.routePlanId ? <span> · {stop.routePlanId}</span> : null}
                  </li>
                ))}
              </ul>
              {stoppages.length > 12 ? <div className="dtca-list-note">Showing first 12 of {stoppages.length} stoppages.</div> : null}
            </div>
          ) : null}

          {(vehicles && vehicles.length > 0) ? (
            <div className="dtca-list">
              <div className="dtca-list-title">Live buses</div>
              <ul>
                {vehicles.slice(0, 12).map((vehicle) => (
                  <li key={vehicle.id}>
                    <strong>{vehicle.v_vrn || vehicle.vehicle_name || vehicle.v_identifier}</strong>
                    <div>{vehicle.customer_name || vehicle.vehicle_type}</div>
                    <div>{vehicle.device_status} · {vehicle.landmark_distance}m</div>
                  </li>
                ))}
              </ul>
              {vehicles.length > 12 ? <div className="dtca-list-note">Showing first 12 of {vehicles.length} vehicles.</div> : null}
            </div>
          ) : null}

        </div>
      ) : (
        <div className="dtca-empty">No snapshot available yet. Click refresh to attempt a snapshot fetch.</div>
      )}
    </div>
  )
}
