import { useParams } from 'react-router';
import { voyageGroups } from '../data/voyages';
import { VoyageMap } from './VoyageMap';
import React, { useMemo, useState } from 'react';
import './VoyageDetail.css';

export function VoyageDetail() {
  const { voyageId } = useParams<{ voyageId: string }>();

  // Find the vessel and its parent group by the passed id
  const { vessel, group } = useMemo(() => {
    for (const g of voyageGroups) {
      const found = g.vessels.find((v) => v.id === voyageId);
      if (found) return { vessel: found, group: g };
    }
    return { vessel: undefined, group: undefined };
  }, [voyageId]);

  if (!vessel) {
    return <div style={{ padding: 20 }}>Voyage not found</div>;
  }

  const [tab, setTab] = useState<'display' | 'zones' | 'waypoints' | 'bunker' | 'other'>('display');

  return (
    <div className="voyage-detail-container">
      <div className="voyage-detail-header">
        <h1>{vessel.name}</h1>
        <p>Type: General Cargo Ship | DWT: {vessel.dwt} | BLT: 2008 | Commodity: n/a | Charterer: n/a</p>
      </div>

      {/* Summary table (Ringkasan Voyage) */}
      <div className="voyage-summary-card">
        <h3>Ringkasan Voyage {group ? `— ${group.name}` : ''}</h3>
        <div className="voyage-summary-table-wrap">
          <table className="voyage-summary-table">
            <thead>
              <tr>
                <th>Info</th>
                <th>Vessel Name</th>
                <th>DWT</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Commodity</th>
                <th>Qty (MT)</th>
              </tr>
            </thead>
            <tbody>
              {(group ? group.vessels : [vessel]).map((v) => (
                <tr key={v.id} className={v.id === vessel.id ? 'selected' : ''}>
                  <td>{/* Info icon or marker */}▶</td>
                  <td>{v.name}</td>
                  <td>{v.dwt}</td>
                  <td>{v.date}</td>
                  <td>{v.from}</td>
                  <td>{v.to}</td>
                  <td>{v.duration} days</td>
                  <td>{v.commodities && v.commodities[0] ? v.commodities[0].name : 'n/a'}</td>
                  <td>{v.commodities && v.commodities[0] ? v.commodities[0].quantity : 'n/a'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="voyage-detail-body">
        <div className="voyage-detail-map">
          {/* For visualization, show a multi-stop route (Belitung -> Qui Nhon -> Ho Chi Minh City) if possible */}
          <VoyageMap
            from={vessel.coordinates.from}
            to={vessel.coordinates.to}
            fromName={vessel.from}
            toName={vessel.to}
          />
        </div>

        <div className="voyage-detail-info">
          <div className="voyage-tabs">
            <button onClick={() => setTab('display')} className={tab === 'display' ? 'active' : ''}>Display</button>
            <button onClick={() => setTab('zones')} className={tab === 'zones' ? 'active' : ''}>Zones</button>
            <button onClick={() => setTab('waypoints')} className={tab === 'waypoints' ? 'active' : ''}>Waypoints</button>
            <button onClick={() => setTab('bunker')} className={tab === 'bunker' ? 'active' : ''}>Bunker</button>
            <button onClick={() => setTab('other')} className={tab === 'other' ? 'active' : ''}>Other</button>
          </div>

          <div className="voyage-detail-card">
            {tab === 'display' && (
              <div>
                <h3>Display</h3>
                <table className="voyage-detail-table">
                  <thead>
                    <tr>
                      <th>Info</th>
                      <th>Operation</th>
                      <th>Zone</th>
                      <th>Commodity (Qty)</th>
                      <th>Charterer</th>
                      <th>Dates</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Info</td>
                      <td>Waiting at anchorage</td>
                      <td>SE ASIA</td>
                      <td>-</td>
                      <td>-</td>
                      <td>20 Jan 24</td>
                      <td>3h, 41min</td>
                    </tr>
                    <tr>
                      <td>Fleet</td>
                      <td>At port</td>
                      <td>SE ASIA</td>
                      <td>{vessel.commodities && vessel.commodities[0] ? vessel.commodities[0].name + ' (' + vessel.commodities[0].quantity + ')' : '-'}</td>
                      <td>-</td>
                      <td>{vessel.date}</td>
                      <td>{vessel.duration} days</td>
                    </tr>
                    <tr>
                      <td>Route</td>
                      <td>Loading / Discharging</td>
                      <td>SE ASIA</td>
                      <td>-</td>
                      <td>-</td>
                      <td>14-18 Feb 24</td>
                      <td>2d, 7h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'zones' && (
              <div>
                <h3>Zones</h3>
                <p>SE ASIA (example zones shown)</p>
              </div>
            )}

            {tab === 'waypoints' && (
              <div>
                <h3>Waypoints</h3>
                <ul>
                  <li>Surabaya - Waiting at anchorage</li>
                  <li>Belitung Island - Loading</li>
                  <li>Qui Nhon - At port</li>
                  <li>Ho Chi Minh City - Discharging</li>
                </ul>
              </div>
            )}

            {tab === 'bunker' && (
              <div>
                <h3>Bunkering</h3>
                <p>No bunkering events recorded for this voyage.</p>
              </div>
            )}

            {tab === 'other' && (
              <div>
                <h3>Other</h3>
                <p>Blackouts / Notes / Alerts</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
