import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { weeks, seriesRevenueData, channelData, storeTypeData } from '../data/mockData'

const seriesColors = ['#282828', '#515151', '#336DFF', '#B3B3B3']

export default function Sales() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '32px', color: '#282828' }}>
        매출/채널
      </h1>

      {/* A. 시리즈별 수주액 */}
      <div style={{ marginBottom: '40px', background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px', color: '#282828' }}>시리즈별 수주액</h2>
        <p style={{ fontSize: '12px', color: '#515151', marginBottom: '16px' }}>단위: 백만원</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={seriesRevenueData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="series" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="백만" />
            <Tooltip formatter={(value: unknown) => [`${value}백만원`]} />
            <Legend />
            {weeks.map((week: string, index: number) => (
              <Bar key={week} dataKey={week} fill={seriesColors[index % seriesColors.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* B. 채널별 매출 비중 */}
      <div style={{ marginBottom: '40px', background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px', color: '#282828' }}>채널별 매출 비중</h2>
        <p style={{ fontSize: '13px', color: '#336DFF', fontWeight: 500, marginBottom: '16px' }}>
          자사몰 비중: 35% → 41% (▲ 확대 추세)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={channelData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="%" domain={[0, 100]} />
            <Tooltip formatter={(value: unknown) => [`${value}%`]} />
            <Legend />
            <Bar dataKey="자사몰" stackId="a" fill="#336DFF" />
            <Bar dataKey="외부채널" stackId="a" fill="#B3B3B3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* C. 투자형 매장 현황 테이블 */}
      <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#282828' }}>투자형 매장 현황</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #D9D9D9' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#515151' }}>매장 유형</th>
              <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: '#515151' }}>매출(백만)</th>
              <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: '#515151' }}>목표(백만)</th>
              <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: '#515151' }}>달성률(%)</th>
            </tr>
          </thead>
          <tbody>
            {storeTypeData.map((row: { type: string; revenue: number; target: number }, index: number) => {
              const rate = parseFloat((row.revenue / row.target * 100).toFixed(1))
              const isAchieved = rate >= 100
              return (
                <tr
                  key={index}
                  style={{ borderBottom: '1px solid #D9D9D9', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}
                >
                  <td style={{ padding: '10px 16px', color: '#282828' }}>{row.type}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#515151' }}>{row.revenue.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#515151' }}>{row.target.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: isAchieved ? '#00B441' : '#F72B35' }}>
                    {rate}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
