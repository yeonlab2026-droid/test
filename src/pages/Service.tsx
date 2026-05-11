import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { asData, engineerData } from '../data/mockData'

const GAUGE_R = 80
const GAUGE_CX = 110
const GAUGE_CY = 100
const STROKE = 18

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function semiArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToXY(cx, cy, r, startDeg)
  const e = polarToXY(cx, cy, r, endDeg)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
}

function gaugeArcPath(cx: number, cy: number, r: number, pct: number) {
  const startDeg = 180
  const endDeg = 180 - pct * 180
  return semiArcPath(cx, cy, r, startDeg, endDeg)
}

export default function Service() {
  const latestEngineer = engineerData[engineerData.length - 1]?.['엔지니어'] ?? 82.5
  const gaugePct = latestEngineer / 100
  const goalPct = 0.8

  const goalAngle = 180 - goalPct * 180
  const goalInner = polarToXY(GAUGE_CX, GAUGE_CY, GAUGE_R - STROKE - 6, goalAngle)
  const goalOuter = polarToXY(GAUGE_CX, GAUGE_CY, GAUGE_R + 6, goalAngle)

  const cardData = [
    { label: '신규 구매자', value: '378명', color: '#336DFF' },
    { label: '정품 등록', value: '245건', color: '#00B441' },
    { label: '재방문 주문 (LTV)', value: '1,230건', color: '#282828' },
    { label: '리퍼럴 쿠폰 사용률', value: '8.4%', color: '#FF5948' },
  ]

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', color: '#282828' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '28px', color: '#282828' }}>A/S · 고객 충성도</h1>

      {/* Section A: A/S 이탈률 단계별 바 차트 */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#282828' }}>A/S 이탈률 단계별</h2>
        <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              layout="vertical"
              data={asData}
              margin={{ top: 4, right: 60, left: 20, bottom: 4 }}
            >
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 13 }} width={80} />
              <Tooltip formatter={(value: unknown) => `${value}%`} />
              <Bar
                dataKey="exitRate"
                radius={[0, 4, 4, 0]}
                label={{ position: 'right', formatter: (v: unknown) => (v !== undefined && v !== null ? `${v}%` : ''), fontSize: 12 }}
                fill="#336DFF"
                shape={(props: any) => {
                  const { x, y, width, height, value } = props
                  const fill = value >= 44 ? '#F72B35' : '#336DFF'
                  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section B + C: 게이지 & 꺾은선 나란히 */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '36px', flexWrap: 'wrap' }}>
        {/* Section B: 엔지니어 처리 비중 게이지 */}
        <div style={{ flex: '0 0 240px', background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#282828' }}>엔지니어 처리 비중</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="220" height="120" viewBox="0 0 220 120">
              {/* 배경 회색 반원 */}
              <path
                d={semiArcPath(GAUGE_CX, GAUGE_CY, GAUGE_R, 180, 0)}
                fill="none"
                stroke="#D9D9D9"
                strokeWidth={STROKE}
                strokeLinecap="round"
              />
              {/* 달성값 파란색 반원 */}
              <path
                d={gaugeArcPath(GAUGE_CX, GAUGE_CY, GAUGE_R, gaugePct)}
                fill="none"
                stroke="#336DFF"
                strokeWidth={STROKE}
                strokeLinecap="round"
              />
              {/* 목표선 80% */}
              <line
                x1={goalInner.x}
                y1={goalInner.y}
                x2={goalOuter.x}
                y2={goalOuter.y}
                stroke="#FFDC1E"
                strokeWidth={3}
              />
              {/* 목표 라벨 */}
              <text
                x={goalOuter.x - 4}
                y={goalOuter.y - 8}
                fontSize="10"
                fill="#FFDC1E"
                textAnchor="middle"
              >
                목표 80%
              </text>
              {/* 수치 텍스트 */}
              <text x={GAUGE_CX} y={GAUGE_CY + 16} textAnchor="middle" fontSize="22" fontWeight="700" fill="#336DFF">
                {latestEngineer}%
              </text>
              <text x={GAUGE_CX} y={GAUGE_CY + 32} textAnchor="middle" fontSize="11" fill="#515151">
                엔지니어 처리
              </text>
            </svg>
          </div>
        </div>

        {/* Section C: 유선 접수 비율 추이 꺾은선 */}
        <div style={{ flex: 1, minWidth: '280px', background: '#FFFFFF', borderRadius: '8px', padding: '16px', border: '1px solid #D9D9D9', boxShadow: '0 1px 3px rgba(40,40,40,0.08)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#282828' }}>유선 접수 비율 추이</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engineerData} margin={{ top: 4, right: 20, left: 0, bottom: 4 }}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: unknown) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="엔지니어" stroke="#336DFF" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="유선" stroke="#F72B35" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section D: 고객 충성도 지표 카드 */}
      <div>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#282828' }}>고객 충성도 지표</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {cardData.map((card) => (
            <div
              key={card.label}
              style={{
                flex: '1 1 160px',
                background: '#FFFFFF',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #D9D9D9',
                boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
                borderTop: `4px solid ${card.color}`,
              }}
            >
              <div style={{ fontSize: '13px', color: '#515151', marginBottom: '8px' }}>{card.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#282828' }}>{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
