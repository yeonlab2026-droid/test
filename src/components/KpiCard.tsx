interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  unit?: string;
}

export default function KpiCard({ label, value, delta, unit = '' }: KpiCardProps) {
  const positive = delta >= 0;
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #D9D9D9',
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
      padding: 16,
      flex: 1,
      minWidth: 160,
    }}>
      <div style={{ fontSize: 13, color: '#515151', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#282828' }}>{value}{unit}</div>
      <div style={{ fontSize: 13, marginTop: 6, color: positive ? '#00B441' : '#F72B35', fontWeight: 600 }}>
        {positive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}% 전월 대비
      </div>
    </div>
  );
}
