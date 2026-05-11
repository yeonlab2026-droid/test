import { useState } from 'react'
import { issues as initialIssues } from '../data/mockData'

export default function Issues() {
  const [issues, setIssues] = useState(initialIssues)

  const [filterWeek, setFilterWeek] = useState('전체')
  const [filterCategory, setFilterCategory] = useState('전체')
  const [filterKeyword, setFilterKeyword] = useState('')

  const [formWeek, setFormWeek] = useState('15W')
  const [formCategory, setFormCategory] = useState('매출')
  const [formContent, setFormContent] = useState('')
  const [formAssignee, setFormAssignee] = useState('')

  const handleAdd = () => {
    if (!formContent.trim()) return
    const newIssue = {
      id: Date.now(),
      week: formWeek,
      category: formCategory,
      content: formContent,
      assignee: formAssignee,
      status: '진행중',
    }
    setIssues([...issues, newIssue])
    setFormContent('')
    setFormAssignee('')
  }

  const handleToggleStatus = (id: number) => {
    setIssues(issues.map((issue: any) =>
      issue.id === id
        ? { ...issue, status: issue.status === '완료' ? '진행중' : '완료' }
        : issue
    ))
  }

  const filtered = issues.filter((issue: any) => {
    const matchWeek = filterWeek === '전체' || issue.week === filterWeek
    const matchCategory = filterCategory === '전체' || issue.category === filterCategory
    const matchKeyword = filterKeyword === '' || issue.content.includes(filterKeyword) || issue.assignee.includes(filterKeyword)
    return matchWeek && matchCategory && matchKeyword
  })

  const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D9D9D9',
    fontSize: '13px',
    backgroundColor: '#FFFFFF',
    color: '#282828',
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: '#282828' }}>이슈 로그</h1>

      {/* 필터 영역 */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select
          value={filterWeek}
          onChange={e => setFilterWeek(e.target.value)}
          style={inputStyle}
        >
          <option value="전체">전체 주차</option>
          <option value="15W">15W</option>
          <option value="16W">16W</option>
          <option value="17W">17W</option>
          <option value="18W">18W</option>
        </select>

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="전체">전체 카테고리</option>
          <option value="매출">매출</option>
          <option value="서비스">서비스</option>
          <option value="마케팅">마케팅</option>
          <option value="기타">기타</option>
        </select>

        <input
          type="text"
          placeholder="키워드 검색"
          value={filterKeyword}
          onChange={e => setFilterKeyword(e.target.value)}
          style={{ ...inputStyle, width: '200px' }}
        />
      </div>

      {/* 입력 폼 */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #D9D9D9',
        boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#282828' }}>이슈 등록</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', color: '#515151' }}>주차</label>
            <select
              value={formWeek}
              onChange={e => setFormWeek(e.target.value)}
              style={inputStyle}
            >
              <option value="15W">15W</option>
              <option value="16W">16W</option>
              <option value="17W">17W</option>
              <option value="18W">18W</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', color: '#515151' }}>카테고리</label>
            <select
              value={formCategory}
              onChange={e => setFormCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="매출">매출</option>
              <option value="서비스">서비스</option>
              <option value="마케팅">마케팅</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '13px', color: '#515151' }}>내용</label>
            <input
              type="text"
              placeholder="이슈 내용 입력"
              value={formContent}
              onChange={e => setFormContent(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', color: '#515151' }}>담당자</label>
            <input
              type="text"
              placeholder="담당자 이름"
              value={formAssignee}
              onChange={e => setFormAssignee(e.target.value)}
              style={{ ...inputStyle, width: '120px' }}
            />
          </div>

          <button
            onClick={handleAdd}
            style={{
              padding: '8px 20px',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              height: '38px',
            }}
          >
            등록
          </button>
        </div>
      </div>

      {/* 이슈 목록 테이블 */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #D9D9D9',
        boxShadow: '0 1px 3px rgba(40,40,40,0.08)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F5F5' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#515151', borderBottom: '1px solid #D9D9D9' }}>주차</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#515151', borderBottom: '1px solid #D9D9D9' }}>카테고리</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#515151', borderBottom: '1px solid #D9D9D9' }}>내용</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#515151', borderBottom: '1px solid #D9D9D9' }}>담당자</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#515151', borderBottom: '1px solid #D9D9D9' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#969696', fontSize: '13px' }}>
                  표시할 이슈가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((issue: any, index: number) => (
                <tr
                  key={issue.id}
                  style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}
                >
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#282828' }}>{issue.week}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#282828' }}>{issue.category}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#282828' }}>{issue.content}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#282828' }}>{issue.assignee}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      onClick={() => handleToggleStatus(issue.id)}
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: issue.status === '완료' ? 'rgba(0,180,65,0.10)' : 'rgba(255,220,30,0.15)',
                        color: issue.status === '완료' ? '#00B441' : '#282828',
                        border: issue.status === '완료' ? 'none' : '1px solid #FFDC1E',
                        userSelect: 'none',
                      }}
                    >
                      {issue.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
