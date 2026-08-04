import React, { useEffect, useState } from 'react'
import { getDtcaTrackerSnapshot, DtcaTrackerSnapshot } from '../services/dtcaTrackerService'
import '../components/styles/DTCApanel.css'

const OFFICIAL_URL = 'https://buskothay.com/dtca-bus-tracking/';

export default function DTCApanel(): React.ReactElement {
  const [snapshot, setSnapshot] = useState<DtcaTrackerSnapshot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [liveResults, setLiveResults] = useState<Record<string, any>>({})

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
      const url = `https://dtca-backend.bondstein.net/api/v1/passenger/route-plans/live-location?identifier=${encodeURIComponent(id)}`
      const resp = await fetch(url, { cache: 'no-store' })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const payload = await resp.json().catch(() => null)
      setLiveResults(prev => ({ ...prev, [id]: payload || {}}))
    } catch (err: any) {
      setLiveResults(prev => ({ ...prev, [id]: { error: err?.message || String(err) } }))
    }
  }

  return (
    <div className="dtca-panel">
      <div className="dtca-header">
        <h3>DTCA Tracker</h3>
        <div className="dtca-actions">
          <button onClick={() => void refresh(true)} disabled={loading}>Refresh</button>
          <a className="dtca-official" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Open official tracker</a>
        </div>
      </div>

      {loading && <div className="dtca-loading">Refreshing snapshot…</div>}
      {error && <div className="dtca-error">{error}</div>}

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

        </div>
      ) : (
        <div className="dtca-empty">No snapshot available yet. Click refresh to attempt a snapshot fetch.</div>
      )}
    </div>
  )
}
