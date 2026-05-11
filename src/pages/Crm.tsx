import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { crmData, roasData } from '../data/mockData'

export default function Crm() {
  const latest = crmData[3]
  const roasValue = latest.ROAS

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '32px', color: '#282828' }}>CRM/마케팅</h1>

      {/* Section A: 알림톡 캠페인 현황 카드 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#282828', marginBottom: '16px' }}>알림톡 캠페인 현황 (18W 기준)</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* 카드 1: 발송건수 */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
            border: '1px solid #D9D9D9'
          }}>
            <p style={{ fontSize: '13px', color: '#515151', marginBottom: '8px' }}>발송건수</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: '#282828' }}>
              {Number(latest.발송건수).toLocaleString()}건
            </p>
          </div>

          {/* 카드 2: 기여매출 */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
            border: '1px solid #D9D9D9'
          }}>
            <p style={{ fontSize: '13px', color: '#515151', marginBottom: '8px' }}>기여 매출</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: '#282828' }}>
              {latest.기여매출}백만원
            </p>
          </div>

          {/* 카드 3: ROAS */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
            border: '1px solid #D9D9D9'
          }}>
            <p style={{ fontSize: '13px', color: '#515151', marginBottom: '8px' }}>ROAS</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: '#282828' }}>
              {Number(roasValue).toLocaleString()}%
            </p>
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: roasValue >= 40000 ? 'rgba(0,180,65,0.10)' : 'rgba(247,43,53,0.10)',
              color: roasValue >= 40000 ? '#00B441' : '#F72B35'
            }}>
              {roasValue >= 40000 ? '교체 검토 불필요' : '소재 교체 권고'}
            </span>
          </div>
        </div>
      </section>

      {/* Section B: ROAS 추이 꺾은선 그래프 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#282828', marginBottom: '16px' }}>ROAS 추이 (META / SA)</h2>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          border: '1px solid #D9D9D9'
        }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roasData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: unknown) => `${Number(value).toLocaleString()}%`}
                contentStyle={{ backgroundColor: '#282828', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#FFFFFF' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <ReferenceLine
                y={27000}
                stroke="#F72B35"
                strokeDasharray="5 5"
                label={{ value: '교체 권고선', position: 'insideTopRight', fontSize: 11, fill: '#F72B35' }}
              />
              <Line type="monotone" dataKey="META" stroke="#515151" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="SA" stroke="#336DFF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Section C: 알림톡 주차별 발송/기여매출 꺾은선 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#282828', marginBottom: '16px' }}>알림톡 주차별 발송건수 / 기여매출</h2>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          border: '1px solid #D9D9D9'
        }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={crmData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12, fill: '#336DFF' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#00B441' }}
                tickFormatter={(v) => `${v}백만`}
              />
              <Tooltip
                formatter={(value: unknown, name: unknown) => {
                  if (name === '발송건수') return [`${Number(value).toLocaleString()}건`, name]
                  if (name === '기여매출') return [`${value}백만원`, name]
                  return [`${value}`, `${name}`]
                }}
                contentStyle={{ backgroundColor: '#282828', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#FFFFFF' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="발송건수"
                stroke="#336DFF"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="기여매출"
                stroke="#00B441"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
