import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { weeks, funnelData, funnelTrendData } from '../data/mockData'

const lineKeys = ['목록→상세', '상세→옵션', '옵션→담기', '담기→결제', '결제→완료']
const lineColors = ['#282828', '#515151', '#336DFF', '#B3B3B3', '#00B441']

export default function Funnel() {
  const [selectedWeek, setSelectedWeek] = useState('18W')
  const [activeLines, setActiveLines] = useState<Record<string, boolean>>(
    Object.fromEntries(lineKeys.map((k) => [k, true]))
  )

  const currentFunnel = funnelData[selectedWeek as keyof typeof funnelData] ?? []
  const maxUsers = Math.max(...currentFunnel.map((d: any) => d.users), 1)

  const toggleLine = (key: string) => {
    setActiveLines((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', color: '#282828' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: '#282828' }}>퍼널 분석</h1>

      {/* 주차 탭 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {weeks.map((week: string) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            style={{
              padding: '8px 20px',
              borderRadius: '6px',
              border: selectedWeek === week ? 'none' : '1px solid #B3B3B3',
              backgroundColor: selectedWeek === week ? '#282828' : '#FFFFFF',
              color: selectedWeek === week ? '#FFFFFF' : '#282828',
              fontWeight: selectedWeek === week ? 600 : 400,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {week}
          </button>
        ))}
      </div>

      {/* 퍼널 시각화 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #D9D9D9',
          boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '24px', color: '#282828' }}>단계별 퍼널</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
          {currentFunnel.map((step: any, index: number) => {
            const width = Math.max(100, Math.round((step.users / maxUsers) * 600))
            const isHigh = step.exitRate >= 50
            const exitColor = isHigh ? '#F72B35' : '#515151'

            return (
              <div
                key={step.stage}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* 박스 */}
                <div
                  style={{
                    width: `${width}px`,
                    backgroundColor: '#F5F5F5',
                    border: '1px solid #D9D9D9',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#282828' }}>
                    {step.stage}
                  </div>
                  <div style={{ fontSize: '13px', color: '#282828', marginTop: '4px' }}>
                    {step.users.toLocaleString()}명
                  </div>
                </div>

                {/* 화살표 + 이탈률 */}
                {index < currentFunnel.length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '4px 0',
                    }}
                  >
                    {index > 0 ? (
                      <div style={{ fontSize: '12px', color: exitColor, fontWeight: 600 }}>
                        이탈률 {step.exitRate}%
                      </div>
                    ) : null}
                    <div style={{ fontSize: '20px', color: '#B3B3B3', lineHeight: 1.2 }}>↓</div>
                  </div>
                )}
                {index === currentFunnel.length - 1 && index > 0 && (
                  <div style={{ fontSize: '12px', color: exitColor, fontWeight: 600, marginTop: '6px' }}>
                    이탈률 {step.exitRate}%
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 주차별 추이 그래프 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #D9D9D9',
          boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          padding: '32px',
        }}
      >
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#282828' }}>주차별 전환율 추이</h2>

        {/* 토글 버튼 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {lineKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => toggleLine(key)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: `1px solid ${lineColors[i]}`,
                backgroundColor: activeLines[key] ? lineColors[i] : '#FFFFFF',
                color: activeLines[key] ? '#FFFFFF' : lineColors[i],
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {key}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={funnelTrendData} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
            <XAxis dataKey="week" tick={{ fontSize: 13, fill: '#515151' }} />
            <YAxis unit="%" tick={{ fontSize: 13, fill: '#515151' }} domain={[0, 100]} />
            <Tooltip formatter={(value: any) => `${value}%`} />
            <Legend />
            {lineKeys.map((key, i) =>
              activeLines[key] ? (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={lineColors[i]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
