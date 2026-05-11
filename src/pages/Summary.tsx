import { useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import KpiCard from '../components/KpiCard'
import { weeks, summaryData, prevMonthAvg, investmentStoreData } from '../data/mockData'

const achievementData = [
  { name: '수주액', 달성: 96, 목표: 100 },
  { name: '신규고객', 달성: 118, 목표: 100 },
  { name: '전환율', 달성: 123, 목표: 100 },
  { name: 'ROAS', 달성: 152, 목표: 100 },
]

function calcDelta(current: number, base: number): number {
  if (base === 0) return 0
  return Math.round(((current - base) / base) * 1000) / 10
}

export default function Summary() {
  const [week, setWeek] = useState('18W')

  const data = summaryData[week as keyof typeof summaryData]

  const revenueDelta = calcDelta(data.revenue, prevMonthAvg.revenue)
  const newCustomersDelta = calcDelta(data.newCustomers, prevMonthAvg.newCustomers)
  const conversionRateDelta = calcDelta(data.conversionRate, prevMonthAvg.conversionRate)
  const roasDelta = calcDelta(data.roas, prevMonthAvg.roas)

  const pieData = investmentStoreData && investmentStoreData.length > 0
    ? investmentStoreData
    : [
        { name: '투자형', value: 49.5 },
        { name: '일반', value: 50.5 },
      ]

  const PIE_COLORS = ['#336DFF', '#D9D9D9']

  return (
    <div style={{ padding: '24px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#282828' }}>
        Summary 대시보드
      </h1>

      {/* 주차 선택 탭 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {weeks.map((w: string) => (
          <button
            key={w}
            onClick={() => setWeek(w)}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: week === w ? 'none' : '1px solid #B3B3B3',
              cursor: 'pointer',
              fontWeight: week === w ? 700 : 400,
              backgroundColor: week === w ? '#282828' : '#FFFFFF',
              color: week === w ? '#FFFFFF' : '#282828',
              fontSize: '14px',
            }}
          >
            {w}
          </button>
        ))}
      </div>

      {/* KPI 카드 4개 */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KpiCard
          label="수주액"
          value={`${(data.revenue / 100000000).toFixed(1)}억`}
          delta={revenueDelta}
        />
        <KpiCard
          label="신규 구매자"
          value={`${data.newCustomers}명`}
          delta={newCustomersDelta}
        />
        <KpiCard
          label="전환율"
          value={`${data.conversionRate}%`}
          delta={conversionRateDelta}
        />
        <KpiCard
          label="ROAS"
          value={`${data.roas.toLocaleString()}%`}
          delta={roasDelta}
        />
      </div>

      {/* 차트 영역 */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {/* 왼쪽: 투자형 매장 비중 도넛 차트 */}
        <div
          style={{
            flex: 1,
            minWidth: '280px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #D9D9D9',
            boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#282828', marginBottom: '16px' }}>
            투자형 매장 비중
          </h2>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={220} height={220}>
              <Pie
                data={pieData}
                cx={110}
                cy={110}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((_: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#282828' }}>49.5%</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#336DFF' }} />
              <span style={{ fontSize: '13px', color: '#515151' }}>투자형</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#D9D9D9' }} />
              <span style={{ fontSize: '13px', color: '#515151' }}>일반</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 달성도 바 차트 */}
        <div
          style={{
            flex: 2,
            minWidth: '320px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #D9D9D9',
            boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#282828', marginBottom: '16px' }}>
            달성도
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={achievementData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#515151' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 180]} tick={{ fontSize: 12, fill: '#515151' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: unknown) => [`${value}%`, '달성률']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #D9D9D9', fontSize: '13px' }}
              />
              <ReferenceLine y={100} stroke="#F72B35" strokeDasharray="4 4" label={{ value: '목표', fill: '#F72B35', fontSize: 12 }} />
              <Bar dataKey="달성" radius={[4, 4, 0, 0]}>
                {achievementData.map((entry, index) => (
                  <Cell
                    key={`bar-cell-${index}`}
                    fill={entry.달성 >= 100 ? '#336DFF' : '#F72B35'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
